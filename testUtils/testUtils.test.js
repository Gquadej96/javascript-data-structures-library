
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as testUtils from "./testUtils.js";


export function testAssertEqualsPasses() {
    try {
        testUtils.assertEquals("My test value", "My test value");
        testUtils.assertEquals(1234, 1234);
        testUtils.assertEquals(false, false);
    } catch (error) {
        throw new Error("assertEquals should pass when arguments are strictly equal.");
    }
}


export function testAssertEqualsFails() {
    let expectedErrorMessage = `\
My error message.
Expected: 1
Actual: 2\
`   ;

    try {
        testUtils.assertEquals(1, 2, "My error message.");
    } catch (error) {
        if (error.message !== expectedErrorMessage) {
            throw new Error("assertEquals should have the correct error message.");
        }

        return;
    }

    throw new Error("assertEquals should throw when arguments arn't equal.");
}


export function testAssertTruePasses() {
    try {
        testUtils.assertTrue(true);
    } catch (error) {
        throw new Error("assertTrue should pass when condition is true.");
    }
}


export function testAssertTrueFails() {
    let expectedErrorMessage = `\
My error message.
Expected: true
Actual: false\
`   ;

    try {
        testUtils.assertTrue(false, "My error message.");
    } catch (error) {
        if (error.message !== expectedErrorMessage) {
            throw new Error("assertTrue should have the correct error message.");
        }

        return;
    }

    throw new Error("assertTrue should throw when condition is false.");
}


export function testAssertThrowsPasses() {
    try {
        testUtils.assertThrows(() => { throw new Error("My Error"); });
    } catch (error) {
        throw new Error("assertThrows should not throw when test method throws an error.");
    }
}


export function testAssertThrowsFails() {
    let expectedErrorMessage = `\
My error message.
Expected an error.
Actually got nothing.\
`   ;

    try {
        testUtils.assertThrows(() => {}, "My error message.");
    } catch (error) {
        if (error.message !== expectedErrorMessage) {
            throw new Error("assertThrows should have the correct error message.");
        }

        return;
    }

    throw new Error("assertThrows should throw when the test method doesn't throw an error.");
}
