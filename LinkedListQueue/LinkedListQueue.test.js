/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertThrows} from "../testUtils/testUtils.js";
import {LinkedListQueue} from "./LinkedListQueue.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let queue = new LinkedListQueue();

    queue.debugVerifyIntegrity();
    assertEquals(0, queue.getSize());

    assertThrows(() => queue.dequeue());

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.peek());
    assertEquals(1, queue.getSize());

    queue.enqueue(2);
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.peek());
    assertEquals(2, queue.getSize());

    queue.enqueue(3);
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.peek());
    assertEquals(3, queue.getSize());

    queue.enqueue(4);
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.peek());
    assertEquals(4, queue.getSize());

    queue = queue.clone();
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.dequeue());

    assertEquals(2, queue.peek());
    assertEquals(3, queue.getSize());

    queue.enqueue(1);
    queue.debugVerifyIntegrity();

    assertEquals(2, queue.peek());
    assertEquals(4, queue.getSize());

    assertEquals(2, queue.dequeue());
    queue.debugVerifyIntegrity();

    assertEquals(3, queue.peek());
    assertEquals(3, queue.getSize());

    assertEquals(3, queue.dequeue());
    queue.debugVerifyIntegrity();

    assertEquals(4, queue.peek());
    assertEquals(2, queue.getSize());

    assertEquals(4, queue.dequeue());
    queue.debugVerifyIntegrity();

    assertEquals(1, queue.peek());
    assertEquals(1, queue.getSize());

    assertEquals(1, queue.dequeue());
    queue.debugVerifyIntegrity();

    assertEquals(0, queue.getSize());

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
        assertEquals(i + 1, queue.getSize());
    }
    
    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = queue.dequeue();
        queue.debugVerifyIntegrity();
        assertEquals(sizeOfTests - i - 1, queue.getSize());
    }

    let comparator = new comparators.ArrayElementComparator();

    assertEquals(0, comparator.compare(array, ref));
}

