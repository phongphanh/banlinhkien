import {src, dest} from 'gulp';
import sass from "gulp-sass";
import prefix from "gulp-autoprefixer";
import dirs from './_dirs'
import rename from "gulp-rename";
import browserSync from "browser-sync";
import showError from './_showError';
import gutil from 'gulp-util';

let _font = () => {
  src([
    'src/fonts/*.ttf',
    'src/fonts/*.eot',
    'src/fonts/*.svg',
    'src/fonts/*.woff'
    ])
    .pipe(dest(`./public/fonts/`));

  src('src/fonts/fonts.scss')
    .pipe(sass({
      includedirs: [dirs.sass],
    }))
    .on('error', gutil.log)
    .pipe(prefix({
      browsers: ["last 50 versions", "ie >= 9"],
      cascade: false
    }))
    //rename
    .pipe(rename('fonts.css'))
    .pipe(dest(dirs.fonts))
    .pipe(browserSync.reload({
      stream: true
    }));
};

export {_font}