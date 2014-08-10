/** @jsx React.DOM */

var BoardView = React.createClass({
  getInitialState: function () {
    return {board: new Board};
  },
  handleKeyUp: function (event) {
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
    var cells = this.state.board.cells.map(function (row) {
      return <div>{row.map(function () {return <Cell />; })}</div>;
    });
    var tiles = this.state.board.tiles.filter(function (tile) {
      return tile.value != 0;
    }).map(function (tile) {
      return <TileView tile={tile} />;
    });
    return (
      <div className='board' onKeyUp={this.handleKeyUp} tabIndex="1">
        {cells}
        {tiles}
      </div>
    );
  }
});

var Cell = React.createClass({
  shouldComponentUpdate: function () {
    return false;
  },
  render: function () {
    return (
      <span className='cell'>{''}</span>
    );
  }
});

var TileView = React.createClass({
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
    var classByValue = 'tile' + this.props.tile.value;
    if (tile.mergedInto) {
      var classByPosition = '';
    } else {
      var classByPosition = 'position_' + tile.row + '_' + tile.column;
    }
    var classes = React.addons.classSet('tile', classByValue, classByPosition);
    classes += tile.mergedInto ? ' merged' : '';
    if (tile.oldRow == -1 && !tile.mergedInto) {
      classes += ' new';
    }
    if (tile.hasMoved()) {
      classes += ' row_from_' + tile.fromRow() + '_to_' + tile.toRow();
      classes += ' column_from_' + tile.fromColumn() + '_to_' + tile.toColumn();
      classes += ' isMoving';
    }
    return (
      <span className={classes} key={tile.id}>{tile.value}</span>
    );
  }
});

React.renderComponent(<BoardView />, document.getElementById('boardDiv'));
