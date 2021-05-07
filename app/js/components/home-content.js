// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\

var $cont       	= $('.home-content');
var _timeOut        = null;

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$cont.find('.title').each(function(){

		var _html 	= $(this).html().replace('<strong>', ' -- ').replace('</strong>', ' -- ').replace('<br>', ' |').split(' ');
		var _bold	= '';
		var _count	= 0

		$(this).html(' ');

		for(i = 0; i < _html.length; i++){

			if(_html[i] == '--'){
				if(_count == 0){
					_bold = 'bold';
				}else{
					_bold = '';
				}
                
				_count++;
			}
			
			if(_html[i] == '|'){
				$(this).append('<div class="words w-block"><span></span></div>');
			}else if(_html[i] != '' && _html[i] != ' ' && _html[i] != '|' && _html[i] != '--'){
				$(this).append('<div class="words '+_bold+'"><span>'+_html[i]+'</span></div>');
			}
			
		}

		
	});
	
}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\


function motionOut(_target){
	
	$(_target).find('.paragraph').removeClass('motion-in');
	$(_target).find('.button').removeClass('motion-in');

	$(_target).find('.words').each(function(i,e){
        $(e).removeClass('motion-in');
    });
}

function motionIn(_target){
	
	$(_target).find('.paragraph').addClass('motion-in');
	$(_target).find('.button').addClass('motion-in');

	$(_target).find('.words').each(function(i,e){
        $(e).addClass('motion-in');
    });
}


// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init            : init,
	condition       : $cont,
    motionIn        : motionIn,
    motionOut       : motionOut,
	args            : arguments,
}

