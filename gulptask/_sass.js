import {src, dest} from 'gulp';
import sass from "gulp-sass";
import prefix from "gulp-autoprefixer";
import dirs from './_dirs'
import rename from "gulp-rename";
import browserSync from "browser-sync";
import stripCssComments from "gulp-strip-css-comments";
import gutil from 'gulp-util';
import cssbeautify from "gulp-cssbeautify";

let _sass = () => {
  return src(dirs.sass + '*.scss')
    .pipe(sass({
      includedirs: [dirs.sass],
    }))
    .on('error', gutil.log)
    .pipe(prefix({
      browsers: ["last 50 versions", "ie >= 9"],
      cascade: false
    }))
    //rename
    .pipe(rename('style.css'))
    //.pipe(stripCssComments())
    .pipe(cssbeautify({
        indent: '  ',
        autosemicolon: true
    }))
    .pipe(dest(dirs.public))
    .pipe(browserSync.reload({
      stream: true
    }));
}

export {_sass}