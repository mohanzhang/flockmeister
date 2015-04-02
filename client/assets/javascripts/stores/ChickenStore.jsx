var Marty = require('marty');
var _ = require('lodash');

import { ChickenConstants } from '../constants/ChickenConstants'

class ChickenStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
      chickens: [],
      pecks: [],
      currentChickenId: -1
    };

    this.handlers = {
      addChicken: ChickenConstants.ADD_CHICKEN,
      selectChicken: ChickenConstants.SELECT_CHICKEN,
      togglePeck: ChickenConstants.TOGGLE_PECK
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

  getPecks() {
    return this.state.pecks;
  }

  getCurrentChicken() {
    return _.find(this.state.chickens, (c) => c.id == this.state.currentChickenId);
  }

  getCurrentPecks() {
    var peckData = _.find(this.state.pecks, (p) => p.id == this.state.currentChickenId);
    if (typeof peckData !== 'undefined') {
      return peckData.victims;
    } else {
      return [];
    }
  }

  addChicken(name) {
    var id = this.nextId();

    this.state.chickens.push({
      id: id,
      name: name
    });

    this.state.pecks.push({
      id: id,
      victims: [],
    });

    this.hasChanged();
  }

  selectChicken(id) {
    this.state.currentChickenId = id;
    this.hasChanged();
  }

  togglePeck(victimId) {
    var peckData = _.find(this.state.pecks, (p) => p.id == this.state.currentChickenId);
    if (_.contains(peckData.victims, victimId)) {
      var indexToDelete = peckData.victims.indexOf(victimId);
      peckData.victims.splice(indexToDelete, 1);
    } else {
      peckData.victims.push(victimId);
    }

    this.hasChanged();
  }
}

var _ChickenStore = Marty.register(ChickenStore)
export { _ChickenStore as ChickenStore }
