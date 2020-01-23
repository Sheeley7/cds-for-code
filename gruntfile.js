module.exports = function (grunt) {
    const sass = require('node-sass');

    // configure the tasks
    let config = {
        mkdir: {
            all: {
                options: {
                    create: ['out/temp', 'out/temp/browser', 'dist/web', 'dist/release', 'dist/templates', 'dist/tools' ]
                },
            },
            dev: {
                options: {
                    create: ['out/temp', 'out/temp/browser', 'dist/web', 'dist/templates' ]
                },
            },
            release: {
                options: {
                    create: ['out/temp', 'out/temp/browser', 'dist/release', 'dist/templates', 'dist/tools' ]
                },
            }
        },

        //  Sass
        sass: {
            options: {
                implementation: sass
            },
            // Task
            dev: {
                // Target options
                options: {
                    outputStyle: 'expanded',
                    sourcemap: true
                },
                files: {
                    'resources/styles/materialize.vscode.css': 'resources/framework/scss/materialize.vscode.scss'
                }
            },
            // Minify
            release_min: {
                options: {
                    outputStyle: 'compressed',
                    sourcemap: false
                },
                files: {
                    'dist/web/materialize.vscode.min.css': 'resources/framework/scss/materialize.vscode.scss'
                }
            },
            // Compile bin css (just so you have a prod ready one)
            release: {
                options: {
                    outputStyle: 'expanded',
                    sourcemap: false
                },
                files: {
                    'dist/web/materialize.vscode.css': 'resources/framework/scss/materialize.vscode.scss'
                }
            }
        },

        // PostCss Autoprefixer
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')()
                ]
            },
            dev: {
                src: 'resources/styles/materialize.vscode.css'
            },
            release_min: {
                src: 'dist/web/materialize.vscode.min.css'
            },
            release: {
                src: 'dist/web/materialize.vscode.css'
            }
        },

        ts: {
            browser: {
                src: ["src/core/webui/LocalBridge.browser.ts", "src/core/webui/WebSocketBridge.browser.ts"],
                outDir: "out/temp/browser",
                options: {
                    rootDir: "src/core",
                    fast: 'never',
                    failOnTypeErrors: false,
                    target: "es6",
                    module: "commonjs",
                    lib: ["es6", "dom"],
                    sourceMap: true,
                    moduleResolution: "node"
                }
            },
            extension: {
                tsconfig: './tsconfig.json'
            }
        },

        browserify: {
            dev: {
                src: [
                    'out/temp/browser/**/*.js'
                ],
                dest: 'resources/scripts/cs.vscode.webviews.js',
                options: {
                    browserifyOptions: { debug: true }
                    //transform: [["babelify", { "presets": ['@babel/preset-env'] }]],
                }
            },
            release: {
                src: [
                    'out/temp/browser/**/*.js'
                ],
                dest: 'dist/web/cs.vscode.webviews.js',
                options: {
                    browserifyOptions: { debug: false }
                    //transform: [["babelify", { "presets": ['@babel/preset-env'] }]],
                }
            }
        },

        // Transpile ES2015+ to older versions of ES using Babel
        babel: {
            options: {
                sourceMap: false,
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/transform-arrow-functions',
                    '@babel/transform-block-scoped-functions',
                    '@babel/transform-classes',
                    '@babel/transform-template-literals',
                    '@babel/transform-object-super'
                  ]
            },
            dev: {
                options: {
                    sourceMap: true
                },
                files: {
                    'out/temp/materialize.js': 'out/temp/materialize_concat.js'
                }
            },
            release: {
                files: {
                    'dist/web/materialize.js': 'out/temp/materialize.js'
                }
            }
        },

        //  Concat one or more files together
        concat: {
            options: {
                separator: ';'
            },
            release: {
                // the files to concatenate
                src: [
                    'resources/framework/js/cash.js',
                    'resources/framework/js/component.js',
                    'resources/framework/js/global.js',
                    'resources/framework/js/anime.min.js',
                    'resources/framework/js/collapsible.js',
                    'resources/framework/js/dropdown.js',
                    'resources/framework/js/modal.js',
                    'resources/framework/js/materialbox.js',
                    'resources/framework/js/parallax.js',
                    'resources/framework/js/tabs.js',
                    'resources/framework/js/tooltip.js',
                    'resources/framework/js/waves.js',
                    'resources/framework/js/toasts.js',
                    'resources/framework/js/sidenav.js',
                    'resources/framework/js/scrollspy.js',
                    'resources/framework/js/autocomplete.js',
                    'resources/framework/js/forms.js',
                    'resources/framework/js/slider.js',
                    'resources/framework/js/cards.js',
                    'resources/framework/js/chips.js',
                    'resources/framework/js/pushpin.js',
                    'resources/framework/js/buttons.js',
                    'resources/framework/js/datepicker.js',
                    'resources/framework/js/timepicker.js',
                    'resources/framework/js/characterCounter.js',
                    'resources/framework/js/carousel.js',
                    'resources/framework/js/tapTarget.js',
                    'resources/framework/js/select.js',
                    'resources/framework/js/range.js'
                ],
                // the location of the resulting JS file
                dest: 'out/temp/materialize.js'
            },
            dev: {
                // the files to concatenate
                options: {
                    sourceMap: true,
                    sourceMapStyle: 'link'
                },
                src: [
                    'resources/framework/js/cash.js',
                    'resources/framework/js/component.js',
                    'resources/framework/js/global.js',
                    'resources/framework/js/anime.min.js',
                    'resources/framework/js/collapsible.js',
                    'resources/framework/js/dropdown.js',
                    'resources/framework/js/modal.js',
                    'resources/framework/js/materialbox.js',
                    'resources/framework/js/parallax.js',
                    'resources/framework/js/tabs.js',
                    'resources/framework/js/tooltip.js',
                    'resources/framework/js/waves.js',
                    'resources/framework/js/toasts.js',
                    'resources/framework/js/sidenav.js',
                    'resources/framework/js/scrollspy.js',
                    'resources/framework/js/autocomplete.js',
                    'resources/framework/js/forms.js',
                    'resources/framework/js/slider.js',
                    'resources/framework/js/cards.js',
                    'resources/framework/js/chips.js',
                    'resources/framework/js/pushpin.js',
                    'resources/framework/js/buttons.js',
                    'resources/framework/js/datepicker.js',
                    'resources/framework/js/timepicker.js',
                    'resources/framework/js/characterCounter.js',
                    'resources/framework/js/carousel.js',
                    'resources/framework/js/tapTarget.js',
                    'resources/framework/js/select.js',
                    'resources/framework/js/range.js'
                ],
                // the location of the resulting JS file
                dest: 'out/temp/materialize_concat.js'
            }
        },

        //  Uglify
        uglify: {
            release: {
                files: {
                    'dist/web/materialize.min.js': ['dist/web/materialize.js']
                },
                options: {
                    mangle: true,
                    compress: true,
                    beautify: false
                }
            },
            dev: {
                files: {
                    'dist/web/materialize.dev.js': ['out/temp/materialize.js']
                },
                options: {
                    mangle: false,
                    compress: false,
                    beautify: true
                }
            }
        },

        // Zip up templates for release packaging.
        zip: {
            'SystemTemplates': {
                cwd: 'resources/templates/BuiltInTemplates/',
                src: [ 'resources/templates/BuiltInTemplates/**'], 
                dest: 'dist/templates/SystemTemplates.zip'
            },
            'CloudSmith.Cds.SamplePlugin.v8.0': {
                cwd: 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.0',
                src: [ 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.0/**'], 
                dest: 'dist/templates/CloudSmith.Cds.SamplePlugin.v8.0.zip'
            },
            'CloudSmith.Cds.SamplePlugin.v8.1': {
                cwd: 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.1',
                src: [ 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.1/**'], 
                dest: 'dist/templates/CloudSmith.Cds.SamplePlugin.v8.1.zip'
            },
            'CloudSmith.Cds.SamplePlugin.v8.2': {
                cwd: 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.2',
                src: [ 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v8.2/**'], 
                dest: 'dist/templates/CloudSmith.Cds.SamplePlugin.v8.2.zip'
            },
            'CloudSmith.Cds.SamplePlugin.v9.0': {
                cwd: 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v9.0',
                src: [ 'resources/templates/UserTemplates/CloudSmith.Cds.SamplePlugin.v9.0/**'], 
                dest: 'dist/templates/CloudSmith.Cds.SamplePlugin.v9.0.zip'
            },
            'CloudSmith.Cds.CrmSvcUtil': {
                cwd: 'resources/tools/CloudSmith.Cds.CrmSvcUtil/bin/Release',
                src: [ 'resources/tools/CloudSmith.Cds.CrmSvcUtil/bin/Release/**'], 
                dest: 'dist/tools/CloudSmith.Cds.CrmSvcUtil.zip'
            },
            'CloudSmith.Tools.AssemblyScanner': {
                cwd: 'resources/tools/CloudSmith.Tools.AssemblyScanner/bin/Release/netcoreapp3.0',
                src: [ 'resources/tools/CloudSmith.Tools.AssemblyScanner/bin/Release/netcoreapp3.0/**'], 
                dest: 'dist/tools/CloudSmith.Tools.AssemblyScanner.zip'
            }
        },

        // Copy
        copy: {
            powershell: {
                expand: true,
                cwd: 'resources/powershell',
                src: '**',
                dest: 'dist/scripts'
            }
        },

        // Running dotnet core commands through shell
        shell: {
            crmsvcutil_restore: {
                command: 'dotnet restore --packages ..\\packages\\',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Cds.CrmSvcUtil' }
                }
            },
            crmsvcutil_build_debug: {
                command: 'dotnet build .\\CloudSmith.Cds.CrmSvcUtil.csproj -c "Debug"',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Cds.CrmSvcUtil' }
                }
            },
            crmsvcutil_build_release: {
                command: 'dotnet build .\\CloudSmith.Cds.CrmSvcUtil.csproj -c "Release"',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Cds.CrmSvcUtil' }
                }
            },
            assemblyscanner_restore: {
                command: 'dotnet restore --packages ..\\packages\\',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Tools.AssemblyScanner' }
                }
            },
            assemblyscanner_build_debug: {
                command: 'dotnet build .\\CloudSmith.Tools.AssemblyScanner.csproj -c "Debug"',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Tools.AssemblyScanner' }
                }
            },
            assemblyscanner_build_release: {
                command: 'dotnet build .\\CloudSmith.Tools.AssemblyScanner.csproj -c "Release"',
                options: { 
                    async: false,
                    execOptions: { cwd: 'resources/tools/CloudSmith.Tools.AssemblyScanner' }
                }
            },
        },

        //  Clean
        clean: {
            temp: {
                src: ['out/temp']
            },
            temp_js: {
                src: ['out/temp/**/materialize*.*']
            },
            temp_ts: {
                src: ['out/temp/browser']
            }            
        },

        //  Watch Files
        watch: {
            js: {
                files: ['resources/framework/**/*.js'],
                tasks: ['js_compile'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            },

            sass: {
                files: ['resources/framework/**/*.scss'],
                tasks: ['sass_compile'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            },

            ts: {
                files: ['src/**/*.browser.ts'],
                tasks: ['ts_compile_browser'],
                options: {
                    interrupt: false,
                    spawn: false
                }
            }
        },

        //  Concurrent
        concurrent: {
            options: {
                logConcurrentOutput: true,
                limit: 10
            },
            monitor: {
                tasks: [
                    'sass_compile',
                    'js_compile',
                    'ts_compile_browser',
                    'watch:ts',
                    'watch:js',
                    'watch:sass',
                    'notify:watching'
                ]
            }
        },

        //  Notifications
        notify: {
            watching: {
                options: {
                    enabled: true,
                    message: 'Watching files',
                    title: 'CDS for Code', // defaults to the name in package.json, or will use project directory's name
                    success: true, // whether successful grunt executions should be notified automatically
                    duration: 1 // the duration of notification in seconds, for `notify-send only
                }
            },

            sass_compile: {
                options: {
                    enabled: true,
                    message: 'Sass files compiled',
                    title: 'CDS for Code',
                    success: true,
                    duration: 1
                }
            },

            js_compile: {
                options: {
                    enabled: true,
                    message: 'JS files compiled',
                    title: 'CDS for Code',
                    success: true,
                    duration: 1
                }
            },

            ts_compile_browser: {
                options: {
                    enabled: true,
                    message: 'TS files transpiled',
                    title: 'CDS for Code',
                    success: true,
                    duration: 1
                }
            },

            templates_compile: {
                options: {
                    enabled: true,
                    message: 'Templates zipped',
                    title: 'CDS for Code',
                    success: true,
                    duration: 1
                }
            },

            tools_compile: {
                options: {
                    enabled: true,
                    message: 'Tools built and zipped',
                    title: 'CDS for Code',
                    success: true,
                    duration: 1
                }
            }
        },

        // Text Replace
        replace: {
            version: {
                // Does not edit README.md
                src: ['package.json'],
                overwrite: true,
                replacements: [{
                    from: grunt.option('oldver'),
                    to: grunt.option('newver')
                }]
            },
            readme: {
                // Changes README.md
                src: ['README.md'],
                overwrite: true,
                replacements: [{
                    from: 'Release version: ' + grunt.option('oldver'),
                    to: 'Release version: ' + grunt.option('newver')
                }]
            }
        },

        // Create Version Header for files
        usebanner: {
            release: {
                options: {
                    position: 'top',
                    banner: '/*!\n * CloudSmith CDS for Code v' +
                        grunt.option('newver') +
                        ' (http://www.cloudsmithconsulting.com)\n * Copyright 2019 CloudSmith Consulting LLC\n * MIT License (https://raw.githubusercontent.com/CloudSmithConsulting/CDS-for-Code/master/LICENSE)\n */',
                    linebreak: true
                },
                files: {
                    src: ['out/**/*.css', 'out/**/*.js']
                }
            }
        }
    };

    grunt.initConfig(config);

    // load the tasks
    // grunt.loadNpmTasks('grunt-gitinfo');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-banner');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-rename-util');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-zip');

    // define the tasks
    grunt.registerTask('release', [
        'sass:release',
        'sass:release_min',
        'postcss:release',
        'postcss:release_min',
        'concat:release',
        'babel:release',
        'uglify:release',
        'usebanner:release',
        'replace:version',
        'replace:readme',
        'templates_compile',
        'tools_release',
        'copy:powershell',
        'clean:temp'
    ]);

    grunt.task.registerTask('configureBabel', 'configures babel options', function () {
        config.babel.dev.options.inputSourceMap = grunt.file.readJSON('out/temp/materialize_concat.js.map');
    });

    grunt.registerTask('js_compile', [ 'concat:dev', 'configureBabel', 'babel:dev', 'uglify:dev', 'clean:temp_js', 'notify:js_compile' ]);
    grunt.registerTask('sass_compile', [
        'sass:dev',
        'sass:release',
        'sass:release_min',
        'postcss:dev',
        'notify:sass_compile'
    ]);
    grunt.registerTask('ts_compile_browser', [ 'mkdir:dev', 'ts:browser', 'browserify:dev', 'clean:temp_ts', 'notify:ts_compile_browser' ]);
    grunt.registerTask('templates_compile', [ 'zip:SystemTemplates', 'zip:CloudSmith.Cds.SamplePlugin.v8.0', 'zip:CloudSmith.Cds.SamplePlugin.v8.1', 'zip:CloudSmith.Cds.SamplePlugin.v8.2', 'zip:CloudSmith.Cds.SamplePlugin.v9.0', 'notify:templates_compile' ]);
    grunt.registerTask('tools_compile', [ 'shell:crmsvcutil_restore', 'shell:crmsvcutil_build_debug', 'shell:assemblyscanner_restore', 'shell:assemblyscanner_build_debug' ]);
    grunt.registerTask('tools_release', [ 'shell:crmsvcutil_restore', 'shell:crmsvcutil_build_release', 'zip:CloudSmith.Cds.CrmSvcUtil', 'shell:assemblyscanner_restore', 'shell:assemblyscanner_build_release', 'zip:CloudSmith.Tools.AssemblyScanner', 'notify:tools_compile' ]);

    grunt.registerTask('monitor', [ 'concurrent:monitor' ]);
    grunt.registerTask('travis', [ 'ts_compile_browser', 'js_compile', 'sass_compile' ]);
};