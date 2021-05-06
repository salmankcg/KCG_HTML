var changed  = require('gulp-changed');
var gulp     = require('gulp');
var imagemin = require('gulp-imagemin');
var config   = require('../config');
var src      = config.src;
var dst      = config.dst;
var chalk    = require('chalk');
var log      = require('../util/log');
var plumber  = require('gulp-plumber');

function init(){

	log('images', 'Compied and optmized images');

	return gulp.src(src + '/img/**/*.{jpg,jpeg,png,gif,svg}')
		.pipe(plumber())
		.pipe(changed(dst + '/img'))//Ignore unchanged files
		.pipe(imagemin())//Optimize
		.pipe(gulp.dest(dst + '/img'));

}

gulp.task('images', init);
module.exports = init;