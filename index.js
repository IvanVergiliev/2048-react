/** @jsx React.DOM */

var rotateLeft = function (matrix) {
  var rows = matrix.length;
  var columns = matrix[0].length;
  var res = [];
  for (var i = 0; i < rows; ++i) {
    res.push([]);
  }
  for (var row = 0; row < rows; ++row) {
    for (var column = 0; column < columns; ++column) {
      res[row][column] = matrix[column][columns - row - 1];
    }
  }
  return res;
};

var Board = function () {
  this.cells = [];
  for (var i = 0; i < Board.size; ++i) {
    this.cells[i] = [0, 0, 0, 0];
  }
  this.addRandomTile();
};

Board.size = 4;

Board.prototype.moveLeft = function () {
  var hasChanged = 0;
  for (var row = 0; row < Board.size; ++row) {
    for (var target = 0; target < Board.size; ++target) {
      var initialValue = this.cells[row][target];
      var i = target;
      while (i < Board.size && this.cells[row][i] == 0) {
        ++i;
      }
      if (i == Board.size) {
        continue;
      }
      var targetValue = this.cells[row][i];
      this.cells[row][i] = 0;
      while (i < Board.size && this.cells[row][i] == 0) {
        ++i;
      }
      if (i < Board.size && this.cells[row][i] == targetValue) {
        targetValue *= 2;
        this.cells[row][i] = 0;
      }
      this.cells[row][target] = targetValue;
      hasChanged |= (initialValue != targetValue);
    }
  }
  return hasChanged;
};

Board.prototype.addRandomTile = function () {
  var emptyCells = [];
  for (var r = 0; r < Board.size; ++r) {
    for (var c = 0; c < Board.size; ++c) {
      if (this.cells[r][c] == 0) {
        emptyCells.push({r: r, c: c});
      }
    }
  }
  var index = ~~(Math.random() * emptyCells.length);
  var cell = emptyCells[index];
  this.cells[cell.r][cell.c] = 2;
};

Board.prototype.move = function (direction) {
  // 0 -> left, 1 -> up, 2 -> right, 3 -> down
  for (var i = 0; i < direction; ++i) {
    this.cells = rotateLeft(this.cells);
  }
  var hasChanged = this.moveLeft();
  for (var i = direction; i < 4; ++i) {
    this.cells = rotateLeft(this.cells);
  }
  if (hasChanged) {
    this.addRandomTile();
  }
};

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
