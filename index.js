var net = require('net');
var parseXMLString = require('xml2js').parseString;

/**
 * Create a server to respond to the debugger engine.
 *
 * @param  {Socket} connection
 */
var server = net.createServer(function(socket) { //'connection' listener
	console.log('socket connected to server');
	socket.on('end', function() {
		console.log('socket disconnected to server');
	});
	/**
	 * When the debugger engine sends a message over port 9000,
	 * send a response.
	 *
	 * @param  {Buffer} data
	 */
	socket.on('data', function(data) {
		// Data comes through as a buffer, stringify it.
		var dataStringified = data.toString(),
			splitData = null,
			xmlStatement = null,
			dataLength = null;
		console.log( dataStringified );
		return;
		// Data comes through as a string separated by a null byte, so split it up.
		splitData = dataStringified.split('\u0000');
		dataLength = splitData[0];
		xmlStatement = splitData[1];
		parseXMLString( xmlStatement, function( err, result ) {
			console.dir(result);
			if ( typeof result == 'undefined' ) {
				console.dir(err);
				return;
			}
			if ( 'init' in result ) {

				// socket.write( 'feature_get -i 1 -n language_supports_threads' );
				// socket.write( 'breakpoint_set -i 1 -t line -f index.php -n 100' );
				// socket.write( 'run -i 1' );
				socket.end( 'run -i 1' );
			}
		});
	});
});

/**
 * Listen to port 9000 to create connections from the debugger engine to the server.
 */
server.listen(9000, function() { //'listening' listener
	console.log('server listening on port 9000');
});