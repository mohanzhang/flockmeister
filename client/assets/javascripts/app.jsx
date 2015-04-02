var $ = require('jquery');
var React = require('react/addons');
var Marty = require('marty');

var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');

import { ChickenStore } from './stores/ChickenStore'
import { Flock } from './Flock'
import { PeckSelector } from './PeckSelector'
import { Flockchart } from './Flockchart'

class App extends React.Component {
  render() {
    return (
      <Row>
        <Col md={3}>
          <Flock chickens={this.props.chickens} activeChicken={this.props.selectedChicken} />
        </Col>
        <Col md={3}>
          <PeckSelector chickens={this.props.chickens} activeChicken={this.props.selectedChicken} activePecks={this.props.activePecks} />
        </Col>
        <Col md={6}>
          <Flockchart chickens={this.props.chickens} pecks={this.props.pecks} />
        </Col>
      </Row>
    );
  }
}

var _App = Marty.createContainer(App, {
  listenTo: ChickenStore,

  fetch() {
    return {
      chickens: ChickenStore.for(this).getChickens(),
      selectedChicken: ChickenStore.for(this).getCurrentChicken(),
      activePecks: ChickenStore.for(this).getCurrentPecks(),
      pecks: ChickenStore.for(this).getPecks()
    }
  },

  failed(errors) {
    return <div>{errors}</div>
  }
});

export { _App as App }
