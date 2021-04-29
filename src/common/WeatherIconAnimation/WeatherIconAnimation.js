import { useEffect, useState } from 'react';


import './WeatherIconAnimation.scss';

export default function WeatherIconAnimation({ weatherId }) {
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => setCurrentTime(new Date().toLocaleTimeString().split(':')[0]), [weatherId]);

    const isDayOrNight = () => {
        if(currentTime > 5 && currentTime < 22) {
            return "sun";
        } else {
            return "moon";
        }
    };
    
    return(
        <div className='WeatherIconAnimation'>
            {weatherId === 800 && <div className={`${isDayOrNight()}`}></div>}
            {/* Sunny or Moony */}

            {(weatherId === 801 || weatherId === 802) && <div className="partly_cloudy">
                <div className={`partly_cloudy__${isDayOrNight()}`}></div>
                <div className="partly_cloudy__cloud"></div>
            </div>}
            {/* Partly cloudy */}

            {(weatherId === 803 || weatherId === 804) && <div className="cloudy"></div>}
            {/* Cloudy */}

            {300 <= weatherId && weatherId <= 321 && <div className="rainy">
                <div className="rainy__cloud"></div>
                <div className="rainy__rain"></div>
            </div>}
            {/* Drizzle */}

            {500 <= weatherId && weatherId <= 531 && <div className="rainy">
                <div className="rainy__cloud"></div>
                <div className="rainy__rain"></div>
            </div>}
            {/* Rainy */}

            {200 <= weatherId && weatherId <= 232 && <div className="thundery">
                <div className="thundery__cloud"></div>
                <div className="thundery__rain"></div>
            </div>}
            {/* Thundery */}

            {600 <= weatherId && weatherId <= 622 && <div className="snow">
                <div className="snow__cloud"></div>
                <div className="snow__snowly"></div>
                <div className="snow__snowly-two"></div>
            </div>}
            {/* Snow */}
        </div>
    )
};
