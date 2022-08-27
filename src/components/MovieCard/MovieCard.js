import React from 'react';
import './MovieCard.css';

const MovieCard = ({ result }) => {
 
 return (
 
<div className='movie-card'>
  <h3>{result.Title}</h3>
  <img src={result.Poster} alt={result.Title} /> 
</div>
 );
};

export default MovieCard;
