module.exports = function(paramKey){

	var pairs = location.search.replace(/^\?/, '').split('&');
	var params = [];

	pairs.forEach(function(item){
		var split = item.split('=');
		var key = split[0];
		var val = split[1];
		params[key] = val;
	});

	var selected = params[paramKey];
	if (selected) selected = decodeURIComponent(selected.replace(/\+/gi, ' '));

	return selected;

}