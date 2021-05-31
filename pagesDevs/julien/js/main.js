const root = document.documentElement;
 
document.addEventListener('mousemove', evt => {
    let x = evt.clientX / innerWidth;
    let y = evt.clientY / innerHeight;
 
    root.style.setProperty('--mouse-x', x);
    root.style.setProperty('--mouse-y', y);
});

neige = {
    static: function() {
      var viewWidth,
          viewHeight,
          canvas = document.getElementById("canvas"),
          ctx;
  
      // change these settings
      var patternSize = 128,
          patternScaleX = 1.5,
          patternScaleY = 1.5,
          patternRefreshInterval = 6,
          patternAlpha = 20; // int between 0 and 255,
  
      var patternPixelDataLength = patternSize * patternSize * 4,
          patternCanvas,
          patternCtx,
          patternData,
          frame = 0;
  
      window.onload = function() {
          initCanvas();
          initGrain();
          requestAnimationFrame(loop);
      };
  
      // create a canvas which will render the grain
      function initCanvas() {
          viewWidth = canvas.width = canvas.clientWidth;
          viewHeight = canvas.height = canvas.clientHeight;
          ctx = canvas.getContext('2d');
  
          ctx.scale(patternScaleX, patternScaleY);
      }
  
      // create a canvas which will be used as a pattern
      function initGrain() {
          patternCanvas = document.createElement('canvas');
          patternCanvas.width = patternSize;
          patternCanvas.height = patternSize;
          patternCtx = patternCanvas.getContext('2d');
          patternData = patternCtx.createImageData(patternSize, patternSize);
      }
  
      // put a random shade of gray into every pixel of the pattern
      function update() {
          var value;
  
          for (var i = 0; i < patternPixelDataLength; i += 4) {
              value = (Math.random() * 255) | 0;
  
              patternData.data[i    ] = value;
              patternData.data[i + 1] = value;
              patternData.data[i + 2] = value;
              patternData.data[i + 3] = patternAlpha;
          }
  
          patternCtx.putImageData(patternData, 0, 0);
      }
  
      // fill the canvas using the pattern
      function draw() {
          ctx.clearRect(0, 0, viewWidth, viewHeight);
  
          ctx.fillStyle = ctx.createPattern(patternCanvas, 'repeat');
          ctx.fillRect(0, 0, viewWidth, viewHeight);
      }
  
      function loop() {
          if (++frame % patternRefreshInterval === 0) {
              update();
              draw();
          }
  
          requestAnimationFrame(loop);
      }
    },
    toggleTune: function(){
      if(!this.audio) return
  
      var btn = document.querySelector(".tunes-play")
      if(this.audio.paused){
        this.audio.play()
        btn.setAttribute("text",btn.innerHTML = "❚❚")
      } else {
        this.audio.pause()
        btn.setAttribute("text",btn.innerHTML = "►")
      }
    },
  
    init: function() {
  
      // Static
      this.static();
  
      // fade in
      window.addEventListener("load",function(){
        document.body.classList.add("loaded")
      })
    }
  }
  
  neige.init()