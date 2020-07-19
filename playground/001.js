const TWO_PI = Math.PI * 2;
const MILLIS = 5000;

smallDraw(({ canvas, c, resize, draw }) => {
  class Circle {
    constructor() {
      this.init(true);
    }

    init(force) {
      this.paused = !force;
      this.x = Math.random() * window.innerWidth;
      this.y = Math.random() * window.innerHeight;
      this.yOff = Math.random() * 2 - 1;
      this.xOff = Math.random() * 2 - 1;
      this.rad = (Math.random() * Math.random() * window.innerWidth) / 10;
      this.damp = 40 + Math.random() * 50;
      if (Math.random() < 0.1) this.hasShade = true;

      let c = (this.c = Math.round(Math.random() * 100));
      let cd = (this.cd = Math.round(Math.random() * 255));
      let a = (this.a = 0.1);
      if (Math.random() < 0.1) a += Math.random() * Math.random();
      this.col = `rgba(${c}, ${c}, ${c}, ${a})`;

      setTimeout(() => {
        this.paused = false;
      }, MILLIS + Math.random() * MILLIS);
    }

    draw() {
      if (this.paused) return;

      if (this.hasShade) {
        c.shadowColor = 'rgba(0, 0, 0, 0.5)';
        c.shadowBlur = 6;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 6;
      } else {
        c.shadowColor = 'transparent';
        c.shadowBlur = 0;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
      }

      c.fillStyle = 3;
      this.c += (this.cd - this.c) / this.damp;
      var cc = Math.round(this.c);
      this.col = `rgba(${cc}, ${cc}, ${cc}, ${this.a})`;

      c.fillStyle = this.col;
      c.beginPath();
      c.arc(this.x, this.y, this.rad, 0, TWO_PI, false);
      c.fill();

      this.y += this.yOff;
      this.x += this.xOff;
      this.rad += (0 - this.rad) / this.damp;
      if (this.rad < 0.1) this.init();
    }
  }

  const circles = [];
  const NUM = 100;
  for (let i = 0; i < NUM; i++) {
    circles[i] = new Circle();
  }

  const clear = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  };

  resize(clear);
  clear();

  draw(() => {
    for (let i = 0; i < NUM; i++) {
      circles[i].draw();
    }
  });
});
