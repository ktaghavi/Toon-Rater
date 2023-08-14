//Terences Branch
let addToon = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toon-btn");
  const toonFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToon = !addToon;
    if (addToon) {
        toonFormContainer.style.display = "block";}
    })
});

fetch('https://api.sampleapis.com/cartoons/cartoons2D')
.then(r=>r.json())
.then(renderToons)

function renderToons(toons){
  renderToons.forEach(renderToonImage)
}

function renderToonImage(toon) {
  const toonImage = document.createElement('img')
}

ramen