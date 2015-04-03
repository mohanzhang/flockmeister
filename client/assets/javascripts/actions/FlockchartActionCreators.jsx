var Marty = require('marty');

import { FlockchartConstants } from '../constants/FlockchartConstants'
import { FlockchartAPI } from '../sources/FlockchartAPI'

class FlockchartActionCreators extends Marty.ActionCreators {
  requestChart(peckingOrder) {
    this.dispatch(FlockchartConstants.GENERATE);
    var api = new FlockchartAPI();
    api.getChart(peckingOrder);
  }
}

var registered = Marty.register(FlockchartActionCreators);
export { registered as FlockchartActionCreators }
