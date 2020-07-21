smallDraw(({ canvas, ctx, resize, draw }) => {
  const boxSize = 40;
  const halfBoxSize = boxSize / 2;

  resize(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  draw(({ touch, w, h, time }) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(
      touch.x - halfBoxSize,
      touch.y - halfBoxSize,
      boxSize,
      boxSize
    );

    ctx.fillStyle = 'blue';
    // draw a box 1/10 the size of the window
    ctx.fillRect(0, 0, 10 * w, 10 * h);
    console.log(time);
  });
});
