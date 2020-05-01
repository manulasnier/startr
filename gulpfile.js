// GULP Config

var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
//var minifyImg = require('gulp-imagemin');
//var minifyCss= require('gulp-minify-css');
//var browserSync = require('browser-sync');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var gulpStylelint = require('gulp-stylelint');

// DIR
var src = './_dev';
var dist = './dist';

// LESS COMPILATOR
gulp.task('css', function () {
    return gulp.src(src + '/less/style.less')
    .pipe(sourcemaps.init())

    .pipe(gulpStylelint({
        failAfterError: true,
        reporters: [
            {formatter: 'verbose', console: true}
        ],
        debug: true
    }))

    .pipe(less())

    .pipe(postcss([
        autoprefixer()
    ]))

    .pipe(sourcemaps.write())
    .pipe(gulp.dest(dist + '/css/'));
});


// WATCHER
gulp.task('watch', function () {
    gulp.watch(src + '/less/style.less', 'css')
});
