const pokemonListOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('LoadMoreButton')
maxRecords = 649; // Quantidade de pokemons que aparecerão no total;
const limit = 25; // Quantidade de pokemons que aparecerão á cada load;
let offset = 0; // Inicio

function traduction(string) { // Essa função irá traduzir os tipos de pokemons para pt/br
    if (string == "normal") { string = "Normal"}
    else if (string == "grass") { string = "Folha"}
    else if (string == "poison") {string = "Veneno"}
    else if (string == "fire") {string = "Fogo"}
    else if (string == "bug") {string = "Inseto"}
    else if (string == "water") {string = "Água"}
    else if (string == "flying") {string = "Voador"}
    else if (string == "electric") {string = "Elétrico"}
    else if (string == "ground") {string = "Subsolo"}
    else if (string == "fighting") {string = "Lutador"}
    else if (string == "rock") {string = "Pedra"}
    else if (string == "psychic") {string = "Psíquico"}
    else if (string == "steel") {string = "Ferro"}
    else if (string == "ice") {string = "Gelo"}
    else if (string == "dragon") {string = "Dragão"}
    else if (string == "dark") {string = "Escuridão"}
    else if (string == "ghost") {string = "Fantasma"}
    else if (string == "fairy") {string = "Fada"}
    return string

}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${traduction(pokemon.name)}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${traduction(type)}</li>`).join("")}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `).join('')
        pokemonListOl.innerHTML += newHtml 
    })
    
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecords){
            const newLimit = maxRecords - offset
            loadPokemonItens(offset, newLimit);

            loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
})
