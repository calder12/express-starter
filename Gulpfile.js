'use strict';

// Include Gulp and plugins
var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

// Include additional tools
var runSequence = require('run-sequence');

gulp.task('images:compress', function() {
  return gulp.src(['public/assets/vendor/img/**/*', 'public/assets/src/img/**/*'])
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest('public/assets/dist/img'))
    .pipe($.size({title: 'images:compress'}));
});

gulp.task('images:svg', function() {
  return gulp.src(['public/assets/src/svg/**/*'])
    .pipe($.imagemin({
      multipass: true,
      svgoPlugins: [
        { removeViewBox: true },
        { removeUselessStrokeAndFill: true },
        { removeEmptyAttrs: true }
      ]
    }))
    .pipe(gulp.dest('public/assets/dist/svg'));
});

gulp.task('images:svg2png', function() {
  return gulp.src(['public/assets/dist/svg/**/*'])
    .pipe($.svg2png())
    .pipe(gulp.dest('public/assets/dist/img'));
});

gulp.task('images', function(next) {
  return runSequence(['images:svg', 'images:compress'], next);
});

gulp.task('styles:compile', function() {
  return gulp.src(['public/assets/vendor/scss/**/*.scss', 'public/assets/src/scss/**/*.scss'])
    .pipe($.sass())
    .pipe(gulp.dest('public/assets/src/css'))
    .pipe($.size({title: 'styles:compile'}));
});

gulp.task('styles:compress', function() {
  return gulp.src(['public/assets/vendor/css/**/*.css', 'public/assets/src/css/**/*.css'])
    .pipe($.concatCss('main.css'))
    .pipe($.autoprefixer('last 1 versions'))
    .pipe($.rename('main.min.css'))
    .pipe($.csso())
    .pipe(gulp.dest('public/assets/dist/css'))
    .pipe($.size({title: 'styles:compress'}));
});

gulp.task('styles', function(next) {
  return runSequence('styles:compile', 'styles:compress', next);
});

gulp.task('scripts:compress', function() {
  return gulp.src([
      'public/assets/vendor/js/**/*.js',
      'public/assets/src/js/**/*.js'
    ])
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat('main.min.js'))
    .pipe($.uglify())
    .pipe($.chmod(755))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/assets/dist/js'))
    .pipe($.size({title: 'scripts:compress'}));
});

gulp.task('iescripts:compress', function() {
  return gulp.src([
      'public/assets/src/ie/js/**/*.js'
    ])
    .pipe($.sourcemaps.init({loadMaps: true}))
    .pipe($.concat('ie.min.js'))
    .pipe($.uglify())
    .pipe($.chmod(755))
    .pipe($.sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/assets/dist/ie/js'))
    .pipe($.size({title: 'scripts:compress'}));
});

gulp.task('ie2scripts:move', function() {
  return gulp.src([
      'public/assets/src/ie/js/selectivizr-min.js'
    ])
    .pipe(gulp.dest('public/assets/dist/ie/js'))
    .pipe($.size({title: 'scripts:compress'}));
});

gulp.task('scripts', function(next) {
  return runSequence('scripts:compress','iescripts:compress', 'ie2scripts:move', next);
});

gulp.task('fonts:move', function() {
  return gulp.src('public/assets/src/fonts/**/*')
    .pipe(gulp.dest('public/assets/dist/fonts'));
});

gulp.task('fonts', function(next) {
  return runSequence('fonts:move', next);
});

/**
 * Run images
 * Run styles, scripts, and fonts in parallel
 * Run callback function
 */
gulp.task('build', function(next) {
  return runSequence('images', ['styles', 'scripts', 'fonts'], next);
});

gulp.task('default', function() {
  gulp.start('build', function() {
    gulp.watch('public/assets/vendor/js/**/*.js', ['scripts']);
    gulp.watch('public/assets/src/js/**/*.js', ['scripts']);
    gulp.watch('public/assets/src/ie/js/**/*.js', ['scripts']);
    gulp.watch('public/assets/vendor/css/**/*.css', ['styles']);
    gulp.watch('public/assets/vendor/scss/**/*.scss', ['styles']);
    gulp.watch('public/assets/src/scss/**/*.scss', ['styles']);
    gulp.watch('public/assets/vendor/img/**/*', ['images']);
    gulp.watch('public/assets/src/img/**/*', ['images']);
    gulp.watch('public/assets/src/svg/**/*', ['images']);
    gulp.watch('public/assets/src/fonts/**/*', ['fonts']);

  });
});
