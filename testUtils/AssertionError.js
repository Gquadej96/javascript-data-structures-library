
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class AssertionError extends Error {
    constructor(message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}