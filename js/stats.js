document.querySelectorAll(".stat").forEach(stat=>{
  let target = +stat.dataset.target;
  let count = 0;

  function update(){
    count += target/100;

    if(count < target){
      stat.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      stat.innerText = target + "+";
    }
  }
  update();
});