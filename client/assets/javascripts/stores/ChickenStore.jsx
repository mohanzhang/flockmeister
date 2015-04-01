var Marty = require('marty');
var _ = require('lodash');

import { ChickenConstants } from '../constants/ChickenConstants'

class ChickenStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
      chickens: [],
      pecks: []
    };

    this.handlers = {
      addChicken: ChickenConstants.ADD_CHICKEN
    };
  }

  nextId() {
    if (this.state.chickens.length == 0) {
      return 0;
    }

    return _.max(_.map(this.state.chickens, 'id')) + 1;
  }

  getChickens() {
    return this.state.chickens;
  }

  addChicken(name) {
    this.state.chickens.push({
      id: this.nextId(),
      name: name
    });

    this.hasChanged();
  }
}

var _ChickenStore = Marty.register(ChickenStore)
export { _ChickenStore as ChickenStore }
