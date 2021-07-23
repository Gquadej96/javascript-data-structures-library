
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */

import {AssertionError} from "./AssertionError.js";


export function assertEquals(expectedValue, actualValue, message) {
    message = `\
${message || "Assertion Failed"}
Expected: ${expectedValue}
Actual: ${actualValue}\
`   ;

    if (expectedValue !== actualValue) {
        throw new AssertionError(message);
    }
}


export function assertTrue(condition, message) {
    assertEquals(true, condition, message);
}


export function assertThrows(func, message) {
    message = `\
${message || "Assertion Failed"}
Expected an error.
Actually got nothing.\
`   ;

    try {
        func();
    } catch (error) {
        return;
    }

    throw new AssertionError(message);
}