document.addEventListener("DOMContentLoaded",()=>{
  const giftBox = document.getElementById('giftBox');
  const openBtn = document.getElementById('openGiftBtn');
  const msgDiv = document.getElementById('finalMsg');
  const confettiCanvas = document.getElementById('confettiCanvas3');
  const music = document.getElementById('bgMusic3');

  // Play background music on first interaction
  function tryPlayMusic(){ if(music.paused){ music.volume=0.5; music.play().catch(()=>{}); } }

  // Confetti logic
  function startConfetti(){
    const c = confettiCanvas;
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    const ctx = c.getContext('2d');
    const pieces = [];
    for(let i=0;i<150;i++){
      pieces.push({
        x: Math.random()*c.width,
        y: Math.random()*c.height - c.height,
        r: 4 + Math.random()*6,
        c: `hsl(${Math.random()*360},90%,60%)`,
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
        ctx.fillStyle=p.c;
        ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.6);
        ctx.restore();
      }
      requestAnimationFrame(draw);
    }
    draw();
  }

  // On button click
  openBtn.addEventListener("click",()=>{
    tryPlayMusic();
    // Animate gift "opening"
    giftBox.textContent = "🎁🎉";
    openBtn.disabled=true;
    openBtn.style.opacity=0.6;

    // Confetti burst
    startConfetti();

    // Show final message (write your love story + date request here)
    setTimeout(()=>{
      msgDiv.innerHTML = `
        Hey Manya ❤️,<br>
        17 August... Jaha p ye sab shuru hua , tujhe pta h mujhe na kabhi ye love at first sight p believe nhi hua m bss isko lust manta tha prr phir jb mene tujhe dekha to mujhe hi love at first sight ho gya . Tujhe dekhke esa lg rha tha ki bss kashh iske saath relationship ho mera orr ek achha future bhi ho . Hmari baate Hui kuchh time or kaafi achhe se hui , phir ek dikkat k chalte baat bnd ho gyi... Ese krke 4 baar baar bnd hui . But at the end we both are together and Happy , uske jaane k baad tu bahut depressed ho gyi but usne ham dono ko hi bahut saare lessons de diye which we both know. Uske jaane m baad hmari life bahut badal gyi and we became stand for each other . Jo pyar or care mujhe kabhi nhi mili thi wo mrko terse mili orr mere liye wohi bahut tha ni more efforts...
        4 June , wo din jaha se ham dono ki ek bahut bright or nayi journey shuru hui . Abhi tk k liye mera best day wohi tha kyuki wo din mere liye ek dream come true tha ek esa dream jiske liye m raat-raat bhar roya hu or bhagwan se dua kri h . Tujhe pta h jitna khush m tere saath hu na , utna khush orr kisi k saath kabhi bhi nhi tha m . Kahi bhi jata hu ya aata hu sabse pehle tujhe btata hu or tere msg dekhta hu kyuki tu pyari hi itni h yaar kese ignore krdu. Hmara relationship or logo k relationship se bahut hi zyada agal h kyuki ham dono h esi esi situations dekhli h ki koi orr hota jo kabka chhod Chuka hota prr tu mere saath rhi orr mera saath diya which means a lot to me . M bss yehi chahunga ki hmara ye bond kabhi na tute , jo ki tutega bhi nhi kyuki hamne ups and downs dono hi bahut achhe se dekh liye h saath m . Ye hmara relationship or pyar ye hmari destiny m likha hua tha wrna itni baar alag hone k baad or itni buri situations k baad bhi koi kese saath rehke khush ho skta h . Mera ye tere liye pyar , hmesha badhta hi rhegi till the infinity kyuki I am Just obsessed with you tujhme hi meri ek duniya h jo mujhe bahut bahut bahut zyada pyari h . Likhna to or bhi bahut kuchh chahta hu orr bss tu smjh ja yaar mere dim m kya chl rha h 😭 <br>
At the end , 
Happy Birthday My Love and Many Many Happy returns of the day Meri Jaan ❤️🫶🏻🌍🫠(Terse zyada m khush hu tere bday k liye😭)
<br><p align = center>~by Daivik</p>
      `;
      msgDiv.style.opacity=1;
    },800);
  });
});
// More Surprises button logic for page3
const moreBtn3 = document.getElementById('moreBtn3');
const redirectMsg3 = document.getElementById('redirectMsg3');

moreBtn3.addEventListener('click', ()=>{
  redirectMsg3.textContent = "There are more surprises… Redirecting ✨";
  redirectMsg3.style.opacity = 1;
  moreBtn3.disabled = true;
  moreBtn3.style.opacity = 0.6;

  // small loading animation on button
  moreBtn3.textContent = "⏳ Redirecting...";

  setTimeout(()=>{
    window.location.href = "index4.html"; // change if 4th page filename is different
  }, 2000);
});