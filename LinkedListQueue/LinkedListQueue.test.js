/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth, assertError} from "../testUtils/testUtils.js";
import {LinkedListQueue} from "./LinkedListQueue.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let queue = new LinkedListQueue();

    queue.debugVerifyIntegrity();
    assertTruth(queue.getSize() == 0);

    assertError(() => queue.dequeue());

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1);
    assertTruth(queue.getSize() == 1);

    queue.enqueue(2);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1);
    assertTruth(queue.getSize() == 2);

    queue.enqueue(3);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1);
    assertTruth(queue.getSize() == 3);

    queue.enqueue(4);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1);
    assertTruth(queue.getSize() == 4);

    queue = queue.clone();
    queue.debugVerifyIntegrity();

    assertTruth(queue.dequeue() == 1);

    assertTruth(queue.peek() == 2);
    assertTruth(queue.getSize() == 3);

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 2);
    assertTruth(queue.getSize() == 4);

    assertTruth(queue.dequeue() == 2);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 3);
    assertTruth(queue.getSize() == 3);

    assertTruth(queue.dequeue() == 3);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 4);
    assertTruth(queue.getSize() == 2);

    assertTruth(queue.dequeue() == 4);
    queue.debugVerifyIntegrity();

    assertTruth(queue.peek() == 1);
    assertTruth(queue.getSize() == 1);

    assertTruth(queue.dequeue() == 1);
    queue.debugVerifyIntegrity();

    assertTruth(queue.getSize() == 0);

    assertError(() => queue.dequeue());
    assertError(() => queue.peek());
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
        assertTruth(queue.getSize() == i + 1);
    }
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = queue.dequeue();
        queue.debugVerifyIntegrity();
        assertTruth(queue.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTruth(comparator.compare(array, ref) == 0);
}

