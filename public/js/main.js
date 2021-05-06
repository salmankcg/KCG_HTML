(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Application Object
window.app = {

	//Modules
	initComponents		: require('./modules/init-components'),
	svg					: require('./modules/svg'),
	get					: require('./modules/get'),
	pageChange			: require('./modules/page-change'),
	loader				: require('./modules/loader'),
	loadScript			: require('./modules/load-script'),
	popup				: require('./modules/popup'),

	//Components
	components: {
		pages			: require('./components/pages'),
		header			: require('./components/header'),
		button			: require('./components/button'),
		testimonial		: require('./components/testimonial'),
		approach		: require('./components/approach'),
		footer			: require('./components/footer'),
		aboutWorld		: require('./components/about-world'),
		peopleScramble	: require('./components/people-scramble'),
		// homeBullets		: require('./components/home-bullets'),
		people			: require('./components/people'),
		highlights		: require('./components/highlights'),
		worksList		: require('./components/works-list'),
		form			: require('./components/form'),
		clients			: require('./components/clients'),
		loader			: require('./components/loader'),
		title			: require('./components/title'),
	},

	//Templates
	templates: { },

	init: function(){
		app.initComponents();
		app.pageChange();
		app.svg();
	},
};

$(app.init); // Init on Document Ready

},{"./components/about-world":2,"./components/approach":3,"./components/button":4,"./components/clients":5,"./components/footer":6,"./components/form":7,"./components/header":8,"./components/highlights":9,"./components/loader":10,"./components/pages":11,"./components/people":13,"./components/people-scramble":12,"./components/testimonial":14,"./components/title":15,"./components/works-list":16,"./modules/get":17,"./modules/init-components":18,"./modules/load-script":19,"./modules/loader":20,"./modules/page-change":21,"./modules/popup":22,"./modules/svg":23}],2:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       = $('.about-world');
var $item       = $cont.find('.item');

var _inneHeight = $cont.find('.aw-people').height();
var _inneWidth  = $cont.find('.aw-people').width();


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

    $item.each(function(e,i){
        
        var _this = this;

        setTimeout(function(){
            scramblePos(_this);
        }, e*300);
        
    });
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
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
    var $figure = $(_this).find('figure');


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
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init: init,
	condition: $cont,
	args: arguments,
}


},{}],3:[function(require,module,exports){
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


},{}],4:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.button');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

  $cont.on('mouseenter', mouseEnter);
  $cont.on('mouseleave', mouseLeave);
  
  $cont.each(function(){
    mouseMagnetic(this);
  });
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function mouseEnter(){

    var _background = $(this).find('.background');
    var _text       = $(this).find('.text');

    TweenMax.killTweensOf(_background);
    TweenMax.killTweensOf(_text);
    
    new TimelineMax ()
    .add([
      TweenMax.to(_background, 0.5, { ease: 'Power3.easeOut', startAt: {y: '75%'}, y: '0%'}),
      TweenMax.to(_text, 0.1, { ease: 'Power3.easeOut', opacity: 0, y: '-10%' }, 0),
      TweenMax.to(_text, 0.2, { ease: 'Expo.easeOut', opacity: 1, startAt: {y: '20%'}, y: '0%' }, 0.1)
    ]);
}

function mouseLeave(){

    var _background = $(this).find('.background');
    var _text       = $(this).find('.text');

    TweenMax.killTweensOf(_background);
    TweenMax.killTweensOf(_text);

    new TimelineMax ()
    .add([
      TweenMax.to(_background, 0.5, { ease: 'Power3.easeOut',y: '-76%'}),
      TweenMax.to(_text, 0.1, { ease: 'Power3.easeOut',opacity: 0, y: '-10%' }, 0),
      TweenMax.to(_text, 0.2, { ease: 'Expo.easeOut',opacity: 1, startAt: {y: '20%'}, y: '0%' }, 0.1)
    ]);

}

