/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertTrue} from "../testUtils/testUtils.js";
import * as arrayUtils from "./arrayUtils.js";


export function testIsInSortOrder() {
    assertTrue(arrayUtils.isInSortOrder([]));
    assertTrue(arrayUtils.isInSortOrder([1]));
    assertTrue(arrayUtils.isInSortOrder([1, 2, 3, 4, 5]));
}


export function testHeapSort() {
    let numOfTests = 100;
    let maxLengthOfArrays = 100;
    let maxSizeOfElements = 50;

    for (let i = 0; i < numOfTests; ++i) {
        let length = Math.floor(maxLengthOfArrays * Math.random());
        let array = new Array(length);

        for (let j = 0; j < length; ++j) {
            array[j] = Math.floor(maxSizeOfElements * Math.random());
        }

        arrayUtils.heapSort(array);
        assertTrue(arrayUtils.isInSortOrder(array));
    }
}


export function testBinarySearchGetFirst() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertEquals(0, arrayUtils.binarySearchGetFirst(array, 1));
    assertEquals(2, arrayUtils.binarySearchGetFirst(array, 2));
    assertEquals(3, arrayUtils.binarySearchGetFirst(array, 3));
    assertEquals(8, arrayUtils.binarySearchGetFirst(array, 10));
    assertEquals(10, arrayUtils.binarySearchGetFirst(array, 11));
    assertEquals(12, arrayUtils.binarySearchGetFirst(array, 20));

    assertEquals(6, arrayUtils.binarySearchGetFirst(array, 6));
    assertEquals(7, arrayUtils.binarySearchGetFirst(array, 8));
    assertEquals(12, arrayUtils.binarySearchGetFirst(array, 14));
    assertEquals(12, arrayUtils.binarySearchGetFirst(array, 15));
    assertEquals(12, arrayUtils.binarySearchGetFirst(array, 16));
    assertEquals(12, arrayUtils.binarySearchGetFirst(array, 17));
}


export function testBinarySearchGetFirstSuccessor() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertEquals(2, arrayUtils.binarySearchGetFirstSuccessor(array, 1));
    assertEquals(3, arrayUtils.binarySearchGetFirstSuccessor(array, 2));
    assertEquals(4, arrayUtils.binarySearchGetFirstSuccessor(array, 3));
    assertEquals(10, arrayUtils.binarySearchGetFirstSuccessor(array, 10));
    assertEquals(11, arrayUtils.binarySearchGetFirstSuccessor(array, 11));
    assertEquals(14, arrayUtils.binarySearchGetFirstSuccessor(array, 20));

    assertEquals(6, arrayUtils.binarySearchGetFirstSuccessor(array, 6));
    assertEquals(7, arrayUtils.binarySearchGetFirstSuccessor(array, 8));
    assertEquals(12, arrayUtils.binarySearchGetFirstSuccessor(array, 14));
    assertEquals(12, arrayUtils.binarySearchGetFirstSuccessor(array, 15));
    assertEquals(12, arrayUtils.binarySearchGetFirstSuccessor(array, 16));
    assertEquals(12, arrayUtils.binarySearchGetFirstSuccessor(array, 17));
}


export function testBinarySearchGetLast() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertEquals(1, arrayUtils.binarySearchGetLast(array, 1));
    assertEquals(2, arrayUtils.binarySearchGetLast(array, 2));
    assertEquals(3, arrayUtils.binarySearchGetLast(array, 3));
    assertEquals(9, arrayUtils.binarySearchGetLast(array, 10));
    assertEquals(10, arrayUtils.binarySearchGetLast(array, 11));
    assertEquals(13, arrayUtils.binarySearchGetLast(array, 20));

    assertEquals(6, arrayUtils.binarySearchGetLast(array, 6));
    assertEquals(7, arrayUtils.binarySearchGetLast(array, 8));
    assertEquals(12, arrayUtils.binarySearchGetLast(array, 14));
    assertEquals(12, arrayUtils.binarySearchGetLast(array, 15));
    assertEquals(12, arrayUtils.binarySearchGetLast(array, 16));
    assertEquals(12, arrayUtils.binarySearchGetLast(array, 17));
}


export function testInsertionSort() {
    let numOfTests = 100;
    let maxLengthOfArrays = 100;
    let maxSizeOfElements = 50;

    for (let i = 0; i < numOfTests; ++i) {
        let length = Math.floor(maxLengthOfArrays * Math.random());
        let array = new Array(length);

        for (let j = 0; j < length; ++j) {
            array[j] = Math.floor(maxSizeOfElements * Math.random());
        }

        arrayUtils.insertionSort(array);
        assertTrue(arrayUtils.isInSortOrder(array));
    }
}


export function testQuickSelect() {
    let numOfTests = 100;
    let maxLengthOfArrays = 100;
    let maxSizeOfElements = 50;

    let sort = array => {
        let newArray = new Array(array.length);

        for (let i = 0; i < newArray.length; ++i) {
            newArray[i] = arrayUtils.quickSelect(array, i);
        }

        for (let i = 0; i < array.length; ++i) {
            array[i] = newArray[i];
        }
    };

    for (let i = 0; i < numOfTests; ++i) {
        let length = Math.floor(maxLengthOfArrays * Math.random());
        let array = new Array(length);

        for (let j = 0; j < length; ++j) {
            array[j] = Math.floor(maxSizeOfElements * Math.random());
        }

        sort(array);
        assertTrue(arrayUtils.isInSortOrder(array));
    }
}

