var $ = require('jquery');
var React = require('react/addons');
var _ = require('lodash');

var Input = require('react-bootstrap/lib/Input');
var Button = require('react-bootstrap/lib/Button');

import { ChickenActionCreators } from './actions/ChickenActionCreators'

class Flock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { inputValue: '' };
  }

  handleChange() {
    this.setState({ inputValue: this.refs.input.getValue() });
  }

  render() {
    return (
      <div>
        <h4>Your Ladies</h4>
        <ol>
          {this.renderNametags.bind(this)()}
        </ol>
        <Input type='text'
               ref='input'
               value={this.state.inputValue}
               onChange={this.handleChange.bind(this)}
               placeholder='Enter a name' />
        <Button onClick={this.addChicken.bind(this)}>
          Add Chicken
        </Button>
      </div>
    );
  }

  renderNametags() {
    return _.map(this.props.chickens, (x) => {
      var active = false;

      if (typeof this.props.activeChicken !== 'undefined') {
        active = x.id == this.props.activeChicken.id;
      }

      return <Nametag chicken={x} active={active} />
    });
  }

  addChicken() {
    ChickenActionCreators.addChicken(this.state.inputValue);
    this.setState({inputValue: ''});
  }
}

class Nametag extends React.Component {
  render() {
    return (
      <li onClick={this.selectChicken.bind(this)} className={this.props.active ? "active" : ""}>
        {this.props.chicken.name}
      </li>
    );
  }

  selectChicken() {
    ChickenActionCreators.selectChicken(this.props.chicken.id);
  }
}

export { Flock }
