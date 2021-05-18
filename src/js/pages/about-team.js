// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as MouseMove from  "../components/mouse-move";
import {TweenMax, Elastic, Power3} from "gsap";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $webdoor		= $('.webdoor');
var $peopleList		= $('.people');
var $peopleScramble	= $('.people-scramble');
var $itemScramble 	= $peopleScramble.find('.item');

var $name 			= document.querySelector('.name');
var $area 			= document.querySelector('.area');

var _fxName 		= null;
var _fxArea 		= null;

var _name 			= null;
var _area 			= null;
var _arrPos 		= [ 
              		  [12.5 * 0, 12.5 * 1, 12.5 * 1, 12.5 * 0],
              		  [12.5 * 1, 12.5 * 2, 12.5 * 2, 12.5 * 1],
              		  [12.5 * 2, 12.5 * 3, 12.5 * 3, 12.5 * 2],
              		  [12.5 * 3, 12.5 * 4, 12.5 * 4, 12.5 * 3],
              		  [12.5 * 4, 12.5 * 5, 12.5 * 5, 12.5 * 4],
              		  [12.5 * 5, 12.5 * 6, 12.5 * 6, 12.5 * 5],
              		  [12.5 * 6, 12.5 * 7, 12.5 * 7, 12.5 * 6],
              		  [12.5 * 7, 12.5 * 8, 12.5 * 8, 12.5 * 7]
					]
	



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
function init(){

	if($(window).width() >= 860){
		_fxName 	= new TextScramble($name);
		_fxArea 	= new TextScramble($area);
	
		MouseMove.init($peopleList.find('.item').find('.i-wrapper'));

		$itemScramble.on('mouseenter',mouseEnter);
		$itemScramble.on('mouseleave',mouseLeave);
		
		$peopleScramble.on('mouseleave',function(){
			_fxName.setText('the people');
			_fxArea.setText('magic');
		});
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
function mouseEnter(){

	var _target = $(this).data('target');
		_name 	= $(this).data('name');
		_area 	= $(this).data('area');
	
	$itemScramble.each(function(i,e){
		
		var $figure = $peopleScramble.find('.wrapper').find('figure').eq(i);

		TweenMax.killTweensOf($figure);
		
		if(i == _target){
			TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"});
		}else{
			
			if((i) < _target){
				TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});
			}else{
				TweenMax.to($figure, 1, { ease: Power3.easeOut, "clip-path": "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"});
			}
		}
	});

	_fxName.setText(_name);
	_fxArea.setText(_area);
	

}

function mouseLeave(){
	
	var $this 	= $(this);

	$itemScramble.each(function(i,e){
		var _target = $(this).data('target');
		var $figure = $this.closest('.wrapper').find('figure').eq(_target);

		TweenMax.killTweensOf($figure);
		TweenMax.to($figure, 3, { ease: Elastic.easeOut, "clip-path": "polygon("+_arrPos[i][0]+"% 0%, "+_arrPos[i][1]+"% 0%, "+_arrPos[i][2]+"% 100%, "+_arrPos[i][3]+"% 100%)"});
		
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
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init, resize }