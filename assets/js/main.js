const pokemonListOl = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('LoadMoreButton')
maxRecords = 649; // Quantidade de pokemons que aparecerão no total;
const limit = 25; // Quantidade de pokemons que aparecerão á cada load;
let offset = 0; // Inicio

function traduction(string) { // Essa função irá traduzir os tipos de pokemons para pt/br
    if (string == "normal") { string = "Normal"}
    else if (string == "grass") { string = "Grama"}
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
        <li class="pokemon ${pokemon.type}" onClick="selectPokemon(${pokemon.number})">
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

const selectPokemon = async (id) =>{
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url)
    const pokemon = await res.json()
    displayPopup(pokemon)
}

const displayPopup = (pokemon) =>{
    const types = pokemon.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type
 
    const photo = pokemon.sprites.other.dream_world.front_default
    const htmlString = `
   
    <div id="popup">
        <div id="detailPokemon">
            <li class="pokemon ${pokemon.type}">
                <a id="closeBtn" onClick="closePopup()">FECHAR</a>
                <span class="name-dentro">${pokemon.name}</span>
                <span class="number-dentro">#${pokemon.id.toString().padStart(3,"0")}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) =>`<li class="type ${type}">${traduction(type)}</li>`).join('')}
                    </ol>
                </div>
                <img id="img-pokemon" src="${photo}"alt="${pokemon.name}">   
                <div id="data">
                    <h4> Estatísticas</h4>
                    <div id="hability">
                        <div class="stat-desc">
                            ${pokemon.stats.map((name_stats) =>`<p class="${type}">${name_stats.stat.name}</p>`).join('')}
                        </div>
                        <div class="bar-inner"> ${pokemon.stats.map((base_stats) =>`<p class="${type}">${base_stats.base_stat}</p>`).join('')}</div>
                        </div>
                        <div id="stats">
                            <div class="stat-bar">
                                <p>Altura: ${(pokemon.height/10).toFixed(2)}m</p>
                                <p>Largura: ${(pokemon.weight/10)}kg</p>     
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>  
    </div>        
    `
   
    pokemonList.innerHTML += htmlString
}

const closePopup = () =>{
    const popup = document.getElementById('popup')
    popup.parentElement.removeChild(popup)
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
