import { useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import SearchComponent from '../SearchComponent/SearchComponent';

import './MovieList.css';

const MovieList = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');

  const results = searchResults.Search;

  console.log(results);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchButton = () => {
    axios
      .get(process.env.REACT_APP_BASEURL, {
        params: {
          apikey: process.env.REACT_APP_APIKEY,
          s: query,
          type: 'movie'
        }
      })
      .then((response) => {
        //check if response is valid. If not, show error
        if (response.data['Response'] === 'True') {
          setSearchResults(response.data);
        } else {
          alert(response.data['Error']);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className='main-container'>
      <SearchComponent
        handleInputChange={handleInputChange}
        handleSearchButton={handleSearchButton}
      />

      {results && (
        <section className='movielist-container'>
          {results.map((result) => (
            <MovieCard key={result.imdbID} result={result} />
          ))}
        </section>
      )}
    </div>
  );
};

export default MovieList;
