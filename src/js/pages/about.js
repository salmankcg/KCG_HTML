// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import {TweenMax, TimelineMax} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $abtWorld       = $('.about-world');
var $people         = $abtWorld.find('.item');
var $highlights     = $('.highlights');

var _inneHeight     = $abtWorld.find('.aw-people').height();
var _inneWidth      = $abtWorld.find('.aw-people').width();



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

    addPopPeople();

    if($(window).width() >= 860){
        MouseMove.init($highlights.find('img'));
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