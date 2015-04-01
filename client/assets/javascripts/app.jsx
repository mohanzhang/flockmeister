var $ = require('jquery');
var React = require('react/addons');
var Marty = require('marty');

// For react developer tools
require("expose?React!react");

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

import { ChickenStore } from './stores/ChickenStore'
import { Flock } from './Flock'

class App extends React.Component {
  render() {
    return (
      <Row>
        <Col md={3}>
          <Flock chickens={this.props.chickens} />
        </Col>
        <Col md={3}></Col>
        <Col md={6}></Col>
      </Row>
    );
  }
}

var _App = Marty.createContainer(App, {
  listenTo: ChickenStore,
  fetch: {
    chickens() {
      return ChickenStore.for(this).getChickens();
    }
  },
  failed(errors) {
    return <div>{errors}</div>;
  }
});

export { _App as App }
