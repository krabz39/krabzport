document.querySelectorAll(".card").forEach(card=>{
  card.onmousemove = e=>{
    let r = card.getBoundingClientRect();
    let x = e.clientX - r.left;
    let y = e.clientY - r.top;

    card.style.transform =
    `rotateX(${-(y/r.height-0.5)*10}deg)
     rotateY(${(x/r.width-0.5)*10}deg)`;
  };

  card.onmouseleave=()=>{
    card.style.transform="rotate(0)";
  };
});