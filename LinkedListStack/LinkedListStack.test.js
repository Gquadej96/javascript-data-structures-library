/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth, assertError} from "../testUtils/testUtils.js";
import {LinkedListStack} from "./LinkedListStack.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let stack = new LinkedListStack();

    stack.debugVerifyIntegrity();
    assertTruth(stack.getSize() == 0);

    assertError(() => stack.pop());

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1);
    assertTruth(stack.getSize() == 1);

    stack.push(2);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 2);
    assertTruth(stack.getSize() == 2);

    stack.push(3);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 3);
    assertTruth(stack.getSize() == 3);

    stack.push(4);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 4);
    assertTruth(stack.getSize() == 4);

    stack = stack.clone();
    stack.debugVerifyIntegrity();

    assertTruth(stack.pop() == 4);

    assertTruth(stack.peek() == 3);
    assertTruth(stack.getSize() == 3);

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1);
    assertTruth(stack.getSize() == 4);

    assertTruth(stack.pop() == 1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 3);
    assertTruth(stack.getSize() == 3);

    assertTruth(stack.pop() == 3);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 2);
    assertTruth(stack.getSize() == 2);

    assertTruth(stack.pop() == 2);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1);
    assertTruth(stack.getSize() == 1);

    assertTruth(stack.pop() == 1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.getSize() == 0);

    assertError(() => stack.pop());
    assertError(() => stack.peek());
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let stack = new LinkedListStack();
    let ref = new Array();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        stack.push(item);
        stack.debugVerifyIntegrity();
        ref.push(item);
        assertTruth(stack.getSize() == i + 1);
    }

    ref.reverse();
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = stack.pop();
        stack.debugVerifyIntegrity();
        assertTruth(stack.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();
    
    assertTruth(comparator.compare(array, ref) == 0);
}

