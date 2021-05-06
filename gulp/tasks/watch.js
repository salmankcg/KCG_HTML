var gulp      = require('gulp');
var log       = require('../util/log')('watch');
var config    = require('../config');
var src       = config.src;
var chokidar  = require('chokidar');
var chalk     = require('chalk');
var path      = require('path');
var minimatch = require('minimatch');

function init(){

	log('Started watching...');

	var watcher = watch(src);
	watcher.add('less/**/*.less', require('./styles'));
	watcher.add('img/**/*.{jpg,jpeg,png,gif,svg}', require('./images'));
	watcher.add('**/*.{html,nunj}', require('./markup'));

	//Each asset file
	config.assets.forEach(function(asset){
		asset.from.forEach(function(from){
			watcher.add(from, require('./assets'));
		});
	});

}

function watch(root){

	var globs = [];
	var added = [];
	var isReady = false;
	var watcher = chokidar.watch(root, {
		interval: 300,
		binaryInterval: 1000,
		persistent: true,
		ignoreInitial: false,
	});

	watcher

	.on('all', function(action, path, stats){})

	.on('ready', function(){
		isReady = true;
	})

	.on('add', function(path, stats){
		if (!isReady) {
			added.push(path);
		} else if (added.indexOf(path) < 0) {
			added.push(path);
			log('File ' + chalk.green(path) + ' has been added');
			testGlobs(path);
		}
	})

	.on('addDir', function(path, stats){
		if (!isReady) {
			added.push(path);
		} else if (added.indexOf(path) < 0) {
			added.push(path);
			log('Directory ' + chalk.green(path) + ' has been added');
		}
	})

	.on('change', function(path, stats){
		log('File ' + chalk.green(path) + ' has been changed');
		testGlobs(path);
	})

	.on('unlink', function(path){
		log('File ' + chalk.green(path) + ' has been removed');
		testGlobs(path);
	})

	.on('unlinkDir', function(path){
		log('Directory ' + chalk.green(path) + ' has been removed');
	})

	.on('error', function(error){
		log('Error happened', chalk.red(error));
	});

	function testGlobs(path){

		globs.forEach(function(item){

			var glob = item.glob.replace(/^\.\//, '');
			var match = minimatch(path, glob);

			if (match && typeof item.callback == 'function') {
				log('Task called for ' + chalk.green(path));
				item.callback(path);
			}

		});

	}

	function add(glob, callback){

		var glob = glob.replace(root+'/', '');

		globs.push({
			glob: path.join(root, glob),
			callback: callback
		});

		return {add: add};

	}

	return {
		add: add
	};

}

gulp.task('watch', ['build'], init);
module.exports = init;