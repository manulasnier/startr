// GULP 4 Config

// ENV
var dev = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

const { src, dest, series, parallel, watch } = require('gulp')
var less = require('gulp-less');
var noop = require("gulp-noop");
var del = require("del");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gulpStylelint = require('gulp-stylelint');

// ONLY FOR DEV
var sourcemaps = dev ? require('gulp-sourcemaps') : null;

// ONLY FOR PROD
var imagemin = !dev ? require('gulp-imagemin') : null;
var uglify = !dev ? require('gulp-uglify') : null;
var rev = !dev ? require('gulp-rev') : null;
var revRewrite = !dev ? require('gulp-rev-rewrite') : null;
var cssnano = !dev ? require('cssnano') : null;

// PATH
const paths = {
    todel: './dist/**',
    dest: './dist',
    manifest: 'dist/manifest.json',

    css: {
        entry: [
            './src/less/app.less'
        ],
        src: './src/less/*.less',
        dest: './dist/css'
    },

    images: {
        src: './src/img/*',
        dest: './dist/img'
    },

    js: {
        src: './src/js/*.js',
        dest: './dist/js'
    },
    fonts: {
        src: './src/fonts/*.{woff,woff2}',
        dest: './dist/fonts'
    },
}

// CLEAN BEFORE BUILD
function cleanDist() {
    return del(paths.todel);
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
    .pipe(rev ? rev() : noop())
    .pipe(dest(paths.css.dest))
    .pipe(rev ? rev.manifest(paths.manifest, {
        merge: true,
        base: paths.dest
    }) : noop())
    .pipe(rev ? dest(paths.dest) : noop())
}

// IMAGES
function images() {
    return src(paths.images.src)

    .pipe(imagemin ? imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 85, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]) : noop())

    .pipe(rev ? rev() : noop())
    .pipe(dest(paths.images.dest))
    .pipe(rev ? rev.manifest(paths.manifest, {
        merge: true,
        base: paths.dest
    }) : noop())
    .pipe(rev ? dest(paths.dest) : noop())
}

// FONTS
function fonts() {
    return src(paths.fonts.src)
    .pipe(rev ? rev() : noop())
    .pipe(dest(paths.fonts.dest))
    .pipe(rev ? rev.manifest(paths.manifest, {
        merge: true,
        base: paths.dest
    }) : noop())
    .pipe(rev ? dest(paths.dest) : noop())
}

// JS
function scripts() {
    return src(paths.js.src)
    //.pipe(concat('all.js'))
    .pipe(uglify ? uglify() : noop())
    .pipe(rev ? rev() : noop())
    .pipe(dest(paths.js.dest))
    .pipe(rev ? rev.manifest(paths.manifest, {
        merge: true,
        base: paths.dest
    }) : noop())
    .pipe(rev ? dest(paths.dest) : noop())
}

// REWRITE ASSETS CSS WITH HASH
function rewrite() {
    const manifest = src('dist/manifest.json');

    return src('dist/css/*.css')
    .pipe(revRewrite({ manifest }))
    .pipe(dest('dist/css'));
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
    // BUILD
    default: series(
        cleanDist,
        csslint,
        styles,
        scripts,
        fonts,
        images,
        rewrite
    ),

    // DEV
    dev: series(
        cleanDist,
        parallel(
            series(csslint,styles),
            scripts,
            fonts,
            images
        )
    ),

    // WATCH
    watch: series(cleanDist, watchFiles)
}
