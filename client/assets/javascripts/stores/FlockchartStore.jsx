var Marty = require('marty');
var _ = require('lodash');

import { FlockchartConstants } from '../constants/FlockchartConstants'

class FlockchartStore extends Marty.Store {
  constructor(options) {
    super(options);

    this.state = {
      loading: false,
      chartData: ''
    };

    this.handlers = {
      requestChart: FlockchartConstants.GENERATE,
      updateChart: FlockchartConstants.UPDATE_CHART
    };
  }

  getChartData() {
    return this.state.chartData;
  }

  getLoadingState() {
    return this.state.loading;
  }

  requestChart() {
    this.state.loading = true;
    this.hasChanged();
  }

  updateChart(data) {
    this.state.loading = false;
    this.state.chartData = data;
    this.hasChanged();
  }
}

var _FlockchartStore = Marty.register(FlockchartStore)
export { _FlockchartStore as FlockchartStore }

