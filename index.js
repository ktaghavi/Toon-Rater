//Kam's Branch

const toonDB = 'http://localhost:3000/toons'
let addToon = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toon-btn");
  const toonFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToon = !addToon;
    if (addToon) {
      toonFormContainer.style.display = "block";
    
    // Add Toy Form Functionality w/ POST
      document.querySelector('.add-toon-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const newName = e.target.name.value
      const newImg = e.target.image.value
    
      //The POST Req.


      fetch(toonDB, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify({
            "title": newName,
            "image": newImg,
            "likes": 0
          })
      })
      //Render Card Right after Post Req by running the new json data
      .then (r => r.json())
      .then (toy => renderCard(toy))
    
    })
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  fetch(toonDB)
  .then (r => r.json())
  .then (toons => toons.forEach(toon => renderCard(toon)))

});

//Make Card for Each Toy

function renderCard (toon){
  const toonCollection = document.getElementById('toon-collection')
  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  const toonName = document.createElement('h2')
  toonName.textContent = toon['title']
  const img = document.createElement('img')
  img.src = toon['image']
  const likeCount = document.createElement('p')
  likeCount.textContent = toon['likes']
  const likesButton = document.createElement('button')
  likesButton.className = 'like-btn'
  likesButton.id = toon['id']
  cardDiv.append (toonName, img, likeCount, likesButton)
  toonCollection.append (cardDiv)
  
// Adding Like button functionality

  likesButton.addEventListener('click', () =>{
    toy['likes'] = toy['likes'] +1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(toy)
      })
      //Render Card Right after Post Req by running the new json data

      .then (r => r.json())
      .then (likeCount.textContent = toy['likes'])
    })
}