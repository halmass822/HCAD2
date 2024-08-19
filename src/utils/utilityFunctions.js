export const digitizeNumber = (input) => {
    return input < 10 ? `0` + input : input;
};

export const getCurrentMMSS = () => {
    const currentTime = new Date();
    return `${digitizeNumber(currentTime.getMinutes())}:${digitizeNumber(currentTime.getSeconds)}`;
}