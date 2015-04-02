var Marty = require('marty');

import { ChickenConstants } from '../constants/ChickenConstants'

class ChickenActionCreators extends Marty.ActionCreators {
  addChicken(name) {
    this.dispatch(ChickenConstants.ADD_CHICKEN, name);
  }

  selectChicken(id) {
    this.dispatch(ChickenConstants.SELECT_CHICKEN, id);
  }

  togglePeckForCurrentChicken(victimId) {
    this.dispatch(ChickenConstants.TOGGLE_PECK, victimId);
  }
}

var registered = Marty.register(ChickenActionCreators);
export { registered as ChickenActionCreators }
