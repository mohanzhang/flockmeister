var __path__ = '../ChickenStore.jsx';

describe('ChickenStore', () => {
  jest.dontMock(__path__);
  var ChickenStore = require(__path__).ChickenStore; // required possibly due to Marty.register?

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  describe('.nextId', () => {
    it("is 0 if there are no chickens", () => {
      ChickenStore.setState({chickens: []});
      expect(ChickenStore.nextId()).toBe(0);
    });

    it("chooses the max + 1 for the next id", () => {
      ChickenStore.setState({chickens: [{id: 5}, {id: 9}]});
      expect(ChickenStore.nextId()).toBe(10);
    });
  });

  describe('.addChicken', () => {
    it("sets the name of the chicken and assigns an id", () => {
      ChickenStore.setState({chickens: []});
      ChickenStore.addChicken("Sugarcube");
      expect(ChickenStore.getChickens()).toEqual([{id: 0, name: "Sugarcube"}]);
    });
  });

  describe('.selectChicken', () => {
    it("sets the currentChickenId to the provided id", () => {
      ChickenStore.selectChicken(5);
      expect(ChickenStore.getState().currentChickenId).toBe(5);
    });
  });

  describe('.getCurrentChicken', () => {
    it("selects the chicken based on the current chicken Id", () => {
      ChickenStore.setState({chickens: [{id: 5, name: "Moomoo"}]});
      ChickenStore.selectChicken(5);
      expect(ChickenStore.getCurrentChicken()).toEqual({id: 5, name: "Moomoo"});
    });
  });

  describe('.togglePeck', () => {
    it("adds a chicken to the pecks list based on the current chicken", () => {
      ChickenStore.setState({chickens: [{id: 3, name: "France"}], pecks: [{id:3, victims: []}]});
      ChickenStore.selectChicken(3);
      ChickenStore.togglePeck(10);
      expect(ChickenStore.getCurrentPecks()).toEqual([10]);
    });

    it("removes a chicken if it has already been pecked", () => {
      ChickenStore.setState({chickens: [{id: 3, name: "France"}], pecks: [{id:3, victims: [10]}]});
      ChickenStore.selectChicken(3);
      ChickenStore.togglePeck(10);
      expect(ChickenStore.getCurrentPecks()).toEqual([]);
    });
  });
});
