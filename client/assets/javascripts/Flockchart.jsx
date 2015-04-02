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
      </div>
    );
  }

  requestChart() {
    FlockchartActionCreators.requestChart();
  }
}

export { Flockchart }
