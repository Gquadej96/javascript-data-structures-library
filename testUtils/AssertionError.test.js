
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals} from "./testUtils.js";
import {AssertionError} from "./AssertionError.js";


export function testAssertionErrorShouldHaveStackTrace() {
    assertEquals("string", typeof(new AssertionError().stack));
}
