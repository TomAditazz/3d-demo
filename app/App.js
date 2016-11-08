var React = require('react');
var ListContainer = require('./components/ListContainer');
var ShowOSM = require('./components/ShowOSM');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          test
          <ListContainer />
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