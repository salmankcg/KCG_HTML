var _           = require('lodash');
var gulp        = require('gulp');
var spritesmith = require('gulp.spritesmith');
var filter      = require('gulp-filter');
var path        = require('path');
var chalk       = require('chalk');
var log         = require('../util/log')('sprites');
var config      = require('../config');
var src         = config.src;
var dst         = config.dst;
var folders     = config.sprites.files;

function init(){
  
	_(folders).each(function(folder){
		spriter('/img/' + folder + '/**/*.png');
	});

}

function spriter(spriteSrcDir, spriteImgDst){

	// Deduções partindo do spriteSrcDir
	var styleFormat = 'less';
	var srcPath = path.join(src, spriteSrcDir);
	var mirror = path.dirname(spriteSrcDir).replace(/\*/g,'');
	var spriteSufix = path.basename(mirror);

	// Setando paths e nomes de destino
	var spriteImgDst = spriteImgDst? path.join(dst, spriteImgDst) : path.resolve(path.join(dst, mirror), '..');
	var styleDst = path.join(src, styleFormat, 'generated');
	var spriteName = spriteSufix + '.png';
	var styleName = spriteSufix + '.' + styleFormat;
	
	// Spritesmith com engine pngsmith
	var spriteData =  gulp.src(srcPath)
		.pipe(filter('*.png'))
		.pipe(spritesmith({
			algorithm: 'binary-tree',
			padding: 10,
			imgName: spriteName,
			cssName: styleName,
			cssFormat: styleFormat,
			imgPath: '../img/' + spriteName,
			engine: 'pngsmith'
		}));

	spriteData['img'].pipe(gulp.dest(spriteImgDst));
	spriteData['css'].pipe(gulp.dest(styleDst));

	log('Saved \"'+chalk.green(spriteName)+'\" and \"'+chalk.green(styleName)+'\"');

}

gulp.task('sprites', init);
module.exports = init;