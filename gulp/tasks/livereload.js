var gulp        = require('gulp');
var browserSync = require('browser-sync');
var configBS    = require('../util/config-browser-sync');

function init(){
	browserSync(configBS);
}

gulp.task('livereload', init);
gulp.task('serve', init);
module.exports = init;