function mouseMagnetic(item) {

    var $item = $(item);

    $item.each(function() {


      var $self = $(this).find('.wrapper');
      var hover = false;
      var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
      var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;
  
      var attachEventsListener = function() {
        $(window).on("mousemove", function(e) {
          //
          var hoverArea = hover ? offsetHoverMax : offsetHoverMin;
  
          // cursor
          var cursor = {
            x: e.clientX,
            y: e.clientY
          };
  
          // size
          var width   = $self.outerWidth();
          var height  = $self.outerHeight();
  
          // position
          var offset = $self.offset();
          var elPos = {
            x: offset.left + width / 2,
            y: (offset.top- $(window).scrollTop())  + height / 2
          };
        

          // comparaison
          var x = cursor.x - elPos.x;
          var y = cursor.y - elPos.y;
  
          // dist
          var dist = Math.sqrt(x * x + y * y);
  
          // mutex hover
          var mutHover = false;
  
          // anim
          if (dist < width * hoverArea) {
            mutHover = true;
            if (!hover) {
              hover = true;
            }
            onHover(x, y);
          }
  
          // reset
          if (!mutHover && hover) {
            onLeave();
            hover = false;
          }
        });
      };
  
      function onHover(x, y) {
        TweenMax.to($self,1.5, {
          x: x * 0.2,
          y: y * 0.2,
          //scale: .9,
          rotation: x * 0.05,
          ease: Power2.easeOut
        });
      };
      function onLeave() {
        TweenMax.to($self, 1.5, {
          x: 0,
          y: 0,
          // scale: 1,
          rotation: 0,
          ease: Elastic.easeOut.config(1.2, 0.4)
        });
      };
  
      attachEventsListener();
      
    });
  };
  
  


// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init        : init,
	condition   : $cont,
	args        : arguments,
}


},{}],5:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.clients');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

    

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
	init        : init,
	condition   : $cont,
	args        : arguments,
}


},{}],6:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       = $('.footer');
var $scrollup   = $cont.find('.scrollup');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$scrollup.find('.button').on('click', function(){
		
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


},{}],7:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.form');
var $input      = $cont.find('.input');

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

    $input.focusout(function() {
        if($(this).find('input').val() == ''){
            $(this).removeClass('add-focus');
        }

        if($(this).find('textarea').val() == ''){
            $(this).removeClass('add-focus');
        }
        
    })

    $input.focusin(function() {
        $(this).addClass('add-focus');
    })

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
	init        : init,
	condition   : $cont,
	args        : arguments,
}


},{}],8:[function(require,module,exports){
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


},{}],9:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.highlights');
var $image 		= $cont.find('img');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$image.mouseover(function() {

		$image.mousemove(function(e) {
			var x = e.pageX - $(this).offset().left,
				y = e.pageY - $(this).offset().top;
	
			var px = x/$(this).width(),
				py = y/$(this).height();
			
			var xx = -20 + (30*px),
				yy = 20 - (30*py);
		
			TweenMax.killTweensOf($(this));
			TweenMax.to($(this), 1, {rotationY: xx, rotationX: yy, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
		});
	
	}).mouseout(function() {
	
		$(this).unbind('mousemove');
	
		TweenMax.to($(this), 1, {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
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


},{}],10:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.loader');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function initMotion(){
    $cont.css({'display':'flex'});
}

function inMotion(){
    $cont.addClass('motion-in');
}


function progressMotion(_percent){

    var _rounded	= Math.round(_percent / 20);
		
    if(_rounded < 1){
        $cont.find('.background').addClass('b-blue');
    }else if(_rounded >= 1 && _rounded < 2){
        $cont.find('.background').addClass('b-green');
    }else if(_rounded >= 2 && _rounded < 3){
        $cont.find('.background').addClass('b-purple');
    }else if(_rounded >= 3 && _rounded < 4){
        $cont.find('.background').addClass('b-orange');
    }else if(_rounded > 4 ){
        $cont.find('.background').addClass('b-yellow');
    }
}

function outMotion(_steps){

    if(_steps == '1'){
        $cont.addClass('motion-out-1');
    }else{
        $cont.addClass('motion-out-2');
    }
}

function hide(){
    $cont.css({'display':'none'});
    $cont.removeClass('motion-out-1').removeClass('motion-out-2').removeClass('motion-in');
    $cont.find('.background').removeClass('b-blue').removeClass('b-green').removeClass('b-purple').removeClass('b-orange').removeClass('b-yellow');
}


// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init            : init,
	condition       : $cont,
	initMotion      : initMotion,
	inMotion        : inMotion,
	progressMotion  : progressMotion,
	outMotion       : outMotion,
	hide            : hide,
	args            : arguments,
}


},{}],11:[function(require,module,exports){
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


},{}],12:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.people-scramble');
var $title		= $('.t-people');
var $item 		= $cont.find('.item');

