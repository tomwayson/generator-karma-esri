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
      type: 'list',
      name: 'testFramework',
      message: 'What test framework would you like to use?',
      choices: ['Jasmine', 'Mocha'],
      default: 'Jasmine'
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
    }];

    this.prompt(prompts, function (props) {
      console.log()
      this.testFramework = props.testFramework.toLowerCase();
      this.browsers = props.browsers;
      done();
    }.bind(this));
  },

  karma: function() {
    this.composeWith('karma', {
      options: {
        'skip-install': this.options['skip-install'],
        'test-framework': this.testFramework,
        browsers: this.browsers.join(',')
      }});
  },

  writing: function() {
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
