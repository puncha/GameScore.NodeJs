"use restrict"

_ = require('lodash')
path = require('path')
fs = require('fs')

module.exports = (grunt)->

    SOURCE_FOLDER = "cloud/"
    BUILD_FOLDER = ".build/"

    grunt.initConfig(
        # Tasks
        #
        clean:
            build: BUILD_FOLDER
            deploy: [
                "cloud/vendor"
                "cloud/**/*.js"
            ]

        coffee: 
            options: 
                sourceMap: false
            build: 
                expand: true
                cwd: SOURCE_FOLDER
                src: "**/*.coffee"
                dest: BUILD_FOLDER
                ext: '.js'
            deploy: 
                expand: true
                src: ["cloud/**/*.coffee"]
                ext: '.js'

        copy:
            default:
                files: [
                    { src: ["node_modules/lodash/lodash.js"], dest: "cloud/vendor/lodash.js" }
                ]
            build:
                files: [
                    { expand: true, cwd: SOURCE_FOLDER, src: ["**"], dest: BUILD_FOLDER, filter: (file)->path.extname(file).toLowerCase() != ".coffee" }
                ]

        "string-replace":
            build:
                options:
                    replacements:[
                        pattern: /('|")cloud\//g
                        replacement: '$1./'
                    ]
                files: [
                    { expand: true, src: ["#{BUILD_FOLDER}**/*.js"] }
                ]
    )

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

    grunt.registerTask(
        "build",
        "compile the source files and store the output files to /.build/ folder",
        ["copy:default", "coffee:build", "copy:build", "string-replace:build"]);

    grunt.registerTask(
        "deploy",
        "generate the files for deploy",
        ["copy:default", "coffee:deploy"]);

