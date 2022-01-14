//setting global varibles and getting html-elements
let counter = 1;
let maxPage = 8;
let loading = false
const base_url = "https://swapi.dev/api";
let currentCharcter;
let aside = document.querySelector("aside");
let leftBtn = document.querySelector(".left-icon");
let rightBtn = document.querySelector(".right-icon");
let numberPage = document.querySelector(".page-number");
let peopleDetails = document.querySelector(".people-details");
let characterInfo = document.querySelector(".character-info");
let planetBtn = document.querySelector(".planet-btn");
let speciesBtn = document.querySelector(".species-btn");
let vehicleBtn = document.querySelector(".vehicles-btn");
let starshipsBtn = document.querySelector(".starships-btn");
let charLoader = document.querySelector('.character-loader')
let detaLoader = document.querySelector('.details-loader')
let infoLoader = document.querySelector('.info-loader')


function fetchData() {
  loading = true
  fetch(`${base_url}/people/?page=${counter}`)
    .then((response) => {
      charLoader.style.display = 'none'
      return response.json();
    })
    .then((response) => {
      loading = false
      let characterArray = response.results;
      for (let character of characterArray) {
        createNames(character);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
}

//function rendering character names
function createNames(character) {
  let newLi = document.createElement("li");
  newLi.innerHTML = character.name;
  aside.append(newLi);

  //adding eventlistners to all li:s
  newLi.addEventListener("click", () => {
    characterInfo.style.overflow = "hidden";
    characterInfo.innerHTML = "";
    createDetails(character);
  });
}

//function render character details
function createDetails(characterDetails) {
  detaLoader.style.display = 'none'
  currentCharcter = characterDetails;

  peopleDetails.innerHTML = `<section class="details-container">
  <h3>${characterDetails.name}</h3>
  <p>Height: ${characterDetails.height}</p> 
  <p>Mass: ${characterDetails.mass}</p>
  <p>Hair color: ${characterDetails.hair_color}</p>
  <p>Skion color: ${characterDetails.skin_color}</p>
  <p>Eye color: ${characterDetails.eye_color}</p>
  <p>Birth year: ${characterDetails.birth_year}</p>
  <p>Gender: ${characterDetails.gender}</p>
  </section>`;
}

//function fetching planet data
function createPlanet(object) {
  let homeworld_url = object.homeworld;

  fetch(homeworld_url)
    .then((response) => response.json())
    .then((data) => {
      renderPlanet(data);
    });
}

//function rendering planet data
function renderPlanet(data) {
  infoLoader.style.display = 'none'
  characterInfo.innerHTML = `
  <h3>${data.name}</h3>
  <p>Rotation period: ${data.rotation_period}</p>
  <p>Orbital period: ${data.orbital_period}</p>
  <p>Diameter: ${data.diameter}</p>
  <p>Climate: ${data.climate}</p>
  <p>Gravity: ${data.gravity}</p>
  <p>Terrain: ${data.terrain}</p>`;
}

//function fetching species
function createSpecies(object) {
  let species = object.species;

  fetch(species)
    .then((response) => response.json())
    .then((data) => {
      renderSpecies(data);
    })
    .catch((error) => {
      characterInfo.innerHTML = `<p>No info</p>`;
    });
}

//function rendering species
function renderSpecies(data) {
  characterInfo.innerHTML = `<h3>${data.name}</h3>
    <p>Average height: ${data.average_height}</p>
    <p>Average lifespan: ${data.average_lifespan}</p>
    <p>classificatio: ${data.classificatio}</p>
    <p>Created: ${data.created}</p>
    <p>Designation: ${data.designation}</p>
    <p>Language: ${data.language}</p>`;
}

//function getting vehicles url
function vehicles_url_generator(object) {
  let vehiclesArray = [];
  let vehicle_url = object.vehicles;

  for (let i = 0; i < vehicle_url.length; i++) {
    vehiclesArray.push(vehicle_url[i]);
  }
  if (vehiclesArray.length > 0) {
    if (vehiclesArray.length >= 1) {
      characterInfo.style.overflow = "scroll";
    }
    createVehicles(vehiclesArray);
  } else {
    characterInfo.style.overflow = "hidden";
    characterInfo.innerHTML = `<p>No info</p>`;
  }
}

//function fetching vehicles
function createVehicles(vehiclesArray) {
  for (let i = 0; i < vehiclesArray.length; i++) {
    fetch(vehiclesArray[i])
      .then((response) => response.json())
      .then((data) => {
        renderVehicles(data);
      });
  }
}

//function rendering vehicles
function renderVehicles(data) {
  characterInfo.innerHTML += `<h3>${data.name}</h3>
    <p>Model: ${data.model}</p>
    <p>Cost in credits: ${data.cost_in_credits}</p>
    <p>Length: ${data.length}</p>
    <p>Crew: ${data.crew}</p>
    <p>Vehicle_class: ${data.vehicle_class}</p>
    <p>Consumables: ${data.consumables}</p>
    <span class="starships-span"></span>`;
}

//function getting starships url
function starships_url_generator(object) {
  let starshipsArray = [];
  let starships_url = object.starships;
  for (let i = 0; i < starships_url.length; i++) {
    starshipsArray.push(starships_url[i]);
  }
  if (starshipsArray.length > 0) {
    if (starshipsArray.length >= 1) {
      characterInfo.style.overflow = "scroll";
    }
    createStarships(starshipsArray);
  } else {
    characterInfo.style.overflow = "hidden";
    characterInfo.innerHTML = `<p>No info</p>`;
  }
}

//function fetching starships
function createStarships(starshipsArray) {
  for (let i = 0; i < starshipsArray.length; i++) {
    fetch(starshipsArray[i])
      .then((response) => response.json())
      .then((data) => {
        renderStarships(data);
      });
  }
}

//function rendering starships
function renderStarships(data) {
  characterInfo.innerHTML += `<h3>${data.name}</h3>
    <p>MGLT: ${data.MGLT}</p>
    <p>Cargo capacity: ${data.cargo_capacity}</p>
    <p>Consumables: ${data.consumables}</p>
    <p>Cost in credits: ${data.cost_in_credits}</p>
    <p>Created: ${data.created}</p>
    <p>Crew: ${data.crew}</p>
    <span class="starships-span"></span>`;
}



function main() {
  //Entry point
  fetchData()

  //function for turning page

  //adding eventlistener to page left button
  leftBtn.addEventListener("click", () => {
    if (loading) {
      return
    }
    if (counter > 1) {
      aside.innerHTML = "";
      counter--;
      numberPage.innerText = counter;
      fetchData();
    }
  });

  //adding eventlistener to page left button
  rightBtn.addEventListener("click", () => {
    if (loading) {
      return
    }
    if (counter < maxPage) {
      aside.innerHTML = "";
      counter++;
      numberPage.innerText = counter;
      fetchData();
    }
  });

  //setting eventlisteners to all buttons
  planetBtn.addEventListener("click", () => {
    characterInfo.style.overflow = "hidden";
    createPlanet(currentCharcter);
  });

  speciesBtn.addEventListener("click", () => {
    characterInfo.style.overflow = "hidden";
    createSpecies(currentCharcter);
  });

  vehicleBtn.addEventListener("click", () => {
    characterInfo.innerHTML = "";
    vehicles_url_generator(currentCharcter);
  });

  starshipsBtn.addEventListener("click", () => {
    characterInfo.innerHTML = "";
    starships_url_generator(currentCharcter);
  });

}

main()
