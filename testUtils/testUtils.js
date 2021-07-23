
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */

import {AssertionError} from "./AssertionError.js";

export function assertTruth(condition, message) {
    message = message || `Assertion Failed
Expected: ${true}
Got: ${condition}\
`
    ;

    if (!condition) {
        throw new AssertionError(message);
    }
}


export function assertError(func, message) {
    message = message || `Assertion Failed
Expected exception to be thrown.
`
    ;

    try {
        func();
    } catch (error) {
        return;
    }

    throw new AssertionError(message);
}