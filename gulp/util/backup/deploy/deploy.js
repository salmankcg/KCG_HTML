var _       = require('lodash');
var rsync   = require("rsyncwrapper").rsync;
var chalk   = require('chalk');
var gulp    = require('gulp');
var config  = require('../config');
var src     = config.src;
var modConf = config.deploy;

function init(){
  
	return deployer(modConf.hint, {
		host: (modConf.user ? modConf.user + '@' : '') + modConf.host,
		src: src,
		dest: modConf.path
	});

}

function deployer(hint, env){

  console.log('Password hint:', hint);

	var common = {
		args: ['--verbose'],
		recursive: true,
		exclude: [
			'.git*', 
		],
	}

	var config = _.merge(env, common);

	rsync(config, function(error, stdout, stderr, cmd){
		checkForRsync(stderr);
	});

}

function checkForRsync(stderr){

	var noRsync = stderr.indexOf('is not recognized as an internal') > -1 ||
					  stderr.indexOf('reconhecido como um comando interno') > -1;
	var errorPrefix = chalk.white('[') + chalk.green('deploy') + chalk.white('] ');
	var isWin = /^win/.test(process.platform);

	if (noRsync && isWin) {
		console.log(errorPrefix + chalk.red('You must have rsync installed to run this task'));
		console.log(chalk.cyan.bold('To install rsync on Windows:'));
		console.log(chalk.cyan('1. Download and install cwRsync from this link:'));
		console.log(chalk.cyan('   http://www.rsync.net/resources/binaries/cwRsync_3.1.0_Installer.zip'));
		console.log(chalk.cyan('2. Add the directory of installation to the PATH environment variable.'));
		console.log(chalk.cyan('   Example: "C:\\Program Files (x86)\\cwRsync\\bin"'));
	}

}

gulp.task('deploy', ['build'], init);
module.exports = init;