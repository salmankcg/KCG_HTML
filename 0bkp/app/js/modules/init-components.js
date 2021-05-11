module.exports = function(elem){

	var $elem = $(elem || 'body');
	
	Object.keys(app.components).forEach(function(key){

		var comp = app.components[key];

		if (elem) {
			if (comp.condition) {
				var selector = comp.condition.selector;
				if ($elem.is(selector) || $elem.find(selector).length) {
					var args = Array.prototype.slice.call(comp.args);
					comp.args.callee.apply(this, args);
					app.components[key] = args[1].exports;
					app.components[key].init();
				}
			} else if (comp.each) {
				var selector = comp.each.selector;
				$elem.find(selector).each(comp.init);
				$elem.filter(selector).each(comp.init);
			}
		}

		else {
			if (comp.condition) {
				if (comp.condition.length) comp.init();
			} else if (comp.each) {
				comp.each.each(comp.init);
			}
		}

	});

}