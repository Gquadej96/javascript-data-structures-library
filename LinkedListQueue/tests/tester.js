/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {LinkedListQueue} from "../LinkedListQueue.js";
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
    let queue = new LinkedListQueue();

    queue.debugVerifyIntegrity();
    assertTruth(queue.getSize() == 0, "unexpected size of the queue.");

    assertError(queue.dequeue.bind(queue), "no error thrown when attempting to dequeue from an empty queue.");


    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 1, "unexpected size of the queue.");


    queue.enqueue(2);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 2, "unexpected size of the queue.");


    queue.enqueue(3);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 3, "unexpected size of the queue.");


    queue.enqueue(4);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 4, "unexpected size of the queue.");


    queue = queue.clone();
    queue.debugVerifyIntegrity();


    assertTruth(queue.dequeue() == 1, "unexpected item dequeued from queue.");

    assertTruth(queue.peek() == 2, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 3, "unexpected size of the queue.");


    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 2, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 4, "unexpected size of the queue.");


    assertTruth(queue.dequeue() == 2, "unexpected item dequeued from queue.");
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 3, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 3, "unexpected size of the queue.");


    assertTruth(queue.dequeue() == 3, "unexpected item dequeued from queue.");
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 4, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 2, "unexpected size of the queue.");


    assertTruth(queue.dequeue() == 4, "unexpected item dequeued from queue.");
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1, "unexpected item peeked from queue.");
    assertTruth(queue.getSize() == 1, "unexpected size of the queue.");


    assertTruth(queue.dequeue() == 1, "unexpected item dequeued from queue.");
    queue.debugVerifyIntegrity();

    assertTruth(queue.getSize() == 0, "unexpected size of the queue.");

    assertError(queue.dequeue.bind(queue), "no error thrown when attempting to dequeue from an empty queue.");
    assertError(queue.peek.bind(queue), "no error thrown when attempting to peek an empty queue.");
}


// test set #2.

{
    let sizeOfTests = 1000;
    let queue = new LinkedListQueue();
    let ref = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        queue.enqueue(item);
        queue.debugVerifyIntegrity();
        
        ref[i] = item;
        
        assertTruth(queue.getSize() == i + 1, "unexpected size of the queue.");
    }
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = queue.dequeue();
        queue.debugVerifyIntegrity();
        
        assertTruth(queue.getSize() == sizeOfTests - i - 1, "unexpected size of the queue.");
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTruth(comparator.compare(array, ref) == 0, "unexpected item dequeued from queue.");
}

