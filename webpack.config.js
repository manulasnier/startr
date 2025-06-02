// Webpack 5 Config

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
            './src/startr.less'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
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

        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),

        new StylelintPlugin({
            configFile: '.stylelintrc.js',
            context: 'less',
            files: '*.less',
            failOnError: true,
            quiet: false,
            emitErrors: true
        }),
    ].filter(Boolean)
};

module.exports = config;

