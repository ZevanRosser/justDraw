(function() {
  var emptyFn = function() {},
    body = document.body,
    add = 'addEventListener',
    remove = 'removeEventListener',
    on = function(e, h) {
      document[add](e, h);
      return on;
    },
    off = document[remove],
    defaultConfig = {
      retina: true,
      styleBody: true
    };

  function touchify(e) {
    var touch = [];
    touch.x = touch.y = 0;

    if (e.touches != null && e.touches.length > 0) {
      touch.x = e.touches[0].clientX;
      touch.y = e.touches[0].clientY;
      for (var i = 0; i < e.touches.length; i++) {
        touch[i] = e.touches[i];
      }
    } else {
      touch.x = e.clientX;
      touch.y = e.clientY;
    }

    return touch;
  }

  function smallDraw(userFn, config) {
    if (userFn == null) return;

    if (config != null) {
      for (var i in config) {
        if (config[i] == null) {
          config[i] = defaultConfig[i];
        }
      }
    } else {
      config = defaultConfig;
    }

    var canvas = document.createElement('canvas'),
      c = canvas.getContext('2d'),
      pixelRatio = config.retina ? window.devicePixelRatio || 1 : 1,
      userResize = emptyFn,
      userDraw = emptyFn,
      touch = [],
      drawId,
      elapsed;

    touch.x = touch.y = 0;
    touch.down = false;

    body.appendChild(canvas);

    if (config.styleBody) {
      body.style.margin = '0';
      body.style.overflow = 'hidden';
    }

    function draw(userDrawFn) {
      userDraw = userDrawFn;

      function loop(time) {
        if (pixelRatio !== 1) {
          c.save();
          c.scale(pixelRatio, pixelRatio);
        }

        userDraw({
          touch: touch,
          w: window.innerWidth / 100,
          h: window.innerHeight / 100,
          time: time
        });

        if (pixelRatio !== 1) {
          c.restore();
        }

        drawId = window.requestAnimationFrame(loop);
      }
      loop();
    }

    function resize(userResizeFn) {
      userResize = userResizeFn;
    }

    function onResize() {
      var winW = window.innerWidth,
        winH = window.innerHeight;
      canvas.width = winW * pixelRatio;
      canvas.height = winH * pixelRatio;
      canvas.style.width = winW + 'px';
      canvas.style.height = winH + 'px';

      userDraw({
        touch: touch,
        w: window.innerWidth / 100,
        h: window.innerHeight / 100
      });
      userResize();
    }

    window[add]('resize', onResize);
    onResize();

    function onMove(e) {
      touch = touchify(e);
    }

    on('mousemove', onMove)('touchmove', onMove);

    userFn({
      canvas: canvas,
      ctx: c,
      c: c,
      draw: draw,
      resize: resize,

      play: function() {
        draw();
      },
      pause: function() {
        window.cancelAnimationFrame(drawId);
      },
      destroy: function(keepCanvas) {
        window.cancelAnimationFrame(drawId);
        window[remove]('resize', onResize);
        off('mousemove', onMove)('touchmove', onMove);
        if (!keepCanvas) {
          if (canvas.parentNode != null) canvas.parentNode.removeChild(canvas);
          canvas = null;
          c = null;
        }
      }
    });
  }

  if (typeof exports === 'object' && typeof module === 'object') {
    module.exports = smallDraw;
  } else if (typeof define === 'function' && define.amd) {
    define(smallDraw);
  } else {
    window.smallDraw = smallDraw;
  }
})();
