var fs        = require('fs');
var path      = require('path');
var filters   = fs.readdirSync('./gulp/nunj-filters/');
var config    = require('../config');
var src       = config.src;
var dst       = config.dst;

module.exports = function(env){

	filters.forEach(function(filter){
		var name = filter.replace(/\.\w*$/i, '');
		var _filter = require('../nunj-filters/' + name);
		env.addFilter(name, _filter);
	});

}