var gulp          = require('gulp');
var browserify    = require('browserify');
var watchify      = require('watchify');
var source        = require('vinyl-source-stream');
var handleErrors  = require('../util/handle-errors');
var config        = require('../config');
var src           = config.src;
var dst           = config.dst;
var log           = require('../util/log')('scripts');

var props = {
	entries: [src + '/js/main.js'],
	cache: {},
	packageCache: {},
	fullPaths: false,
}

function init(){

	var bundler = watchify(browserify(props));

	function rebundle(){
		return bundler.bundle()
			.on('error', handleErrors)
			.pipe(source('main.js'))
			.pipe(gulp.dest(dst + '/js'))
			.on('end', function(){
				log('Browserify bundled');
			});
	}

	bundler.on('update', function(){
		log('Rebundling');
		rebundle();
	});

	return rebundle();
	
}

function task(){

	console.log('Task Scripts...');

	return browserify(props).bundle()
		.pipe(source('main.js'))
		.pipe(gulp.dest(dst + '/js'));


}

gulp.task('scripts', init);
module.exports = init;