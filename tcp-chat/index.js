var net = require('net');

var count = 0;
var users = [];

var server = net.createServer(function (connection) {
	connection.setEncoding('utf8');
	var nickname;

	connection.write(
		'\r\n > Welcome to \033[92mode-chat\033[39m!'
		+ '\r\n >' + count + ' other people are connected at this time'
		+ '\r\n > please write your name and press enter\r\n'
	);
	count++;

	connection.on('data', function (data) {
		data = data.replace('\r\n', '');

		if (!nickname) {
			if (users[data]) {
				connection.write('\033[93m> nickname already in use, try again:\033[39m');
				return;
			}
			else {
				nickname = data;
				users[nickname] = connection;

				for (var i in users) {
					users[i].write('\033[90m> ' + nickname + ' joined the room\033[39m\n');
				}
			}
		}
		else {
			for (var i in users) {
				if (i != nickname) {
					users[i].write('\033[96m > ' + nickname + ':\033[39m ' + data + '\r\n');
				}
			}
		}
	});

	connection.on('close', function () {
		count--;
	});
});

server.listen(3000, function () {
	console.log('\033[90m server listening on *:3000\033[39m');
});