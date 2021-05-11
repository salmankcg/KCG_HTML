var config  = require('../config');
var dst     = config.dst;

// Saiba mais sobre as opções em:
// http://www.browsersync.io/docs/options/
module.exports = {

	//Arquivos escutados 
	files: [dst + '/**/*'],

	// Configurações do servidor estático do browser-sync 
	server: {
		index: 'index.html',
		baseDir: dst,
		// directory: true,
	},

	// Usando algum backend? Basta informar o host
	// Ex: 'sub.example.com'
	// proxy: 'localhost/project',

	exclude: false,
	startPath: null,
	ghostMode: {
		clicks: false,
		links: false,
		forms: false,
		scroll: false,
	},
	open: true,
	xip: false,
	timestamps: true,
	fileTimeout: 1000,
	injectChanges: true,
	scrollProportionally: true,
	scrollThrottle: 0,
	notify: true,
	host: null,
	excludedFileTypes: [],
	reloadDelay: 0,
	online: false,
	browser: 'chrome',

}