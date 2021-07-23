/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {LinkedListStack} from "./LinkedListStack.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let stack = new LinkedListStack();

    stack.debugVerifyIntegrity();
    assertTrue(stack.getSize() == 0);

    assertThrows(() => stack.pop());

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 1);
    assertTrue(stack.getSize() == 1);

    stack.push(2);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 2);
    assertTrue(stack.getSize() == 2);

    stack.push(3);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 3);
    assertTrue(stack.getSize() == 3);

    stack.push(4);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 4);
    assertTrue(stack.getSize() == 4);

    stack = stack.clone();
    stack.debugVerifyIntegrity();

    assertTrue(stack.pop() == 4);

    assertTrue(stack.peek() == 3);
    assertTrue(stack.getSize() == 3);

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 1);
    assertTrue(stack.getSize() == 4);

    assertTrue(stack.pop() == 1);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 3);
    assertTrue(stack.getSize() == 3);

    assertTrue(stack.pop() == 3);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 2);
    assertTrue(stack.getSize() == 2);

    assertTrue(stack.pop() == 2);
    stack.debugVerifyIntegrity();

    assertTrue(stack.peek() == 1);
    assertTrue(stack.getSize() == 1);

    assertTrue(stack.pop() == 1);
    stack.debugVerifyIntegrity();

    assertTrue(stack.getSize() == 0);

    assertThrows(() => stack.pop());
    assertThrows(() => stack.peek());
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
        assertTrue(stack.getSize() == i + 1);
    }

    ref.reverse();
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = stack.pop();
        stack.debugVerifyIntegrity();
        assertTrue(stack.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();
    
    assertTrue(comparator.compare(array, ref) == 0);
}

