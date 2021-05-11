var gulp    = require('gulp');
var open    = require('gulp-open');
var argv    = require('yargs').argv;
var fs      = require('fs');
var config  = require('../config');
var src     = config.src;
var path    = require('path');
var chalk   = require('chalk');
var log     = require('../util/log')('component');

function init(name){

	var name = String(argv.new) || String(name);
	var hasJS = argv.js;

	var lessPath = path.join(src, 'less', 'components', name+'.less');
	var nunjPath = path.join(src, 'nunj', 'components', name+'.nunj');
	var jsPath = path.join(src, 'js', 'components', name+'.js');
	var imgPath = path.join(src, 'img', name);

	var exts = hasJS ? '(less, nunj, img, js)' : '(less, nunj, img)';

	var lessModel = model('less', name);
	var jsModel = model('js', name);
	var nunjModel = model('nunj', name);

	var mainLessRefModel = "\n@import 'components/"+name+"';";
	var mainLess = path.join(src, 'less', 'main.less');
	var mainLessContents = fs.readFileSync(mainLess, 'utf8');

	if (mainLessContents.indexOf(mainLessRefModel) < 0) {

		//Cria arquivo LESS
		fs.writeFileSync(lessPath, lessModel);
		// gulp.src(lessPath).pipe(open());

		//Adiciona referência do componente LESS no main.less
		fs.appendFileSync(mainLess, mainLessRefModel);

		//Cria arquivo Nunjucks
		/*fs.writeFileSync(nunjPath, nunjModel);
		gulp.src(nunjPath).pipe(open());*/

		//Cria arquivo Javascript
		if (hasJS) {
			fs.writeFileSync(jsPath, jsModel);
			// gulp.src(jsPath).pipe(open());
		}

		//Cria pasta de Imagens
		// fs.mkdirSync(imgPath);

		//Log
		log('New component created "'+name+'" '+exts);

		process.exit(1);

	} else {

		//component já existente
		log(chalk.red('component "'+name+'" already referenced in main.less'));

	}

}

function model(ext, name){

	var file = path.normalize('./gulp/models/component.' + ext);
	var model = fs.readFileSync(file, 'utf8');
	return model.replace(/{{name}}/gi, name);

}

gulp.task('component', init);
gulp.task('comp', init);
module.exports = init;