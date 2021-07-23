
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */

import {assertTrue} from "./testUtils.js";
import {AssertionError} from "./AssertionError.js";


export function testAssertionErrorShouldHaveStackTrace() {
    assertTrue(typeof(new AssertionError().stack) == "string");
}
