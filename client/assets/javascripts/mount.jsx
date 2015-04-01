var $ = require('jquery');
var React = require('react/addons');

import { App } from 'App'

var render = () => {
  React.render(
    <App />, document.getElementById('mount-app')
  );
};

$(function() {
  render();
});
