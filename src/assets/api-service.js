import axios from 'axios';
require('dotenv').config();

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/';

// export const getTodayWeather = (city, lang) => axios
//     .get(`weather?q=${city}&units=metric&lang=${lang}&appid=${process.env.REACT_APP_API_KEY}`)
//     .then(res => res.data)
//     .catch(error => error.response.data);

export const getTodayWeather = async (city, lang) => {
    try {
        const toDayWeather = await axios
        .get(`weather?q=${city}&units=metric&lang=${lang}&appid=${process.env.REACT_APP_API_KEY}`);

        if(toDayWeather?.data?.coord) {
            const { lon, lat } = toDayWeather.data.coord;
            const { data: { current, daily, hourly } } = await axios
            .get(`onecall?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${process.env.REACT_APP_API_KEY}`);

            return { current, daily, hourly };
        }
    } catch (error) {
        return error.response.data;
    };
};
