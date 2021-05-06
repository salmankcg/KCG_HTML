module.exports = function(src, callback){
	var s = document.createElement('script'), r = false, t;
	s.type = 'text/javascript';
	s.src = src;
	s.onload = s.onreadystatechange = function(){
		if (!r && (!this.readyState || this.readyState == 'complete')) {
			r = true;
			if (typeof callback == 'function') callback();
		}
	}
	t = document.getElementsByTagName('script')[0];
	t.parentNode.insertBefore(s, t);
}