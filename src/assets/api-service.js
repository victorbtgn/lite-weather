import axios from 'axios';
require('dotenv').config();

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';

export const getTodayWeather = (city, lang) => axios
    // .get(`weather?q=${city}&units=metric&lang=${lang}&appid=${apiKey}`)
    .get(`weather?q=${city}&units=metric&lang=${lang}&appid=${process.env.REACT_APP_API_KEY}`)
    .then(response => response.data)
    .catch(error => error.response.data)
