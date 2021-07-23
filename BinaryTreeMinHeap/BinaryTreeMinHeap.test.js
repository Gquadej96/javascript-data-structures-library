/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth, assertError} from "../testUtils/testUtils.js";
import {BinaryTreeMinHeap} from "./BinaryTreeMinHeap.js";
import * as arrayUtils from "../arrayUtils/arrayUtils.js";
import * as comparators from "../comparators/comparators.js";


export function testOverallMethods1() {
    let heap = new BinaryTreeMinHeap();

    heap.debugVerifyIntegrity();
    assertTruth(heap.getSize() == 0);

    assertError(() => heap.dequeue());

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1);
    assertTruth(heap.getSize() == 1);

    heap.enqueue(2);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1);
    assertTruth(heap.getSize() == 2);

    heap.enqueue(3);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1);
    assertTruth(heap.getSize() == 3);

    heap.enqueue(4);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1);
    assertTruth(heap.getSize() == 4);

    assertTruth(heap.dequeue() == 1);

    assertTruth(heap.peek() == 2);
    assertTruth(heap.getSize() == 3);

    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1);
    assertTruth(heap.getSize() == 4);

    heap = heap.clone();
    heap.debugVerifyIntegrity();
    
    assertTruth(heap.dequeue() == 1);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 2);
    assertTruth(heap.getSize() == 3);

    assertTruth(heap.dequeue() == 2);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 3);
    assertTruth(heap.getSize() == 2);

    assertTruth(heap.dequeue() == 3);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 4);
    assertTruth(heap.getSize() == 1);

    assertTruth(heap.dequeue() == 4);
    heap.debugVerifyIntegrity();

    assertError(() => heap.dequeue());
    assertError(() => heap.peek());
    assertTruth(heap.getSize() == 0);
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let heap = new BinaryTreeMinHeap();
    let ref = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        heap.enqueue(item);
        heap.debugVerifyIntegrity();
        ref[i] = item;
        assertTruth(heap.getSize() == i + 1);
    }

    arrayUtils.heapSort(ref);

    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = heap.dequeue();
        heap.debugVerifyIntegrity();
        assertTruth(heap.getSize() == sizeOfTests - i - 1);
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTruth(comparator.compare(array, ref) == 0);
}

