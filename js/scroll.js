window.addEventListener("scroll", ()=>{
  let scroll = window.scrollY;

  document.querySelectorAll(".section").forEach((el,i)=>{
    el.style.transform = `translateY(${scroll * (0.05 * i)}px)`;
  });
});