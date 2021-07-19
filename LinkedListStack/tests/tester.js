/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import {LinkedListStack} from "../LinkedListStack.js";
import * as comparators from "../../comparators/comparators.js";


function assert_truth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assert_error(func, message) {
    try {
        func();
    } 
    catch (error) {
        return;
    }

    throw new Error(message);
}


// test set #1.

{
    let stack = new LinkedListStack();

    stack.debug_verify_integrity();
    assert_truth(stack.get_size() == 0, "unexpected size of the stack.");

    assert_error(stack.pop.bind(stack), "no error thrown when attempting to pop from an empty stack.");


    stack.push(1);
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 1, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 1, "unexpected size of the stack.");


    stack.push(2);
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 2, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 2, "unexpected size of the stack.");


    stack.push(3);
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 3, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 3, "unexpected size of the stack.");


    stack.push(4);
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 4, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 4, "unexpected size of the stack.");


    stack = stack.clone();
    stack.debug_verify_integrity();


    assert_truth(stack.pop() == 4, "unexpected item destackd from stack.");

    assert_truth(stack.peek() == 3, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 3, "unexpected size of the stack.");


    stack.push(1);
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 1, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 4, "unexpected size of the stack.");


    assert_truth(stack.pop() == 1, "unexpected item destackd from stack.");
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 3, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 3, "unexpected size of the stack.");


    assert_truth(stack.pop() == 3, "unexpected item destackd from stack.");
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 2, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 2, "unexpected size of the stack.");


    assert_truth(stack.pop() == 2, "unexpected item destackd from stack.");
    stack.debug_verify_integrity();

    assert_truth(stack.peek() == 1, "unexpected item peeked from stack.");
    assert_truth(stack.get_size() == 1, "unexpected size of the stack.");


    assert_truth(stack.pop() == 1, "unexpected item destackd from stack.");
    stack.debug_verify_integrity();

    assert_truth(stack.get_size() == 0, "unexpected size of the stack.");

    assert_error(stack.pop.bind(stack), "no error thrown when attempting to pop from an empty stack.");
    assert_error(stack.peek.bind(stack), "no error thrown when attempting to peek an empty stack.");
}


// test set #2.

{
    let size_of_tests = 1000;

    let stack = new LinkedListStack();
    let ref = new Array();

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        let item = Math.floor(size_of_tests * Math.random());

        stack.push(item);
        stack.debug_verify_integrity();
        
        ref.push(item);
        
        assert_truth(stack.get_size() == i + 1, "unexpected size of the stack.");
    }

    ref.reverse();

    
    let array = new Array(size_of_tests);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        array[i] = stack.pop();
        stack.debug_verify_integrity();
        
        assert_truth(stack.get_size() == size_of_tests - i - 1, "unexpected size of the stack.");
    }


    let comparator = new comparators.ArrayElementComparator();
    
    assert_truth(comparator.compare(array, ref) == 0, "unexpected item destackd from stack.");
}

