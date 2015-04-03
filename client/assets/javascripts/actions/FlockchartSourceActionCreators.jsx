var Marty = require('marty');

import { FlockchartConstants } from '../constants/FlockchartConstants'
import { FlockchartAPI } from '../sources/FlockchartAPI'

class FlockchartSourceActionCreators extends Marty.ActionCreators {
  updateChart(data) {
    this.dispatch(FlockchartConstants.UPDATE_CHART, data);
  }
}

var registered = Marty.register(FlockchartSourceActionCreators);
export { registered as FlockchartSourceActionCreators }
