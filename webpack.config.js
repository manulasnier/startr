// Webpack 5 Config

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

// ENV
const devMode = process.env.NODE_ENV !== 'production';

let config = {
    mode: devMode ? "development" : "production",

    watchOptions: {
        ignored: ["node_modules/**"]
    },

    devtool: devMode ? "source-map" : false,

    entry: {
        startrless: [
            './startr.less'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'test/dist'),
        publicPath: '',
        filename: '[name].js',
        assetModuleFilename: '[name][ext][query]'
    },

    module: {
        rules: [

            // STYLES
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: devMode ? true : false
                        }
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: devMode ? true : false
                        }
                    },
                ]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name]-min.css',
        }),
        new StylelintPlugin({
            configFile: '.stylelintrc',
            context: 'less',
            files: '*.less',
            failOnError: true,
            quiet: false,
            emitErrors: true
        }),
    ].filter(Boolean)
};

module.exports = config;

