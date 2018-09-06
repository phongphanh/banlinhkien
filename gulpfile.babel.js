'use strict';
import gulp from "gulp";
import babel from "gulp-babel";
import browserSync from "browser-sync";

import _dirs from './gulptask/_dirs';
import {_pug, _jsonConcat} from './gulptask/_pug';
import {_sass} from './gulptask/_sass';
import {_font} from './gulptask/_font';
import {_jscompress} from './gulptask/_jscompress';
import _syncfolder from './gulptask/_syncfolder';
import _showError from './gulptask/_showError';
import {_images} from './gulptask/_images';
import {_libs} from './gulptask/_libs';


//=======Task===========
gulp.task('pug', _pug);
gulp.task('sass', _sass);
gulp.task('font', _font);
gulp.task('jsonConcat', _jsonConcat);
gulp.task('syncfolder', _syncfolder);
// Minify
gulp.task('jscompress', _jscompress);
gulp.task('images', _images);
gulp.task('libs', _libs);

gulp.task('rebuild', ['pug', 'sass'], () => {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'pug' ], () => {
  browserSync({
    server: {
      baseDir: _dirs.public
    },
    notify: true
  });
});

gulp.task('watch', function (event) {
  console.log(event.type);
  gulp.watch(_dirs.sass+'**/*.scss', ['sass']);
  gulp.watch(_dirs.sass+'**/**/*.scss', ['sass']);
  gulp.watch(_dirs.sass+'/*.scss', ['sass', 'font']);
  gulp.watch('./src/**/*.pug', ['rebuild']);
  gulp.watch('./src/js/*.js', ['jscompress']);
  gulp.watch('./src/images/*', ['images']);
  gulp.watch('./src/libs/**', ['libs']);
  gulp.watch('./src/fonts/*', ['font']);
  gulp.watch('./src/_data/data.json', ['rebuild']);
  gulp.watch('./src/_data/items/*.json', ['jsonConcat','rebuild']);
});

gulp.task('build', [ 'sass', 'pug', 'jscompress', 'font']);

gulp.task('default', ['browser-sync', 'watch']);