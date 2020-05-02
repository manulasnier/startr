// GULP Config

// ENV
var dev = ((process.env.NODE_ENV || 'development').trim().toLowerCase() === 'development');

var gulp = require('gulp');
var less = require('gulp-less');
var noop = require("gulp-noop");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var gulpStylelint = require('gulp-stylelint');
var imagemin = require('gulp-imagemin');
var sourcemaps = dev ? require('gulp-sourcemaps') : null;
var uglify = dev ? require('gulp-uglify') : null;

// DIR
var src = './src/';
var dist = './dist/';

// CSS
gulp.task('css', function () {
    return gulp.src(src + 'less/style.less')

    .pipe(gulpStylelint({
        failAfterError: true,
        reporters: [
            {formatter: 'verbose', console: true}
        ],
        debug: true
    }))

    .pipe(sourcemaps ? sourcemaps.init() : noop())

    .pipe(less())
    .pipe(postcss())

    .pipe(sourcemaps ? sourcemaps.write() : noop())
    .pipe(gulp.dest(dist + 'css/'));
});

// IMAGES
gulp.task('images', function () {
    return gulp.src(src + 'img/*.+(png|jpg|gif|svg)')

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

    .pipe(gulp.dest(dist + 'images/'));
});

// FONTS
gulp.task('fonts', function () {
    return gulp.src(src + 'fonts/*.+(woff|woff2)')
    .pipe(gulp.dest(dist + 'fonts/'));
});

// JS
gulp.task('js', function () {
    return gulp.src(src + 'js/app.js')

    //.pipe(concat('all.js'))
    .pipe(uglify ? uglify() : noop())
    .pipe(gulp.dest(dist + 'js/'));
});

// TASKS
gulp.task('default', gulp.parallel('images','css','fonts','js'));

// WATCHER CSS
gulp.task('watch', function() {
    gulp.watch(src + 'less/style.less', gulp.series('css'));
});
