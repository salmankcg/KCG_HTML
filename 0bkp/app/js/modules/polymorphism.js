module.exports = function(args){

	var used = [];
	var args = Array.prototype.slice.call(args);

	function isType(item, type){
		if (typeof type == 'function') {
			return type(item);
		} else if (type == 'object') {
			if (typeof item == 'object' && !isDOM(item)) return true;
		} else if (type == 'dom') {
			if (isDOM(item)) return true;
		} else {
			if (typeof item == type) return true;
		}
		return false;
	}

	function isDOM(el){
		return el && el.nodeType === 1 || false;
	}

	function next(type){
		var selected;
		args.forEach(function(item, i){
			if (!selected && isType(item, type) && used.indexOf(i) < 0) {
				selected = item;
				used.push(i);
			}
		});
		return selected;
	}

	return {
		next: next,
	}

}