var chalk = require('chalk');

function init(mod){

	var prefix = chalk.white('[') + chalk.green(mod) + chalk.white(']');

	return function(text){
		console.log(prefix, chalk.white(text));
	}

}

module.exports = init;