var $ = require('jquery');
var React = require('react/addons');

var render = () => {
  React.render(
    <div>hello</div>, document.getElementById('mount-app')
  );
};

$(function() {
  render();
});
