var Marty = require('marty');

import { ChickenConstants } from '../constants/ChickenConstants'

class ChickenActionCreators extends Marty.ActionCreators {
  addChicken(name) {
    this.dispatch(ChickenConstants.ADD_CHICKEN, name);
  }
}

var registered = Marty.register(ChickenActionCreators);
export { registered as ChickenActionCreators }
