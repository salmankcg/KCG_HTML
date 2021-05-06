var _           = require('lodash');
var gulp        = require('gulp');
var stream      = require('event-stream');
var nunjucks    = require('gulp-nunjucks-render');
var prettify    = require('gulp-html-prettify');
var config      = require('../config');
var src         = config.src;
var dst         = config.dst;
var path        = require('path');
var plumber     = require('gulp-plumber');
var log         = require('../util/log')('markup');

var nunjucksEnv = nunjucks.nunjucks.configure([src]);
//require('../util/nunjucks-filters')(nunjucksEnv);//Filters

function init(page){

	//Render specific page
	if (typeof page == 'string' && path.extname(page) == '.html') {

		var source =  './' + page.replace(/\\/g, '/');
		var preDest = path.join(dst, source.replace('./app', '')).split('\\');
		preDest.pop();
		var destination = preDest.join('/');
		log('Rendering page: ' + source);

	}

	//Render all pages
	else {

		var source = src + '/**/*.html';
		var destination = dst;
		log('Rendering pages');

	}

	gulp.src([source])
	.pipe(plumber())
	.pipe(nunjucks(config))
	.pipe(removeDoubleLines())
	.pipe(prettify({
		indent_char: '	',
		indent_size: 1,
		preserve_newlines: false,
		max_preserve_newlines: 0,
		wrap_line_length: 0,
	}))
	.pipe(gulp.dest(destination));

}

function task(){

	log('Rendering pages');

	gulp.src([
		src + '/**/*.html',
	])
	.pipe(plumber())
	.pipe(nunjucks(config))
	.pipe(removeDoubleLines())
	.pipe(prettify({
		indent_char: '	',
		indent_size: 1,
		preserve_newlines: false,
		max_preserve_newlines: 0,
		wrap_line_length: 0,
	}))
	.pipe(gulp.dest(dst));

}

function removeDoubleLines(){

	return stream.map(function transform(file, cb){
		file.contents = new Buffer(
			String(file.contents).replace(/\n\s*\n/g, '\n').trim()
		);
		cb(null, file);
	});

}

gulp.task('markup', task);
module.exports = task;