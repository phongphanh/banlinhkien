import fs from 'fs';
import gulp, {src, dest} from 'gulp';
import pug from 'gulp-pug';
import imagemin from 'gulp-imagemin';

let _images = () => {
  src('src/images/*')
    .pipe(imagemin())
    .pipe(dest(`./public/images/`));
}

export {_images}

