var $title 	= $('title');
var $menu 	= $('.menu');
var $header = $('.header');
var $footer = $('.footer');
var $cont 	= $('.main-content');
var $main 	= $('main');
var $temp 	= $('<div></div>');

var _loadDelay = 400;
var oldPage;
var promise;
var timer;

function init(){

	//Comaçar com o scroll no topo
	for (var i = 0; i < 800; i = i + 50) setTimeout(function(){
		$(window).scrollTop(0);
	}, i);

	app.components.loader.initMotion();
	
	setTimeout(function(){
		
		app.components.loader.inMotion();
		

		app.loader({
			elem: $('body'),
			testDelay: _loadDelay,
			progress: function(pcent){
				if($main.data('page') != 'about-person'){
					var _pcent 		= parseInt(pcent);
					app.components.loader.progressMotion(_pcent);
				}
			},
			complete: function(){

				if($main.data('page') == 'contact' || $main.data('page') == 'about-approach' || $main.data('page') == 'about-person'){

					setTimeout(function(){
						app.components.loader.progressMotion(0);
						setTimeout(function(){
							app.components.loader.progressMotion(20);
							setTimeout(function(){
								app.components.loader.progressMotion(40);
								setTimeout(function(){
									app.components.loader.progressMotion(60);
									setTimeout(function(){
										app.components.loader.progressMotion(80);
										setTimeout(function(){
											app.components.loader.progressMotion(100);
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
	

	// if (app.get('noloader')) {
		// $loader.remove();
		// $cont.find('> *').trigger('enter').addClass('motion-in');
		// $html.removeClass('noscroll');
		// $menu.trigger('enter');
	// }

	// Ao clicar em qualquer anchor do site
	// $(document).on('click', 'a[href]', function(e){
	$(document).on( 'click', 'a[href]:not(.external)', function(e){
		// var url = $(this).attr('href');
		// if (url.indexOf('mailto:') == 0) return;
		// if (url.indexOf('javascript:') == 0) return;
		// if ($(this)[0].href == location.href) return true; // Alteração solicitada, para carregar mesmo se estiver na página!
		// e.preventDefault();
		// change(url, $(this).data('page'));
		// history.pushState(null, null, url);
		// $('html,body').animate({scrollTop: 0}, 1);
	});

	//Ao mudar de página pelo botão voltar/avançar do browser
	setTimeout(function(){
		window.addEventListener('popstate', function(e){
			change(location.href);
		});
	}, 1000);

}

function change(url, newPage){

	if (timer) clearTimeout(timer);
	if (promise && promise.abort) promise.abort();

	var $currSec 	= $cont.find('> *');
	oldPage 		= $main.attr('data-page');

	//Objeto da requisição
	promise = $.ajax({url: url});

	beforeLeave($currSec, oldPage, newPage);
	$currSec.trigger('leave', [newPage]).addClass('motion-out');
	app.components.header.hideMenu(); 

	$menu.trigger('leave');
	$header.removeClass('motion-in');

	app.components.loader.initMotion();

	setTimeout(function(){
		app.components.loader.inMotion();

		setTimeout(function(){
			timer = setTimeout(function(){
				promise.error(function(){
					location.href = url;
				}).success(function(resp){
					handleHTML(resp);
				});
			}, 0);

		}, 1000);

	}, $cont.data('motion-out-time') || 800);
}

function handleHTML(html){

	var $all 		= $(html);
	var $pageTitle 	= $all.filter('title');
	var $pageMenu 	= $all.find($menu.selector);
	var $pageHeader = $all.find($header.selector);
	var $pageFooter = $all.find($footer.selector);
	var $pageCont 	= $all.find($cont.selector);
	var $pageMain 	= $all.filter($main.selector);
	var $newSec 	= $pageCont.find('> *');
	var $oldSec 	= $cont.find('> *').not($newSec);
	var newPage     = $pageMain.attr('data-page');
	var $tempSec 	= $temp.find('> *');
	var isReused;

	if (location.href == $tempSec.data('location') && $tempSec.data('persist')) {
		$newSec = $tempSec;
		isReused = true;
	}

	beforeLoadNew($newSec, $oldSec, oldPage, newPage);

	
	app.loader({
		elem: $newSec,
		testDelay: _loadDelay,
		progress: function(pcent){
			if(newPage != 'about-person'){
				var _pcent 		= parseInt(pcent);
				app.components.loader.progressMotion(_pcent);
			}
		},
		complete: function(){
			
			if(newPage == 'contact' || newPage == 'about-approach' || newPage == 'about-person'){

				setTimeout(function(){
					app.components.loader.progressMotion(0);
					setTimeout(function(){
						app.components.loader.progressMotion(20);
						setTimeout(function(){
							app.components.loader.progressMotion(40);
							setTimeout(function(){
								app.components.loader.progressMotion(60);
								setTimeout(function(){
									app.components.loader.progressMotion(80);
									setTimeout(function(){
										app.components.loader.progressMotion(100);
									}, 100);
								}, 100);
							}, 100);
						}, 100);
					}, 100);
				}, 50);

				setTimeout(function(){
					setInnerLoader($pageTitle,$pageMenu,$pageHeader,$pageFooter,$pageCont,$pageMain,$newSec,$oldSec,newPage);
				}, 800);
			}else{
				setInnerLoader($pageTitle,$pageMenu,$pageHeader,$pageFooter,$pageCont,$pageMain,$newSec,$oldSec,newPage);
			}
			
			
		},
	});

}


function setFirstLoader(){

	app.components.loader.outMotion('1');
	app.components.pages.initScroll();
	
	setTimeout(function(){
		
		app.components.loader.outMotion('2');
			
		setTimeout(function(){
			
			app.components.loader.hide();
			
			$menu.trigger('enter').addClass('motion-in');
			$header.addClass('motion-in');
			$cont.find('> *').trigger('enter').addClass('motion-in').attr('data-url', location.href);
	
			activeMenus($main.data('page'));

		}, 2000);
		
	}, 1000);
}

function setInnerLoader(_pageTitle,_pageMenu,_pageHeader, _pageFooter, _pageCont, _pageMain, _newSec, _oldSec,_newPage){

	var $pageTitle 	= _pageTitle;
	var $pageMenu 	= _pageMenu;
	var $pageHeader = _pageHeader;
	var $pageFooter = _pageFooter;
	var $pageCont 	= _pageCont;
	var $pageMain 	= _pageMain;
	var $newSec 	= _newSec;
	var $oldSec 	= _oldSec;
	var newPage     = _newPage;
	var isReused;

	app.components.loader.outMotion('1');
	app.components.pages.destroyScroll();
		
	setTimeout(function(){

		// Atualiza elementos da página
		$title.html( $pageTitle.html() );
		$main.attr('data-page', newPage);
		$main.attr('class', $pageMain.attr('class') );
		$header.attr('class', $pageHeader.attr('class'));
		$footer.attr('class', $pageFooter.attr('class'));
	
		// $menu.attr('class', $pageMenu.attr('class'));
		// $menu.trigger('enter').addClass('motion-in');
	
		activeMenus(newPage);

		$newSec.hide().appendTo($cont);
		$oldSec.addClass('leaving');

		$newSec.show();
		if (!isReused) app.initComponents($newSec);
		app.svg();

		$('html,body').animate({scrollTop: 0}, 1);

		app.components.pages.initScroll();
		
		app.components.loader.outMotion('2');

		$oldSec.stop().fadeOut($oldSec.data('motion-out-fade') || 0, function(){
			
			$temp.empty();
			$oldSec.appendTo($temp).removeClass('leaving motion-in motion-out');

			setTimeout(function(){
				$newSec.trigger('enter', [oldPage]).addClass('motion-in');
				$newSec.attr('data-location', location.href);
				$header.addClass('motion-in');

				app.components.loader.hide();
				
			}, 1500 );

			afterEnter($newSec, $oldSec, oldPage, newPage);
		});

	}, 1000);
}

// No momento do clique no link
function beforeLeave($oldSec, oldPage, newPage){

	// if( oldPage == 'home' || newPage == 'home' ){
		// $menu.removeClass('motion-in');
	// }
}

//Após carregar o HTML da próxima página, mas antes mostrar o loader das imagens
function beforeLoadNew($newSec, $oldSec, oldPage, newPage){}

//Após mostrar a próxima página
function afterEnter($newSec, $oldSec, oldPage, newPage){
	// if( newPage == 'home' || newPage == 'about' ){
	// 	$main.removeClass('motion-in');
	// }else{
	// 	$main.addClass('motion-in');
	// }
}

function activeMenus(page){
	$('.menu').find('.item').removeClass('active');
	$('.menu').find('.item').filter('[data-target="'+page+'"]').addClass('active');

	console.log(page);
}

module.exports = init;