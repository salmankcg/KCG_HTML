var base = '';

function ajax(){

	//Argumentos Polimórficos
	var args = app.polymorphism(arguments);
	var method = args.next('string');
	var url = args.next('string') || '';
	var data = args.next('object') || {};
	var callback = args.next('function') || function(){};

	function onResponse(resp){

		//Server Error
		if (resp.then) {
			if (resp.responseText) resp = JSON.parse(resp.responseText);
			else if (resp.responseJSON) resp = resp.responseJSON;
			else resp = {};
		}

		console.log('[API]', url, resp);
		callback(resp);

	}

	//Configurações do AJAX
	var options = {
		url: base + url,
		type: method,
		dataType: 'JSON',
		data: data,
		// contentType: 'application/json',
		jsonp: false,
		success: onResponse,
		error: onResponse,
		cache: false,
	};

	//Upload de arquivo
	if (method == 'UPLOAD') {
		var formData = new FormData();
		Object.keys(data).forEach(function(key){
			if (data[key] instanceof jQuery) data[key] = data[key][0].files[0];
			formData.append(key, data[key]);
		});
		$.extend(options, {
			type: 'POST',
			data: formData,
			contentType: false,
			processData: false,
		});
	}

	//Faz a requisição
	return $.ajax(options);

}

function method(verb){
	return function(){
		var args = Array.prototype.slice.call(arguments);
		args.unshift(verb);
		return ajax.apply(this, args);
	}
}

module.exports = {
	get: method('GET'),
	post: method('POST'),
	put: method('PUT'),
	delete: method('DELETE'),
	upload: method('UPLOAD'),
	base: base,
	root: base.replace('/api/', '/'),
}