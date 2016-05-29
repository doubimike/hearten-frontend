module.exports = function (grunt) {
    grunt.initConfig({
        copy: {
            build: {
                cwd: 'src',
                src: ['**'], //任何文件
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
            },
            stylesheets: {
                src: ['build/**/*.css','!build/application.css']
            },
            scripts: {
                src: ['build/**/*.js','!build/application.js']
            }
        },
        autoprefixer: {
            build: {
                expand: true,
                cwd: 'build',
                src: ['**/*.css'],
                dest: 'build'
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false
                },
                files: {
                    'build/application.js': 'build/**/*.js'
                }
            }
        },
        cssmin: {
            build: {
                files: {
                    'build/application.css': ['build/**/*.css']
                }
            }
        },
        watch: {
            styleSheets: {
                files: 'src/**/*.css',
                tasks: ['stylesheets']
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['scripts']
            },
            copy: {
                files: [ 'src/**', '!src/**/*.css', '!src/**/*.js'],
                tasks: [ 'copy' ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy'); 
    grunt.loadNpmTasks('grunt-contrib-clean'); 
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    grunt.loadNpmTasks('grunt-inline');

    grunt.registerTask('stylesheets','Compiles the stylesheets.',['autoprefixer','cssmin','clean:stylesheets']);
    grunt.registerTask('scripts','Compiles the JS files.',['uglify','clean:scripts']);
    grunt.registerTask('build','Compiles all of the assets and copies the files to the build directory.',['clean:build','copy','stylesheets','scripts']);
};