var http = require('http');

http.createServer(function (req, res) {
	if ('/' == req.url) {
		res.writeHead(200, {'Content-type': 'text/html'});
		res.end([
			'<form method="POST" action="/url">',
				'<h1>The form</h1>',
				'<fieldset>',
					'<label>Superhero information</label>',
					'<p>What is your superpower</p>',
					'<input type="text" name="superpower">',
					'<p><button>Submit</button></p>',
				'</fieldset>',
			'</form>'
		].join(''));
	}
	else if ('/url' == req.url && 'POST' == req.method) {
		var body = '';

		req.on('data', function (chunk) {
			body += chunk;
			console.log(body)
		});
		req.on('end', function () {
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end('<p>Content-type: ' + req.headers['content-type'] + '</p><p>Data sent: </p><pre>' + body + '</pre>');
		});
	}
}).listen(3000);