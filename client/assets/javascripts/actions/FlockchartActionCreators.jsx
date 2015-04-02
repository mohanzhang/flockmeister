var Marty = require('marty');

import { FlockchartConstants } from '../constants/FlockchartConstants'
import { FlockchartAPI } from '../sources/FlockchartAPI'

class FlockchartActionCreators extends Marty.ActionCreators {
  requestChart() {
    var api = new FlockchartAPI();
    api.getChart();
  }
}

var registered = Marty.register(FlockchartActionCreators);
export { registered as FlockchartActionCreators }
