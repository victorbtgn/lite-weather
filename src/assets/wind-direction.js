export const windDirection = deg => {
    const direction = [`Пн`, 'Пн-Сх', 'Сх', 'Пд-Сх', 'Пд', 'Пд-Зх', 'Зх', 'Пн-Зх',];

    return direction[Math.round(deg / 45)];
};
