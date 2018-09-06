import {src, dest} from 'gulp';
import dirs from './_dirs'
import concat from "gulp-concat";
import minify from "gulp-minify";
import fs from 'fs';


let _jscompress = () => {
  if (!fs.existsSync(`./public/js`)) {
    fs.mkdirSync(`./public/js`);
  }
  src([
      `${dirs.js}/services.js`,
      `${dirs.js}/script.js`
    ])
    .pipe(concat('bundle.js'))
    .pipe(minify({
      ext: {
        src: '-debug.js',
        min: '.js'
      },
      exclude: ['tasks'],
      ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(dest('./public/js')
  );
}

export {_jscompress}