import _ from 'highland';
import N from 'nano';

/**
 * For convenience, let's just wrap the entire nano library in Highland streams.
 */
var nano = N( 'http://localhost:5984' );
var db = nano.use( 'ta-dev' );
var database = {
  view: _.wrapCallback( db.view ),
  get: _.wrapCallback( db.get ),
  list: _.wrapCallback( db.list )
};

export var conn = _.streamifyAll( nano );
export default database;

