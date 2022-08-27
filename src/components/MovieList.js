import axios from 'axios';
import { useState } from 'react';
import SearchComponent from './SearchComponent';

const MovieList = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState('');
  // console.log(query);
  //console.log(searchResults);

  const url = process.env.REACT_APP_BASEURL;
  const apiKey = process.env.REACT_APP_APIKEY;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchButton = () => {
    //console.log("Search Query: ",query)

    axios
      .get(url, {
        params: {
          apikey: apiKey,
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

  const movie = searchResults;

  return (
    <div>
      <SearchComponent
        handleInputChange={handleInputChange}
        handleSearchButton={handleSearchButton}
      />
    </div>
  );
};

export default MovieList;
