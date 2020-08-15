const fs = require('fs');

// add a new item to the playground

const html = name =>
  `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, viewport-fit=contain">
    <title>${name}</title>
  </head>
  <body>
    <script src="../src/smallDraw.js"></script>
    <script src="${name}.js"></script>
  </body>
</html>

<!--
/()\  ||  []  \   /  [ .   . ]   /\\
\()/  ||  []   \\/    [  .  ]   /   \
-->
`.trim();

const js = `
smallDraw(({ canvas, c, resize, draw }) => {
  const clear = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  };

  resize(clear);
  clear();

  draw(() => {});
});
`.trim();

const folder = './playground';
const list = fs.readdirSync(folder).reverse();
const isJs = /\.js$/;

const toNumber = file => parseFloat(file.replace(isJs, ''));
let lastNumber;

for (let i = 0; i < list.length; i++) {
  const file = list[i];
  if (isJs.test(file)) {
    lastNumber = toNumber(file);
    break;
  }
}

const newNumber = lastNumber + 1;
const newName = folder + '/' + ('00' + newNumber).slice(-3);
const newJs = newName + '.js';
const newHtml = newName + '.html';

fs.access(newJs, err => {
  if (!err) {
    console.log(`${newName} already exists`);
  } else {
    fs.writeFileSync(newJs, js, 'utf-8');
    fs.writeFileSync(newHtml, html(newName), 'utf-8');
    console.log(newName, 'created');
  }
});
