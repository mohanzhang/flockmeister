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
        <ol>
          {_.map(this.props.chickens, (x) => <Nametag chicken={x} />)}
        </ol>
        <Input type='text'
               ref='input'
               value={this.state.inputValue}
               onChange={this.handleChange.bind(this)}
               placeholder='Enter a name' />
        <Button onClick={this.addChicken.bind(this)}>Add Chicken</Button>
      </div>
    );
  }

  addChicken() {
    ChickenActionCreators.addChicken(this.state.inputValue);
    this.setState({inputValue: ''});
  }
}

class Nametag extends React.Component {
  render() {
    return (
      <li>
        {this.props.chicken.name}
      </li>
    );
  }
}

export { Flock }
