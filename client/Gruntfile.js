module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

   // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify task
    uglify: {
      // needed for production
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      production: {
        javascript: {
          src: ['dist/<%= pkg.name %>.js'],
          dest: 'dist/<%= pkg.name %>.min.js'
        },
        stylesheets: {
          src: 'dist/<%= pkg.name %>.css',
          dest: 'dist/<%= pkg.name %>.min.css'
        }
      }
    },
    // concat task
    concat: {
      // needed for production
      production: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        javascript: {
          src: ['src/app/**/*.js', 'vendor/**/*.js'],
          dest: ['dist/<%= pkg.name %>.js']
        },
        stylesheets: {
          src: ['src/app/**/*.css', 'vendor/**/*.css'],
          dest: ['dist/<%= pkg.name %>.css']
        }
      }
    },
    // copy task
    copy: {
      development: {
        files: [
          { expand: true, flatten: false, cwd: 'src/app', src: ['**'], dest: 'dist/' },
          { expand: true, flatten: false, src: ['vendor/**'], dest: 'dist/' },
          { expand: true, flatten: false, cwd: 'src/app', src: 'index_development.html', dest: 'index.html' }
        ]
      },
      production: {
        files: [
          { expand: true, flatten: false, cwd: 'src/app', src: ['**/*.html'], dest: 'dist/' },
          { expand: true, flatten: false, cwd: 'src/app', src: 'index_production.html', dest: 'index.html' }
        ]
      }
    }
  });

  // Add default tasks here
  grunt.registerTask('default', ['development']);
  grunt.registerTask('development', ['copy:development']);
  grunt.registerTask('production', ['copy:production', 'concat:production', 'uglify:production']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // TODO: add build related taks later on (dev and production)
  // minimize
  // concat
  // uglify
  // compress
  // ...

};