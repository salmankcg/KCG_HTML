// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.header');
var $menu       	= $('.menu');
var $hmbrg      	= $cont.find('.hmbrg');

var _prevScrollTop 	= 0;
var _breakPoint 	= 200;

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$hmbrg.on('click', function(){
		if($(this).hasClass('active')){
			hideMenu();
			
		}else{
			showMenu();	
		}
	});

	// $(window).on('scroll.header', onScroll);
	// onScroll();

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function showMenu(){
	$cont.addClass('show-menu').addClass('no-blend');
	$menu.addClass('show-menu');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$cont.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$menu.removeClass('active');

	setTimeout(function(){
		$cont.removeClass('no-blend');
	},500);
}

function onScroll(){


	var dHeight 		= $(document).height();
	var wHeight			= $(window).height();
	var scrollTop 		= $(window).scrollTop();
	var isScrollingUp 	= _prevScrollTop - scrollTop > 0 ? true : false;

	// Scroll em cima
	if (scrollTop < _breakPoint) {
		$cont.removeClass('h-scrollUp');
	}
	//Scroll no bottom da página
	else if (scrollTop + wHeight >= dHeight) {
		$cont.removeClass('h-scrollUp').removeClass('h-scrollDown');
	}
	//Scroll no meio
	else {
		if (isScrollingUp) {
			$cont.addClass('h-scrollUp').removeClass('h-scrollDown');
		} else {
			$cont.removeClass('h-scrollUp').addClass('h-scrollDown');
		}
	}
	
	_prevScrollTop = scrollTop;
}

// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init		: init,
	condition	: $cont,
	hideMenu	: hideMenu,
	args		: arguments,
}

