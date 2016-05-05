/// <binding />
module.exports = function (grunt) {
    //load Grunt plugins from NPPM
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');

    //configure plugin and tasks
    grunt.initConfig({
        jshint: {
            all: ['GruntFile.js', 'Scripts/*.js', 'Scripts/**/*.js']
        },
        html2js: {
            options: {
                base: 'Scripts/Views',
                module: 'rtsApp',
                singleModule: true,
                existingModule: true
            },
            dist: {
                src: ['Scripts/Views/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['Scripts/app.js', 'tmp/*.js', 'tmp/**/*.js', 'Scripts/**/*.js'],
                dest: 'wwwroot/app.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: { 'wwwroot/app.js': ['Scripts/app.js', 'Scripts/**/*.js'] }
            }
        },

        clean: {
            temp: {
                src: ['tmp']
            }
        },

        watch: {
            dev: {
                files: ['Scripts/**/*.js', 'Scripts/**/*.html'],
                tasks: ['jshint', 'html2js:dist', 'concat:dist', 'clean:temp'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: ['Scripts/**/*.js', 'Scripts/**/*.html'],
                tasks: ['jshint', 'html2js:dist', 'concat:dist', 'uglify', 'clean:temp'],
                options: {
                    atBegin: true
                }
            }
        }
    });

    //register tasks
    grunt.registerTask('dev-serve', ['watch:dev']);
    grunt.registerTask('minify', ['watch:min']);
};