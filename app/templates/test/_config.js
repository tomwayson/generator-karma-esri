(function(window) {
  'use strict';

  var allTestFiles = [];
  var TEST_REGEXP = /test\/spec.*\.js$/;

  for (var file in window.__karma__.files) {
    if (TEST_REGEXP.test(file)) {
      allTestFiles.push(file);
    }
  }

  window.dojoConfig = {
    packages: [
      // TODO: add your local pacakges here, example:
      // {
      //   name: 'app',
      //   location: '/base/src/app'
      // },

      // esri/dojo packages
      {
        name: 'dgrid',
        location: '<%= jsapiBase %>/dgrid'
      }, {
        name: 'dijit',
        location: '<%= jsapiBase %>/dijit'
      }, {
        name: 'esri',
        location: '<%= jsapiBase %>/esri'
      }, {
        name: 'dojo',
        location: '<%= jsapiBase %>/dojo'
      }, {
        name: 'dojox',
        location: '<%= jsapiBase %>/dojox'
      }, {
        name: 'put-selector',
        location: '<%= jsapiBase %>/put-selector'
      }, {
        name: 'util',
        location: '<%= jsapiBase %>/util'
      }, {
        name: 'xstyle',
        location: '<%= jsapiBase %>/xstyle'
      }
    ],
    async: true
  };


  /**
   * This function must be defined and is called back by the dojo adapter
   * @returns {string} a list of dojo spec/test modules to register with your testing framework
   */
  window.__karma__.dojoStart = function() {
    return allTestFiles;
  };
})(window);
