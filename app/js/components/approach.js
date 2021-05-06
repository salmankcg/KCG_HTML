// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.approach');
var $item       = $cont.find('.item');
var $videos     = $('.video-background');

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$item.on('mouseenter', onMouseEnter);
	$item.on('mouseleave', onMouseLeave);

    $item.mouseover(function() {

		$item.mousemove(function(e) {
			var x = e.pageX - $(this).offset().left,
				y = e.pageY - $(this).offset().top;
	
			var px = x/$(this).width(),
				py = y/$(this).height();
			
			var xx = -20 + (30*px),
				yy = 20 - (30*py);
		
			TweenMax.killTweensOf($(this).find('.wrapper'));
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

function onMouseEnter(){

    var _target = $(this).data('video');

    $item.addClass('hide');
    $(this).removeClass('hide');

    TweenMax.killTweensOf($('.title.t-center'));
    TweenMax.killTweensOf($('.header'));
    TweenMax.killTweensOf($('.submenu'));

    new TimelineMax ()
    .add([
      TweenMax.to($('.title.t-center'), 0.5, { ease: 'Power3.easeOut', opacity: 0 }),
      TweenMax.to($('.header'), 0.1, { ease: 'Power3.easeOut', opacity: 0 }, 0),
      TweenMax.to($('.submenu'), 0.2, { ease: 'Expo.easeOut',opacity: 0, }, 0)
    ]);

    $videos.find('.video').removeClass('active');
    $videos.find('[data-target="'+_target+'"]').addClass('active');
    
    
}

function onMouseLeave(){
    
    $item.removeClass('hide');
    $videos.find('.video').removeClass('active');
    
    TweenMax.killTweensOf($('.title.t-center'));
    TweenMax.killTweensOf($('.header'));
    TweenMax.killTweensOf($('.submenu'));

    new TimelineMax ()
    .add([
      TweenMax.to($('.title.t-center'), 0.5, { ease: 'Power3.easeOut', opacity: 1 }),
      TweenMax.to($('.header'), 0.1, { ease: 'Power3.easeOut', opacity: 1 }, 0),
      TweenMax.to($('.submenu'), 0.2, { ease: 'Expo.easeOut',opacity: 1, }, 0)
    ]);

}


// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init: init,
	condition: $cont,
	args: arguments,
}

