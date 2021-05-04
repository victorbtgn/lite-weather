import { useState, useEffect } from 'react';

import { getLastCity } from '../../assets/local-storage-service';

import SearchBar from '../../components/SearchBar/SearchBar';
import LangBar from '../../components/LangBar/LangBar';
import TodayWeather from '../../components/TodayWeather/TodayWeather';

import './HomepageView.scss';

// let lang = 'ua';
// let lang = 'en';

export default function HomepageView() {
  const [city, setCity] = useState('kyiv');
  const [lang, setLang] = useState('ua');

  useEffect(() => {
    if(getLastCity()) setCity(getLastCity());
  }, []);

  const formSubmit = query => {
    setCity(query);
  };

  const langChange = query => {
    if(query) setLang('en');
    if(!query) setLang('ua');
  };

    return (
      <main className='HomepageView'>
        <div className='HomepageView-header'>
          <SearchBar formSubmit={formSubmit} />
          <LangBar langChange={langChange} />
        </div>
        
        <TodayWeather city={city} lang={lang} />
      </main>
  );
};