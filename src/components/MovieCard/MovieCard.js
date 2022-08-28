import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './MovieCard.css';

const MovieCard = ({ result }) => {
  const [movieID, setMovieId] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // monitor movieID state for change.
  //when it changes, the url is called with search by ID parameters
  useEffect(() => {
  
    if (movieID) {
      try {
        axios
          .get(process.env.REACT_APP_BASEURL, {
            params: {
              apiKey: process.env.REACT_APP_APIKEY,
              i: movieID,
              plot: 'short'
            }
          })
          .then(({ data }) => {
            let res = data;
            setMoreInfo(res);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [movieID]);


  // set the moveiID state to the imdbID of this card's data
  const assignMovieID = () => {
    result.imdbID && setMovieId(result.imdbID);
    setShowMoreInfo(!showMoreInfo);
  };

  // if (moreInfo) {
  //   console.log('moreInfo: ', moreInfo);
  // }

  //show a card for every movie in the results. 
  //More info section is shown dependent on showMoreInfo state
  return (
    <div className='movie-card'>
      
      <img src={result.Poster} alt={result.Title} />

      <section className='card-footer'>
        {showMoreInfo ? (
          <section className='more-info-section'>
            {moreInfo.Ratings && (
              <row>
                <span>{moreInfo.Ratings[0].Source}</span>{' '}
                <span>{moreInfo.Ratings[0].Value}</span>
              </row>
            )}
            <row>
              <span>Runtime:</span>&nbsp;
              <span>{moreInfo.Runtime}</span>
            </row>
            <row>
              <span>Released: </span>&nbsp;
              <span>{moreInfo.Released}</span>
            </row>
            <row>
              <span>Director:</span>&nbsp;
              <span>{moreInfo.Director}</span>
            </row>
            <row>
              <span>Actors:</span>
              <span>{moreInfo.Actors}</span>
            </row>
            <row>
              <p className='more-info-section-paragraph'>
                {moreInfo.Plot}
              </p>
            </row>
          </section>
        ) : null}

        <div className='footer-button-group'>
          <button
            className='more-info-button'
            onClick={assignMovieID}>
            More Info
          </button>
          <button className='save-button'>Add to Favorites</button>
        </div>
      </section>
    </div>
  );
};

export default MovieCard;
