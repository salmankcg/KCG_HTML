// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.form');
var $input      = $cont.find('.input');

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

    $input.focusout(function() {
        if($(this).find('input').val() == ''){
            $(this).removeClass('add-focus');
        }

        if($(this).find('textarea').val() == ''){
            $(this).removeClass('add-focus');
        }
        
    })

    $input.focusin(function() {
        $(this).addClass('add-focus');
    })

}


// ----------------------------------------- \\\
// ------------ PUBLIC FUNCIONS ------------ \\\
// ----------------------------------------- \\\


// ----------------------------------------- \\\
// ------------ PRIVATE FUNCIONS ----------- \\\
// ----------------------------------------- \\\



// ----------------------------------------- \\\
// ------------ MODULES EXPORTS ------------ \\\
// ----------------------------------------- \\\
module.exports = {
	init        : init,
	condition   : $cont,
	args        : arguments,
}
