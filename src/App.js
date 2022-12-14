import React from 'react';
import { useState, useEffect } from 'react';
import './App.css'
import SearchIcon from "./magnifying.svg"




const App = () => {
    const [pokemon, setPokemon] = useState({
        hp: "", 
        image: "", 
        name: "", 
        type1: "",
        type2: "", 
        atk: "",
        def: "",
        spe: ""
    })

    const [searchPokemon, setSearchPokemon] = useState("");

    const typeColor = {
        'normal': '#a9a975',
        'fire': '#f27e31',
        'water': '#6691ee',
        'grass': '#78c84d',
        'electric': '#facf34',
        'ice': '#9ad7d9',
        'fighting': '#c13028',
        'poison': '#9a41a1',
        'ground': '#dcc87d', 
        'flying': '#a78eed', 
        'psychic': '#f65889', 
        'bug': '#a8b821', 
        'rock': '#b7a038', 
        'ghost': '#705799', 
        'dragon': '#7338f7', 
        'dark': '#6f5848', 
        'steel': '#b7b9d2', 
        'fairy': '#ff9be1'

    }
    
    const findPokemon = () => {
        
        let id = Math.floor(Math.random() * 898)
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => {
            
            if(data.types.length > 1){
                setPokemon({
                    id: data.id,
                    hp: data.stats['0'].base_stat, 
                    image: data.sprites.other.dream_world.front_default,
                    backupImage: data.sprites.other.home.front_default,  
                    name: data.name, 
                    type1: data.types['0'].type['name'],
                    type2: data.types['1'].type['name'], 
                    atk: data.stats['1'].base_stat,
                    def: data.stats['2'].base_stat,
                    spe: data.stats['5'].base_stat
                })
            } else {
                setPokemon({
                    id: data.id,
                    hp: data.stats['0'].base_stat, 
                    image: data.sprites.other.dream_world.front_default,
                    backupImage: data.sprites.other.home.front_default, 
                    name: data.name, 
                    type1: data.types['0'].type['name'],
                    atk: data.stats['1'].base_stat,
                    def: data.stats['2'].base_stat,
                    spe: data.stats['5'].base_stat
                })
            }
            
            
        
        });
    }
    
    const findPokemonName = () => {
        
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
        .then(response => response.json())
        .then(data => {
            
            if(data.types.length > 1){
                setPokemon({
                    id: data.id,
                    hp: data.stats['0'].base_stat, 
                    image: data.sprites.other.dream_world.front_default, 
                    backupImage: data.sprites.other.home.front_default,
                    name: data.name, 
                    type1: data.types['0'].type['name'],
                    type2: data.types['1'].type['name'], 
                    atk: data.stats['1'].base_stat,
                    def: data.stats['2'].base_stat,
                    spe: data.stats['5'].base_stat
                })
            } else {
                setPokemon({
                    id: data.id,
                    hp: data.stats['0'].base_stat, 
                    image: data.sprites.other.dream_world.front_default,
                    backupImage: data.sprites.other.home.front_default, 
                    name: data.name, 
                    type1: data.types['0'].type['name'],
                    atk: data.stats['1'].base_stat,
                    def: data.stats['2'].base_stat,
                    spe: data.stats['5'].base_stat
                })
            }
            
            console.log(data)
            
        
        })
        .catch(error => alert('Invalid Pok??mon.'))
        
    }

useEffect(() => {
    findPokemon()
}, []);

console.log(searchPokemon)
    return (
        <div className='main'>
            <div className="nav">
                <div className="logo">POK??MON API</div>
                <div className="inputDiv" >
                    <input type="text" placeholder='Search a Pok??mon' onChange={(prevLetter) => {setSearchPokemon(prevLetter.target.value.toLowerCase())}} 
                    value={searchPokemon.charAt(0).toUpperCase() + searchPokemon.slice(1)} 
                    onKeyPress={(e) => {
                        if (e.key === "Enter"){
                            findPokemonName()
                            setSearchPokemon('')
                        } else {
                            return
                        }
                    }}
                    />
                    <img src={SearchIcon} alt='search button' className='searchIcon' onClick={() => findPokemonName()}/>
                </div>
            </div>
            
            <button onClick={findPokemon}>Generate A Random Pok??mon</button>

            <div className="pokemon">
                <div className="pokemonTop">
                    <div className="hp">
                        <h4>HP</h4> 
                        <span>{pokemon.hp}</span>
                    </div>
                    <div className="id">
                        <h4>#{pokemon.id}</h4>
                    </div>
                </div>
                <img src={pokemon.image ? pokemon.image : pokemon.backupImage} alt="" className='poke-image'
                style={{}}/>
                <h1 className="name" >{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
                <div className="types">
                    {pokemon.type2 === undefined ? <div style={{backgroundColor:`${typeColor[`${pokemon.type1}`]}`}}>{pokemon.type1}</div> : <><div style={{backgroundColor:`${typeColor[`${pokemon.type1}`]}`}}>{pokemon.type1}</div> <div style={{backgroundColor:`${typeColor[`${pokemon.type2}`]}`}}>{pokemon.type2}</div></>}
                </div>
                <div className="values">
                    <div className="atk">
                        <h2>{pokemon.atk}</h2>
                        <span>Attack</span>
                    </div>
                    <div className="def">
                        <h2>{pokemon.def}</h2>
                        <span>Defence</span>
                    </div>
                    <div className="spe">
                        <h2>{pokemon.spe}</h2>
                        <span>Speed</span>
                    </div>
                </div>
            </div>
    </div>
    )
};

export default App;