var $ = require('jquery');
var React = require('react/addons');
var _ = require('lodash');

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

import { ChickenActionCreators } from './actions/ChickenActionCreators'

class PeckSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h4>Who have you seen her peck?</h4>
        <ol>
          {this.renderNametags.bind(this)()}
        </ol>
      </div>
    );
  }

  renderNametags() {
    return _.map(this.props.chickens, (c) => {
      if (typeof this.props.activeChicken !== 'undefined' && this.props.activeChicken.id == c.id) {
        return <Nametag chicken={c} disabled={true} />;
      }

      if (typeof this.props.activePecks !== 'undefined') {
        var active = _.contains(this.props.activePecks, c.id);
        return <Nametag chicken={c} active={active} />;
      }
    });
  }
}

class Nametag extends React.Component {
  render() {
    if (this.props.disabled) {
      return (
        <li className="disabled">{this.props.chicken.name}</li>
      );
    }

    return (
      <li onClick={this.toggleChicken.bind(this)} className={this.props.active ? "active" : ""}>
        {this.props.chicken.name}
      </li>
    );
  }

  toggleChicken() {
    ChickenActionCreators.togglePeckForCurrentChicken(this.props.chicken.id);
  }
}


export { PeckSelector }

