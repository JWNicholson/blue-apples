import React from 'react';
import './SearchComponent.css';

const SearchComponent = (props) => {
  return (
    <div className='searchbox-container'>
      <input
        className='searchbox-container-input'
        type='text'
        placeholder='Search for title....'
        name='search'
        onChange={props.handleInputChange}
      />
      <button className='searchbox-button' onClick={props.handleSearchButton}>Search</button>
    </div>
  );
};

export default SearchComponent;
