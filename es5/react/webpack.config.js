const path = require('path');
module.exports = {
    entry: ['babel-polyfill', 'react',
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
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }],
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    /*
     plugins: [
        // https://webpack.js.org/plugins/provide-plugin/
        new webpack.ProvidePlugin({
            'utils': 'utils'
        })
    ],
    */
    output: {
        path: path.resolve(__dirname, 'wwwroot/dist/'),
        filename: "bundle.js",
        publicPath: "/dist/"
    },
    devtool:"eval-source-map"
};