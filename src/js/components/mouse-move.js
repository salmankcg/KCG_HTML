// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import {TweenMax, Quad} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(_element){

    var $el = _element;

	$el.on('mouseenter',function(){
		$el.on('mousemove',function(e){
			mouseMove(this,e);
		});
	});

	$el.on('mouseleave',function(){
		mouseOut(this);
	});
}



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function mouseMove(_this,_e){

	var $this = _this;
    var x = _e.pageX - $($this).offset().left,
		y = _e.pageY - $($this).offset().top;

	var px = x/$($this).width(),
		py = y/$($this).height();
	
	var xx = -20 + (30*px),
		yy = 20 - (30*py);

	TweenMax.killTweensOf($($this));
	TweenMax.to($($this), 1, {rotationY: xx, rotationX: yy, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
}

function mouseOut(_this){

	var $this = _this;

    $($this).off('mousemove');

	TweenMax.killTweensOf($($this));
	TweenMax.to($($this), .5, {rotationY: 0, rotationX: 0, rotationZ: 0, transformPerspective: 1000, ease: Quad.easeOut});
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init }

  
