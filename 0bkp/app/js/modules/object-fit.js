module.exports = function($elem, $area){

	if (!$elem.is(':visible')) return false;
	if (!$area.is(':visible')) return false;

	var width = $elem.attr('width');
	var height = $elem.attr('height');
	var prop = width / height;

	$elem.addClass('object-fit');

	function ajust(){

		var areaWidth = $area.width();
		var areaHeight = $area.height();
		var areaProp = areaWidth / areaHeight;

		var newWidth = width * areaHeight / height;
		var newHeight = height * areaWidth / width;

		if (areaProp == prop) $elem.css({width: '100%', height: '100%'});
		else if (areaProp > prop) $elem.css({width: '100%', height: newHeight});
		else if (areaProp < prop) $elem.css({width: newWidth, height: '100%'});
		
	}

	$(window).on('resize', ajust);
	ajust();

}