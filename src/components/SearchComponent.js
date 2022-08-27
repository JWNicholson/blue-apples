import React from 'react';

const SearchComponent = (props) => {
  return (
    <div>
      <input
        type='text'
        placeholder='Search for title....'
        name='search'
        onChange={props.handleInputChange}
      />
      <button onClick={props.handleSearchButton}>Search</button>
    </div>
  );
};

export default SearchComponent;
