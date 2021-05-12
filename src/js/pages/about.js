// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import  "../components/testimonial";
import * as MouseMove from  "../components/mouse-move";
// import * as ScrollMagic from  'scrollmagic';
import gsap, {TweenMax, TimelineMax, Power3} from "gsap";
// import { ScrollMagicPluginGsap } from "scrollmagic-plugin-gsap";
// ScrollMagicPluginGsap(ScrollMagic, TweenMax, TimelineMax);



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $pages       	= $('.pages');
var $header         = $('.header');
var $abtWorld       = $('.about-world');
var $people         = $abtWorld.find('.item');
var $highlights     = $('.highlights');

var _controller     = null;
var _wHeight        = null;
var _scrollPos      = null;
var _scrollValues   = null;
var _inneHeight     = $abtWorld.find('.aw-people').height();
var _inneWidth      = $abtWorld.find('.aw-people').width();



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    addPopPeople();

    MouseMove.init($highlights.find('img'));
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function resize() {
    
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function addScrollMagic(){

    var $slides     = $pages.find('.hc-slides');
    var $slidesC    = $pages.find('.hc-clients');

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

                            $slides.find('.home-bckg').css({background:_color});
                         
                            if( _index == 0){
                                gsap.to($('.globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 1, y: '0%' },0);
                            }else{
                                gsap.to($slides.find('.images').find('.img').eq(_index), 0.5, {ease: Power3.easeOut, opacity: 1},0);
                            }

                            $homeBullets.find('.button').removeClass('active');
                            $homeBullets.find('.button').eq(_index).addClass('active');

                            Title.motionIn($(_this));

                            _scrollPos = _index;

                        })
                        .on("leave", function (e) {

                            if(e.scrollDirection == "FORWARD"){
                                if( _index == 0){
                                    gsap.to($('.globe').find('.g-wrapper'), 0.4, { ease: Power3.easeOut, opacity: 0, y: '-10%' },0);
                                }else{
                                    gsap.to($slides.find('.images').find('.img').eq(_index), 0.5, {ease: Power3.easeOut, opacity: 0},0);
                                }
                            }

                            Title.motionOut($(_this));
                        
                        })
                        // .addIndicators()
                        .addTo(_controller);


        // HOME SHAPE
        var homeShape = new TimelineMax()
        .add([
            gsap.to($slides.find('.home-bckg').find('.shape').find('figure').eq(_index), 2, {opacity: 1},0)
        ]);

        new ScrollMagic.Scene({triggerElement: this, duration:'100%', offset:-_wHeight}).setTween(homeShape).addTo(_controller);


        // HOME IMAGES
        var homeImages = new TimelineMax()
        .add([
            gsap.fromTo($slides.find('.images').find('.img').eq(_index).find('img'), 2, {x: '-20%', opacity: 0},{x: '0%', opacity: 1},0)
        ]);
        
        new ScrollMagic.Scene({triggerElement: this, duration:'100%', offset:-_wHeight/2}).setTween(homeImages).addTo(_controller);

        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));
        
    });


    $slidesC.find('.infos').each(function(e){

        var _this       = this;

        var scene = new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
                        .setPin(this)
                        .on("enter", function (e) {
                            
                            $header.removeClass('h-white').addClass('check-footer');
                            $scrollDown.removeClass('s-white');

                            $homeBullets.find('.button').removeClass('active');
                            $homeBullets.find('.button').eq(4).addClass('active');
                            $homeBullets.addClass('hb-dark');

                            Title.motionIn($(_this));

                            gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '0%'},0);

                            $(_this).find('.image').each(function(i,e){
                                gsap.to($(e), 1, {ease: Power3.easeOut, opacity: 1},0);
                            });

                            _scrollPos = 4;
                        })
                        .on("leave", function (e) {
                            $homeBullets.removeClass('hb-dark');
                            
                            if(e.scrollDirection == "REVERSE"){
                                $scrollDown.addClass('s-white').removeClass('hide');
                                $header.addClass('h-white').removeClass('check-footer');
                            }

                            if(e.scrollDirection == "FORWARD"){
                                gsap.to($homeBullets, 1, {ease: Power3.easeOut, x: '-200px'},0);
                                $scrollDown.addClass('hide');
                            }

                            $(_this).find('.image').each(function(){
                                gsap.to($(this), 1, {ease: Power3.easeOut, opacity: 0},0);
                            });

                            Title.motionOut($(_this));    
                        })
                        .addTo(_controller);
        
        _scrollValues.push(scene.scrollOffset()+(scene.duration()-10));

    });

    
}

function setScrollTo(){

    _controller.scrollTo(function (newScrollPos) {
        gsap.to(window, 2, {scrollTo: {y: newScrollPos , ease: Power3.easeOut}});
    });

    $homeBullets.find('.button').on('click',function(){
        var _target = parseInt($(this).data('target').split('slide-')[1]);
        _controller.scrollTo(_scrollValues[_target-1]);
    });

    $scrollDown.on('click',function(){
        if(_scrollPos == 4){
            _controller.scrollTo($(document).height());
        }else{
            _controller.scrollTo(_scrollValues[_scrollPos+1]);
        }
        
    });
}

function addPopPeople(){

    $people.each(function(e,i){
        var _this = this;

        setTimeout(function(){
            scramblePos(_this);
        }, e*300);
        
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function scramblePos(_this){
    var _posY = getRandomInt(1, _inneHeight);
    var _posX = getRandomInt(1, _inneWidth);

    $(_this).css('transform','translate('+_posX+'px,'+_posY+'px)');

    motionIn(_this);
}

function motionIn(_this){

    var $item   = $(_this);
    var $figure = $(_this).find('img');


    new TimelineMax({onComplete:function(){
        TweenMax.killTweensOf($figure);
        setTimeout(function(){
            scramblePos($item);
        }, 1000);
    }})
    .add([TweenMax.to($figure, 5, {scale: 1, ease: 'Elastic.easeOut'})])
    .add([TweenMax.to($figure, .5, {scale: 0, ease: 'Power3.easeOut'})],20)
      

    
}

// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }






