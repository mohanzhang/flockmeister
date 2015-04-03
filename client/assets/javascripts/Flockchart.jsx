var $ = require('jquery');
var React = require('react/addons');
var Marty = require('marty');

var Button = require('react-bootstrap/lib/Button');

import { FlockchartActionCreators } from './actions/FlockchartActionCreators.jsx'
import { FlockchartStore } from './stores/FlockchartStore.jsx'

class Flockchart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="flockchart">
        <h4>flockchart&trade;</h4>
        <hr />
        { this.renderButton.bind(this)() }
        <hr />
        { this.renderChart.bind(this)() }
      </div>
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <Button onClick={this.requestChart.bind(this)} bsStyle='primary'>
          Generate
        </Button>
      );
    }
  }

  renderChart() {
    if (this.props.chartData.length > 0) {
      return <img alt="Generated flockchart" src={"data:image/png;base64," + this.props.chartData} />;
    } else {
      return null;
    }
  }

  peckingOrder() {
    var idToName = _.object(
      _.map(this.props.chickens, (c) => { return [c.id, c.name] })
    );

    var idToVictimNames = _.object(
      _.map(this.props.pecks, (pd) => {
        var victimNames = _.map(pd.victims, (id) => { return idToName[id] });
        return [pd.id, victimNames]
      })
    );

    return _.map(this.props.chickens, (chicken) => {
        return {name: chicken.name, pecks: idToVictimNames[chicken.id]}
      });
  }

  requestChart() {
    FlockchartActionCreators.requestChart(this.peckingOrder.bind(this)());
  }
}

var _Flockchart = Marty.createContainer(Flockchart, {
  listenTo: FlockchartStore,

  fetch() {
    return {
      chartData: FlockchartStore.for(this).getChartData(),
      loading: FlockchartStore.for(this).getLoadingState()
    }
  },

  failed(errors) {
    return <div>{errors}</div>
  }
});

export { _Flockchart as Flockchart }
