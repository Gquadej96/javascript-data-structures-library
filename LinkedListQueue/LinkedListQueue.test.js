/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {LinkedListQueue} from "./LinkedListQueue.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let queue = new LinkedListQueue();

    queue.debugVerifyIntegrity();
    assertTrue(queue.getSize() == 0);

    assertThrows(() => queue.dequeue());

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 1);
    assertTrue(queue.getSize() == 1);

    queue.enqueue(2);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 1);
    assertTrue(queue.getSize() == 2);

    queue.enqueue(3);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 1);
    assertTrue(queue.getSize() == 3);

    queue.enqueue(4);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 1);
    assertTrue(queue.getSize() == 4);

    queue = queue.clone();
    queue.debugVerifyIntegrity();

    assertTrue(queue.dequeue() == 1);

    assertTrue(queue.peek() == 2);
    assertTrue(queue.getSize() == 3);

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 2);
    assertTrue(queue.getSize() == 4);

    assertTrue(queue.dequeue() == 2);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 3);
    assertTrue(queue.getSize() == 3);

    assertTrue(queue.dequeue() == 3);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 4);
    assertTrue(queue.getSize() == 2);

    assertTrue(queue.dequeue() == 4);
    queue.debugVerifyIntegrity();

    assertTrue(queue.peek() == 1);
    assertTrue(queue.getSize() == 1);

    assertTrue(queue.dequeue() == 1);
    queue.debugVerifyIntegrity();

    assertTrue(queue.getSize() == 0);

    assertThrows(() => queue.dequeue());
    assertThrows(() => queue.peek());
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let queue = new LinkedListQueue();
    let ref = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        queue.enqueue(item);
        queue.debugVerifyIntegrity();
        ref[i] = item;
        assertTrue(queue.getSize() == i + 1);
    }
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = queue.dequeue();
        queue.debugVerifyIntegrity();
        assertTrue(queue.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTrue(comparator.compare(array, ref) == 0);
}

