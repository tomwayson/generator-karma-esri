'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'So, you want to have ' + chalk.cyan('Karma') + ' run tests for your ' + chalk.magenta('Esri') + ' app? I can help with that!'
    ));

    var prompts = [{
      type: 'input',
      name: 'jsapiBase',
      message: 'Location of ArcGIS API for JavaScript?',
      default: 'http://js.arcgis.com/3.13'
    }, {
      type: 'list',
      name: 'testFramework',
      message: 'What test framework would you like to use?',
      choices: ['Jasmine', 'Mocha'],
      default: 'Jasmine'
    }, {
      type: 'checkbox',
      name: 'additionalFrameworks',
      message: 'Would you like to include any additional frameworks?',
      choices: function(answers) {
        return [
          { value: 'chai', name: 'Chai assertion library (for Mocha)', checked: answers.testFramework === 'Mocha' },
          { value: 'sinon', name: 'SinonJS for spies, fakes, and mocks' },
        ];
      }
    }, {
      type: 'checkbox',
      name: 'browsers',
      message: 'What browsers do you want to run tests in?',
      choices: [
        {value: 'PhantomJS', checked: true},
        {value: 'Chrome', checked: true},
        {value: 'Firefox'},
        {value: 'Safari', name: 'Safari (OSX)'},
        {value: 'IE', name: 'IE (Windows)'}
      ]
    }, {
      type: 'confirm',
      name: 'useGrunt',
      message: 'Would you like to run Karma from Grunt?',
      default: true
    }, {
      type: 'input',
      name: 'gruntfilePath',
      when: function(answers) {
        return answers.useGrunt;
      },
      message: 'Path to your Grunt file:',
      default: 'Gruntfile.js'
    }];

    this.prompt(prompts, function (props) {
      this.jsapiBase = props.jsapiBase;
      this.testFramework = props.testFramework.toLowerCase();
      this.gruntfilePath = props.useGrunt ? props.gruntfilePath : '';
      this.frameworks = [this.testFramework, 'dojo'].concat(props.additionalFrameworks);
      this.browsers = props.browsers;
      done();
    }.bind(this));
  },

  karma: function() {
    this.composeWith('karma', {
      options: {
        'skip-install': this.options['skip-install'],
        'config-path': '.',
        frameworks: this.frameworks.join(','),
        // TODO: need to add source and spec patterns
        // but can't b/c they get split on nested commas:
        // { pattern: 'app/**/*.js', included: false },
        // { pattern: 'test/spec/**/*.js', included: false }
        'files-comments': 'TODO: add spec and source file patterns making sure to,set included:false since they are AMD modules,see: https://github.com/tomwayson/esri-karma-tutorial/blob/master/karma.conf.js#L13',
        'test-files': 'test/config.js',
        browsers: this.browsers.join(','),
        'gruntfile-path': this.gruntfilePath
      }});
  },

  writing: function() {
    this.fs.copyTpl(
      this.templatePath('test/_config.js'),
      this.destinationPath('test/config.js'),
      { jsapiBase: this.jsapiBase }
    );
    this.fs.copyTpl(
      this.templatePath('test/spec/_sanity.js'),
      this.destinationPath('test/spec/sanity.js'),
      { testFramework: this.testFramework }
    );
    this.fs.copy(
      this.templatePath('test/jshintrc'),
      this.destinationPath('test/.jshintrc')
    );
    if (this.fs.exists(this.destinationPath('package.json'))) {
      return;
    }
    this.fs.copy(
      this.templatePath('_package.json'),
      this.destinationPath('package.json')
    );
  },

  install: function () {
    // if (this.options['skip-install']) {
    //   return;
    // }
    // this.npmInstall(['karma-dojo'], { 'saveDev': true });
    // this.installDependencies({
    //   skipInstall: this.options['skip-install']
    // });
  }
});
