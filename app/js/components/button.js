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

