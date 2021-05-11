var gulp = require('gulp');
var log  = require('../util/log')('build');
var chalk = require('chalk');
var yargs = require('yargs');

gulp.task('build', [
  'scripts',
  'styles',
  'markup',
  'images',
  'assets',
], function(){
	if (yargs.argv._[0] == 'build') {
		console.log(chalk.green('Project built successfully!'));
		process.exit();
	}
});