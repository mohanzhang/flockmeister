var $ = require('jquery');
var React = require('react/addons');

var Button = require('react-bootstrap/lib/Button');

import { FlockchartActionCreators } from './actions/FlockchartActionCreators.jsx'

class Flockchart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="flockchart">
        <h4>flockchart&trade;</h4>
        <hr />
        <Button onClick={this.requestChart.bind(this)} bsStyle='primary'>
          Generate
        </Button>
        <div className="imageMount"></div>
      </div>
    );
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

export { Flockchart }
