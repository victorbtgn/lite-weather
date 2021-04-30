import { useRef } from 'react';

import './LangBar.scss';

export default function LangBar() {
    const langCheckbox = useRef(false);

    // const isChecked = evt => {
    //     console.log(evt);
    // };

    const handleChange = () => {
        console.log('handler');
        console.log(langCheckbox);
    };

    return(
        <>
            <input type='checkbox' name='lang' onChange={handleChange} checked className='LangBar' />
        </>
    )
}