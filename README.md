2048-react
==========

This is a clone of [2048](http://gabrielecirulli.github.io/2048/) implemented using React. It's running live [here](http://ivanvergiliev.github.io/2048-react/).

The game logic is implemented in [board.js](https://github.com/IvanVergiliev/2048-react/blob/master/src/board.js). It was much cleaner at first, but in order to get movement animations, a lot of state needs to be saved for each of the tiles on the board.

### React

The view logic is in [index.js](https://github.com/IvanVergiliev/2048-react/blob/master/src/index.js). There is one main component called [BoardView](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/index.js#L3-L72) which keeps a Board object as its state. It handles all the events by forwarding them to the Board appropriately, and then propagates the changes to its child components. As promised by React, there is almost no direct DOM manipulation - except for attaching the keyDown listener to ```window``` so the events can be handled on the whole page instead of only when the board is focused.

The [Cell](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/index.js#L74-L83) is used only for the lighter grey background when there is no tile on a given position.

The [TileView](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/index.js#L85-L118) is where most of the fun view stuff happens. It receives a [Tile](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/board.js#L14-L23) in its props object and determines whether it is new or moving, and if it's moving - what are the source and the destination. Then it sets the appropriate CSS classes in order to trigger the correct animations.

### CSS Animations

The animations are implemented in CSS3. Since there is a separate class for each movement from cell A to cell B, those classes cannot be written directly in CSS (or, at least, it would be really suboptimal) and have to be generated. This happens with SASS in [style.scss](https://github.com/IvanVergiliev/2048-react/blob/30455294382b403ad8944c473d5f1f06d5813096/src/style.scss).

One optimization used to minimize the generated CSS size was to separate the tile movement into row and column movement. That is, instead of generating a separate animation for each quadruple `(startRow, startColumn)` -> `(endRow, endColumn)` (as can be seen [here](https://github.com/IvanVergiliev/2048-react/blob/e001a9dbe89e69540cb619f98e9f38c7dfb80e1a/style.scss#L10-L35)), the observation is made that every movement is either completely horizontal or completely vertical. This means that there can be 2*4^2 animations of the form `(startRow)` -> `(endRow)` and `(startColumn)` -> `(endColumn)` instead of 4^4 animations of the other form. This decreased the generated CSS size from about 70KB  to about 10KB.


## Building and running

To run, simply start a web server serving the main project directory. For example, using ```node-static```, you can do

    npm install -g node-static
    static -p 8000
    
and the game will be accessible on ```localhost:8000```.

If you change a file which needs to be rebuilt (that is, any file inside the ```src``` dir), you need to run ```gulp```.

    npm install -g gulp
    npm install
    gulp build   # to rebuild the files once, or
    gulp   # to watch the files for changes and rebuild continously.
