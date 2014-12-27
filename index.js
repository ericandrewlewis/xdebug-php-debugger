var net = require('net');
var parseXMLString = require('xml2js').parseString;

var server = new net.Server();

server.on('connection', function(socket){
	socket.on('data', function(data) {
		var dataStringified = data.toString();
		var splitData = dataStringified.split('\u0000');
		xmlStatement = splitData[1];
		console.log(dataStringified);

		parseXMLString( xmlStatement, function( err, result ) {
			if ( result.init ) {
				// socket.write( 'feature_get -i 1 -n language_name\u0000' );
				socket.write( 'breakpoint_set -i 1 -t line -f index.php -n 14\u0000' );
				socket.write( 'run -i 1\u0000' );
			}
		});
	});
	// socket.pipe(socket);
});
server.listen(9000);