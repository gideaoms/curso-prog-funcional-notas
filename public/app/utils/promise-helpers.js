export const handleStatus = response => {
    if (!response.ok)
        return Promise.reject(response.statusText)

    return response.json();
}

export const log = param => {
    console.log(param);
    return param;
}

export const timeoutPromise = (milliseconds, promise) => {
    const timeout = new Promise((_resolve, reject) =>
        setTimeout(() => reject(`Limite da promessa excedido (limite: ${milliseconds} ms)`), milliseconds));

    return Promise.race([timeout, promise]);
};

export const delay = milliseconds => data =>
    new Promise((resolve) => setTimeout(() => resolve(data), milliseconds));

export const retry = (retries, milliseconds, fn) =>
    fn().catch(err => {
        console.error(err);
        return delay(milliseconds)().then(() => retries > 1 
            ? retry(--retries, milliseconds, fn) 
            : Promise.reject(err))
    });