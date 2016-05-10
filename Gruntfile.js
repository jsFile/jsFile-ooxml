var filesToValidate = [
    'src/**/*.js',
    'tests/unit/**/*.js'
];

module.exports = function (grunt) {
    grunt.initConfig({
        webpack: {
            app: require('./webpack.config.js')
        },
        eslint: {
            app: filesToValidate
        },
        blobify: {
            main: {
                options: {
                    target: 'global'
                },
                src: ['tests/files/**/*.*'],
                dest: 'tests/filesCache.js'
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'node_modules/jsfile/dist/workers/**/*.js'
                        ],
                        dest: 'dist/workers/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-eslint');
    grunt.loadNpmTasks('grunt-blobify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', [
        'copy',
        'eslint',
        'webpack'
    ]);
};