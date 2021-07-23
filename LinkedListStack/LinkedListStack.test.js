/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertThrows} from "../testUtils/testUtils.js";
import {LinkedListStack} from "./LinkedListStack.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let stack = new LinkedListStack();

    stack.debugVerifyIntegrity();
    assertEquals(0, stack.getSize());

    assertThrows(() => stack.pop());

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertEquals(1, stack.peek());
    assertEquals(1, stack.getSize());

    stack.push(2);
    stack.debugVerifyIntegrity();

    assertEquals(2, stack.peek());
    assertEquals(2, stack.getSize());

    stack.push(3);
    stack.debugVerifyIntegrity();

    assertEquals(3, stack.peek());
    assertEquals(3, stack.getSize());

    stack.push(4);
    stack.debugVerifyIntegrity();

    assertEquals(4, stack.peek());
    assertEquals(4, stack.getSize());

    stack = stack.clone();
    stack.debugVerifyIntegrity();

    assertEquals(4, stack.pop());

    assertEquals(3, stack.peek());
    assertEquals(3, stack.getSize());

    stack.push(1);
    stack.debugVerifyIntegrity();

    assertEquals(1, stack.peek());
    assertEquals(4, stack.getSize());

    assertEquals(1, stack.pop());
    stack.debugVerifyIntegrity();

    assertEquals(3, stack.peek());
    assertEquals(3, stack.getSize());

    assertEquals(3, stack.pop());
    stack.debugVerifyIntegrity();

    assertEquals(2, stack.peek());
    assertEquals(2, stack.getSize());

    assertEquals(2, stack.pop());
    stack.debugVerifyIntegrity();

    assertEquals(1, stack.peek());
    assertEquals(1, stack.getSize());

    assertEquals(1, stack.pop());
    stack.debugVerifyIntegrity();

    assertEquals(0, stack.getSize());

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
        assertEquals(i + 1, stack.getSize());
    }

    ref.reverse();
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = stack.pop();
        stack.debugVerifyIntegrity();
        assertEquals(sizeOfTests - i - 1, stack.getSize());
    }

    let comparator = new comparators.ArrayElementComparator();
    
    assertEquals(0, comparator.compare(array, ref));
}

