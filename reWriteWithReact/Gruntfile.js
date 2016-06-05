module.exports = function(grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        develop: {
            server: {
                file: 'server.js'
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['react']
            },
            dist: {
                files: {
                    'build/static/common/js/script.js': 'src/static/common/js/script.js'
                }
            }
        },
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
                livereload: true,
                nospawn: true
            },
            all: {
                files: ['src/**/*.css', 'src/**/*.js','src/**/*.ejs','Gruntfile.js','server.js'],
                tasks: ['dev'],
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
        inline: {
            build: {
                options: {
                    exts: ['ejs'],
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
    });

    grunt.loadNpmTasks('grunt-develop');
    grunt.registerTask('stylesheets', 'Compiles the stylesheets.', ['autoprefixer', 'cssmin']);
    grunt.registerTask('scripts', 'Compiles the JS files.', ['uglify']);
    grunt.registerTask('build', 'Compiles all of the assets and copies the files to the build directory.', ['clean', 'copy:build', 'stylesheets', 'scripts', 'inline']);
    grunt.registerTask('dev', 'Compiles all of the assets and copies the files to the build(dev) directory.', ['clean', 'copy:build', 'string-replace']);
    grunt.registerTask('default', ['dev','watch']);
};