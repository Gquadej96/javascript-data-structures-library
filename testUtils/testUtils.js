
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export function assertTruth(condition, message) {
    message = message ?? `\
Expected: ${true}
Got: ${condition}
`
    ;

    if (!condition) {
        throw new Error(message);
    }
}


export function assertError(func, message) {
    message = message ?? `\
Expected exception, but nothing was thrown.
`
    ;

    try {
        func();
    } catch (error) {
        return;
    }

    throw new Error(message);
}