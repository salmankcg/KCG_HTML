// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.footer');
var $header       	= $('.header');
var $scrollup   	= $cont.find('.scrollup');

var _dataPage		= $('main').data('page');
var _headerH		= $('.header').find('.logo').height() + (($('.header').height()-$('.header').find('.logo').height())/2);


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$scrollup.find('.button').on('click', function(){
		TweenMax.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
	});

	$(window).on('scroll.footer', onScroll);
	onScroll();

	console.log(_headerH);
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

function onScroll(){

	var dHeight 		= $(document).height();
	var wHeight			= $(window).height();
	var scrollTop 		= $(window).scrollTop();


	//Scroll no bottom da página
	if (scrollTop + wHeight >= dHeight- ($(window).height()/2)) {
		$cont.addClass('motion-in-1');
	} else{
		$cont.removeClass('motion-in-1');
	}
	
	if (scrollTop + wHeight >= dHeight - ($(window).height()/3)) {
		$cont.addClass('motion-in-2');
	} else{
		$cont.removeClass('motion-in-2');
	}
	
	if (scrollTop + wHeight >= dHeight) {
		$cont.addClass('motion-in-3');
	}else{
		$cont.removeClass('motion-in-3');
	}


	switch(_dataPage){
		case 'home':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				if($header.hasClass('check-footer')){
					$header.removeClass('h-white');
				}
			}
		break;
		case 'about-approach':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				if($header.hasClass('check-footer')){
					$header.removeClass('h-white');
				}
			}
		break;
		case 'contact':
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				$header.addClass('h-white');
			}
		break;
		default:
			if(scrollTop + wHeight >= dHeight - _headerH){
				$header.addClass('h-white');
			}else{
				$header.removeClass('h-white');
			}
	}

	

}


// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init: init,
	condition: $cont,
	args: arguments,
}

