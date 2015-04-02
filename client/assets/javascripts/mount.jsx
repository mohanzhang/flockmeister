var $ = require('jquery');
var React = require('react/addons');

// For react developer tools
require("expose?React!react");

import { App } from 'App'

var render = () => {
  React.render(
    <App />, document.getElementById('mount-app')
  );
};

$(function() {
  render();
});
