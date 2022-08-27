import { useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';
import SearchComponent from '../SearchComponent';

import './MovieList.css';

const MovieList = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  // console.log(searchResults);

  const results = searchResults.Search;

  const url = process.env.REACT_APP_BASEURL;
  const apiKey = process.env.REACT_APP_APIKEY;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchButton = () => {
    axios
      .get(url, {
        params: {
          apikey: apiKey,
          s: query,
          type: 'movie',
        },
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
  console.log(results);

  return (
    <div>
      <SearchComponent
        handleInputChange={handleInputChange}
        handleSearchButton={handleSearchButton}
      />

{results && 
  <section className='movielist-container'>
  {results.map(result => (
    <MovieCard key={result.imdbID} result={result} />
  ))}
</section>
}
    
    </div>
  );
};

export default MovieList;
