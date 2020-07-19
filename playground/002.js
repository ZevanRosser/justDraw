smallDraw(({ canvas, c, resize, draw }) => {
  class Sym {
    constructor({ size, scale, x, y }) {
      this.size = size || 5;
      this.cells = this.size ** 2;
      this.scale = scale || 10;
      this.x = x;
      this.y = y;
      this.init();
    }

    init() {
      let detailChance = 0.2;
      this.locs = [];
      for (let i = 0; i < this.cells; i++) {
        let x = i % this.size;
        let y = Math.floor(i / this.size);
        if (Math.random() < detailChance) {
          this.locs.push([this.x + x * this.scale, this.y + y * this.scale]);
        }
      }
      this.locs.sort(() => Math.random() - 0.5);
      this.step = 0;
      this.steps = this.locs.length;

      this.dx = this.px = this.locs[0][0];
      this.dy = this.py = this.locs[0][1];
      this.bx = this.by = 0;
      this.life = 80;
      this.tick = Math.round(10 + Math.random() * 10);

      this.prevX = null;
      this.prevY = null;
    }

    draw() {
      this.life++;

      if (this.life % this.tick === 0) {
        this.step++;
        if (this.step >= this.steps) {
          this.x += 80;
          this.init();
          return;
        } else {
          this.dx = this.locs[this.step][0];
          this.dy = this.locs[this.step][1];
        }
      }

      this.px -= this.bx;
      this.bx = ((this.px - this.dx) / 12 + this.bx) / 1.1;

      this.py -= this.by;
      this.by = ((this.py - this.dy) / 12 + this.by) / 1.1;

      if (this.prevX != null) {
        c.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        c.lineWidth = 4;
        c.beginPath();
        c.moveTo(this.prevX, this.prevY);
        c.lineTo(this.px, this.py);
        c.stroke();

        c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(this.prevX, this.prevY);
        c.lineTo(this.px, this.py);
        c.stroke();
      }
      this.prevX = this.px;
      this.prevY = this.py;
    }
  }

  let sym = new Sym({
    x: 40,
    y: window.innerHeight / 2
  });

  const clear = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
  };

  resize(clear);
  clear();

  draw(() => {
    sym.draw();
  });
});