var $name 		= document.querySelector('.name');
var $area 		= document.querySelector('.area');
var _fxName 	= null;
var _fxArea 	= null;

var _name 		= null;
var _area 		= null;
var _arrPos 	= [ 
					[12.5 * 0, 12.5 * 1, 12.5 * 1, 12.5 * 0],
					[12.5 * 1, 12.5 * 2, 12.5 * 2, 12.5 * 1],
					[12.5 * 2, 12.5 * 3, 12.5 * 3, 12.5 * 2],
					[12.5 * 3, 12.5 * 4, 12.5 * 4, 12.5 * 3],
					[12.5 * 4, 12.5 * 5, 12.5 * 5, 12.5 * 4],
					[12.5 * 5, 12.5 * 6, 12.5 * 6, 12.5 * 5],
					[12.5 * 6, 12.5 * 7, 12.5 * 7, 12.5 * 6],
					[12.5 * 7, 12.5 * 8, 12.5 * 8, 12.5 * 7]
				]
var _requestA	= null;

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	_fxName 	= new TextScramble($name);
	_fxArea 	= new TextScramble($area);
	$item.on('mouseenter',mouseEnter);
	$item.on('mouseleave',mouseLeave);
	
	$cont.on('mouseleave',function(){
		_fxName.setText('the people');
		_fxArea.setText('magic');
	});
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function mouseEnter(){

	var _target = $(this).data('target');
		_name 	= $(this).data('name');
		_area 	= $(this).data('area');
	
	$item.each(function(i,e){
		
		var $figure = $cont.find('.wrapper').find('figure').eq(i);

		TweenMax.killTweensOf($figure);
		
		if(i == _target){
			TweenMax.to($figure, 1, { ease: 'Power3.easeOut', "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
		}else{
			
			if((i) < _target){
				TweenMax.to($figure, 1, { ease: 'Power3.easeOut', "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});
			}else{
				TweenMax.to($figure, 1, { ease: 'Power3.easeOut', "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"});
			}
		}
	});

	_fxName.setText(_name);
	_fxArea.setText(_area);
	

}

function mouseLeave(){
	
	var $this 	= $(this);

	$item.each(function(i,e){
		var _target = $(this).data('target');
		var $figure = $this.closest('.wrapper').find('figure').eq(_target);

		TweenMax.killTweensOf($figure);

		// gsap.to($figure, { duration: 3, "clip-path": "polygon("+_arrPos[i][0]+"% 0%, "+_arrPos[i][1]+"% 0%, "+_arrPos[i][2]+"% 100%, "+_arrPos[i][3]+"% 100%)", ease: 'Elastic.easeOut'});
		TweenMax.to($figure, 3, { ease: 'Elastic.easeOut', "clip-path": "polygon("+_arrPos[i][0]+"% 0%, "+_arrPos[i][1]+"% 0%, "+_arrPos[i][2]+"% 100%, "+_arrPos[i][3]+"% 100%)"});
		
	});
	
}


class TextScramble {
	constructor(el) {
	  this.el 		= el
	  this.chars 	= 'abcdefghijlkmnopqrstuvxz'
	  this.update 	= this.update.bind(this)
	}

	setText(newText) {
	  const oldText = this.el.innerText
	  const length 	= Math.max(oldText.length, newText.length)
	  const promise = new Promise((resolve) => this.resolve = resolve)
	  this.queue = []
	  for (let i = 0; i < length; i++) {
		const from = oldText[i] || ''
		const to = newText[i] || ''
		const start = Math.floor(Math.random() * 40)
		const end = start + Math.floor(Math.random() * 40)
		this.queue.push({ from, to, start, end })
	  }
	  cancelAnimationFrame(this.frameRequest)
	  this.frame = 0
	  this.update()
	  return promise
	}
	update() {
	  let output = ''
	  let complete = 0
	  for (let i = 0, n = this.queue.length; i < n; i++) {
		let { from, to, start, end, char } = this.queue[i]
		if (this.frame >= end) {
		  complete++
		  output += to
		} else if (this.frame >= start) {
		  if (!char || Math.random() < 0.28) {
			char = this.randomChar()
			this.queue[i].char = char
		  }
		  output += `<span class="dud">${char}</span>`
		} else {
		  output += from
		}
	  }
	  this.el.innerHTML = output
	  if (complete === this.queue.length) {
		this.resolve()
	  } else {
		this.frameRequest = requestAnimationFrame(this.update)
		this.frame++
	  }
	}
	randomChar() {
	  return this.chars[Math.floor(Math.random() * this.chars.length)]
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


},{}],13:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.people');
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
		
			TweenMax.killTweensOf($(this).find('.i-wrapper'));
			TweenMax.to($(this).find('.i-wrapper'), 1, {rotationY: xx, rotationX: yy, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
		});
	
	}).mouseout(function() {
	
		$(this).unbind('mousemove');
	
		TweenMax.to($(this).find('.i-wrapper'), 1, {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
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


},{}],14:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.testimonial:not(.no-slick)');

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$cont.find('.slides').slick({
        infinite        : true,
        lazyLoad        : 'ondemand',
  		slidesToShow	: 3,
		slidesToScroll	: 1,
        arrows          : false,
        dots            : true,
		centerMode		: true,
		variableWidth: true,
		responsive: [
			{
			  breakpoint: 768,
			  settings: {
				arrows: false,
				centerMode: true,
				slidesToShow: 1
			  }
			}
		  ]
    });

    $cont.find('.t-prev').on('click',function(){
		$cont.find('.slides').slick('slickPrev');
	});

	$cont.find('.t-next').on('click',function(){
		$cont.find('.slides').slick('slickNext');
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


},{}],15:[function(require,module,exports){
// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.title');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){
    
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
	init            : init,
	condition       : $cont,
	args            : arguments,
}


},{}],16:[function(require,module,exports){
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


},{}],17:[function(require,module,exports){
module.exports = function(paramKey){

	var pairs = location.search.replace(/^\?/, '').split('&');
	var params = [];

	pairs.forEach(function(item){
		var split = item.split('=');
		var key = split[0];
		var val = split[1];
		params[key] = val;
	});

	var selected = params[paramKey];
	if (selected) selected = decodeURIComponent(selected.replace(/\+/gi, ' '));

	return selected;

}
},{}],18:[function(require,module,exports){
module.exports = function(elem){

	var $elem = $(elem || 'body');
	
	Object.keys(app.components).forEach(function(key){

		var comp = app.components[key];

		if (elem) {
			if (comp.condition) {
				var selector = comp.condition.selector;
				if ($elem.is(selector) || $elem.find(selector).length) {
					var args = Array.prototype.slice.call(comp.args);
					comp.args.callee.apply(this, args);
					app.components[key] = args[1].exports;
					app.components[key].init();
				}
			} else if (comp.each) {
				var selector = comp.each.selector;
				$elem.find(selector).each(comp.init);
				$elem.filter(selector).each(comp.init);
			}
		}

		else {
			if (comp.condition) {
				if (comp.condition.length) comp.init();
			} else if (comp.each) {
				comp.each.each(comp.init);
			}
		}

	});

}
},{}],19:[function(require,module,exports){
module.exports = function(src, callback){
	var s = document.createElement('script'), r = false, t;
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function(){
		if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true;
			if (typeof callback == 'function') callback();
		}
	}
	t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
}
},{}],20:[function(require,module,exports){
module.exports = function(opts){

	var before 		= opts.before || function(){};
	var progress 	= opts.progress || function(){};
	var complete 	= opts.complete || function(){};
	var testDelay 	= opts.testDelay || 0;
	var $elem 		= $(opts.elem || 'body');

	var urls 		= [];
	var queue 		= [];
	var isLoaded;

	$elem.find('*').add($elem).each(function(){
		var $elem = $(this);
		var bgImg = $elem.css('background-image');
		var bgUrl = (/(^url\([\'\"]?)([^\"\']*)([\'\"]?\))/.exec(bgImg) || [])[2];
		var url;
		if ($elem.is('img')) url = $elem.attr('src');
		else if (bgUrl) url = bgUrl;
		if (url && urls.indexOf(url) < 0) {
			urls.push(url);
			queue.push({src: url, progress: 0});
		}
	});

	if (!urls.length) return complete(urls);

	before();

	function checkProgress(){

		var loaded = 0;
		var total = queue.length;

		queue.forEach(function(item){
			loaded = loaded + item.progress;
		});

		var pcent = loaded * 100 / total;
		progress(pcent);

		if (pcent >= 100 && !isLoaded) {
			isLoaded = true;
			complete(urls);
		}

	}

	queue.forEach(function(item, i){
		setTimeout(function(){

			var req = new XMLHttpRequest();

			req.onprogress = function(e){
				item.progress = e.loaded / e.total;
				checkProgress();
			};

			req.onloadend = req.ontimeout = req.onerror = req.onabort = function(e){
				item.progress = 1;
				checkProgress();
			};

			req.open('GET', item.src, true);
			req.send(null);

		}, testDelay * (i + 1));
	});

}
},{}],21:[function(require,module,exports){
var $title 	= $('title');
var $menu 	= $('.menu');
var $menus 	= $menu.find('a');
var $header = $('.header');
var $footer = $('.footer');
var $bottom = $('.bottom');
var $cont 	= $('.main-content');
var $html 	= $('html');
var $main 	= $('main');
var $temp 	= $('<div></div>');

var _loadDelay = 300;
var oldPage;
var promise;
var timer;

function init(){

	//Comaçar com o scroll no topo
	for (var i = 0; i < 800; i = i + 50) setTimeout(function(){
		$(window).scrollTop(0);
	}, i);

	app.components.loader.initMotion();
	
	setTimeout(function(){
		
		app.components.loader.inMotion();

		app.loader({
			elem: $('body'),
			testDelay: _loadDelay,
			progress: function(pcent){

				var _pcent 		= parseInt(pcent);
				app.components.loader.progressMotion(_pcent);				
			},
			complete: function(){

				app.components.loader.outMotion('1');
				
				setTimeout(function(){
					
					app.components.loader.outMotion('2');
						
					setTimeout(function(){
						
						app.components.loader.hide();
						
						$menu.trigger('enter').addClass('motion-in');
						$header.addClass('motion-in');
						$cont.find('> *').trigger('enter').addClass('motion-in').attr('data-url', location.href);
				
						activeMenus($main.data('page'));

					}, 2000);
					
				}, 2000);

			},
		});

	}, 500 );
	

	// if (app.get('noloader')) {
		// $loader.remove();
		// $cont.find('> *').trigger('enter').addClass('motion-in');
		// $html.removeClass('noscroll');
		// $menu.trigger('enter');
	// }

	// Ao clicar em qualquer anchor do site
	// $(document).on('click', 'a[href]', function(e){
	$(document).on( 'click', 'a[href]:not(.external)', function(e){
		var url = $(this).attr('href');
		if (url.indexOf('mailto:') == 0) return;
		if (url.indexOf('javascript:') == 0) return;
		if ($(this)[0].href == location.href) return true; // Alteração solicitada, para carregar mesmo se estiver na página!
		e.preventDefault();
		change(url, $(this).data('page'));
		history.pushState(null, null, url);
		// $('html,body').animate({scrollTop: 0}, 1);
	});

	//Ao mudar de página pelo botão voltar/avançar do browser
	setTimeout(function(){
		window.addEventListener('popstate', function(e){
			change(location.href);
		});
	}, 1000);

}

function change(url, newPage){

	if (timer) clearTimeout(timer);
	if (promise && promise.abort) promise.abort();

	var $currSec 	= $cont.find('> *');
	oldPage 		= $main.attr('data-page');

	//Objeto da requisição
	promise = $.ajax({url: url});

	beforeLeave($currSec, oldPage, newPage);
	$currSec.trigger('leave', [newPage]).addClass('motion-out');
	app.components.header.hideMenu(); 

	$menu.trigger('leave');
	$header.removeClass('motion-in');

	app.components.loader.initMotion();

	setTimeout(function(){
		app.components.loader.inMotion();

		setTimeout(function(){
			timer = setTimeout(function(){
				promise.error(function(){
					location.href = url;
				}).success(function(resp){
					handleHTML(resp);
				});
			}, 0);

		}, 1000);

	}, $cont.data('motion-out-time') || 800);
}

function handleHTML(html){

	var $all 		= $(html);
	var $pageTitle 	= $all.filter('title');
	// var $pageBc 	= $all.find('.breadcrumb');
	var $pageMenu 	= $all.find($menu.selector);
	var $pageHeader = $all.find($header.selector);
	var $pageFooter = $all.find($footer.selector);
	var $pageCont 	= $all.find($cont.selector);
	var $pageMain 	= $all.filter($main.selector);
	var $newSec 	= $pageCont.find('> *');
	var $oldSec 	= $cont.find('> *').not($newSec);
	var newPage     = $pageMain.attr('data-page');
	var $tempSec 	= $temp.find('> *');
	var isReused;

	if (location.href == $tempSec.data('location') && $tempSec.data('persist')) {
		$newSec = $tempSec;
		isReused = true;
	}

	beforeLoadNew($newSec, $oldSec, oldPage, newPage);

	
	
	app.loader({
		elem: $newSec,
		testDelay: _loadDelay,
		progress: function(pcent){
			var _pcent 		= parseInt(pcent);
			app.components.loader.progressMotion(_pcent);
		},
		complete: function(){
		
			app.components.loader.outMotion('1');
				
			setTimeout(function(){

				// Atualiza elementos da página
				$title.html( $pageTitle.html() );
				$main.attr('data-page', newPage);
				$main.attr('class', $pageMain.attr('class') );
				$header.attr('class', $pageHeader.attr('class'));
				$footer.attr('class', $pageFooter.attr('class'));
			
				$menu.attr('class', $pageMenu.attr('class'));
				$menu.trigger('enter').addClass('motion-in');

				// $header.find('.breadcrumb').html($pageBc.html());
			
				activeMenus(newPage);

				$newSec.hide().appendTo($cont);
				$oldSec.addClass('leaving');

				$newSec.show();
				if (!isReused) app.initComponents($newSec);
				app.svg();

				$('html,body').animate({scrollTop: 0}, 1);

				app.components.loader.outMotion('2');

				$oldSec.stop().fadeOut($oldSec.data('motion-out-fade') || 0, function(){
					
					$temp.empty();
					$oldSec.appendTo($temp).removeClass('leaving motion-in motion-out');

					setTimeout(function(){
						$newSec.trigger('enter', [oldPage]).addClass('motion-in');
						$newSec.attr('data-location', location.href);
						$header.addClass('motion-in');

						app.components.loader.hide();
						
					}, 1500 );

					afterEnter($newSec, $oldSec, oldPage, newPage);
				});

			}, 2000);
			
		},
	});

}

// No momento do clique no link
function beforeLeave($oldSec, oldPage, newPage){

	// if( oldPage == 'home' || newPage == 'home' ){
		// $menu.removeClass('motion-in');
	// }
}

//Após carregar o HTML da próxima página, mas antes mostrar o loader das imagens
function beforeLoadNew($newSec, $oldSec, oldPage, newPage){}

//Após mostrar a próxima página
function afterEnter($newSec, $oldSec, oldPage, newPage){
	// if( newPage == 'home' || newPage == 'about' ){
	// 	$main.removeClass('motion-in');
	// }else{
	// 	$main.addClass('motion-in');
	// }
}

function activeMenus(page){
	$('.menu').find('.item').removeClass('active');
	$('.menu').find('.item').filter('[data-target="'+page+'"]').addClass('active');

	console.log(page);
}

module.exports = init;
},{}],22:[function(require,module,exports){
module.exports = function(url, width, height){

	var wLeft = window.screen.left || window.screenLeft || 0;
	var wTop = window.screen.top || window.screenTop || 0;
	var left = (window.screen.width / 2) - ((width / 2) + 10) + wLeft;
	var top = (window.screen.height / 2) - ((height / 2) + 50) + wTop;
	
	window.open(url, 'popup'+url, 'status=no, height=' + height + ', width=' + width + ', resizable=yes, left=' + left + ', top=' + top + ', screenX=' + left + ', screenY=' + top + ', toolbar=no, menubar=no, scrollbars=no, location=no, directories=no');

}
},{}],23:[function(require,module,exports){
function init(){

	$('.svg').each(startClass);

}

function startClass(){

	var $icon = $(this);
	if ($icon.hasClass('svg-inline')) return true;

	var bg = $icon.css('background-image').replace('url(', '').replace(')', '').replace(/\"/g, '');

	if (bg && bg != 'none') $.get(bg, function(resp){
		$icon.html($(resp).find('svg')).addClass('svg-inline').trigger('svg-ready');
	});

}

module.exports = init;
},{}]},{},[1]);
