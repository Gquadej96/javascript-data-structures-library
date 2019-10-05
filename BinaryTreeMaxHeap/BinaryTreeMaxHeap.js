/*
Author: Quade Jones
Email: Gquadej96@live.com
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


    get_size() {
        return this._heap.get_size();
    }


    clone() {
		return this._heap.clone();
	}


    debug_verify_integrity() {
        this._heap.debug_verify_integrity();
    }
}

