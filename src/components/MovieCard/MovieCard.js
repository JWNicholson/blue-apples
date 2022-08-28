import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './MovieCard.css';

const MovieCard = ({ result }) => {
  const [movieID, setMovieId] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [savedList, setSavedList] = useState(['fubar']);

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

  //show a card for every movie in the results.
  //More info section is shown dependent on showMoreInfo state

  const thisIstheMoviveId = result.imdbID;
  const addToSavedHandler = () => {
    // console.log({moreInfo})
    console.log({ thisIstheMoviveId });

    savedList.push(thisIstheMoviveId)

//setSavedList((savedList) => [...savedList, thisIstheMoviveId])

    console.log({ savedList });
  };

  return (
    <div className='movie-card'>
      <img src={result.Poster} alt={result.Title} />

      <section className='card-footer'>
        {showMoreInfo ? (
          <section className='more-info-section'>
            {moreInfo.Ratings && (
              <div className='row'>
                <span>{moreInfo.Ratings[0].Source}</span>
                <span>{moreInfo.Ratings[0].Value}</span>
              </div>
            )}
            <div className='row'>
              <span>Runtime:</span>&nbsp;
              <span>{moreInfo.Runtime}</span>
            </div>
            <div className='row'>
              <span>Released: </span>&nbsp;
              <span>{moreInfo.Released}</span>
            </div>
            <div className='row'>
              <span>Director:</span>&nbsp;
              <span>{moreInfo.Director}</span>
            </div>
            <div className='row'>
              <span>Actors:</span>
              <span>{moreInfo.Actors}</span>
            </div>
            <div className='row'>
              <p className='more-info-section-paragraph'>
                {moreInfo.Plot}
              </p>
            </div>
          </section>
        ) : null}

        <div className='footer-button-group'>
          <button
            className='more-info-button'
            onClick={assignMovieID}>
            More Info
          </button>
          <button
            className='save-button'
            onClick={addToSavedHandler}>
            Add to Favorites
          </button>
        </div>
      </section>
    </div>
  );
};

export default MovieCard;
