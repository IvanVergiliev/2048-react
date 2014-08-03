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
  render: function () {
    var rows = [];
    for (var row = 0; row < Board.size; ++row) {
      var columns = [];
      for (var column = 0; column < Board.size; ++column) {
        columns.push(<Cell value={this.state.board.cells[row][column]} />);
      }
      rows.push(<div>{columns}</div>);
    }
    return (
      <div className='board' onKeyUp={this.handleKeyUp} tabIndex="1">
        {rows}
      </div>
    );
  }
});

var Cell = React.createClass({
  render: function () {
    return (
      <span className={'cell ' + 'cell' + this.props.value}>{this.props.value || ''}</span>
    );
  }
});

React.renderComponent(<BoardView />, document.getElementById('boardDiv'));
