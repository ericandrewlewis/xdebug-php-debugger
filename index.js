/**
 * A bridge between Xdebug's remote debugger protocol and a web socket.
 */
var net = require('net'),
    parseXMLString = require('xml2js').parseString,
    io = require('socket.io');

var XdebugServer = new net.Server();

/**
 * When a connection is made to our Xdebug server from Xdebug.
 */
XdebugServer.on('connection', function(socket){
	/**
	 * When data comes from the Xdebug port, respond accordingly.
	 *
	 * @param  {buffer} data
	 */
	socket.on('data', function(data) {
		var dataStringified = data.toString();
		var splitData = dataStringified.split('\u0000');
		xmlStatement = splitData[1];
		console.log(dataStringified);

		parseXMLString( xmlStatement, function( err, result ) {
			if ( result.init ) {
				socket.write( 'breakpoint_set -i 1 -t line -f index.php -n 14\u0000' );
				socket.write( 'run -i 1\u0000' );
			}
		});
	});
});
XdebugServer.listen(9000);

var wsServer = new Server();
