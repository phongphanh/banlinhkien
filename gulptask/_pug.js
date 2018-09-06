import {task, src, dest} from 'gulp';
import pug from 'gulp-pug';
import fs from "fs";
import data from "gulp-data";
import jsonConcat from "gulp-json-concat";
import concat_json from "gulp-merge-json";
import gutil from 'gulp-util';
import _dirs from './_dirs'

let _jsonConcat = () => {
  return src([
    _dirs.data+'items/*.json'
  ])
  .pipe(concat_json({
    fileName:  'data.json'
  }))
  .pipe(dest(_dirs.data));
}

let _pug =  () => {
  return src('./src/*.pug')
    .pipe(data((file) => {
      return JSON.parse(
        fs.readFileSync(_dirs.data + 'data.json')
      );
    }))
    .pipe(pug({
      pretty: true
    }))
    .on('error', gutil.log)
    .pipe(dest(_dirs.public));
};

export {_pug, _jsonConcat};