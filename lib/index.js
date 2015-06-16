import express from 'express';
import debug from 'debug';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './Logger';
import router from './Router';
import spec from './swagger';

let logger = new Logger( 'ta::server' );

var server = express();

var corsOptions = {
  credentials: true,
  origin: function ( origin, callback ) {
    return callback( null, true );
    if ( origin === undefined ) {
      callback( null, false );
    } else {
      var match = origin.match( /^(.*)?\.joshdavidmiller.com(\:[0-9]+)?/ );
      callback( null, match !== null && match.length > 0 );
    }
  }
};

router.spec( spec );

server.use( bodyParser.json() );
server.use( bodyParser.urlencoded() );
server.use( cors( corsOptions ) );
server.use( '/v1', router.middleware() );


/**
 * Error handling
 */

server.use( function ( err, req, res, next ) {
  logger.error( 'Sending 500', err );
  logger.error( err.stack );

  res.status( 500 ).send({ code: 500, message: "He's dead, Jim!" });
});

server.use( function ( req, res, next ) {
  logger.log( `404: ${req.method} ${req.path}` );

  if ( ! res.headersSent ) {
    res.status( 404 ).send({ code: 404, message: 'Not found' });
  }
});

export default server;

