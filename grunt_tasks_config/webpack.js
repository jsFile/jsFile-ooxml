module.exports = function (grunt) {
    return {
        app: {
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
                        loader: 'babel',
                        query: {
                            stage: 0
                        }
                    }
                ]
            },

            externals: [
                {
                    "jsfile": {
                        root: "JsFile",
                        commonjs2: "JsFile",
                        commonjs: "JsFile",
                        amd: "JsFile"
                    }
                }
            ],

            stats: {
                // Configure the console output
                colors: false,
                modules: true,
                reasons: true
            },

            progress: false
        }
    };
};