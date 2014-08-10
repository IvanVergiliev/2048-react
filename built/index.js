/** @jsx React.DOM */

var BoardView = React.createClass({displayName: 'BoardView',
  getInitialState: function () {
    return {board: new Board};
  },
  handleKeyDown: function (event) {
    if (event.keyCode >= 37 && event.keyCode <= 40) {
      event.preventDefault();
      var direction = event.keyCode - 37;
      this.setState({board: this.state.board.move(direction)});
    }
  },
  handleTouchStart: function (event) {
    if (event.touches.length != 1) {
      return;
    }
    this.startX = event.touches[0].screenX;
    this.startY = event.touches[0].screenY;
    console.log(this);
    event.preventDefault();
  },
  handleTouchEnd: function (event) {
    if (event.changedTouches.length != 1) {
      return;
    }
    var deltaX = event.changedTouches[0].screenX - this.startX;
    var deltaY = event.changedTouches[0].screenY - this.startY;
    console.log(deltaX, deltaY);
    var direction = -1;
    if (Math.abs(deltaX) > 3 * Math.abs(deltaY) && Math.abs(deltaX) > 30) {
      direction = deltaX > 0 ? 2 : 0;
    } else if (Math.abs(deltaY) > 3 * Math.abs(deltaX) && Math.abs(deltaY) > 30) {
      direction = deltaY > 0 ? 3 : 1;
    }
    if (direction != -1) {
      this.setState({board: this.state.board.move(direction)});
    }
  },
  componentDidMount: function () {
    window.addEventListener('keydown', this.handleKeyDown);
  },
  componentWillUnmount: function () {
    window.removeEventListener('keydown', this.handleKeyDown);
  },
  render: function () {
    var cells = this.state.board.cells.map(function (row) {
      return React.DOM.div(null, row.map(function () {return Cell(null); }));
    });
    var tiles = this.state.board.tiles.filter(function (tile) {
      return tile.value != 0;
    }).map(function (tile) {
      return TileView({tile: tile});
    });
    return (
      React.DOM.div({className: "board", onTouchStart: this.handleTouchStart, onTouchEnd: this.handleTouchEnd, tabIndex: "1"}, 
        cells, 
        tiles
      )
    );
  }
});

var Cell = React.createClass({displayName: 'Cell',
  shouldComponentUpdate: function () {
    return false;
  },
  render: function () {
    return (
      React.DOM.span({className: "cell"}, '')
    );
  }
});

var TileView = React.createClass({displayName: 'TileView',
  shouldComponentUpdate: function (nextProps) {
    if (this.props.tile != nextProps.tile) {
      return true;
    }
    if (!nextProps.tile.hasMoved() && !nextProps.tile.isNew()) {
      return false;
    }
    return true;
  },
  render: function () {
    var tile = this.props.tile;
    var classArray = ['tile'];
    classArray.push('tile' + this.props.tile.value);
    if (!tile.mergedInto) {
      classArray.push('position_' + tile.row + '_' + tile.column);
    }
    if (tile.mergedInto) {
      classArray.push('merged');
    }
    if (tile.isNew()) {
      classArray.push('new');
    }
    if (tile.hasMoved()) {
      classArray.push('row_from_' + tile.fromRow() + '_to_' + tile.toRow());
      classArray.push('column_from_' + tile.fromColumn() + '_to_' + tile.toColumn());
      classArray.push('isMoving');
    }
    var classes = React.addons.classSet.apply(null, classArray);
    return (
      React.DOM.span({className: classes, key: tile.id}, tile.value)
    );
  }
});

React.initializeTouchEvents(true);
React.renderComponent(BoardView(null), document.getElementById('boardDiv'));
