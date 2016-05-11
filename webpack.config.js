var webpack = require('webpack');

module.exports = {
    // webpack options
    entry: "./src/index.js",
    output: {
        path: "dist/",
        filename: "jsfile-ooxml.js",
        library: ["JsFileOoxml"],
        libraryTarget: "umd"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },

    externals: [
        {
            "JsFile": {
                root: "JsFile",
                commonjs2: "JsFile",
                commonjs: "JsFile",
                amd: "JsFile"
            }
        }
    ],

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            screwIE8: true,

            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            }
        })
    ],

    stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
    },

    progress: false
};