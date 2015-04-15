'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var fs = require('fs');

describe('karma-esri:app', function () {
  var prompt = {
    jsapiBase: 'http://js.arcgis.com/3.12',
    testFramework: 'Mocha',
    browsers: ['Chrome', 'Firefox', 'IE']
  };
  before(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'karma:app']
    ];
    helpers.run(path.join(__dirname, '../app'))
      // generator-karma needs package.json to run
      // so copy dummy package.json to test directory
      // TODO: should also test that err is shown if no package.json
      .inTmpDir(function(dir) {
        var sourceFile = path.join(__dirname, '_package.json');
        var targetFile = path.join(dir, 'package.json');
        fs.writeFileSync(targetFile, fs.readFileSync(sourceFile));
      })
      .withOptions({ 'skip-install': true })
      .withPrompt(prompt)
      .withGenerators(deps)
      .on('end', done);
  });

  it('copies files', function () {
    assert.file([
      'test/.jshintrc'
    ]);
  });

  it('templates files', function () {
    assert.file([
      'test/config.js',
      'test/spec/sanity.js'
    ]);
    assert.fileContent('test/config.js', new RegExp(prompt.jsapiBase));
    assert.fileContent('test/spec/sanity.js', /expect\(1\)\.to\.equal\(1\);/);
  });
});
