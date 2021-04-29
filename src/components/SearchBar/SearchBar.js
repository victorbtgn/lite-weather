import { useState, useEffect } from 'react';

// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

import { ReactComponent as SearchIcon } from '../../images/search_icon.svg';
import { ReactComponent as StarBorderIcon } from '../../images/star_border.svg';
import { ReactComponent as StarIcon } from '../../images/star.svg';

import { getLocalStorage, setToLocalStorage, removeFromLocalStorage } from '../../assets/local-storage-service'

import './SearchBar.scss';
import FavoriteItem from '../FavoriteItem/FavoriteItem';

export default function SearchBar({ formSubmit }) {
  const [query, setQuery] = useState('');
  const [cityName, setCityName] = useState('');
  const [favoriteList, setFavoriteList] = useState([]);
  const [starIconIsActive, setStarIconIsActive] = useState(false);

  useEffect(() => {
    const favList = getLocalStorage();
    if(favList) setFavoriteList(favList);
  }, [])

  useEffect(() => {
    if(favoriteList.length > 0) {
      favoriteList.forEach(item => {
        if(item === query) setStarIconIsActive(true);
        if(item !== query) setStarIconIsActive(false);
      })
    }
  }, [query, favoriteList])

  const handleChange = evt => {
        setQuery(evt.target.value);
  };

  const onSubmit = evt => {
    evt.preventDefault();
    formSubmit(query);
    setCityName(query);
  };

  const onClickFavorite = () => {
    setToLocalStorage(cityName);
    const favList = getLocalStorage();
    setFavoriteList(favList);
  };

  const onRemoveFavorite = () => {
    removeFromLocalStorage(query);
    const favList = getLocalStorage();
    setStarIconIsActive(false);
    setFavoriteList(favList);
  };

  const onRemoveFavFromItem = data => {
    removeFromLocalStorage(data);
    const favList = getLocalStorage();
    setFavoriteList(favList);
  };

    return (
        <section className='SearchBar'>
          <form onSubmit={onSubmit} className='SearchBar-form'>
              {starIconIsActive
                ?  <button type='button' onClick={onRemoveFavorite} className='SearchBar-form_btn'>
                  <StarIcon className='SearchBar-form_svg' />
                    </button>
                : <button type='button' onClick={onClickFavorite}   className='SearchBar-form_btn'>
                  <StarBorderIcon className='SearchBar-form_svg' />
                  </button>}
            
            <input
              type='text'
              name='city'
              value={query}
              autoComplete='off'
              placeholder='Яке місто шукаєм?'
              onInput={handleChange}
              className='SearchBar-form_input'
            />
            <button type='submit' className='SearchBar-form_btn'><SearchIcon className='SearchBar-form_svg' /></button>
          </form>
          <Splide 
            className='SearchBar-favorite'
            options={{
              autoWidth: true,
              arrows: false,
              pagination: false,
            }} >
            {favoriteList.length > 0 && favoriteList
                .map(city => <SplideSlide key={city}>
                  <FavoriteItem city={city} changeFavorite={formSubmit} onRemoveFavoriteItem={onRemoveFavFromItem} />
                </SplideSlide>)}
          </Splide>
        </section>
    )
};
