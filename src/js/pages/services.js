// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Title from "../components/title"
import * as MouseMove from  "../components/mouse-move";
import * as ScrollMagic from  'scrollmagic';
import gsap, { Power3 } from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $pages       	    = $('.pages');
var $header             = $('.header');
var $scrollDown         = $('.scrolldown');
var $svcsBullets        = $('.services-bullets');
var $svcsIcons          = $('.services-icons');
var $highlights         = $('.highlights');

var _controller         = null;
var _wHeight            = window.innerHeight;
var _scrollPos          = 0;
var _scrollValues       = [];



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    $pages.find('.infos').height(window.innerHeight);

    Title.init($pages.find('.sc-slides').find('.title'));
    MouseMove.init($highlights.find('img'));

    addScrollMagic();
    setScrollTo();

    resize();

}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    $pages.find('.infos').height(window.innerHeight);
    _controller.update(true);
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function addScrollMagic(){

    var $slides     = $pages.find('.sc-slides');

    _scrollValues   = [];
    
    _controller     = null;

    _controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            reverse: true,
        }
    });

    $slides.find('.infos').each(function(e){
        
        var _this       = this;
        var _index      = e;
        var _color      = $(this).data('color');

        var scene = new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
                        .setPin(this)
                        .on("enter", function (e) {

                            $slides.find('.services-bckg').css({background:_color});
                            
                            // $svcsBullets.find('.button').removeClass('active');
                            // $svcsBullets.find('.button').eq(_index).addClass('active');
                            $header.addClass('check-header');
                            // gsap.to($svcsBullets, 1, {ease: Power3.easeOut, x: '0%'},0);

                            _scrollPos = _index;

                            if(_index == 0){
                                $header.removeClass('h-white')
                                $scrollDown.removeClass('s-white');
                                // $svcsBullets.addClass('sb-dark');

                                Title.motionIn($(_this));
                                $(_this).find('.submenu').addClass('motion-in');
                                setTimeout(function(){
                                    $(_this).find('.ico').addClass('motion-in');
                                    $(_this).find('span').addClass('motion-in');
                                }, 1000);
                                
                            }

                            if(_index >= 1){
                                $header.addClass('h-white');
                                $scrollDown.addClass('s-white').removeClass('hide');
                                // $svcsBullets.removeClass('sb-dark');
                                
                                $(_this).find('.type').addClass('motion-in');
                                $(_this).find('.paragraph').addClass('motion-in');
                                $(_this).find('.button').addClass('motion-in');
                                $(_this).find('.ico').addClass('motion-in');
                                $(_this).find('.list').addClass('motion-in');
                            }
                            
                        })
                        .on("leave", function (e) {

                            if(_index == 3){

                                if(e.scrollDirection == "REVERSE"){
                                    $scrollDown.removeClass('hide');
                                }

                                if(e.scrollDirection == "FORWARD"){
                                    // gsap.to($svcsBullets, 1, {ease: Power3.easeOut, x: '-200px'},0);
                                    $scrollDown.addClass('hide');
                                    $header.addClass('h-white').removeClass('check-header');
                                }
                            }

                            if(_index == 0){
                                Title.motionOut($(_this));
                                $(_this).find('.ico').removeClass('motion-in');
                                $(_this).find('.submenu').removeClass('motion-in');
                                $(_this).find('span').removeClass('motion-in');
                            }

                            if(_index >= 1){
                                $(_this).find('.type').removeClass('motion-in');
                                $(_this).find('.paragraph').removeClass('motion-in');
                                $(_this).find('.button').removeClass('motion-in');
                                $(_this).find('.ico').removeClass('motion-in');
                                $(_this).find('.list').removeClass('motion-in');
                            }
                        
                        })
                        // .addIndicators()
                        .addTo(_controller);


        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));
        
    });


}

function setScrollTo(){

    _controller.scrollTo(function (newScrollPos) {
        gsap.to(window, 1.5, {scrollTo: {y: newScrollPos , ease: Power3.easeOut}});
    });

    // $svcsBullets.find('.button').on('click',function(){
    //     var _target = parseInt($(this).data('target').split('slide-')[1]);
    //     _controller.scrollTo(_scrollValues[_target-1]);
    // });

    $svcsIcons.find('.item').on('click',function(){
        var _target = parseInt($(this).data('target').split('slide-')[1]);
        _controller.scrollTo(_scrollValues[_target-1]);
    });

    $scrollDown.on('click',function(){
        if(_scrollPos == 3){
            _controller.scrollTo(_scrollValues[3]+$(window).height()+10);
        }else{
            _controller.scrollTo(_scrollValues[_scrollPos+1]);
        }
        
    });
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }






