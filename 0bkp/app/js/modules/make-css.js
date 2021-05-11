module.exports = function(elem){

	var selectors = [];
	var $elem = $('.' + elem);
	var ignore = ['slick-slide', 'slick-cloned', 'slick-current', 'slick-active', 'slick-list', 'slick-track', 'draggable'];

	$elem.find('*').each(function(){

		var attrClass = $(this).attr('class');
		var classes = (attrClass || '').split(' ');

		classes.forEach(function(item){
			if (item && selectors.indexOf(item) < 0 && ignore.indexOf(item) < 0) {
				selectors.push(item);
			}
		});

	});

	var txt = '';

	selectors.forEach(function(item){
		txt += '\n\t.' + item + ' {}\n';
	});

	console.log('\n' + txt + '\n');

}