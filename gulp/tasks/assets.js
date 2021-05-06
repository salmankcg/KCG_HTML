var _       = require('lodash');
var gulp    = require('gulp');
var copy = require('../util/copy');
var config  = require('../config');
var src     = config.src;
var dst     = config.dst;
var assets  = config.assets;
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');
var gulpif  = require('gulp-if');
var chalk   = require('chalk');
var log     = require('../util/log')('assets');

function init(){

	_.forEach(assets, function(item, i){

		var from = item.from;
		var fromIsArray = _.isArray(from);
		var fromIsGlob = _.isString(from);

		var to = item.to;
		var toIsArray = _.isArray(to);
		var toIsFile = hasExt(to);
		var toIsFolder = _.isString(to) && !hasExt(to);

		/*console.log('Asset.', {
			fromIsGlob: fromIsGlob,
			fromIsArray: fromIsArray,
			toIsArray: toIsArray,
			toIsFile: toIsFile,
			toIsFolder: toIsFolder,
		});*/

		if (fromIsArray && toIsFile) {
			concatTo(from, to);
		}

		else if (fromIsGlob && toIsFolder) {
			copyGlobTo(from, to);
		}

		else if (fromIsArray && (toIsFolder || !to)) {
			copyArrayTo(from, to);
		}
		
	});

}

function hasExt(str){
	return typeof str == 'string' && str.lastIndexOf('.') > 1;
}

function concatTo(src, dst){

	var splitFolder = dst.split('/');
	var filename = splitFolder.pop();
	var dstFolder = splitFolder.join('/');
	var ext = filename.split('.').slice(-1)[0];

	log('Concatenated files into ' + chalk.green(filename));

	gulp.src(src)
		.pipe(gulpif(ext == 'js', uglify()))
		.pipe(concat(filename))
		.pipe(gulp.dest(dstFolder));

}

function copyGlobTo(from, to){

	copy(from, to)();

}

function copyArrayTo(from, to){

	from.forEach(function(item){
		copy(item, to)();
	});

}

module.exports = init;
gulp.task('assets', init);