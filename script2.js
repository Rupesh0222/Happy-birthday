// Page2 behaviour: countdown -> burst -> cake -> reveal gallery + confetti
(function(){
  const introPanel = document.getElementById('introPanel');
  const countdownEl = document.getElementById('countdown');
  const burstCanvas = document.getElementById('burstCanvas');
  const cakeStage = document.getElementById('cakeStage');
  const gallerySection = document.getElementById('gallerySection');
  const confettiCanvas = document.getElementById('confettiCanvas2');

  // Canvas sizes
  function fitCanvas(c){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  [burstCanvas, confettiCanvas].forEach(c=>{ if(c) fitCanvas(c) });
  window.addEventListener('resize', ()=>{ [burstCanvas, confettiCanvas].forEach(c=>{ if(c) fitCanvas(c) }); });

  // 10 second countdown
  let count = 10;
  countdownEl.textContent = count;
  const tick = setInterval(()=>{
    count--;
    countdownEl.textContent = count;
    if(count <= 0){
      clearInterval(tick);
      startBurstSequence();
    }
  }, 1000);

  // Burst (simple fireworks/crackers) on burstCanvas
  function startBurstSequence(){
    // animate few bursts then show cake
    burstCanvas.style.zIndex = 125;
    const ctx = burstCanvas.getContext('2d');
    fitCanvas(burstCanvas);

    const particles = [];
    function makeBurst(x,y,cols=24){
      for(let i=0;i<cols;i++){
        particles.push({
          x, y,
          vx: (Math.random()-0.5) * (4 + Math.random()*6),
          vy: (Math.random()-0.9) * (6 + Math.random()*8),
          life: 80 + Math.random()*40,
          size: 2 + Math.random()*3,
          color: `hsl(${Math.random()*360},90%,60%)`
        });
      }
    }
    // trigger 5 bursts across screen
    const positions = [
      [window.innerWidth*0.25, window.innerHeight*0.35],
      [window.innerWidth*0.5, window.innerHeight*0.25],
      [window.innerWidth*0.75, window.innerHeight*0.35],
      [window.innerWidth*0.4, window.innerHeight*0.5],
      [window.innerWidth*0.6, window.innerHeight*0.5],
    ];
    let i=0;
    const burstInterval = setInterval(()=>{
      if(i < positions.length){
        makeBurst(positions[i][0], positions[i][1], 28);
        i++;
      } else {
        clearInterval(burstInterval);
      }
    }, 280);

    // animate particles briefly
    let frames = 0;
    function anim(){
      ctx.clearRect(0,0,burstCanvas.width, burstCanvas.height);
      for(let p of particles){
        p.x += p.vx;
        p.y += -p.vy * 0.12 + 0.6; // arc effect
        p.vy -= 0.04;
        p.life--;
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0, p.life / 100);
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
        ctx.fill();
      }
      // cull dead
      for(let k = particles.length - 1; k >= 0; k--){
        if(particles[k].life <= 0) particles.splice(k,1);
      }
      frames++;
      if(particles.length > 0 && frames < 220){
        requestAnimationFrame(anim);
      } else {
        // clear and proceed to cake
        ctx.clearRect(0,0,burstCanvas.width, burstCanvas.height);
        showCake();
      }
    }
    anim();
  }

  function showCake(){
    // hide intro, show cake
    introPanel.style.transition = 'opacity 0.6s ease';
    introPanel.style.opacity = '0';
    setTimeout(()=>{ introPanel.style.display = 'none'; }, 700);

    // reveal cake stage
    cakeStage.classList.add('active');

    // after 5 seconds -> fade out cake and show gallery
    setTimeout(()=>{
      cakeStage.classList.remove('active');
      // gallery reveal
      gallerySection.classList.add('active');
      // start gentle confetti and balloon float
      startConfetti();
      startGalleryBalloonFloat();
    }, 5000);
  }

  // CONFETTI for gallery (gentle falling)
  function startConfetti(){
    const c = confettiCanvas;
    fitCanvas(c);
    const ctx = c.getContext('2d');
    const pieces = [];
    const W = c.width, H = c.height;
    for(let i=0;i<120;i++){
      pieces.push({
        x: Math.random()*W,
        y: Math.random()*H - H,
        r: 4 + Math.random()*8,
        c: `hsl(${Math.random()*360},80%,60%)`,
        vx: Math.random()*1 - 0.5,
        vy: 1 + Math.random()*2,
        rot: Math.random()*360,
        vr: Math.random()*6 - 3
      });
    }
    let running = true;
    function draw(){
      ctx.clearRect(0,0,W,H);
      for(let p of pieces){
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        if(p.y > H + 20){ p.y = -40; p.x = Math.random()*W; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * Math.PI / 180);
        ctx.fillStyle = p.c;
        ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r*1.6);
        ctx.restore();
      }
      if(running) requestAnimationFrame(draw);
    }
    draw();
    // let confetti fall for a while, then keep subtle (don't stop)
  }

  // Balloon float little helper (decorative)
  function startGalleryBalloonFloat(){
    // already CSS animated top balloons — nothing needed, just ensure they're visible
    // But add a few strings that drift down (visual only)
    const gallery = document.getElementById('gallerySection');
    for(let i=0;i<6;i++){
      const s = document.createElement('div');
      s.className = 'float-string';
      s.style.position = 'absolute';
      s.style.left = (10 + Math.random()*80) + '%';
      s.style.top = (-20 - Math.random()*40) + 'px';
      s.style.width = '2px';
      s.style.height = '140px';
      s.style.background = 'linear-gradient(#ccc,#eee)';
      s.style.opacity = 0.6;
      s.style.borderRadius = '2px';
      s.style.transform = `rotate(${(Math.random()*20 - 10)}deg)`;
      s.style.transition = 'transform 6s linear';
      gallery.appendChild(s);
      // animate down a bit
      setTimeout(()=>{ s.style.top = (30 + Math.random()*8) + 'vh'; }, 100 + i*200);
      // slowly fade out after some time to keep layout clean
      setTimeout(()=>{ s.style.opacity = '0'; setTimeout(()=>s.remove(), 2000); }, 14000 + i*300);
    }
  }

})();
// More Surprises button logic
const moreBtn = document.getElementById('moreBtn');
const redirectMsg = document.getElementById('redirectMsg');

moreBtn.addEventListener('click', ()=>{
  redirectMsg.textContent = "There are more surprises… Redirecting ✨";
  redirectMsg.style.opacity = 1;
  moreBtn.disabled = true;
  moreBtn.style.opacity = 0.6;

  // small loading animation on button
  moreBtn.textContent = "⏳ Redirecting...";
  
  setTimeout(()=>{
    window.location.href = "index3.html"; // change if 3rd page name different
  }, 2000);
});