"use strict";

var gulp    = require('gulp'),
  concat    = require('gulp-concat'),
  uglify    = require('gulp-uglify'),
  rename    = require('gulp-rename'),
  cssmin    = require('gulp-minify-css'),
  concatCss = require('gulp-concat-css'),
    maps    = require('gulp-sourcemaps'),
     del    = require('del');

gulp.task("concatScripts", function() {
    return gulp.src([
        'js/js_plugin/jquery.js',
        'js/js_plugin/typeit.js',
        'js/js_plugin/bootstrap.js',
        'js/js_plugin/particles.js',
        'js/main.js'
        ])
    .pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("concatCss", function() {
    return gulp.src([
        'css/bootstrap.css',
        'css/main.css'
        ])
    .pipe(maps.init())
    .pipe(concat('style.css'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('css'));
});



gulp.task('minifyCSS', ["concatCss"],function() {
  return gulp.src("css/style.css")
      .pipe(cssmin())
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('css/main.css', ['concatCss']);
  gulp.watch('js/main.js', ['concatScripts']);
})

gulp.task('clean', function() {
  del(['dist', 'css/style*.css*', 'js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'minifyCSS'], function() {
  return gulp.src(["css/style.min.css", "js/app.min.js", 'index.html',
                   "img/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});
