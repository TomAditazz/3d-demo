var React = require('react');
var ListContainer = require('./components/ListContainer');
var ShowOSM = require('./components/ShowOSM');

var App = React.createClass({
  render: function(){
    return (
      <div className="">
        <div className="">
          <ShowOSM />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)