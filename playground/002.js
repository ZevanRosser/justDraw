smallDraw(({ canvas, c, resize, draw }) => {
  class Sym {
    constructor({ size, scale, x, y }) {
      this.size = size || 6;
      this.cells = this.size ** 2;
      this.scale = scale || 20;
      this.x = x;
      this.y = y;
      this.cycle = 0;
      this.drawChance = 0.005;
      this.init();
    }

    init() {
      let detailChance = 0.2;
      this.locs = [];

      for (let i = 0; i < this.cells; i++) {
        let x = i % this.size;
        let y = Math.floor(i / this.size);
        if (Math.random() < detailChance || i === 0) {
          this.locs.push([this.x + x * this.scale, this.y + y * this.scale]);
        }
      }

      this.locs.sort(() => Math.random() - 0.5);
      this.step = 0;
      this.steps = this.locs.length;

      if (this.cycle === 0) {
        this.dx = this.px = this.locs[0][0];
        this.dy = this.py = this.locs[0][1];
        this.bx = this.by = 0;
        this.life = 80;
        this.prevX = null;
        this.prevY = null;
      }
      this.cycle++;
      this.tick = Math.round(10 + Math.random() * 10);
      this.lineWidth = 1 + Math.random() * 3;
    }

    draw(inter, stroke) {
      this.life++;

      if (this.life % this.tick === 0) {
        this.step++;
        if (this.step >= this.steps) {
          this.x += 160;
          if (this.x > window.innerWidth + 100 || Math.random() < 0.2) {
            this.x = 40;
            this.y += 160;
            if (this.y > window.innerHeight + 200) {
              this.y = 80;
            }
            this.cycle = 0;
          }
          this.init();
          return;
        } else {
          this.dx = this.locs[this.step][0];
          this.dy = this.locs[this.step][1];
        }
      }

      this.px -= this.bx + Math.random() * 5 - 2.5;
      this.bx = ((this.px - this.dx) / 12 + this.bx) / 1.2;

      this.py -= this.by + Math.random() * 5 - 2.5;
      this.by = ((this.py - this.dy) / 7 + this.by) / 1.2;

      if (this.prevX != null) {
        if (inter < this.drawChance || this.allow) {
          this.allow = true;
          setTimeout(() => {
            this.allow = false;
          }, Math.random() * 5000);
          c.strokeStyle = stroke;
          c.lineWidth = this.lineWidth;
          c.beginPath();
          c.moveTo(this.prevX, this.prevY);
          c.lineTo(this.px, this.py);
          c.stroke();
        }
      }
      this.prevX = this.px;
      this.prevY = this.py;
    }
  }

  let syms = [];
  let NUM = 30;
  for (let i = 0; i < NUM; i++) {
    syms.push(
      new Sym({
        x: 80,
        y: 40
      })
    );
  }

  const clear = () => {
    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);
  };

  resize(clear);
  clear();

  draw(() => {
    c.save();
    c.scale(0.65, 0.65);
    for (let i = 0; i < NUM; i++) {
      if (i === NUM - 2) {
        syms[i].draw(0.001, 'rgba(0, 0, 0, 0.54)');
      } else if (i > NUM - 2) {
        syms[i].draw(0.001, 'rgba(255, 255, 255, 0.44)');
      } else {
        syms[i].draw(Math.random(), 'rgba(0, 0, 0, 0.14)');
      }
    }
    c.restore();
  });
});
