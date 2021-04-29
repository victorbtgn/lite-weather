import { useState, useEffect } from 'react';

import { getLastCity } from '../../assets/local-storage-service';

import SearchBar from '../../components/SearchBar/SearchBar';
import TodayWeather from '../../components/TodayWeather/TodayWeather';
import './HomepageView.scss';

let lang = 'ua';
// let lang = 'en';

export default function HomepageView() {
  const [city, setCity] = useState('kyiv');

  useEffect(() => {
    if(getLastCity()) setCity(getLastCity());
  }, []);

  const formSubmit = query => {
    setCity(query);
  };

    return (
      <>
        <SearchBar formSubmit={formSubmit} />
        <TodayWeather city={city} lang={lang} />
      </>
  );
};