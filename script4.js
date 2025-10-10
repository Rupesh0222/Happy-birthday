document.addEventListener("DOMContentLoaded",()=>{
  const msgDiv = document.querySelector('.heartfelt-msg');
  const subtleMsg = document.querySelector('.subtle-msg');
  const confettiCanvas = document.getElementById('confettiCanvas4');
  const music = document.getElementById('bgMusic4');

  // Play background music
  function tryPlayMusic(){ if(music.paused){ music.volume=0.5; music.play().catch(()=>{}); } }

  tryPlayMusic();

  // Confetti (gentle)
  const c = confettiCanvas;
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const ctx = c.getContext('2d');
  const pieces = [];
  for(let i=0;i<100;i++){
    pieces.push({
      x: Math.random()*c.width,
      y: Math.random()*c.height - c.height,
      r: 4 + Math.random()*6,
      c: `hsl(${Math.random()*360},80%,60%)`,
      vx: Math.random()*1 - 0.5,
      vy: 1 + Math.random()*2,
      rot: Math.random()*360,
      vr: Math.random()*6 - 3
    });
  }
  function draw(){
    ctx.clearRect(0,0,c.width,c.height);
    for(let p of pieces){
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      if(p.y > c.height+20){ p.y=-40; p.x=Math.random()*c.width; }
      ctx.save();
      ctx.translate(p.x,p.y);
      ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);
      ctx.restore();
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Fade in messages
  setTimeout(()=>{
    msgDiv.style.opacity=1;
    subtleMsg.style.opacity=1;
  },800);
});