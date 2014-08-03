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
  var hasChanged = false;
  for (var row = 0; row < Board.size; ++row) {
    var currentRow = this.cells[row].filter(function (x) { return x != 0; });
    var resultRow = [];
    for (var target = 0; target < Board.size; ++target) {
      var targetValue = currentRow.shift() || 0;
      if (currentRow[0] === targetValue) {
        targetValue += currentRow.shift();
      }
      resultRow[target] = targetValue;
      hasChanged |= (targetValue != this.cells[row][target]);
    }
    this.cells[row] = resultRow;
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

module.exports = Board;
