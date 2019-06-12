const Encore = require('@symfony/webpack-encore');

let publicPath = '/dist';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let pathsToClean = [
  'dist'
];

let cleanOptions = {
    root:     __dirname,
    verbose:  true,
    exclude: ['node_modules'],
    dry:      false,
    beforeEmit: true
};

Encore
    .disableSingleRuntimeChunk()
    .setOutputPath('dist/')
    .enableLessLoader(function(options) {
        options.relativeUrls = true;
    })

    .enableSourceMaps()
    .enablePostCssLoader(function(options) {
        options.config = {
            path: './postcss.config.js'
        };
    })

    .addStyleEntry('css/style', [
        './assets/less/style.less'
    ])

    .addEntry('js/app', './assets/js/app.js')

    .setPublicPath(publicPath)
    .setManifestKeyPrefix('dist/')

    // Clean folder /dist
    .addPlugin(new CleanWebpackPlugin(
        pathsToClean, cleanOptions
    ))

    // Copy images to destination
    .addPlugin(new CopyWebpackPlugin([{
        from: '_dev/img',
        to: 'images'
    }]))
;

// export the final configuration
const config = Encore.getWebpackConfig();

config.externals = {
    jquery: 'jQuery'
};

module.exports = config;

