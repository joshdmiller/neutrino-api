import express from 'express';
import debug from 'debug';
import swe from 'swagger-node-express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Logger from './Logger';

import CompetitionModel from './models';
import * as CompetitionResources from './resources/competitions';

let logger = new Logger( 'ta::server' );

logger.log( 'model', CompetitionModel );
logger.log( 'resources', CompetitionResources );

var server = express();
var apiv1 = express();
var swagger = swe.createNew( apiv1 );

var corsOptions = {
  credentials: true,
  origin: function ( origin, callback ) {
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

swagger.addModels({ Competition: CompetitionModel })
  .addGet( CompetitionResources.getOne )
  ;

swagger.configureDeclaration( 'competitions', {
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

swagger.configureSwaggerPaths( '', '', '' );
swagger.configure( 'http://localhost:8080', '0.0.1' );

// Default to serving v1
server.get( '/', ( req, res ) => res.redirect( 301, '/v1' ) );

/**
 * Error handling
 */

server.use( function ( err, req, res, next ) {
  res.status( 500 ).send({ status: 500, message: "He's dead, Jim!" });
});

server.use( function ( req, res, next ) {
  if ( ! res.headersSent ) {
    res.status( 404 ).send({ status: 404, message: 'Not found' });
  }
});

export default server;

