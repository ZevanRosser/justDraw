# justDraw
just start drawing with code

```js

smallDraw({ canvas, ctx, c, resize, draw, pause, play, destroy }) => {
  // all of the above properties are optional
  // `canvas` the canvas dom node
  // `ctx` and `c` both point to the `canvas` context
  // `resize` takes a function to be called when the window resizes
  // `draw` takes a function to be called at 60fps
  // `pause` stops the animation  (stops `draw` from running)
  // `play` restarts the animation
  // `destroy` kills everything off and removes the canvas @TODO `keepCanvas`

  resize(() => {
    // called when the page resizes
  });

  draw(({ touch, w, h, time }) => {
    // called 60fps
    // `touch` contains `x` and `y` properties for the mouse location
    //  these are identical to `touch[0].clientX` and `touch[0].clientY`
    // @TODO
  });

});

```
