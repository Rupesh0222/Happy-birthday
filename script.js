const PASSWORD = "04-08-2025";
const SUCCESS_PAGE = "index2.html";

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("pwModal");
  const input = document.getElementById("passwordInput");
  const enterBtn = document.getElementById("enterBtn");
  const warn = document.getElementById("warn");
  const music = document.getElementById("bgMusic");
  const loadingScreen = document.getElementById("loadingScreen");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const ctx = confettiCanvas.getContext("2d");
  let confetti = [];

  // Resize confetti canvas
  function resizeCanvas(){
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Play music when user interacts
  function tryPlayMusic(){
    if(music.paused){
      music.volume = 0.5;
      music.play().catch(()=>{});
    }
  }

  // Confetti generator
  function makeConfetti(){
    confetti = [];
    for(let i=0;i<150;i++){
      confetti.push({
        x:Math.random()*confettiCanvas.width,
        y:Math.random()*confettiCanvas.height - confettiCanvas.height,
        r:Math.random()*6+3,
        c:`hsl(${Math.random()*360},100%,70%)`,
        d:Math.random()*2+1
      });
    }
  }
  function drawConfetti(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confetti.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.c;
      ctx.fill();
    });
    updateConfetti();
  }
  function updateConfetti(){
    confetti.forEach(p=>{
      p.y += p.d;
      if(p.y > confettiCanvas.height){
        p.y = -10;
        p.x = Math.random()*confettiCanvas.width;
      }
    });
  }
  function startConfetti(){
    makeConfetti();
    let duration = 2000;
    const end = Date.now()+duration;
    (function animate(){
      drawConfetti();
      if(Date.now()<end){
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
      }
    })();
  }

  function showWarning(text){
    warn.textContent = text;
    modal.querySelector(".modal-content").animate([
      {transform:'translateX(0)'},
      {transform:'translateX(-8px)'},
      {transform:'translateX(6px)'},
      {transform:'translateX(-4px)'},
      {transform:'translateX(0)'}
    ],{duration:450,easing:'ease-out'});
    input.value = "";
    input.focus();
  }

  function tryPassword(){
    tryPlayMusic(); // Start music on first interaction
    const val = input.value.trim();
    if(val === ""){
      showWarning("Kuch to likh baby :)");
      return;
    }
    if(val === PASSWORD){
      warn.style.color = "#0a8a3b";
      warn.textContent = "Correct! Opening the surprise…";
      startConfetti();
      // show loading animation
      setTimeout(()=>{
        modal.classList.remove("show");
        loadingScreen.style.display = "flex";
      },600);
      setTimeout(()=>{
        window.location.href = SUCCESS_PAGE;
      },2500);
    } else {
      warn.style.color = "#b00020";
      showWarning("Try again — dimag pe jor daal baby 💪");
    }
  }

  enterBtn.addEventListener("click", tryPassword);
  input.addEventListener("keydown", e=>{
    if(e.key==="Enter") tryPassword();
  });

  modal.addEventListener("click", e=>{
    if(e.target===modal) input.focus();
  });
});