import express from 'express';
import debug from 'debug';
import swe from 'swagger-node-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './Logger';

import competitionModel from './competitions/model';
import * as competitionResources from './competitions/resources';

let logger = new Logger( 'ta::server' );

var server = express();
var apiv1 = express();
var swagger = swe.createNew( apiv1 );

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

server.use( bodyParser.json() );
server.use( bodyParser.urlencoded() );
server.use( cors( corsOptions ) );
server.use( '/v1', apiv1 );

/**
 * Competitions
 */

swagger.addModels({ Competition: competitionModel })
  .addGet( competitionResources.get )
  .addPost( competitionResources.create )
  .addGet( competitionResources.getOne )
  .addPut( competitionResources.updateOne )
  .addDelete( competitionResources.deleteOne )
  ;

swagger.configureDeclaration( 'Competitions', {
  descriptions: 'Operations on competitions',
  produces: [ 'application/json' ]
});


/**
 * Metadata
 */

swagger.setApiInfo({
  title: 'Trivia App',
  description: 'An as-yet-unnamed party trivia application.',
  contact: 'josh@joshdavidmiller.com'
});

swagger.configureSwaggerPaths( '', '/api-docs', '' );
swagger.configure( 'http://localhost:8080/v1', '0.0.1' );

// Default to serving v1
server.get( '/', ( req, res ) => res.redirect( 301, '/v1' ) );

/**
 * Error handling
 */

server.use( function ( err, req, res, next ) {
  logger.error( 'Sending 500', err );

  res.status( 500 ).send({ code: 500, message: "He's dead, Jim!" });
});

server.use( function ( req, res, next ) {
  logger.log( `404: ${req.method} ${req.path}` );

  if ( ! res.headersSent ) {
    res.status( 404 ).send({ code: 404, message: 'Not found' });
  }
});

export default server;

