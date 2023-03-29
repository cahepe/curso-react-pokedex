import react, {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { getPokemons } from "../controller/getpokemon";
import { Pokemon } from '../models/pokemon.m';
import Figure from 'react-bootstrap/Figure';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Listado=()=>{

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [query, setQuery] = useState("");

    useEffect(()=>{
        const obtenerTodos = async() =>{
            const allPokemons = await getPokemons();
            setPokemons(allPokemons);
        }
        obtenerTodos();
    });

    const filtrarPokemon = pokemons?.slice(0,151).filter((pokemon)=>{
        return pokemon.name.toLocaleLowerCase().match(query.toLowerCase());
    })

    return(
        <>
            <h1>Pokemon AnderCode</h1>

            <header>
                <input
                    value={query}
                    placeholder="Buscar Pokemon"
                    onChange={(event) => setQuery(event.target.value.trim())}
                    type="text"
                />
            </header>

            <div className="content-wrapper">
                <div className="content">
                    <div className="row gap-3">

                        {filtrarPokemon?.slice(0,151).map((pokemon)=>(

                            <Card className="mx-auto" style={{ width: '18rem' }}>
                            <Card.Header><b>Tipo:</b> {pokemon.tipo}</Card.Header>
                            <Card.Img className="d-block mx-auto w-50" width="80" height="100" variant="top" src={pokemon.imggif} />
                            <Card.Body>
                                <Card.Title className="text-center">{pokemon.id} - {pokemon.name}</Card.Title>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <i className="bi bi-heart-fill"></i> <b>HP:</b> {pokemon.hp}
                                    </ListGroup.Item>
                                    <ListGroup.Item><i className="bi bi-lightning"></i> <b>Ataque:</b> {pokemon.attack}</ListGroup.Item>
                                    <ListGroup.Item><i className="bi bi-shield"></i> <b>Desensa:</b> {pokemon.defense}</ListGroup.Item>
                                    <ListGroup.Item><i className="bi bi-lightning-fill"></i> <b>E.Ataque:</b> {pokemon.sp_atk}</ListGroup.Item>
                                    <ListGroup.Item><i className="bi bi-shield-fill-plus"></i> <b>E.Desensa:</b> {pokemon.sp_def}</ListGroup.Item>
                                    <ListGroup.Item><i className="bi bi-rocket-takeoff-fill"></i> <b>Velocidad:</b> {pokemon.speed}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                            </Card>
                         ))}
                    
                    </div>
                </div>
            </div>
            

        </>
    )
}

export default Listado;