//Application Object
window.app = {

	//Modules
	initComponents		: require('./modules/init-components'),
	svg					: require('./modules/svg'),
	get					: require('./modules/get'),
	pageChange			: require('./modules/page-change'),
	loader				: require('./modules/loader'),
	loadScript			: require('./modules/load-script'),
	popup				: require('./modules/popup'),

	//Components
	components: {
		pages			: require('./components/pages'),
		header			: require('./components/header'),
		button			: require('./components/button'),
		testimonial		: require('./components/testimonial'),
		approach		: require('./components/approach'),
		footer			: require('./components/footer'),
		aboutWorld		: require('./components/about-world'),
		peopleScramble	: require('./components/people-scramble'),
		// homeBullets		: require('./components/home-bullets'),
		people			: require('./components/people'),
		highlights		: require('./components/highlights'),
		worksList		: require('./components/works-list'),
		form			: require('./components/form'),
		clients			: require('./components/clients'),
		loader			: require('./components/loader'),
		title			: require('./components/title'),
	},

	//Templates
	templates: { },

	init: function(){
		app.initComponents();
		app.pageChange();
		app.svg();
	},
};

$(app.init); // Init on Document Ready
