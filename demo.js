smallDraw(({ canvas, ctx, resize, draw }) => {
  const boxSize = 40;
  const halfBoxSize = boxSize / 2;

  resize(() => {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });

  draw(({ touch, w, h }) => {
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
    ctx.fillRect(0, 0, w * 10, h * 10);
  });
});
