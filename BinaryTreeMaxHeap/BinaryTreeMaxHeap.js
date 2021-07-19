/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {BinaryTreeMinHeap} from "../BinaryTreeMinHeap/BinaryTreeMinHeap.js";
import * as comparators from "../comparators/comparators.js";


export class BinaryTreeMaxHeap {

    _heap = null;
    _comparator = new comparators.UniversalComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
        this._comparator = new comparators.ReverseComparator(this._comparator);
        
        this._heap = new BinaryTreeMinHeap(this._comparator);
    }


    enqueue(item) {
        this._heap.enqueue(item);
    }


    dequeue() {
        return this._heap.dequeue();
    }


    peek() {
       return this._heap.peek();
    }


    getSize() {
        return this._heap.getSize();
    }


    clone() {
        return this._heap.clone();
    }


    debugVerifyIntegrity() {
        this._heap.debugVerifyIntegrity();
    }
}

