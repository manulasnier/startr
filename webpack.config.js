// Webpack 5 Config

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const options = {
    // MANIFEST - fix wrong path src/img to copyPlugin
    seed: {},
    generate: (seed, files) => {
        const RX_IMG = /.(png|svg|jp(e)?g|gif)(\?[a-z0-9=\.]+)?$/;

        return files.reduce((manifest, { name, path }) => {
            if (name.match(RX_IMG)) {
                return {
                    ...manifest,
                    [name.replace('src/img/', '')]: path
                };
            } else return {
                ...manifest,
                [name]: path
            };
        }, seed);
    }
};

// ENV
const devMode = process.env.NODE_ENV !== 'production';

let config = {
    mode: devMode ? "development" : "production",

    watchOptions: {
        ignored: ["node_modules/**"]
    },

    devtool: devMode ? "source-map" : false,

    entry: {
        app: [
            './src/js/app.js',
            './src/less/app.less'
        ]
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '',
        filename: devMode ? '[name].js' : '[name]-[contenthash].js'
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
            },

            // IMAGES
            {
                test: /.(png|svg|jp(e)?g|gif)(\?[a-z0-9=\.]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: devMode ? '[name].[ext]' : '[name]-[contenthash].[ext]',
                        esModule: false,
                    }
                }]
            },

            // FONTS
            {
                test: /.(woff(2)?)(\?[a-z0-9=\.]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: devMode ? '[name].[ext]' : '[name]-[contenthash].[ext]',
                    }
                }]
            }
        ]
    },

    plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name]-[contenthash].css',
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: './src/img/*',
                    to: devMode ? '[name].[ext]' : '[name]-[contenthash].[ext]'
                }
            ],
            options: {
                concurrency: 100
            },
        }),

        new StylelintPlugin({
            configFile: '.stylelintrc.js',
            context: 'src',
            files: '**/*.less',
            failOnError: false,
            quiet: false,
            emitErrors: true
        }),

        !devMode ? new ImageMinimizerPlugin({
            minimizerOptions: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['mozjpeg', { progressive: true, quality: 80 }],
                    ['optipng', { optimizationLevel: 5 }],
                    ['svgo',{
                        plugins: [
                            {
                              removeViewBox: false,
                            },
                        ],
                    }]
                ]
            }
        }) : false,

        !devMode ? new ImageMinimizerPlugin({
            test: /\.(png|jp(e)g)$/i,
            filename: '[name]-[contenthash].webp',
            minimizerOptions: {
                plugins: ['imagemin-webp']
            }
        }) : false,

        new WebpackManifestPlugin(options)
    ].filter(Boolean)
};

module.exports = config;

