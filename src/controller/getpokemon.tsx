import { Pokemon } from '../models/pokemon.m';

export async function getPokemons(): Promise<Pokemon[]>{
    /*todo llamado a api rest*/
    const response = await fetch("https://www.unpkg.com/pokemons@1.1.0/pokemons.json");
    const datos = await response.json();
    const pokemons = datos.results.map((pokemon:any)=>({
        name: pokemon.name,
        id: pokemon.national_number,
        imggif: corregirNombre(pokemon.sprites['animated']),
        imglarge: corregirNombre(pokemon.sprites['large']),
        imgnormal: corregirNombre(pokemon.sprites['normal']),
        total: pokemon.total,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        sp_atk: pokemon.sp_atk,
        sp_def: pokemon.sp_def,
        speed: pokemon.speed,
        tipo: pokemon.type[0]
    }));

    const unicosPokemons = pokemons.filter(
        (pokemon:any, index: number)=>
        pokemons.findIndex((other:any)=>other.id===pokemon.id) === index
    );

    return unicosPokemons;
}

export function corregirNombre(name: string): string{

    const nuevoNombre = name.replace("'","").replace(".-","-").replace("♀","-f").replace("♂","-m");
    return nuevoNombre
    /*
    if(name.includes("'")){
        return name.replace("'","")
    }else{
        return name
    }
    */

    
}