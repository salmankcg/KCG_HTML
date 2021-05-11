var path         = require('path');
var less         = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var gulp         = require('gulp');
var handleErrors = require('../util/handle-errors');
var config       = require('../config');
var modConf      = config.styles;
var src          = config.src;
var dst          = config.dst;
var chalk        = require('chalk');
var log          = require('../util/log')('styles');
var plumber      = require('gulp-plumber');

function init(){

	log('Compiling '+chalk.green('main.css'));

	var sourcemaps = config.styles.sourcemaps;

	return gulp.src(path.join(src, 'less', 'main.less'))
		.pipe(plumber())
		.pipe(less({
			paths: [path.join('bower_components')],
			sourceMap: sourcemaps,
			outputSourceFiles: true,
		}))
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7']))
		.pipe(gulp.dest(path.join(dst, 'css')));

}

gulp.task('styles', init);
module.exports = init;