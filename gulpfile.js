'use strict'

const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');

// es6 transpiling and bundling task
gulp.task('es6', (done) => {
    browserify('src/app.js')
      .transform('babelify' , {
          presets: ['es2015']
        })
      .bundle()
      .pipe(source('apps.js'))
      .pipe(buffer())
      .pipe(gulp.dest('build/'));
    done();
  });

/* ============================================================================
     BROWSER_SYNC
============================================================================= */
gulp.task('browser-sync', () => {
    browserSync.init(null, {
        server: {
            baseDir: './'
          }
      });
  });
/* ==========================================================================
     WATCH
============================================================================= */

gulp.task('watch', gulp.series('browser-sync', () => {
  let jswatcher = gulp.watch('*/src/app.js');
  jswatcher.on('change', (event, path, stats) => {
    //browserSync.reload();
    // console.log(`
    //   file ${path} was ${event}, running tasks...`
    // );
    console.log(path);
  });
}));

/* =============================================================================
       TASKS
==============================================================================*/

gulp.task('default', gulp.series('es6', 'watch', (done) => {
    done();
  }));
