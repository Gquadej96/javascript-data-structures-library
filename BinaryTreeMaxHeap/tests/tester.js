/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {BinaryTreeMaxHeap} from "../BinaryTreeMaxHeap.js";
import * as arrayTools from "../../arrayTools/arrayTools.js";
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
    let heap = new BinaryTreeMaxHeap();

    heap.debugVerifyIntegrity();
    assertTruth(heap.getSize() == 0, "unexpected size of the heap.");

    assertError(heap.dequeue.bind(heap), "no error thrown when attempting to dequeue from an empty heap.");


    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 1, "unexpected size of the heap.");


    heap.enqueue(2);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 2, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 2, "unexpected size of the heap.");


    heap.enqueue(3);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 3, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 3, "unexpected size of the heap.");


    heap.enqueue(4);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 4, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 4, "unexpected size of the heap.");


    heap = heap.clone();
    heap.debugVerifyIntegrity();


    assertTruth(heap.dequeue() == 4, "unexpected item dequeued from heap.");

    assertTruth(heap.peek() == 3, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 3, "unexpected size of the heap.");


    heap.enqueue(1);
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 3, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 4, "unexpected size of the heap.");


    assertTruth(heap.dequeue() == 3, "unexpected item dequeued from heap.");
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 2, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 3, "unexpected size of the heap.");


    assertTruth(heap.dequeue() == 2, "unexpected item dequeued from heap.");
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 2, "unexpected size of the heap.");


    assertTruth(heap.dequeue() == 1, "unexpected item dequeued from heap.");
    heap.debugVerifyIntegrity();

    assertTruth(heap.peek() == 1, "unexpected item peeked from heap.");
    assertTruth(heap.getSize() == 1, "unexpected size of the heap.");


    assertTruth(heap.dequeue() == 1, "unexpected item dequeued from heap.");
    heap.debugVerifyIntegrity();

    assertError(heap.dequeue.bind(heap), "no error thrown when attempting to dequeue from an empty heap.");
    assertError(heap.peek.bind(heap), "no error thrown when attempting to peek an empty heap.");
    assertTruth(heap.getSize() == 0, "unexpected size of the heap.");
}


// test set #2.

{
    let sizeOfTests = 1000;
    let heap = new BinaryTreeMaxHeap();
    let ref = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        heap.enqueue(item);
        heap.debugVerifyIntegrity();

        ref[i] = item;

        assertTruth(heap.getSize() == i + 1, "unexpected size of the heap.");
    }

    arrayTools.heapSort(ref, new comparators.ReverseComparator(new comparators.UniversalComparator()));

    let array = new Array(sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        array[i] = heap.dequeue();
        heap.debugVerifyIntegrity();
        
        assertTruth(heap.getSize() == sizeOfTests - i - 1, "unexpected size of the heap.");
    }

    let comparator = new comparators.ArrayElementComparator();

    assertTruth(comparator.compare(array, ref) == 0, "unexpected item dequeued from heap.");
}

