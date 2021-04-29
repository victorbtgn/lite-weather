import { ReactComponent as StarIcon } from '../../images/star.svg';

import './FavoriteItem.scss';

export default function FavoriteItem({ city, changeFavorite, onRemoveFavoriteItem }) {

    const onClickIcon = () => {
        onRemoveFavoriteItem(city);
    };

    const onClickName = () => {
        changeFavorite(city);
    };

    return (
        <div className='FavoriteItem'>
            <button type='button' onClick={onClickIcon} className='FavoriteItem-btn_icon'>
                <StarIcon  className='FavoriteItem-svg' />
            </button>
            <button type='button' onClick={onClickName} className='FavoriteItem-btn_name'>{city}</button>
        </div>
    )};