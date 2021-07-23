/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertThrows} from "../testUtils/testUtils.js";
import {BinomialTreeMaxHeap} from "./BinomialTreeMaxHeap.js";
import * as arrayUtils from "../arrayUtils/arrayUtils.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let heap = new BinomialTreeMaxHeap();

    heap.debugVerifyIntegrity();
    assertEquals(0, heap.getSize());

    assertThrows(() => heap.dequeue());

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertEquals(1, heap.peek());
    assertEquals(1, heap.getSize());

    heap.enqueue(2);
    heap.debugVerifyIntegrity();

    assertEquals(2, heap.peek());
    assertEquals(2, heap.getSize());

    heap.enqueue(3);
    heap.debugVerifyIntegrity();

    assertEquals(3, heap.peek());
    assertEquals(3, heap.getSize());

    heap.enqueue(4);
    heap.debugVerifyIntegrity();

    assertEquals(4, heap.peek());
    assertEquals(4, heap.getSize());

    heap = heap.clone();
    heap.debugVerifyIntegrity();

    assertEquals(4, heap.dequeue());

    assertEquals(3, heap.peek());
    assertEquals(3, heap.getSize());

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertEquals(3, heap.peek());
    assertEquals(4, heap.getSize());

    assertEquals(3, heap.dequeue());
    heap.debugVerifyIntegrity();

    assertEquals(2, heap.peek());
    assertEquals(3, heap.getSize());

    assertEquals(2, heap.dequeue());
    heap.debugVerifyIntegrity();

    assertEquals(1, heap.peek());
    assertEquals(2, heap.getSize());

    assertEquals(1, heap.dequeue());
    heap.debugVerifyIntegrity();

    assertEquals(1, heap.peek());
    assertEquals(1, heap.getSize());

    assertEquals(1, heap.dequeue());
    heap.debugVerifyIntegrity();

    assertEquals(0, heap.getSize());

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
        assertEquals(i + 1, heap.getSize());
    }

    arrayUtils.heapSort(ref, new comparators.ReverseComparator(new comparators.UniversalComparator()));

    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = heap.dequeue();
        heap.debugVerifyIntegrity();
        assertEquals(sizeOfTests - i - 1, heap.getSize());
    }

    let comparator = new comparators.ArrayElementComparator();

    assertEquals(0, comparator.compare(array, ref));
}

