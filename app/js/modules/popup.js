module.exports = function(url, width, height){

	var wLeft = window.screen.left || window.screenLeft || 0;
	var wTop = window.screen.top || window.screenTop || 0;
	var left = (window.screen.width / 2) - ((width / 2) + 10) + wLeft;
	var top = (window.screen.height / 2) - ((height / 2) + 50) + wTop;
	
	window.open(url, 'popup'+url, 'status=no, height=' + height + ', width=' + width + ', resizable=yes, left=' + left + ', top=' + top + ', screenX=' + left + ', screenY=' + top + ', toolbar=no, menubar=no, scrollbars=no, location=no, directories=no');

}