module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /**
         * JS Hint
         * Note: Add vendor exceptions in plugins folder here
         */
        jshint: {
            all: [
                'gruntfile.js',
                '_scripts/**/*.js',
                '!_scripts/plugins/**/*.js',
                '!_scripts/vendor/**/*.js'
            ]
        },

        /**
         * Uglify Task
         * Place already minified files from vendos into the minified folder
         */
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                compress: true,
                beautify: false,
                mangle: false
            },
            build: {
                files: {
                    'dist/assets/<%= pkg.name %>/js/modules.min.js': ['<%= concat.modules.dest %>', '_scripts/modules/minified/*.js'],
                    'dist/assets/<%= pkg.name %>/js/plugins.min.js': ['<%= concat.plugins.dest %>', '_scripts/plugins/minified/*.js'],
                    'dist/assets/<%= pkg.name %>/js/main.min.js': ['<%= copy.mainjs.dest %>']
                }
            },
            vendor: {
                files: [{
                    expand: true,
                    cwd: '_scripts/vendor',
                    src: '**/*.js',
                    dest: 'dist/assets/<%= pkg.name %>/js/vendor'
                }]
            }
        },

        /**
         * Concat Tasks
         * Note: Append file to the src array if you need the file to concat in any particular order
         */
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                separator: ';'
            },
            modules: {
                src: [
                        '_scripts/vendor/jRespond.js',
                        '_scripts/modules/*.js'
                    ],
                dest: 'dist/assets/<%= pkg.name %>/js/modules.js'
            },
            plugins: {
                src: [
                    '_scripts/plugins/**/*.js'
                ],
                dest: 'dist/assets/<%= pkg.name %>/js/plugins.js'
            }
        },

        /**
         * Min Tasks
         */
        cssmin: {
            minify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */',
                    keepSpecialComments: 0
                },
                expand: true,
                cwd: 'dist/assets/<%= pkg.name %>/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/assets/<%= pkg.name %>/css/',
                ext: '.min.css'
            }
        },

        /**
         * Copy Tasks
         */
        copy: {
            main: {
                files: [
                    {expand: true, cwd: '_styles',  src: ['**/*'], dest: 'dist/assets/<%= pkg.name %>/css'},
                    {expand: true, cwd: '_images',  src: ['**'], dest: 'dist/assets/<%= pkg.name %>/images'},
                    {expand: true, cwd: '_fonts',  src: ['**'], dest: 'dist/assets/<%= pkg.name %>/fonts'},
                    {expand: true, cwd: '_templates',  src: ['**/*'], dest: 'dist'},
                    {expand: true, cwd: '_scripts',  src: ['**/*.swf'], dest: 'dist/assets/<%= pkg.name %>/js'}
                ]
            },
            mainjs: {
                src: '_scripts/main.js',
                dest: 'dist/assets/<%= pkg.name %>/js/main.js'
            }
        },

        /**
         * Clean Task
         */
        clean: {
            build: {
                src: ["dist/**"]
            }
        },

        /**
         * Shell Task
         */
        shell: {
            options: {
                stderr: false
            },
            sass: {
                command: 'sass --update _scss:dist/assets/<%= pkg.name %>/css'
            },
            scsslint: {
                command: 'scss-lint _scss/'
            }
        },

        /**
         * Watch task
         */
        watch: {
            js:{
                files: [
                    '_scripts/**/*.js', '!_script/plugins/**/*', '!_script/vendor/**/*'
                ],
                tasks:['concat', 'copy', 'uglify'],
                options: {
                    livereload: true,
                }
            },
            scss:{
                files: [
                    '_scss/**/*.scss'
                ],
                tasks:['shell:sass'],
                options: {
                    livereload: true,
                }
            },
            css: {
                files: [
                    '_styles/**/*.css'
                ],
                tasks:['copy'],
                options: {
                    livereload: true,
                }
            },
            img: {
                files: [
                    '_images/**'
                ],
                tasks:['copy'],
                options: {
                    livereload: true,
                }
            },
            template: {
                files: [
                    '_templates/**'
                ],
                tasks:['copy'],
                options: {
                    livereload: true,
                }
            }
        },

        /**
         * Optimise image task
         */
        imagemin: {
            options: {
                cache: false,
                optimizationLevel: 4,
                pngquant: true
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '_images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/assets/<%= pkg.name %>/images'
                }]
            }
        },

        /**
         * Replaces CSS/JS with min
         */
        processhtml: {
            dist: {
                files: {
                    'dist/includes/header.php': ['dist/includes/header.php'],
                    'dist/includes/footer.php': ['dist/includes/footer.php']
                }
            }
        }
    });

    /**
     * Load Grunt Plugins
     */
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-shell');

    /**
     * Default task
     */
    grunt.registerTask('default', ['concat', 'copy', 'uglify', 'shell:sass', 'cssmin']);
    grunt.registerTask('validate', ['jshint', 'shell:scsslint']);
    grunt.registerTask('dist', ['concat', 'copy', 'uglify', 'shell:sass', 'cssmin', 'imagemin', 'processhtml']);
};