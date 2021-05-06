// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.pages');
var $main           = document.querySelector("#main");
var _dataPage       = $('main').data('page');
var _controller     = null;
var _scrollSmooth   = null; 
var _y              = 0;
var _wHeight        = $(window).height();
var _isChrome       = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

    if($(window).width()>=860){
        addScrollMagicHome();
    }

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function scrollTo(_elm){
    // _scroll.scrollTo(_elm);
}


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\

function addScrollMagicHome(){

    _controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            triggerHook: 0,
            reverse: true,
          }
    });

    $('.hc-slides').find('.infos').each(function(e){
        
        var _index      = e;
        var _color      = $(this).data('color');

        new ScrollMagic.Scene({triggerElement: this, duration: "200%"})
                        .setPin(this)
                        .on("enter", function (e) {

                            $('.hc-slides').find('.home-bckg').css({background:_color});
                         
                            if( _index == 0){
                                TweenMax.to($('.globe').find('.g-wrapper'), 0.4, { ease: 'Power3.easeOut', opacity: 1, y: '0%' });
                            }else{
                                TweenMax.to($('.hc-slides').find('.images').find('.img').eq(_index), 0.5, {ease: 'Power3.easeOut', opacity: 1});
                            }

                        })
                        .on("leave", function (e) {
                            if(e.scrollDirection == "FORWARD"){
                                if( _index == 0){
                                    TweenMax.to($('.globe').find('.g-wrapper'), 0.4, { ease: 'Power3.easeOut', opacity: 0, y: '-10%' });
                                }else{
                                    TweenMax.to($('.hc-slides').find('.images').find('.img').eq(_index), 0.5, {ease: 'Power3.easeOut', opacity: 0});
                                }
                            }
                            
                        })
                        // .addIndicators()
                        .addTo(_controller);

        // HOME SHAPE
        var homeShape = new TimelineMax ()
        .to($('.hc-slides').find('.home-bckg').find('.shape').find('figure').eq(_index), 2, {opacity: 1})
        
        new ScrollMagic.Scene({triggerElement: this, duration:'200%', offset:-_wHeight}).setTween(homeShape).addTo(_controller);

        
        // HOME IMAGES
        var homeImages = new TimelineMax()
        .fromTo($('.hc-slides').find('.images').find('.img').eq(_index).find('img'), 2, {x: '-20%', opacity: 0},{x: '0%', opacity: 1})

        new ScrollMagic.Scene({triggerElement: this, duration:'200%', offset:-_wHeight/2}).setTween(homeImages).addTo(_controller);
        
    });

    $('.hc-clients').find('.infos').each(function(e){

        // HOME CLIENTS
        // var homeClients = new TimelineMax ()
        // .add([
        //     TweenMax.fromTo($('.hc-clients'), 2, {y: '-100%'},{y: '0%'}),
        // ]);

        // new ScrollMagic.Scene({triggerElement: this, duration: "100%"})
        //                 .setPin(this)
        //                 .setTween(homeClients)
        //                 .addTo(_controller);
    });

    _controller.scrollTo(function (newpos) {
		TweenMax.to(window, 1, {scrollTo: {y: newpos, ease: 'Power3.easeOut'}});
	});

    $('.home-bullets').find('.button').on('click',function(){

        var _target = $(this).data('target');

        $('.home-bullets').find('.button').removeClass('active');
        $(this).addClass('active');
        
        _controller.scrollTo('#'+_target);
       
    });
    
}




// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init: init,
	condition: $cont,
    scrollTo:scrollTo,
	args: arguments,
}

