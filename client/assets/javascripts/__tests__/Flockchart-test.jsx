var __path__ = '../Flockchart.jsx';

describe('Flockchart', () => {
  jest.dontMock('../stores/FlockchartStore.jsx');
  jest.dontMock(__path__);
  var Flockchart = require(__path__).Flockchart; // required possibly due to Marty.register?

  var $ = require('jquery');
  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  it("doesn't render an image when there is no chartData", () => {
    var control = TestUtils.renderIntoDocument(<Flockchart chickens={[]} pecks={[]} />)
    expect($(React.findDOMNode(control)).find("img").length).toBe(0);
  });

  describe(".peckingOrder", () => {
    it("maps names to pecks in the way flockcharter expects", () => {
      var chickens = [
        {id: 0, name: "Ella"},
        {id: 1, name: "Buff"}
      ];

      var pecks = [
        {id: 0, victims: []},
        {id: 1, victims: [0]}
      ];

      var control = TestUtils.renderIntoDocument(<Flockchart chickens={chickens} pecks={pecks} />)
      expect(control.getInnerComponent().peckingOrder()).toEqual([
        {name: "Ella", pecks: []},
        {name: "Buff", pecks: ["Ella"]}
      ]);
    });
  });
});

