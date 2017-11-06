"use strict";

export default class Utils {

    /**
     * Returns a number whose value is limited to the given range.
     * 
     * @see {@link https://github.com/tc39/ecmascript_simd/blob/master/src/ecmascript_simd.js#L99}
     * 
     * @param {Number} a The number to clamp
     * @param {Number} min The lower boundary of the output range
     * @param {Number} max The upper boundary of the output range
     * @returns A number in the range [min, max]
     * 
     */
    static clamp(a, min, max) {
        if (a < min)
            return min;
        if (a > max)
            return max;
        return a;
    }

    static getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
    }
}