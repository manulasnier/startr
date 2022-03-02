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
    map: f => {
        f.name = f.name.replace('-webp','.webp');
        return f;
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
            './js/app.js',
            './less/app.less'
        ]
    },

    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '',
        filename: devMode ? '[name].js' : '[name]-[contenthash].js',
        assetModuleFilename: devMode ? '[name][ext][query]' : '[name]-[contenthash][ext][query]'
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

            // FONTS - IMAGES
            {
                test: /\.(jpe?g|png|gif|svg|woff(2)?)$/i,
                type: "asset/resource"
            }
        ]
    },

    optimization: {
        minimizer: [

            !devMode ? new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['mozjpeg', { progressive: true, quality: 80 }],
                            ['optipng', { optimizationLevel: 5 }],
                            ['svgo'],
                        ],
                    },
                },

                generator: [
                    {
                        type: "asset",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        }
                    },

                    {
                        preset: "webp",
                        implementation: ImageMinimizerPlugin.imageminGenerate,
                        options: {
                            plugins: ["imagemin-webp"],
                        }
                    }
                ],

                deleteOriginalAssets: false,

            })  : '...',
        ]
    },

plugins: [
        new CleanWebpackPlugin(),

        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name]-[contenthash].css',
        }),

        new StylelintPlugin({
            configFile: '.stylelintrc.js',
            context: 'less',
            files: '*.less',
            failOnError: false,
            quiet: false,
            emitErrors: true
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: './img/*',
                    to: devMode ? '[name][ext]' : '[name]-[contenthash][ext]'
                }
            ],
            options: {
                concurrency: 100
            },
        }),

        new WebpackManifestPlugin(options)
    ].filter(Boolean)
};
