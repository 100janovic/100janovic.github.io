var gulp = require('gulp');
var concatCss = require('gulp-concat-css');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var path = require('path');
var newer = require('gulp-newer');


gulp.task('copy', function() {
    var fileFilter = filter(function(file) {
        return file.stat.isFile();
    });
    return gulp.src([
            path.join('./app/', '/**/*'),
            path.join('!' + './app/', '/**/*.{html,js,scss,css}')
        ])
        .pipe(fileFilter)
        .pipe(newer('../dist'))
        .pipe(gulp.dest(path.join('../dist', '/')));
});




gulp.task('build', ['copy'], function() {
    return gulp.src('app/index.html')
        .pipe(usemin({
            js: [],
            js1: []
        }))
        .pipe(gulp.dest('../dist/'));
});


// Static Server + watching scss/html files
gulp.task('serve', ['scss'], function() {

    browserSync.init({
        server: "./app/"
    });

    gulp.watch("app/scss/*.scss", ['scss']);
    gulp.watch("app/js/*.js").on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});


// auto-inject into browsers
gulp.task('scss', function() {
    return gulp.src(['app/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/css/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
