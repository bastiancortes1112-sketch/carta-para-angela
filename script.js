// ===============================
// PERSONALIZA ESTAS DOS COSAS
// ===============================
const LOVE_PASSWORD = "Angela123";

// Cambia esta fecha por la fecha en que quieres comenzar el contador.
// Formato: AAAA-MM-DD
const START_DATE = new Date("2026-05-07T00:00:00");

// ===============================

const intro = document.getElementById("intro");
const passwordScreen = document.getElementById("passwordScreen");
const main = document.getElementById("main");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");
const music = document.getElementById("music");

function showPassword(){
  intro.classList.add("hidden");
  passwordScreen.classList.remove("hidden");
  passwordInput.focus();
}

function checkPassword(){
  if(passwordInput.value === LOVE_PASSWORD){
    passwordScreen.classList.add("hidden");
    main.classList.remove("hidden");
    window.scrollTo(0,0);
  }else{
    passwordError.textContent = "Contraseña incorrecta ❤️";
    passwordInput.value = "";
    passwordInput.focus();
  }
}

passwordInput.addEventListener("keydown",e=>{
  if(e.key==="Enter") checkPassword();
});

function updateCounter(){
  const now = new Date();
  let diff = now - START_DATE;
  if(diff < 0) diff = 0;

  const totalSeconds = Math.floor(diff/1000);
  const days = Math.floor(totalSeconds/86400);
  const hours = Math.floor((totalSeconds%86400)/3600);
  const minutes = Math.floor((totalSeconds%3600)/60);
  const seconds = totalSeconds%60;

  document.getElementById("counter").innerHTML = `
    <div class="time-box"><strong>${days}</strong><span>DÍAS</span></div>
    <div class="time-box"><strong>${String(hours).padStart(2,"0")}</strong><span>HORAS</span></div>
    <div class="time-box"><strong>${String(minutes).padStart(2,"0")}</strong><span>MINUTOS</span></div>
    <div class="time-box"><strong>${String(seconds).padStart(2,"0")}</strong><span>SEGUNDOS</span></div>
  `;
}
updateCounter();
setInterval(updateCounter,1000);

function toggleMusic(){
  if(music.paused){
    music.play().catch(()=>alert("Primero agrega un archivo llamado music.mp3 en la carpeta del proyecto."));
  }else{
    music.pause();
  }
}

function createHeart(){
  const heart=document.createElement("div");
  heart.className="floating-heart";
  heart.textContent=["❤️","💗","💕","💖","💘"][Math.floor(Math.random()*5)];
  heart.style.left=Math.random()*100+"vw";
  heart.style.fontSize=(16+Math.random()*25)+"px";
  heart.style.setProperty("--drift",(Math.random()*160-80)+"px");
  document.getElementById("hearts").appendChild(heart);
  setTimeout(()=>heart.remove(),5000);
}
setInterval(createHeart,700);

document.addEventListener("click",e=>{
  if(e.target.tagName==="BUTTON") return;
  const heart=document.createElement("div");
  heart.textContent="❤️";
  heart.style.position="fixed";
  heart.style.left=e.clientX+"px";
  heart.style.top=e.clientY+"px";
  heart.style.pointerEvents="none";
  heart.style.zIndex="50";
  heart.style.fontSize="24px";
  heart.style.transition="1s";
  document.body.appendChild(heart);
  requestAnimationFrame(()=>{
    heart.style.transform="translateY(-70px) scale(1.5)";
    heart.style.opacity="0";
  });
  setTimeout(()=>heart.remove(),1000);
});
