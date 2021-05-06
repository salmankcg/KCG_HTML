var src = './app';
var dst = './public';

config = {

	assets: [
		{
			from: [
				src + '/.htaccess',
				src + '/robots.txt',
				src + '/favicon.ico',
				src + '/assets/**/*',
				src + '/json/**/*.json',
				src + '/fonts/**/*.{ttf,eot,otf,woff,woff2,svg}',
			]
		},
		{
			from: [
				src + '/js/vendor/jquery-2.1.4.min.js',
				src + '/js/vendor/jquery.easing.1.3.js',
				// src + '/js/vendor/gsap.js',
				src + '/js/vendor/slick.min.js',
				src + '/js/vendor/flickity.pkgd.min.js',
				// src + '/js/vendor/smooth-scrollbar.js',
				src + '/js/vendor/TweenMax.min.js',
				src + '/js/vendor/scrollMagic.min.js',
				src + '/js/vendor/debug.addIndicators.min.js',
				src + '/js/vendor/animation.gsap.js',
				src + '/js/vendor/ScrollToPlugin.min.js',
				

				
			],
			to: dst + '/js/vendor.min.js'
		}
	],
	
	scripts: {
		src: src + '/js/main.js',
		dst: dst + '/js',
		sourcemaps: true,
	},

	styles: {
		src: src + '/less/main.less',
		dst: dst + '/css',
		sourcemaps: true,
	},

	htmls: {
		src: src + '/**/*.html',
		dst: dst,
		prettify: false,
	},

	images: {
		src: src + '/img/**/*.{jpg,jpeg,png,gif,svg}',
		dst: dst + '/img',
		optmize: true,
	},

	livereload: {
		onStart: true,
		proxy: false,
	},

	src: src,
	dst: dst

}

module.exports = config;