require( 'babel/register' );

var server = require( './lib' );
var Logger = require( './lib/Logger' );

var logger = new Logger( 'ta' );

server.listen( 8080, function () {
  logger.log( 'Listening on port 8080.' );
});

