const projects = [
{
  title:"Web App",
  image:"assets/images/p1.jpg",
  desc:"Portfolio system",
  link:"#"
}
];

document.querySelectorAll(".project").forEach((card,i)=>{
  card.onclick=()=>{
    let p = projects[i];

    document.getElementById("modalTitle").innerText=p.title;
    document.getElementById("modalImage").src=p.image;
    document.getElementById("modalDesc").innerText=p.desc;
    document.getElementById("modalLink").href=p.link;

    document.getElementById("projectModal").style.display="flex";
  };
});

document.getElementById("closeModal").onclick=()=>{
  document.getElementById("projectModal").style.display="none";
};