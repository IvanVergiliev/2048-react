/** @jsx React.DOM */

var BoardView = React.createClass({
  getInitialState: function () {
    return {board: new Board};
  },
  handleKeyUp: function (event) {
    console.log(event);
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      var direction = event.keyCode - 37;
      this.state.board.move(direction);
      this.setState({board: this.state.board});
    }
  },
  componentDidMount: function () {
    this.getDOMNode().focus();
  },
  render: function () {
    var rows = this.state.board.cells.map(function (row) {
      return <div>{row.map(function (value) {return <Cell value={value} />; })}</div>;
    });
    return (
      <div className='board' onKeyUp={this.handleKeyUp} tabIndex="1">
        {rows}
      </div>
    );
  }
});

var Cell = React.createClass({
  render: function () {
    var classByValue = 'cell' + this.props.value;
    var classes = React.addons.classSet('cell', classByValue);
    return (
      <span className={classes}>{this.props.value || ''}</span>
    );
  }
});

React.renderComponent(<BoardView />, document.getElementById('boardDiv'));
