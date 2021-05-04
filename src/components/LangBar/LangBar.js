import { useState } from 'react';

import uaLogo from '../../images/ua.png'
import enLogo from '../../images/en.png'

import './LangBar.scss';

export default function LangBar({ langChange }) {
    const [currentLang, setCurrentLang] = useState(true);

    const handleChange = () => {
        setCurrentLang(!currentLang);
        langChange(currentLang);
    };

    return(
        <>
            <input type='checkbox' id='lang-switch-control' onChange={handleChange} checked={currentLang} className='LangBar-input' />
            <label htmlFor='lang-switch-control' className='LangBar-label' >
                <img src={currentLang ? uaLogo : enLogo} alt='' />
            </label>
        </>
    )
};

// import { useRef } from 'react';

// import './LangBar.scss';

// export default function LangBar({ langChange }) {
//     const langRef = useRef(false);

//     const handleChange = () => {
//         langRef.current = !langRef.current;
//         console.log(langRef.current);
//         return langChange(langRef.current);
//     };

//     return(
//         <>
//             <input type='checkbox' id='lang-switch-control' onChange={handleChange} checked={langRef.current} className='LangBar-input' />
//             <label htmlFor='lang-switch-control' style={langRef.current ? {background: 'linear-gradient(#0004ff, #eeff00)'} : {background: 'linear-gradient(#ff0000, #0004ff)'}} className='LangBar-label' ></label>
//         </>
//     )
// };
