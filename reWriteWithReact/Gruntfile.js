module.exports = function(grunt) {
    grunt.initConfig({
        copy: {
            build: {
                cwd: 'src',
                src: ['**', '!**/*.map', '!**/*.scss'], //任何文件 除了其他
                dest: 'build',
                expand: true
            },
            stylesheets: {
                cwd: 'src',
                src: ['**/*.css'],
                dest: 'build',
                expand: true
            },
            scripts: {
                cwd: 'src',
                src: ['**/*.js'],
                expand: true
            },
            else :{
                cwd: 'src',
                src: ['**', '!**/*.map', '!**/*.scss', '!**/*.css', '!**/*.js'],
                dest: 'build',
                expand: true
            }
        },
        clean: {
            build: {
                src: ['build']
            },
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
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**/*.js',
                    dest: 'build/'
                }]
            }
        },
        cssmin: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**/*.css',
                    dest: 'build/'
                }]
            },
        },
        watch: {
            options: {
                livereload: true
            },
            stylesheets: {
                files: 'src/**/*.css',
                tasks: ['copy:stylesheets'],
            },
            scripts: {
                files: 'src/**/*.js',
                tasks: ['copy:scripts'],
            },
            all: {
                files: ['src/**', '!src/**/*.css', '!src/**/*.js'],
                tasks: ['copy:else'],
            }
        },
        // 用inline的插件就不需要下面这个替换了，不过开发环境
        'string-replace': {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**/*.ejs',
                    dest: 'build/'
                }],
                options: {
                    replacements: [{
                        pattern: /\?__inline/g,
                        replacement: ''
                    }, {
                        pattern: /\.\.\/\.\.\/static/g,
                        replacement: ''
                    }]
                }
            }
        },
        // concurrent: {
        //     target: ['nodemon', 'watch'],
        //     options: {
        //         logConcurrentOutput: true
        //     }
        // },
        // nodemon: {
        //     dev: {
        //         script: 'server.js'
        //     }
        // },
        // connect: {
        //     server: {
        //         option: {
        //             port: 8000,
        //             hostname: '*',
        //             keepalive: true,
        //             livereload: true
        //         }
        //     }
        // }
        inline: {
            build: {
                options: {
                    exts: ['ejs'],
                    // cssmin: true,
                    // uglify: true
                },
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: ['**/*.ejs', '**/*.css'],
                    dest: 'build/'
                }]
            },
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'build/',
                    src: '**/*.ejs',
                    dest: 'build/'
                }]
            }
        },
        express: {
            all: {
                options: {
                    port: 3000,
                    hostname: 'localhost',
                    bases: ['./build/static'],
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-inline');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-concurrent');
    // grunt.loadNpmTasks('grunt-nodemon');
    // grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-express');

    grunt.registerTask('stylesheets', 'Compiles the stylesheets.', ['autoprefixer', 'cssmin']);
    grunt.registerTask('scripts', 'Compiles the JS files.', ['uglify']);
    grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', ['clean', 'copy:build', 'stylesheets', 'scripts', 'inline']);
    grunt.registerTask('dev', 'Compiles all of the assets and copies the files to the build(dev) directory.', ['clean', 'copy:build', 'string-replace']);
    grunt.registerTask('default', ['dev']);
};