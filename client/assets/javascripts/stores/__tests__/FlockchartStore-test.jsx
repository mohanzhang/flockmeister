var __path__ = '../FlockchartStore.jsx';

describe('FlockchartStore', () => {
  jest.dontMock(__path__);
  var FlockchartStore = require(__path__).FlockchartStore; // required possibly due to Marty.register?

  var React = require('react/addons');
  var TestUtils = React.addons.TestUtils;

  describe('.requestChart', () => {
    it("sets loading to true", () => {
      FlockchartStore.setState({loading: false});
      FlockchartStore.requestChart();
      expect(FlockchartStore.getLoadingState()).toBe(true);
    });
  });

  describe('.updateChart', () => {
    beforeEach(() => {
      FlockchartStore.setState({loading: true, chartData: ""});
    });

    it("sets loading to false", () => {
      FlockchartStore.updateChart('');
      expect(FlockchartStore.getLoadingState()).toBe(false);
    });

    it("updates the chart data with the provided string", () => {
      FlockchartStore.updateChart('asdfasdf');
      expect(FlockchartStore.getChartData()).toBe('asdfasdf');
    });
  });
});
