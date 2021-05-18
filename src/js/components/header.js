// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $header       	= $('.header');
var $menu       	= $('.menu');
var $hmbrg      	= $header.find('.hmbrg');

var _dataPage		= $('main').data('page');
var _headerH		= $('.header').find('.logo').height() + (($('.header').height()-$('.header').find('.logo').height())/2);

// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($header.length){

	$hmbrg.on('click', function(){
		if($(this).hasClass('active')){
			hideMenu();
			
		}else{
			showMenu();	
		}
	});

	$(window).on('scroll.header', onScroll);
	onScroll();
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
				$header.removeClass('h-white');
			}else{
				$header.addClass('h-white');
			}
		break;
		case 'journal-inner':
			if(scrollTop  >= (wHeight * 0.80) - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
				}else{
					$header.removeClass('h-white');
				}
			}else{
				$header.addClass('h-white');
			}
			
		break;
		case 'contact':
			$header.addClass('h-white');
			
		break;
		case 'services':
			var _scTop = $('.sc-clients').offset().top;

			if(scrollTop >= _scTop - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
					console.log('footer');
				}else{
					$header.removeClass('h-white');
					console.log('crientes');
				}

			}else{
				if(!$header.hasClass('check-header')){
					$header.addClass('h-white');
				}
			}
		break;
		case 'service':
			
			var _scTop = $('.sc-testimonials').offset().top;

			if(scrollTop >= _scTop - _headerH){
				if(scrollTop + wHeight >= dHeight - _headerH){
					$header.addClass('h-white');
				}else{
					$header.removeClass('h-white');
				}

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

function showMenu(){
	$header.addClass('show-menu');
	$menu.addClass('show-menu');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$header.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$hmbrg.removeClass('active');
}
