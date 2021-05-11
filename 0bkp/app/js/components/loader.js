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

