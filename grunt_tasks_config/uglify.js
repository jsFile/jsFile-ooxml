module.exports = function () {
    return {
        options: {
            compress: true,
            report: false
        },
        engine: {
            'src': 'dist/jsfile-ooxml.js',
            'dest': 'dist/jsfile-ooxml.min.js'
        }
    };
};