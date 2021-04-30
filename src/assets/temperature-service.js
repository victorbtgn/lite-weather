export const getMinTemp = data => {
    return data.reduce((acc, day) => {
        if(acc > day.temp.min) { acc = day.temp.min };
        return acc;
    }, 100);
};

export const getMaxTemp = data => {
    return data.reduce((acc, day) => {
        if(acc < day.temp.min) { acc = day.temp.min };
        return acc;
    }, 0);
};
