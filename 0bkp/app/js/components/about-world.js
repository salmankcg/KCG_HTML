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

