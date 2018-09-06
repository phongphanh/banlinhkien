import fs from 'fs';
import gulp, {src, dest} from 'gulp';
import pug from 'gulp-pug';
import data from "gulp-data";
import _dirs from './_dirs'
import sass from "gulp-sass";
import prefix from "gulp-autoprefixer";
import rename from "gulp-rename";
import browserSync from "browser-sync";
import stripCssComments from "gulp-strip-css-comments";
import cssbeautify from "gulp-cssbeautify";
import gutil from 'gulp-util';
import {join} from 'path';

const isDirectory = source => fs.lstatSync(source).isDirectory();

export default () => {
  fs.readdirSync('./src/sourcetree/').map(file => {
    if(!fs.existsSync(`./public/${file}`)){
      fs.mkdirSync(`./public/${file}`);
    }
    fs.readdirSync(`./src/sourcetree/${file}`).filter(item => isDirectory(`./src/sourcetree/${file}/${item}`)).map(i => {
      if(!fs.existsSync(`./public/${file}/${i}`)){
        fs.mkdirSync(`./public/${file}/${i}`);
      }
      src([`./src/sourcetree/${file}/${i}/*`, `!./src/sourcetree/${file}/${i}/*.pug`]).pipe(dest(`./public/${file}/${i}`));
    });
    src(`./src/sourcetree/${file}/column/*.pug`)
      .pipe(data((file) => {
        return JSON.parse(
          fs.readFileSync(_dirs.data + 'data.json')
        );
      }))
      .pipe(pug({
        pretty: true
      }))
      .on('error', gutil.log)
      .pipe(dest(`./public/${file}/column/`));

    src(`./src/sourcetree/${file}/column/monthly/*.pug`)
      .pipe(data((file) => {
        return JSON.parse(
          fs.readFileSync(_dirs.data + 'data.json')
        );
      }))
      .pipe(pug({
        pretty: true
      }))
      .on('error', gutil.log)
      .pipe(dest(`./public/${file}/column/monthly/`));

    src(`./src/sourcetree/${file}/column/other/*.pug`)
      .pipe(data((file) => {
        return JSON.parse(
          fs.readFileSync(_dirs.data + 'data.json')
        );
      }))
      .pipe(pug({
        pretty: true
      }))
      .on('error', gutil.log)
      .pipe(dest(`./public/${file}/column/other/`));

    src(`./src/sourcetree/${file}/column/css/*.scss`)
      .pipe(sass({
        includedirs: [_dirs.sass],
      }))
      .on('error', gutil.log)
      .pipe(prefix({
        browsers: ["last 50 versions", "ie >= 9"],
        cascade: false
      }))
      //rename
      .pipe(rename('style.css'))
      .pipe(stripCssComments())
      .pipe(cssbeautify({
          indent: '  ',
          autosemicolon: false
      }))
      .pipe(dest(`./public/${file}/column/css`))
      .pipe(browserSync.reload({
        stream: true
      }));
  });
}

