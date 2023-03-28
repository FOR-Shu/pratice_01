const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const { optimize } = require('webpack');

module.exports = {
    entry: './src/index.ts', // change
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/, loader: "handlebars-loader"
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',  // change
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },

    plugins: [new HtmlWebpackPlugin({
        title: 'main page',
        filename: 'index.html',
        template: 'view/index.hbs',
    })],

    devtool: "inline-source-map",
    devServer: {
        static: "./dist",
        hot: true,
    },
    optimization: {
        runtimeChunk: "single"
    },

    mode: "development",
};