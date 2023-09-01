import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export interface MainCardProps {
    pokemonName: string;
    pokemonUrlImage: string;
    pokemonType: any;
}


const handlePickTypesOfPokemons = (pokemonType : any) => {
    return pokemonType.join(' | ');
}


export default function MainCard({ pokemonName, pokemonUrlImage, pokemonType } : MainCardProps) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={pokemonUrlImage}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {pokemonName}
                </Typography>
                <Typography gutterBottom variant="caption" component="div">
                    {handlePickTypesOfPokemons(pokemonType)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>
            </CardContent>
            {/*<CardActions>*/}
            {/*    <Button size="small">Share</Button>*/}
            {/*    <Button size="small">Learn More</Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}