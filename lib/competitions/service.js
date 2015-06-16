import db from '../database';
import _ from 'highland';
import * as errors from '../errors';

var service = {
  get: () => {
    return db.view( 'competitions', 'all' );
  },
  getOne: ( params, req ) => {
    return db.get( params.path.competitionId );
  }
};

export default service;

