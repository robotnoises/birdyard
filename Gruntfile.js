var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Compile Jade templates
    // Ex: grunt jade --[dev, production]
    
    jade: {
      
      //Target: dev
      dev : {
        options: {
          pretty: true,
          data: {
            debug: true
          }
        },
        files: {
          'src/index.html': 'src/templates/index-dev.jade'
        }
      },

      // Target: production
      production: {
        options: {
          pretty: true,
          data: {
            debug: false
          }
        },
        files: {
          'dist/index.html': 'src/templates/index-production.jade'
        }
      }
      
    },
    
    // Concatenate Stuff
    // Ex: grunt concat
    
    concat: {
      production: {
        options: {
          block: true,
          line: true
        }, 
        files: {
          'dist/lib.min.js': [
            'src/bower_components/angular/angular.min.js',
            'src/bower_components/angular-route/angular-route.min.js',
            'src/bower_components/firebase/firebase.js',
            'src/bower_components/angularfire/dist/angularfire.min.js',
            'src/bower_components/angular-sanitize/angular-sanitize.min.js',
            'src/bower_components/showdown/compressed/Showdown.min.js',
            'src/bower_components/moment/min/moment.min.js',
            'src/bower_components/angular-markdown-directive/markdown.js',
            'src/bower_components/angular-animate/angular-animate.min.js',
            'src/bower_components/angular-aria/angular-aria.min.js',
            'src/bower_components/angular-material/angular-material.min.js',
            'src/bower_components/firebase-util/dist/firebase-util-paginate.min.js'
          ]
        }
      }
    },
    
    // Minify CSS
    // Ex: grunt cssmin
    
    cssmin: {

      // Target: production
      production: {
        src: 'src/assets/style/compiled/birdyard.css',
        dest: 'dist/assets/style/birdyard.min.css',
      }
    },
    
    // Minify JS
    // Ex: grunt uglify
    
    uglify: {

      // Options
      options: {
        report: 'min',
        mangle: false
      },

      // Target: production
      production: {
        files: [
          {
            src: [
              // main module
              'src/app.js',
              // any additional lib files not managed by bower or npm
              'src/assets/code/*.js',
              // Dependencies
              'src/config/*.js',
              'src/modules/*.js',   
              // config files
              'src/config/configs/constants-prod.js',
              'src/config/configs/themes.js',
              'src/config/configs/routes.js',
              // app modules         
              'src/modules/**/*.js',
              'src/modules/**/**/*.js',
            ],
            dest: 'dist/birdyard.min.js'
          }
        ]
      }
    },
    
    // Watch for file changes
    // Ex: grunt watch
    watch: {
      script: {
        files: [
          'src/templates/*.jade', 
          'src/assets/style/*.scss'
        ],
        tasks: ['build-dev'],
        options: {
          spawn: false,
          reload: true
        }
      }  
    },
    
    // Static analysis
    jshint: {
      files: {
        src: [
          'app.js',
          'app/config/*.js',
          'app/modules/*.js',
          'app/modules/**/*.js',
          'app/global/*.js',
          'app/global/**/*.js'
        ]
      }
    },
    
    // Compile sass
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/assets/style',
          src: ['*.scss'],
          dest: 'src/assets/style/compiled',
          ext: '.css'
        }]
      }
    },
    
    // Copy files
    copy: {
      components: {
        files: [
          {
            cwd: 'src/bower_components',
            expand: true, 
            src: ['angular-material/angular-material.min.css'], 
            dest: 'dist/assets/style/lib/'
          }
        ]
      },
      fonts: {
        files: [
          { 
            expand: true, 
            src: ['src/assets/style/fonts/**/*'], 
            dest: 'src/assets/style/compiled/fonts/', 
            flatten: true, 
            filter: 'isFile'
          }
        ]
      },
      fonts_prod: {
        files: [
          { 
            expand: true,
            src: ['src/assets/style/fonts/**/*'], 
            dest: 'dist/assets/style/fonts/',
            flatten: true,
            filter: 'isFile'
          }
        ]
      },
      images: {
        files: [
          {
            cwd: 'src/assets/images',
            expand: true, 
            src: ['**/*', ], 
            dest: 'src/assets/style/images'
          }
        ]
      },
      images_prod: {
        files: [
          {
            cwd: 'src/assets/images',
            expand: true, 
            src: ['**/*', ], 
            dest: 'dist/assets/images'
          }
        ]
      },
      views: {
        files: [
          { 
            cwd: 'src/modules/',
            expand: true,
            src: ['**/views/*.html'], 
            dest: 'dist/modules/', 
            filter: 'isFile'
          }
        ]
      }
    },
    
    clean: {
      production: ['dist/*']
    },
    
    // Test runner
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
    
  });
  
  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');
  
  // Register custom tasks
  
  grunt.registerTask('compile-sass', ['sass', 'copy:fonts'])
  
  grunt.registerTask('build-dev', ['compile-sass', 'jade:dev', 'copy:images']);
  
  grunt.registerTask('build-prod', [
    'clean:production',
    'compile-sass', 
    'cssmin:production', 
    'jade:production',
    'concat:production',
    'uglify:production', 
    'copy:components', 
    'copy:fonts_prod', 
    'copy:images_prod',
    'copy:views'
  ]);
};

module.exports = config;