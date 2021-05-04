import { useState, useEffect } from 'react';

import { getTodayWeather } from '../../assets/api-service';
import { getCurrentDate, getTime } from '../../assets/date-service';
import { setLastCity } from '../../assets/local-storage-service';
import { windDirection } from '../../assets/wind-direction';

import CircleLoader from "react-spinners/CircleLoader";

import ErrorComp from '../../common/ErrorComp/ErrorComp';
import WeatherIconAnimation from '../../common/WeatherIconAnimation/WeatherIconAnimation';
import { ReactComponent as ArrowIcon } from '../../images/arrow.svg';
// import { ReactComponent as PressureIcon } from '../../images/air-pressure.svg';
import { ReactComponent as HumidityIcon } from '../../images/humidity.svg';
import { ReactComponent as AirIcon } from '../../images/air.svg';
import { ReactComponent as SunriseIcon } from '../../images/sunrise.svg';
import { ReactComponent as SunsetIcon } from '../../images/sunset.svg';


import './TodayWeather.scss';

export default function TodayWeather({ city, lang }) {
    const [todayData, setTodayData] = useState(null);
    const [currentCity, setCurrentCity] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        setTodayData(null);
        getTodayWeather(city, lang)
            .then(data => {
                if(data?.message === 'city not found') return setError(data);
                setError(null);
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
                        {/* City name */}
                        <h2 className='TodayWeather-city'>{currentCity}</h2>
                        {/* Requested time */}
                        <p className='TodayWeather-description'>{getCurrentDate(todayData.current.dt, lang)}</p>
                        
                        <WeatherIconAnimation weatherId={todayData.current.weather[0].id} />
                        {/* Current temperature */}
                        <p className='TodayWeather-temperature'>{Math.round(todayData.current.temp)}&#8451;</p>
                        {/* min max temperature */}
                        <span className='TodayWeather-description'>мін {Math.round(todayData.daily[0].temp.min)}&#176;</span>&#160;&#160;&#160;
                        <span className='TodayWeather-description'>макс {Math.round(todayData.daily[0].temp.max)}&#176;</span>
                        {/* Feels like temperature and description */}
                        <p className='TodayWeather-description'>Відчувається як {Math.round(todayData.current.feels_like)}&#176;</p>
                        <p className='TodayWeather-description borderBottom'>{todayData.current.weather[0].description}</p>
                        {/* Pressure */}
                        {/* <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <PressureIcon className='TodayWeather-svg' />
                            </span>
                            <span>{Math.round(todayData.current.pressure * 0.75006375541921)}мм</span>
                        </p> */}
                        {/* Humidity */}
                        <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <HumidityIcon className='TodayWeather-svg' />
                            </span>
                            <span>{todayData.current.humidity}&#37;</span>
                        </p>
                        {/* Wind options */}
                        <p className='TodayWeather-description dflex'>
                            <span className='dflex-icon'>
                                <AirIcon className='TodayWeather-svg' />
                            </span>
                            <span>{todayData.current.wind_speed}<span className='symbol'>М/С</span> <ArrowIcon className='TodayWeather-svg' style={{transform: `rotate(${todayData.current.wind_deg}deg)` }} /> {windDirection(todayData.current.wind_deg)}</span>
                        </p>
                        {/* Sunrise and sunset */}
                        <p className='solarValue'>
                            <span className='TodayWeather-description solarValue-sunrise'><SunriseIcon className='TodayWeather-svg' /> {getTime(todayData.current.sunrise)}</span>
                            <span className='TodayWeather-description solarValue-sunset'><SunsetIcon className='TodayWeather-svg' /> {getTime(todayData.current.sunset)}</span>
                        </p>
                    </>
                :   <div className='Loader'>
                        <CircleLoader color={'#cccaca'} size={150} />
                    </div>}
        </section>

        // <section className='TodayWeather'>
        //     <div className='Loader'>
        //         <CircleLoader color={'#cccaca'} size={150} />
        //     </div>
        // </section>
   );
};
