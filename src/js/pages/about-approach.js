// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import gsap, {TweenMax, TimelineMax, Power3, Expo} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $abtApproach    = $('.approach');
var $item           = $abtApproach.find('.item');
var $videos         = $('.video-background');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    if($(window).width() >= 860){
      MouseMove.init($abtApproach.find('.item').find('.wrapper'));

      $item.on('mouseenter', onMouseEnter);
      $item.on('mouseleave', onMouseLeave);

      $('video')[0].play();
      $('video')[1].play();
      $('video')[2].play();
    }
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



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
    TweenMax.to($('.title.t-center'), 0.5, { ease: Power3.easeOut, opacity: 0 }),
    TweenMax.to($('.header'), 0.1, { ease: Power3.easeOut, opacity: 0 }, 0),
    TweenMax.to($('.submenu'), 0.2, { ease: Expo.easeOut,opacity: 0, }, 0)
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
    TweenMax.to($('.title.t-center'), 0.5, { ease: Power3.easeOut, opacity: 1 }),
    TweenMax.to($('.header'), 0.1, { ease: Power3.easeOut, opacity: 1 }, 0),
    TweenMax.to($('.submenu'), 0.2, { ease: Expo.easeOut,opacity: 1, }, 0)
  ]);

}


// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }