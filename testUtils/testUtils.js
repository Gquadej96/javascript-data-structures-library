
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export function assertTruth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


export function assertError(func, message) {
    try {
        func();
    } catch (error) {
        return;
    }

    throw new Error(message);
}