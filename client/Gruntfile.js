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
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        mangle: false
      },
      javascript: {
        src: ['dist/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    // concat task
    concat: {
      // needed for production
      javascript: {
        src: ['src/app/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      },
      stylesheets: {
        src: ['src/app/**/*.css'],
        dest: 'dist/<%= pkg.name %>.css'
      },
      index_production: {
        src: ['src/app/index_production.html'],
        dest: 'dist/index.html'
      },
      index_development: {
        src: ['src/app/index_development.html'],
        dest: 'dist/index.html'
      }
    },
    // copy task
    copy: {
      development: {
        files: [
          { expand: true, flatten: false, cwd: 'src/app', src: ['**', '!(index_development.html)'], dest: 'dist/' },
          { expand: true, flatten: false, src: ['vendor/**'], dest: 'dist/' }
        ]
      },
      production: {
        files: [
          { expand: true, flatten: false, cwd: 'src/app', src: ['**/*.html', '!(index_production.html)'], dest: 'dist/' },
          { expand: true, flatten: false, src: ['vendor/**'], dest: 'dist/' }
        ]
      }
    },
    clean: {
      files: ['dist/**']
    }
  });

  // Add default tasks here
  grunt.registerTask('default', ['development']);
  grunt.registerTask('development', ['copy:development', 'concat:index_development']);
  grunt.registerTask('production', ['copy:production', 'concat:javascript', 'concat:stylesheets', 'concat:index_production', 'uglify:javascript']);

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