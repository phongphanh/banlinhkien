import fs from 'fs';
import gulp, {src, dest} from 'gulp';
import pug from 'gulp-pug';

const isDirectory = source => fs.lstatSync(source).isDirectory();

let _libs = () => {
	if (!fs.existsSync(`./public/libs`)) {
	  fs.mkdirSync(`./public/libs`);
	}
	src(['./src/libs/**/*']).pipe(gulp.dest('./public/libs'));
}

export {_libs}

