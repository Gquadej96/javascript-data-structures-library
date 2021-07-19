/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import {LinkedListQueue} from "../LinkedListQueue.js";
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
    let queue = new LinkedListQueue();

    queue.debug_verify_integrity();
    assert_truth(queue.get_size() == 0, "unexpected size of the queue.");

    assert_error(queue.dequeue.bind(queue), "no error thrown when attempting to dequeue from an empty queue.");


    queue.enqueue(1);
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 1, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 1, "unexpected size of the queue.");


    queue.enqueue(2);
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 1, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 2, "unexpected size of the queue.");


    queue.enqueue(3);
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 1, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 3, "unexpected size of the queue.");


    queue.enqueue(4);
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 1, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 4, "unexpected size of the queue.");


    queue = queue.clone();
    queue.debug_verify_integrity();


    assert_truth(queue.dequeue() == 1, "unexpected item dequeued from queue.");

    assert_truth(queue.peek() == 2, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 3, "unexpected size of the queue.");


    queue.enqueue(1);
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 2, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 4, "unexpected size of the queue.");


    assert_truth(queue.dequeue() == 2, "unexpected item dequeued from queue.");
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 3, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 3, "unexpected size of the queue.");


    assert_truth(queue.dequeue() == 3, "unexpected item dequeued from queue.");
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 4, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 2, "unexpected size of the queue.");


    assert_truth(queue.dequeue() == 4, "unexpected item dequeued from queue.");
    queue.debug_verify_integrity();

    assert_truth(queue.peek() == 1, "unexpected item peeked from queue.");
    assert_truth(queue.get_size() == 1, "unexpected size of the queue.");


    assert_truth(queue.dequeue() == 1, "unexpected item dequeued from queue.");
    queue.debug_verify_integrity();

    assert_truth(queue.get_size() == 0, "unexpected size of the queue.");

    assert_error(queue.dequeue.bind(queue), "no error thrown when attempting to dequeue from an empty queue.");
    assert_error(queue.peek.bind(queue), "no error thrown when attempting to peek an empty queue.");
}


// test set #2.

{
    let size_of_tests = 1000;

    let queue = new LinkedListQueue();
    let ref = new Array(size_of_tests);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        let item = Math.floor(size_of_tests * Math.random());

        queue.enqueue(item);
        queue.debug_verify_integrity();
        
        ref[i] = item;
        
        assert_truth(queue.get_size() == i + 1, "unexpected size of the queue.");
    }

    
    let array = new Array(size_of_tests);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        array[i] = queue.dequeue();
        queue.debug_verify_integrity();
        
        assert_truth(queue.get_size() == size_of_tests - i - 1, "unexpected size of the queue.");
    }


    let comparator = new comparators.ArrayElementComparator();

    assert_truth(comparator.compare(array, ref) == 0, "unexpected item dequeued from queue.");
}

