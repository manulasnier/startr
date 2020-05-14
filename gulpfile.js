// GULP Config

// ENV
var dev = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

const { src, dest, series, parallel, watch } = require('gulp')
var less = require('gulp-less');
var noop = require("gulp-noop");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulpStylelint = require('gulp-stylelint');
var imagemin = require('gulp-imagemin');
var sourcemaps = dev ? require('gulp-sourcemaps') : null;
var uglify = !dev ? require('gulp-uglify') : null;

// PATH
const paths = {
    css: {
        entry: './src/less/style.less',
        src: './src/less/*.less',
        dest: './dist/css'
    },

    images: {
        src: './src/img/*',
        dest: './dist/images'
    },

    js: {
        src: './src/js/*.js',
        dest: './dist/js'
    },
    fonts: {
        src: './src/fonts/*',
        dest: './dist/fonts'
    },
}

// CSS
function csslint() {
    return src(paths.css.src)

    .pipe(gulpStylelint({
        failAfterError: false,
        reporters: [
            {formatter: 'verbose', console: true}
        ],
        debug: true
    }))
}

function styles() {
    return src(paths.css.entry)

    .pipe(sourcemaps ? sourcemaps.init() : noop())
    .pipe(less())
    .pipe(postcss())
    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(dest(paths.css.dest))
}

// IMAGES
function images() {
    return src(paths.images.src) 

    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 85, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))

    .pipe(dest(paths.images.dest))
}

// FONTS
function fonts() {
    return src(paths.fonts.src)
    .pipe(dest(paths.fonts.dest))
}

// JS
function scripts() {
    return src(paths.js.src)
    //.pipe(concat('all.js'))
    .pipe(uglify ? uglify() : noop())
    .pipe(dest(paths.js.dest))
}

// WATCH
function watchFiles() {
    watch(paths.css.src, { ignoreInitial: false }, series(csslint,styles))
    watch(paths.js.src, { ignoreInitial: false }, scripts)
    watch(paths.fonts.src, { ignoreInitial: false }, fonts)
    watch(paths.images.src, { ignoreInitial: false }, images)
}

// EXPORT TASK
module.exports = {
    default: parallel(
        series(csslint, styles),
        scripts,
        images,
        fonts
    ),

    onlycss: series(csslint,styles),

    watch: watchFiles
}
