export const debounce = (callbackFunc, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callbackFunc(...args);
        }, delay);
    };
};
