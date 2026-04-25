const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1;
      e.target.style.transform="translateY(0)";
    }
  });
});

document.querySelectorAll(".reveal").forEach(el=>{
  el.style.opacity=0;
  el.style.transform="translateY(50px)";
  obs.observe(el);
});