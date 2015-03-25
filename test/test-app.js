'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('karma-esri:app', function () {
  before(function (done) {
    var deps = [
      [helpers.createDummyGenerator(), 'karma:app']
    ];
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        testFramework: 'Mocha',
        browsers: ['Chrome', 'Firefox', 'IE']
      })
      .withGenerators(deps)
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'test/.jshintrc'
    ]);
  });
});
