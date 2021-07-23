
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */

import {assertTruth} from "./testUtils.js";
import {AssertionError} from "./AssertionError.js";


export function testAssertionErrorShouldHaveStackTrace() {
    assertTruth(typeof(new AssertionError().stack) == "string");
}
