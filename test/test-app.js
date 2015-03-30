'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

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
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt(prompt)
      .withGenerators(deps)
      .on('end', done);
  });

  it('copies files', function () {
    assert.file([
      'package.json',
      'test/.jshintrc'
    ]);
  });

  it('templates files', function () {
    assert.file([
      'test/config.js'
    ]);
    assert.fileContent('test/config.js', prompt.jsapiBase);
  });
});
