// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import gsap, {TimelineMax, Power3, Power2, Expo, Elastic} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $footer       	= $('.footer');
var $header       	= $('.header');
var $scrollup   	= $footer.find('.scrollup');

var _dataPage		= $('main').data('page');
var _headerH		= $('.header').find('.logo').height() + (($('.header').height()-$('.header').find('.logo').height())/2);



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($footer.length){
    $scrollup.find('.button').on('click', function(){
		gsap.to(window, 1, {scrollTo: {y: 0 , ease: 'Power3.easeOut'}});
	});

	$(window).on('scroll.footer', onScroll);
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


	//Scroll no bottom da página
	if (scrollTop + wHeight >= dHeight- ($(window).height()/2)) {
		$footer.addClass('motion-in-1');
	} else{
		$footer.removeClass('motion-in-1');
	}
	
	if (scrollTop + wHeight >= dHeight - ($(window).height()/3)) {
		$footer.addClass('motion-in-2');
	} else{
		$footer.removeClass('motion-in-2');
	}
	
	if (scrollTop + wHeight >= dHeight) {
		$footer.addClass('motion-in-3');
	}else{
		$footer.removeClass('motion-in-3');
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
		case 'footeract':
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


