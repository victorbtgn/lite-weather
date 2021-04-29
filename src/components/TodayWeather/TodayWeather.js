import { useState, useEffect } from 'react';

import { getTodayWeather } from '../../assets/api-service';
import { getCurrentDate, getTime } from '../../assets/date-service';
import { setLastCity } from '../../assets/local-storage-service';
import { windDirection } from '../../assets/wind-direction';

import CircleLoader from "react-spinners/CircleLoader";

import ErrorComp from '../../common/ErrorComp/ErrorComp';
import WeatherIconAnimation from '../../common/WeatherIconAnimation/WeatherIconAnimation';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
import { ReactComponent as PressureIcon } from '../../images/air-pressure.svg';
import { ReactComponent as HumidityIcon } from '../../images/humidity.svg';
import { ReactComponent as AirIcon } from '../../images/air.svg';
import { ReactComponent as SunriseIcon } from '../../images/sunrise.svg';
import { ReactComponent as SunsetIcon } from '../../images/sunset.svg';


import './TodayWeather.scss';

export default function TodayWeather({ city, lang }) {
    const [todayData, setTodayData] = useState(null);
    const [currentCity, setCurrentCity] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        getTodayWeather(city, lang)
            .then(data => {
                if(data?.message === 'city not found') return setError(data);
                setError(null);
                setCurrentDate(getCurrentDate());
                setCurrentCity(city);
                setTodayData(data);
                setLastCity(city);
            })
            .catch(err => {
                setError(err);
            })
    }, [city, lang]);

    useEffect(() => {
        if(error) {
            const timerId = setTimeout(() => {
                setError(null);
                clearTimeout(timerId);
            }, 10200);
        }
        
    }, [error])

      return (
        <section className='TodayWeather'>
            {error && <ErrorComp message={'Місто правильно назвали?'} />}
            {todayData
                ?   <>
                        <h2 className='TodayWeather-city'>{currentCity}</h2>
                        <p className='TodayWeather-description'>{currentDate}</p>

                        <WeatherIconAnimation weatherId={todayData.weather[0].id} />

                        <p className='TodayWeather-temperature'>{Math.round(todayData.main.temp)}&#8451;</p>
                        <p className='TodayWeather-description'>Відчувається як {Math.round(todayData.main.feels_like)}&#176;</p>
                        <p className='TodayWeather-description borderBottom'>{todayData.weather[0].description}</p>

                        {/* <span className='TodayWeather-description'>мін {todayData.main.temp_min}</span>&#160;&#160;&#160;
                        <span className='TodayWeather-description'>макс {todayData.main.temp_max}</span> */}
                        <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <PressureIcon className='TodayWeather-svg' />
                            </span>
                            <span>{Math.round(todayData.main.pressure * 0.75006375541921)}мм</span>
                        </p>
                        <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <HumidityIcon className='TodayWeather-svg' />
                            </span>
                            <span>{todayData.main.humidity}&#37;</span>
                        </p>
                        <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <AirIcon className='TodayWeather-svg' />
                            </span>
                            <span>{todayData.wind.speed}<span className='symbol'>М/С</span> <ArrowIcon className='TodayWeather-svg' style={{transform: `rotate(${todayData.wind.deg}deg)` }} /> {windDirection(todayData.wind.deg)}</span>
                        </p>

                        <p className='solarValue'>
                            <span className='TodayWeather-description solarValue-sunrise'><SunriseIcon className='TodayWeather-svg' /> {getTime(todayData.sys.sunrise)}</span>
                            <span className='TodayWeather-description solarValue-sunset'><SunsetIcon className='TodayWeather-svg' /> {getTime(todayData.sys.sunset)}</span>
                        </p>
                    </>
                :   <div className='Loader'>
                        <CircleLoader color={'#cccaca'} size={150} />
                    </div>}
        </section>
   );
};
