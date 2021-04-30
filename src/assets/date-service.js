export const getCurrentDate = (unixTime, lang) => new Date(unixTime * 1000).toLocaleDateString(lang, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
});

export const getTime = unix => {
    const timeArr = new Date(unix * 1000).toTimeString().split(' ')[0].split(':');
    return `${timeArr[0]}:${timeArr[1]}`
}
