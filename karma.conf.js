module.exports = function (config) {
  
  var configuration = {
    
    basePath : './src/',

    files : [
      
      // Third-party dependencies
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-markdown-directive/markdown.js',
      'bower_components/angular-material/angular-material.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angularfire/dist/angularfire.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/mockfirebase/browser/mockfirebase.js',
      'bower_components/firebase/firebase.js',
      'bower_components/moment/moment.js',
      'bower_components/showdown/compressed/Showdown.js',
      
      // Test lib
      // 'tests/lib/*.js',
      
      // Assets
      'assets/code/Move.js',
      
      // App
      'app.js',
      'config/*.js',
      'config/**/*.js',
      'modules/*.js',
      'modules/**/*.js',
      'modules/**/**/*.js',
      
      // Unit Tests
      'tests/unit/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    },
    
    logLevel: 'DEBUG'
  };
  
  if (process.env.TRAVIS){
    configuration.browsers = ['Chrome_travis_ci'];
  }
  
  config.set(configuration);

};