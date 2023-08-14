//Kam's Branch

const apiUrl = 'https://api.sampleapis.com/cartoons/cartoons2D'
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    
    // Add Toy Form Functionality w/ POST
      document.querySelector('.add-toy-form').addEventListener('submit', (e) => {
      e.preventDefault()
      const newName = e.target.name.value
      const newImg = e.target.image.value
    
      //The POST Req.


      fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify({
            "name": newName,
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

  fetch(apiUrl)
  .then (r => r.json())
  .then (toons => toons.forEach(toon => renderCard(toon)))

});

//Make Card for Each Toy

function renderCard (toon){
  const toonCollection = document.getElementById('toon-collection')
  const cardDiv = document.createElement('div')
  cardDiv.className = 'card'
  const toyName = document.createElement('h2')
  toyName.textContent = toon['name']
  const img = document.createElement('img')
  img.src = toy['image']
  img.className = 'toy-avatar'
  const likeCount = document.createElement('p')
  likeCount.textContent = toy['likes']
  const likesButton = document.createElement('button')
  likesButton.className = 'like-btn'
  likesButton.id = toy['id']
  cardDiv.append (toyName, img, likeCount, likesButton)
  toyCollection.append (cardDiv)
  
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