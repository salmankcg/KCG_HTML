// ------------------------------ \\\
// ---------- IMPORTS ----------- \\\
// ------------------------------ \\\
import $ from "jquery";



// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $loader       	= $('.loader');


// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\



// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ----------- \\\
// ----------------------------------------- \\\
function initMotion(){
    $loader.css({'display':'flex'});
}

function inMotion(){
    $loader.addClass('motion-in');
}


function progressMotion(_percent){

    var _rounded	= Math.round(_percent / 20);
		
    if(_rounded < 1){
        $loader.find('.background').addClass('b-blue');
    }else if(_rounded >= 1 && _rounded < 2){
        $loader.find('.background').addClass('b-green');
    }else if(_rounded >= 2 && _rounded < 3){
        $loader.find('.background').addClass('b-purple');
    }else if(_rounded >= 3 && _rounded < 4){
        $loader.find('.background').addClass('b-orange');
    }else if(_rounded > 4 ){
        $loader.find('.background').addClass('b-yellow');
    }
}

function outMotion(_steps){

    if(_steps == '1'){
        $loader.addClass('motion-out-1');
    }else{
        $loader.addClass('motion-out-2');
    }
}

function hide(){
    $loader.css({'display':'none'});
    $loader.removeClass('motion-out-1').removeClass('motion-out-2').removeClass('motion-in');
    $loader.find('.background').removeClass('b-blue').removeClass('b-green').removeClass('b-purple').removeClass('b-orange').removeClass('b-yellow');
}



// ----------------------------------------- \\\
// ---------------- EXPORTS ---------------- \\\
// ----------------------------------------- \\\
export { initMotion, inMotion, progressMotion, outMotion, hide}
