export const partialize = (fn, ...args) =>
    fn.bind(null, ...args);

export const compose = (...fns) => param =>
    fns.reduceRight((previousParam, currentFn) => currentFn(previousParam), param);

export const pipe = (...fns) => param =>
    fns.reduce((previousParam, currentFn) => currentFn(previousParam), param);

export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = null;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    }
};