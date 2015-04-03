var $ = require('jquery');
var Marty = require('marty');

import { FlockchartSourceActionCreators } from '../actions/FlockchartSourceActionCreators'

class FlockchartAPI extends Marty.StateSource {
  getChart(peckingOrder) {
    return (
      new Promise(function(resolve) {
        $.get("/flockchart", {json: JSON.stringify(peckingOrder)}, function(result) {
          FlockchartSourceActionCreators.updateChart(result);
          resolve();
        });
      })
    );
  }
}

export { FlockchartAPI }
