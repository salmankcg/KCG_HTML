var fs = require('fs');
var onlyScripts = require('./gulp/util/script-filter');
var tasks = fs.readdirSync('./gulp/tasks/').filter(onlyScripts);
var chalk = require('chalk');

process.on('uncaughtException', function(err){
  console.log(chalk.white('[') + chalk.red('error') + chalk.white('] '), err);
});

tasks.forEach(function(task){
	require('./gulp/tasks/' + task);
});