var Marty = require('marty');
var _ = require('lodash');

import { FlockchartConstants } from '../constants/FlockchartConstants'

class FlockchartStore extends Marty.Store {
  constructor(options) {
    super(options);
  }

}

var _FlockchartStore = Marty.register(FlockchartStore)
export { _FlockchartStore as FlockchartStore }

