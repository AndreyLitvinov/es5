const path = require('path');
module.exports = {
    entry: ['babel-polyfill',
        './app/index.js'],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        babelrc: false,
                        presets: ['@babel/preset-env']
                    }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist/'),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    devtool:"eval-source-map"
};