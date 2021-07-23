/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {BinomialTreeMaxHeap} from "./BinomialTreeMaxHeap.js";
import * as arrayUtils from "../arrayUtils/arrayUtils.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let heap = new BinomialTreeMaxHeap();

    heap.debugVerifyIntegrity();
    assertTrue(heap.getSize() == 0);

    assertThrows(() => heap.dequeue());

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 1);
    assertTrue(heap.getSize() == 1);

    heap.enqueue(2);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 2);
    assertTrue(heap.getSize() == 2);

    heap.enqueue(3);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 3);
    assertTrue(heap.getSize() == 3);

    heap.enqueue(4);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 4);
    assertTrue(heap.getSize() == 4);

    heap = heap.clone();
    heap.debugVerifyIntegrity();

    assertTrue(heap.dequeue() == 4);

    assertTrue(heap.peek() == 3);
    assertTrue(heap.getSize() == 3);

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 3);
    assertTrue(heap.getSize() == 4);

    assertTrue(heap.dequeue() == 3);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 2);
    assertTrue(heap.getSize() == 3);

    assertTrue(heap.dequeue() == 2);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 1);
    assertTrue(heap.getSize() == 2);

    assertTrue(heap.dequeue() == 1);
    heap.debugVerifyIntegrity();

    assertTrue(heap.peek() == 1);
    assertTrue(heap.getSize() == 1);

    assertTrue(heap.dequeue() == 1);
    heap.debugVerifyIntegrity();

    assertTrue(heap.getSize() == 0);

    assertThrows(() => heap.dequeue());
    assertThrows(() => heap.peek());
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let heap = new BinomialTreeMaxHeap();
    let ref = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        heap.enqueue(item);
        heap.debugVerifyIntegrity();
        ref[i] = item;
        assertTrue(heap.getSize() == i + 1);
    }

    arrayUtils.heapSort(ref, new comparators.ReverseComparator(new comparators.UniversalComparator()));

    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = heap.dequeue();
        heap.debugVerifyIntegrity();
        assertTrue(heap.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTrue(comparator.compare(array, ref) == 0);
}

