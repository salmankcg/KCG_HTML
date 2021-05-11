var gulp    = require('gulp');
var changed = require('gulp-changed');
var path    = require('path');
var chalk   = require('chalk');
var log     = require('../util/log')('copy');
var config  = require('../config');
var src     = config.src;
var dst     = config.dst;

module.exports = function(from, to){

	return function(){

		var fromN = from.replace(src, '');
		var toN = to ? to.replace(dst, '') : null;
		var srcPath = path.join(src, fromN);
		var mirror = path.dirname(fromN).replace(/\*/g,'');
		var dstPath = path.join(dst, toN || mirror);

		log('Copied ' + chalk.green(srcPath) + ' to ' + chalk.green(dstPath));

		return gulp.src(srcPath)
			.pipe(changed(dstPath))
			.pipe(gulp.dest(dstPath));
			
	}

}