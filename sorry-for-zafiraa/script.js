/* BACKGROUND LOVE */
const bg = document.getElementById("bg");
const bctx = bg.getContext("2d");
bg.width = innerWidth;
bg.height = innerHeight;

let loves = Array.from({ length: 90 }, () => ({
  x: Math.random()*bg.width,
  y: Math.random()*bg.height,
  s: Math.random()*14 + 10,
  d: Math.random()*0.8 + 0.4
}));

function drawBg(){
  bctx.clearRect(0,0,bg.width,bg.height);
  loves.forEach(l=>{
    bctx.font = l.s+"px serif";
    bctx.fillStyle = "rgba(255,182,193,0.7)";
    bctx.fillText("❤", l.x, l.y);
    l.y += l.d;
    if(l.y > bg.height) l.y = -20;
  });
  requestAnimationFrame(drawBg);
}
drawBg();

/* CHAT DELAY */
[".step1",".step2",".step3",".step4"].forEach((s,i)=>{
  setTimeout(()=>{
    document.querySelector(s).classList.remove("hidden");
  }, 1200*(i+1));
});

/* YES CLICK */
const yesBtn = document.getElementById("yesBtn");
const music = document.getElementById("music");
const waBtn = document.getElementById("waBtn");
const fx = document.getElementById("fx");
const fctx = fx.getContext("2d");
fx.width = innerWidth;
fx.height = innerHeight;

yesBtn.onclick = () => {
  music.play().catch(()=>{});
  document.getElementById("scene").style.filter = "blur(4px)";

  setTimeout(()=>{
    document.querySelector(".ending").classList.remove("hidden");
    explode();
    document.getElementById("scene").style.filter = "none";
  }, 1800);

  const YOUR_WA_NUMBER = "62812XXXXXXXX"; // GANTI NOMOR KAMU
  waBtn.href =
    "https://wa.me/" + YOUR_WA_NUMBER + "?text=" +
    encodeURIComponent(
      "Makasih ya udah maafin aku 🤍\n" +
      "Aku bener-bener sayang kamu.\n" +
      "Semoga ke depan aku bisa lebih baik buat kamu 🌷"
    );
};

/* EFEK BUNGA & HATI */
function explode(){
  let particles = [];
  for(let i=0;i<140;i++){
    particles.push({
      x: Math.random()*fx.width,
      y: fx.height + Math.random()*200,
      vx: (Math.random()-0.5)*3,
      vy: -(Math.random()*4 + 1),
      life: Math.random()*120 + 80,
      size: Math.random()*20 + 14,
      char: Math.random()>0.5 ? "🌸" : "❤",
      rot: Math.random()*360
    });
  }

  function anim(){
    fctx.clearRect(0,0,fx.width,fx.height);
    particles.forEach(p=>{
      fctx.save();
      fctx.translate(p.x,p.y);
      fctx.rotate(p.rot*Math.PI/180);
      fctx.font = p.size+"px serif";
      fctx.fillText(p.char,0,0);
      fctx.restore();
      p.x+=p.vx;
      p.y+=p.vy;
      p.vy+=0.02;
      p.rot+=1;
      p.life--;
    });
    particles = particles.filter(p=>p.life>0);
    if(particles.length) requestAnimationFrame(anim);
  }
  anim();
}
