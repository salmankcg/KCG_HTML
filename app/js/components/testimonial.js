// ------------------------------ \\\
// ------------ VARS ------------ \\\
// ------------------------------ \\\
var $cont       = $('.testimonial:not(.no-slick)');

// ------------------------------ \\\
// ------------ INIT ------------ \\\
// ------------------------------ \\\

function init(){

	$cont.find('.slides').slick({
        infinite        : true,
        lazyLoad        : 'ondemand',
  		slidesToShow	: 3,
		slidesToScroll	: 1,
        arrows          : false,
        dots            : true,
		centerMode		: true,
		variableWidth: true,
		responsive: [
			{
			  breakpoint: 768,
			  settings: {
				arrows: false,
				centerMode: true,
				slidesToShow: 1
			  }
			}
		  ]
    });

    $cont.find('.t-prev').on('click',function(){
		$cont.find('.slides').slick('slickPrev');
	});

	$cont.find('.t-next').on('click',function(){
		$cont.find('.slides').slick('slickNext');
	});
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
	init: init,
	condition: $cont,
	args: arguments,
}

