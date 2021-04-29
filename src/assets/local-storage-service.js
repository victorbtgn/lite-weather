export const getLocalStorage = () => {
        if(localStorage.getItem('favorites')) {
            return JSON.parse(localStorage.getItem('favorites'));
        };

        return null;
    }

export const setToLocalStorage = data => {
    const favoriteList = [];
    if(localStorage.getItem('favorites')) {
        const favoriteListFromLS = JSON.parse(localStorage.getItem('favorites'));
        favoriteList.push(data);
        localStorage.setItem('favorites', JSON.stringify([...favoriteListFromLS, ...favoriteList]));
        return;
    };

    favoriteList.push(data);
    localStorage.setItem('favorites', JSON.stringify(favoriteList));
    return;
};

export const removeFromLocalStorage = data => {
    const favoriteListFromLS = JSON.parse(localStorage.getItem('favorites'));
    const newList = favoriteListFromLS.filter(item => item !== data);
    localStorage.setItem('favorites', JSON.stringify(newList));
    return;
};

export const getLastCity = () => {
    return localStorage.getItem('lastCity');
};

export const setLastCity = city => {
    return localStorage.setItem('lastCity', city);
};