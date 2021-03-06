const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

// compress sass //

gulp.task('sass', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.sass'
  ])
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream());
}));

// move the files of javascript for works bootstrap //

gulp.task('js', gulp.series(() => {
  return gulp.src([
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js'
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
}));

// include font-awesome in our project!! //

gulp.task('awesome', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
}));

gulp.task('fonts', gulp.series(() => {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
}));

// server local with browser-sync //

gulp.task('serve',gulp.series( ['sass'], () => {
  browserSync.init({
    server: {
      baseDir:'./'
    }
  });
}));

gulp.watch([
  'node_modules/bootstrap/scss/bootstrap.min.scss',
  'src/scss/*.sass'
],gulp.parallel(['sass']));

gulp.watch('/*.html').on('change', browserSync.reload);


gulp.task('default', gulp.series(['js', 'serve', 'awesome', 'fonts']));
