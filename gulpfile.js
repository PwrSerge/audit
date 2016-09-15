'use strict'

const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// es6 transpiling and bundling task
gulp.task('es6', () => {
    browserify('src/app.js')
      .transform('babelify' , {
          presets: ['es2015']
        })
      .bundle()
      .pipe(source('apps.js'))
      .pipe(buffer())
      .pipe(gulp.dest('build/'));
  });

gulp.task('default', ['es6'], () => {
  gulp.watch('src/app.js', ['es6']);
});
