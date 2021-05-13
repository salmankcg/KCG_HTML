// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";
import * as Load from "./load"
import * as Loader from "../components/loader"



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $menu 		= $('.menu');
var $header 	= $('.header');
var $cont 		= $('.main-content');
var $main 		= $('main');

var _loadDelay 	= 400;
var _dataPage	= $main.data('page');


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\
function init(){

	//Comaçar com o scroll no topo
	for (var i = 0; i < 800; i = i + 50) setTimeout(function(){
		$(window).scrollTop(0);
	}, i);

	Loader.initMotion();
	
	setTimeout(function(){
		
		Loader.inMotion();
		
		Load.init({
			elem: $('body'),
			testDelay: _loadDelay,
			progress: function(pcent){
				if(_dataPage != 'about-person'){
					var _pcent 		= parseInt(pcent);
					Loader.progressMotion(_pcent);
				}
			},
			complete: function(){

				if(_dataPage == 'contact' || _dataPage == 'about-approach' || _dataPage == 'about-person' || _dataPage == 'legals'){

					setTimeout(function(){
						Loader.progressMotion(0);
						setTimeout(function(){
							Loader.progressMotion(20);
							setTimeout(function(){
								Loader.progressMotion(40);
								setTimeout(function(){
									Loader.progressMotion(60);
									setTimeout(function(){
										Loader.progressMotion(80);
										setTimeout(function(){
											Loader.progressMotion(100);
										}, 100);
									}, 100);
								}, 100);
							}, 100);
						}, 100);
					}, 50);

					setTimeout(function(){
						setFirstLoader();
					}, 800);

				}else{
					setFirstLoader();
				}


			},
		});

	}, 500 );

}



function setFirstLoader(){

	Loader.outMotion('1');
	
	setTimeout(function(){
		
		Loader.outMotion('2');
			
		setTimeout(function(){
			
			Loader.hide();
			
			$menu.trigger('enter').addClass('motion-in');
			$header.addClass('motion-in');
			$cont.find('> *').trigger('enter').addClass('motion-in').attr('data-url', location.href);
	
			activeMenus(_dataPage);

		}, 1000);
		
	}, 1000);
}


function activeMenus(page){
	$menu.find('.item').removeClass('active');
	$menu.find('.item').filter('[data-target="'+page+'"]').addClass('active');

	console.log(page);
}

// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { init }