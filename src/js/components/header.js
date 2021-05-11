// ----------------------------------------- \\\
// ---------------- IMPORTS ---------------- \\\
// ----------------------------------------- \\\
import $ from "jquery";



// ----------------------------------------- \\\
// ----------------- VARS ------------------ \\\
// ----------------------------------------- \\\
var $header       	= $('.header');
var $menu       	= $('.menu');
var $hmbrg      	= $header.find('.hmbrg');



// ----------------------------------------- \\\
// ------------------ INIT ----------------- \\\
// ----------------------------------------- \\\
if($header.length){

	$hmbrg.on('click', function(){
		if($(this).hasClass('active')){
			hideMenu();
			
		}else{
			showMenu();	
		}
	});
}



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function showMenu(){
	$header.addClass('show-menu');
	$menu.addClass('show-menu');
	$hmbrg.addClass('active');
}

function hideMenu(){
	$header.removeClass('show-menu');
	$menu.removeClass('show-menu');
	$hmbrg.removeClass('active');
}
