let pokemonImage = document.getElementById("picture");
let pokemonIndex = document.getElementById("index");
let pokemonName = document.getElementById("name");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let moves = document.getElementById("moves");
let types = document.getElementById("types");

let currentIndex = 0;
let currentPokemonName;

function getPokemonDetails(text) {
  fetch("https://pokeapi.co/api/v2/pokemon/"+text)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    pokemonIndex.innerText = json.id;
    pokemonName.innerText = json.name;
    height.innerText = json.height + " decimeters";
    weight.innerText = json.weight + " hectograms";

    //delete all children
    removeChildElements(moves);
    removeChildElements(types);

    //populate child nodes
    populateMoves(json, moves);
    populateTypes(json, types);

    pokemonImage.src = json.sprites.front_default;
  })

  function populateMoves(json, moves) {
    for (let i = 0; i < json.moves.length; i++) {
      let listItem = document.createElement('li');
      listItem.innerText = json.moves[i].move.name;
      moves.appendChild(listItem);
    }
  }

  function populateTypes(json, types) {
    for (let i = 0; i < json.types.length; i++) {
      let listItem = document.createElement('li');
      listItem.innerText = json.types[i].type.name;
      types.appendChild(listItem);
    }
  }

  function removeChildElements(moves) {
    if (moves.hasChildNodes) {
      while (moves.firstChild) {
        moves.removeChild(moves.firstChild);
      }
    }
  }
}

function nextPokemon(){
  currentIndex = currentIndex+1;
  getPokemonName(currentIndex);
}
function previousPokemon(){
  if (currentIndex > 0){
    currentIndex = currentIndex - 1;
  }
  getPokemonName(currentIndex);
}

function getPokemonName(index){
  fetch("https://pokeapi.co/api/v2/pokemon/"+index)
  .then(function(response){
    return response.json();
  })
  .then(function(json){
    currentPokemonName = json.name;
    getPokemonDetails(currentPokemonName);
  })
}

// Event listeners for Buttons
previousBtn.addEventListener("click", function(){previousPokemon()});
nextBtn.addEventListener("click", function(){nextPokemon()});


