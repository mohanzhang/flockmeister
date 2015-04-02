var $ = require('jquery');
var Marty = require('marty');

import { FlockchartSourceActionCreators } from '../actions/FlockchartSourceActionCreators'

class FlockchartAPI extends Marty.StateSource {
  getChart() {
    return (
      new Promise(function(resolve) {
        $.get("/flockchart.png", function(result) {
          FlockchartSourceActionCreators.updateChart(result);
          resolve();
        });
      })
    );
  }
}

export { FlockchartAPI }
