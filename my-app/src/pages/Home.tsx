import React, {useEffect, useState} from 'react';
import MainNavbar from '../components/MainNavbar/index'
import MainCard from "../components/MainCard/index";
import {Container, Grid, responsiveFontSizes} from "@mui/material";
import { Skeleton } from "@mui/material"
import axios from "axios";


export interface Pokemon {
    name: string;
    url: string;
    types: any;
}

export const Home = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPokemons()
    }, [])

    const getPokemons = () => {
        setIsLoading(true);
        let endpoints = [];
        for (let i = 1; i < 200; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        }

        let requests = endpoints.map((endpoint) => axios.get(endpoint));

        Promise.all(requests)
            .then((responses) => {
                const fetchedPokemons = responses.map((response) => ({
                    name: response.data.name,
                    url: response.data.sprites.front_default,
                    types: response.data.types.map((typeData: { type: { name: any; }; }) => typeData.type.name)
                }));
                setPokemons(fetchedPokemons);
                setIsLoading(false);
                console.log(fetchedPokemons)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const handleFilterPokemons = (name: string) => {
        if(name === ''){
            getPokemons();
        }
        const filteredPokemons = pokemons.filter((pokemon) =>
            pokemon.name.includes(name)
        );
        setPokemons(filteredPokemons)
        console.log("filteredPokemons", filteredPokemons)
    };

        return (
            <div>
                <MainNavbar handleFilterPokemons={handleFilterPokemons}/>
                <Container maxWidth={false}>
                    <Grid container spacing={3}>
                        {isLoading ? (
                            Array(20).fill(null).map((_, index) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                                    <Skeleton variant="rectangular" width={200} height={200} />
                                    <Skeleton variant="text" width={200} height={20} />
                                    <Skeleton variant="text" width={200} height={20} />
                                </Grid>
                            ))
                        ) : (
                            pokemons.map((pokemon, key) => (
                                <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.name}>
                                    <MainCard pokemonName={pokemon.name} pokemonUrlImage={pokemon.url} pokemonType={pokemon.types} />
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Container>

            </div>

        )
    }