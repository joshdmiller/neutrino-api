import express from 'express';
import competitions from './competitions/service';
import Logger from './Logger';
import * as errors from './errors';

let logger = new Logger( 'ta:Router' );

class Router {
  constructor () {
    this._router = express.Router();
    this._spec = {};
    this._handlers = {};
    this._router.get( '/swagger.json', ( req, res ) => res.json( this._spec ) );
  }

  middleware () {
    Object.getOwnPropertyNames( this._spec.paths ).forEach( path => {
      // convert to express style path
      var route = path.replace( /\/{/g, "/:" ).replace( /\}/g, "" );
      var spec = this._spec.paths[ path ];

      Object.getOwnPropertyNames( spec ).forEach( verb => {
        var operationId = spec[ verb ].operationId;
        var handler = this._handlers[ operationId ];

        if ( ! operationId ) {
          logger.warn( `No operation ID for ${method} ${path}` );
          return;
        }

        if ( ! handler ) {
          logger.warn( `No handler for method ID ${operationId}` );
          return;
        }

        console.log( `${verb} ${route}`);
        this._router[ verb ]( route, function ( req, res, next ) {
          // TODO: convert expected parameters
          var params = {
            query: {},
            header: {},
            path: {},
            body: req.body
          };

          if ( spec[ verb ].parameters ) {
            spec[ verb ].parameters.forEach( param => Router.castParam( req, params, param ) );
          }

          var handleError = err => {
            logger.error( 'Got error:', err );
            logger.error( err.stack );

            if ( ! err.statusCode ) {
              res.statusCode = 500;
            } else {
              res.statusCode = err.statusCode;
            }

            res.send( { code: res.statusCode, message: err.msg || err.toString() } );
          };

          try {
            handler( params, req )
            .stopOnError( err => handleError )
            .apply( val => {
              if ( ! val ) {
                return handleError( new errors.NotFoundError() );
              }

              res.send( val );
            });
          } catch ( err ) {
            handleError( err );
          }
        });
      });
    });

    return this._router;
  }

  spec ( spec ) {
    this._spec = spec;

    Object.getOwnPropertyNames( competitions ).forEach( key => {
      this._handlers[ `competitions#${key}` ] = competitions[ key ];
    });
  }

  // From swagger-n
  // https://github.com/paulhill/swagger-n/blob/master/lib/swagger-n.js
  static castParam ( req, params, spec ) {
    var name = spec.name;

    var scope, key;
    switch ( spec.in ) {
      case 'query':
        scope = key = 'query';
      break;
      case 'header':
        scope = key = 'header';
      break;
      case 'path':
        key = 'params';
        scope = 'path';
      break;
      case 'formData':
        // leave form data parsing to 3rd party middleware
        break;
      case 'body':
        // leave body parsing to 3rd party middleware
        break;
    }

    if ( scope === undefined ) {
      // scope not parsed
      return;
    }

    var param = req[key][name];
    if ( param === undefined ) {
      // param not found
      return;
    }

    if ( spec.type === 'string' ) {

      if ( spec.format === 'date' || spec.format === 'date-time' ) {
        // dates
        params[scope][name] = new Date(param);
      } else if ( spec.format === 'byte' ) {
        // byte array
        var bytes = [];
        for (var i = 0; i < str.length; ++i) {
          bytes.push( str.charCodeAt( i ) );
        }
        params[scope][name] = bytes;
      } else {
        // plain strings
        params[scope][name] = param;
      }
    }

    if  (spec.type === 'number' ) {
      params[scope][name] = parseFloat( param );
    }

    if (spec.type === 'integer') {
      params[scope][name] = parseInt( param, 10 );
    }

    if (spec.type === 'boolean') {
      params[scope][name] = ( param === 'true' );
    }

    if ( spec.type === 'array' ) {
      var separator; // csv default
      switch ( spec.collectionFormat ) {
        case 'csv':
          separator = ',';
        break;
        case 'ssv':
          separator = ' ';
        break;
        case 'tsv':
          separator = '\t';
        break;
        case 'pipes':
          separator = '|';
        break;
        case 'multi':
          // TODO unsupported multi
          break;
      }

      if ( ! separator ) {
        // param not found
        return;
      }

      // convert array types
      params[scope][name] = param.split( separator );
    }
  }
}

var router = new Router();

export default router;

