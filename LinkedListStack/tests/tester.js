/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {LinkedListStack} from "../LinkedListStack.js";
import * as comparators from "../../comparators/comparators.js";


function assertTruth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertError(func, message) {
    try {
        func();
    } catch (error) {
        return;
    }

    throw new Error(message);
}


// test set #1.

{
    let stack = new LinkedListStack();

    stack.debugVerifyIntegrity();
    assertTruth(stack.getSize() == 0, "unexpected size of the stack.");

    assertError(stack.pop.bind(stack), "no error thrown when attempting to pop from an empty stack.");


    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 1, "unexpected size of the stack.");


    stack.push(2);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 2, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 2, "unexpected size of the stack.");


    stack.push(3);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 3, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 3, "unexpected size of the stack.");


    stack.push(4);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 4, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 4, "unexpected size of the stack.");


    stack = stack.clone();
    stack.debugVerifyIntegrity();


    assertTruth(stack.pop() == 4, "unexpected item destackd from stack.");

    assertTruth(stack.peek() == 3, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 3, "unexpected size of the stack.");


    stack.push(1);
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 4, "unexpected size of the stack.");


    assertTruth(stack.pop() == 1, "unexpected item destackd from stack.");
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 3, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 3, "unexpected size of the stack.");


    assertTruth(stack.pop() == 3, "unexpected item destackd from stack.");
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 2, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 2, "unexpected size of the stack.");


    assertTruth(stack.pop() == 2, "unexpected item destackd from stack.");
    stack.debugVerifyIntegrity();

    assertTruth(stack.peek() == 1, "unexpected item peeked from stack.");
    assertTruth(stack.getSize() == 1, "unexpected size of the stack.");


    assertTruth(stack.pop() == 1, "unexpected item destackd from stack.");
    stack.debugVerifyIntegrity();

    assertTruth(stack.getSize() == 0, "unexpected size of the stack.");

    assertError(stack.pop.bind(stack), "no error thrown when attempting to pop from an empty stack.");
    assertError(stack.peek.bind(stack), "no error thrown when attempting to peek an empty stack.");
}


// test set #2.

{
    let sizeOfTests = 1000;
    let stack = new LinkedListStack();
    let ref = new Array();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        stack.push(item);
        stack.debugVerifyIntegrity();
        
        ref.push(item);
        
        assertTruth(stack.getSize() == i + 1, "unexpected size of the stack.");
    }

    ref.reverse();
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = stack.pop();
        stack.debugVerifyIntegrity();
        
        assertTruth(stack.getSize() == sizeOfTests - i - 1, "unexpected size of the stack.");
    }

    let comparator = new comparators.ArrayElementComparator();
    
    assertTruth(comparator.compare(array, ref) == 0, "unexpected item destackd from stack.");
}

