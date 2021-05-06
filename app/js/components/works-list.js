// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.works-list');
var $item 		= $cont.find('.item');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$item.mouseover(function() {

		$item.mousemove(function(e) {
			var x = e.pageX - $(this).offset().left,
				y = e.pageY - $(this).offset().top;
	
			var px = x/$(this).width(),
				py = y/$(this).height();
			
			var xx = -20 + (30*px),
				yy = 20 - (30*py);
		
			TweenMax.killTweensOf($(this).find('wrapper'));
			TweenMax.to($(this).find('.wrapper'), 1, {rotationY: xx, rotationX: yy, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
		});
	
	}).mouseout(function() {
	
		$(this).unbind('mousemove');
	
		TweenMax.to($(this).find('.wrapper'), 1, {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
	});
	
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init: init,
	condition: $cont,
	args: arguments,
}

