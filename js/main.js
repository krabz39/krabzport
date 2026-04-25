// LOADER
window.onload = () => {
  document.getElementById("loader").style.display = "none";
};

// TYPING
const text = "Eugene aka Kenyankrabz";
let i = 0;

function typing(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing,80);
  }
}
typing();

// MENU TOGGLE
document.querySelector(".menu-toggle").onclick = () => {
  document.querySelector(".sidebar").classList.toggle("active");
};

// LAB MODE
document.getElementById("labMode").onclick = () => {
  document.body.classList.toggle("lab-mode");
};
window.addEventListener("load", ()=>{
  document.querySelector(".hero").style.opacity = 1;
  document.querySelector(".hero").style.transform = "translateY(0)";
});