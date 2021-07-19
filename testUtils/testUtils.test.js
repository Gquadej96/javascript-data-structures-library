
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as testUtils from "./testUtils.js";


export function testAssertTruthPass() {
    try {
        testUtils.assertTruth(true, "my error message");
    } catch (error) {
        throw new Error("assertTruth should pass when condition is true.");
    }
}


export function testAssertTruthFail() {
    try {
        testUtils.assertTruth(false, "my error message");
    } catch (error) {
        if (error.message != "my error message") {
            throw new Error("assertTruth should have the correct exception message.");
        }

        return;
    }

    throw new Error("assertTruth should throw when condition is false.");
}


export function testAssertErrorPass() {
    try {
        testUtils.assertError(() => { throw new Error("exception"); }, "my error message");
    } catch (error) {
        throw new Error("assertError should not throw when test method throws an exception.");
    }
}


export function testAssertErrorFail() {
    try {
        testUtils.assertError(() => {}, "my error message");
    } catch (error) {
        if (error.message != "my error message") {
            throw new Error("assertError should have the correct exception message.");
        }

        return;
    }

    throw new Error("assertError should throw when the test method doesn't throw an exception.");
}
