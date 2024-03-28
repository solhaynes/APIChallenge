let pokemonImage = document.getElementById("picture");
let pokemonName = document.getElementById("name");
let height = document.getElementById("height");
let weight = document.getElementById("weight");
let moves = document.getElementById("moves");
let types = document.getElementById("types");

function getPokemonDetails(text) {
  fetch("https://pokeapi.co/api/v2/pokemon/"+text)
  .then(function(response){
    console.log(response);
    return response.json();
  })
  .then(function(json){
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
    console.log(json);
    for (let i = 0; i < json.moves.length; i++) {
      let listItem = document.createElement('li');
      listItem.innerText = json.moves[i].move.name;
      moves.appendChild(listItem);
    }
  }

  function populateTypes(json, types) {
    console.log(json);
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
let charButton = document.querySelector("#charmanderBtn");
let squirButton = document.querySelector("#squirtleBtn");
let bulButton = document.querySelector("#bulbasaurBtn");


charButton.addEventListener("click", function(){getPokemonDetails("charmander")});
squirButton.addEventListener("click", function(){getPokemonDetails("squirtle")});
bulButton.addEventListener("click", function(){getPokemonDetails("bulbasaur")});

