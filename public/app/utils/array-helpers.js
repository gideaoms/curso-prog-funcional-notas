if (!Array.prototype.$flatMap) {
    Array.prototype.$flatMap = function(callback) {
        return this.map(callback).reduce((accumulatorArray, currentArray) => accumulatorArray.concat(currentArray), [])
    }
}