const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 600,
        ignored: /node_modules/,
    },
    mode: 'development',
    entry: './src/script.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
    ]
};