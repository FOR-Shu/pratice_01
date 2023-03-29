const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');
const { optimize } = require('webpack');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/, loader: "handlebars-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
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

    plugins: [
        new MiniCssExtractPlugin(),
    ].concat(
        ["index", "about", "contactUs"].map(page => {
            return new HtmlWebpackPlugin({
                inject: 'body',
                title: `${page} page`,
                filename: `${page}.html`,
                template: `view/${page}.hbs`,
            })
        })
    ),

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