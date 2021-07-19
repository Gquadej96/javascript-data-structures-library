/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import {BinomialTreeMinHeap} from "../BinomialTreeMinHeap.js";
import * as array_tools from "../../array_tools/array_tools.js";
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
    let heap = new BinomialTreeMinHeap();

    heap.debug_verify_integrity();
    assert_truth(heap.get_size() == 0, "unexpected size of the heap.");

    assert_error(heap.dequeue.bind(heap), "no error thrown when attempting to dequeue from an empty heap.");


    heap.enqueue(1);
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 1, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 1, "unexpected size of the heap.");


    heap.enqueue(2);
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 1, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 2, "unexpected size of the heap.");


    heap.enqueue(3);
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 1, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 3, "unexpected size of the heap.");


    heap.enqueue(4);
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 1, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 4, "unexpected size of the heap.");


    heap = heap.clone();
    heap.debug_verify_integrity();


    assert_truth(heap.dequeue() == 1, "unexpected item dequeued from heap.");

    assert_truth(heap.peek() == 2, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 3, "unexpected size of the heap.");


    heap.enqueue(1);
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 1, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 4, "unexpected size of the heap.");


    assert_truth(heap.dequeue() == 1, "unexpected item dequeued from heap.");
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 2, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 3, "unexpected size of the heap.");


    assert_truth(heap.dequeue() == 2, "unexpected item dequeued from heap.");
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 3, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 2, "unexpected size of the heap.");


    assert_truth(heap.dequeue() == 3, "unexpected item dequeued from heap.");
    heap.debug_verify_integrity();

    assert_truth(heap.peek() == 4, "unexpected item peeked from heap.");
    assert_truth(heap.get_size() == 1, "unexpected size of the heap.");


    assert_truth(heap.dequeue() == 4, "unexpected item dequeued from heap.");
    heap.debug_verify_integrity();

    assert_truth(heap.get_size() == 0, "unexpected size of the heap.");

    assert_error(heap.dequeue.bind(heap), "no error thrown when attempting to dequeue from an empty heap.");
    assert_error(heap.peek.bind(heap), "no error thrown when attempting to peek an empty heap.");
}


// test set #2.

{
    let size_of_tests = 1000;

    let heap = new BinomialTreeMinHeap();
    let ref = new Array(size_of_tests);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        let item = Math.floor(size_of_tests * Math.random());

        heap.enqueue(item);
        heap.debug_verify_integrity();
        
        ref[i] = item;
        
        assert_truth(heap.get_size() == i + 1, "unexpected size of the heap.");
    }

    array_tools.heap_sort(ref);

    
    let array = new Array(size_of_tests);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        array[i] = heap.dequeue();
        heap.debug_verify_integrity();
        
        assert_truth(heap.get_size() == size_of_tests - i - 1, "unexpected size of the heap.");
    }


    let comparator = new comparators.ArrayElementComparator();

    assert_truth(comparator.compare(array, ref) == 0, "unexpected item dequeued from heap.");
}

