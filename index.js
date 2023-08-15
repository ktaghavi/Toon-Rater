const toonDB = 'http://localhost:3000/toons'
console.log()
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
      const newNetwork = e.target.network.value
    
      //The POST Req.


      fetch(toonDB, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify({
            "title": newName,
            "network": newNetwork,
            "image": newImg,
            "likes": 0
          })
      })
      //Render Card Right after Post Req by running the new json data
      .then (r => r.json())
      .then (toon => renderCard(toon))
    
    })
    } else {
      toonFormContainer.style.display = "none";
    }
  });


  fetch(toonDB)
  .then (r => r.json())
  .then (toons => toons.forEach(toon => renderCard(toon)))
  console.log

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
  img.className = 'cardImg'
  const likeCount = document.createElement('p')
  likeCount.textContent = toon['likes']
  const likesButton = document.createElement('button')
  likesButton.textContent = "Vote"
  likesButton.className = 'like-btn'
  likesButton.id = toon['likes']
  cardDiv.append (toonName, img, likeCount, likesButton)
  toonCollection.append (cardDiv)
  const networkLabel = document.createElement('p');
  networkLabel.textContent = `Network: ${toon.network}`
  
// Adding Like button functionality

  likesButton.addEventListener('click', () =>{
    toon['likes'] = toon['likes'] +1
    fetch(`http://localhost:3000/toons/${toon.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      body: JSON.stringify(toon)
      })
      //Render Card Right after Post Req by running the new json data

      .then (r => r.json())
      .then (likeCount.textContent = toon['likes'])
      
    })
    

}

const cnButton = document.getElementById('cartoon-network');
const nickelodeonButton = document.getElementById('nickelodeon');
const disneyButton = document.getElementById('disney');
const otherButton = document.getElementById('other');

cnButton.addEventListener('click', () => filterToonsByNetwork("Cartoon Network"));
nickelodeonButton.addEventListener('click', () => filterToonsByNetwork("Nickelodeon"));
disneyButton.addEventListener('click', () => filterToonsByNetwork("Disney"));
otherButton.addEventListener('click', () => filterToonsByNetwork("Other"));

function filterToonsByNetwork(network) {
  const toonCollection = document.getElementById('toon-collection');
  toonCollection.innerHTML = ''; // Clear existing toon cards

  fetch(toonDB)
    .then(r => r.json())
    .then(toons => {
      const filteredToons = toons.filter(toon => toon.network === network);
      filteredToons.forEach(toon => renderCard(toon));
    });
}

//create if/else statement to append networks to buttons


// function buttons()
//   const toonHead = document.querySelector('#toon-header')
//   const cartoonNetwork = document.createElement('button', "img")
//   cartoonNetwork.textContent = "Cartoon Network"
//   const nickelodeon = document.createElement('button', "img")
//   nickelodeon.textContent = "Nickelodeon"
//   const disney = document.createElement('button', "img")
//   disney.textContent = "Disney"
//   const networks = document.createElement('div')
//   // const allToons = [cartoonNetwork,nickelodeon,disney]
//   networks.append(cartoonNetwork,nickelodeon,disney)
//   toonHead.appendChild(networks)
// }
// buttons()
