/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth} from "../testUtils/testUtils.js";
import * as arrayUtils from "./arrayUtils.js";


export function testIsInSortOrder() {
    assertTruth(arrayUtils.isInSortOrder([]));
    assertTruth(arrayUtils.isInSortOrder([1]));
    assertTruth(arrayUtils.isInSortOrder([1, 2, 3, 4, 5]));
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
        assertTruth(arrayUtils.isInSortOrder(array));
    }
}


export function testBinarySearchGetFirst() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertTruth(arrayUtils.binarySearchGetFirst(array, 1) == 0);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 2) == 2);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 3) == 3);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 10) == 8);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 11) == 10);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 20) == 12);

    assertTruth(arrayUtils.binarySearchGetFirst(array, 6) == 6);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 8) == 7);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 14) == 12);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 15) == 12);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 16) == 12);
    assertTruth(arrayUtils.binarySearchGetFirst(array, 17) == 12);
}


export function testBinarySearchGetFirstSuccessor() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 1) == 2);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 2) == 3);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 3) == 4);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 10) == 10);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 11) == 11);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 20) == 14);

    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 6) == 6);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 8) == 7);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 14) == 12);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 15) == 12);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 16) == 12);
    assertTruth(arrayUtils.binarySearchGetFirstSuccessor(array, 17) == 12);
}


export function testBinarySearchGetLast() {
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assertTruth(arrayUtils.binarySearchGetLast(array, 1) == 1);
    assertTruth(arrayUtils.binarySearchGetLast(array, 2) == 2);
    assertTruth(arrayUtils.binarySearchGetLast(array, 3) == 3);
    assertTruth(arrayUtils.binarySearchGetLast(array, 10) == 9);
    assertTruth(arrayUtils.binarySearchGetLast(array, 11) == 10);
    assertTruth(arrayUtils.binarySearchGetLast(array, 20) == 13);

    assertTruth(arrayUtils.binarySearchGetLast(array, 6) == 6);
    assertTruth(arrayUtils.binarySearchGetLast(array, 8) == 7);
    assertTruth(arrayUtils.binarySearchGetLast(array, 14) == 12);
    assertTruth(arrayUtils.binarySearchGetLast(array, 15) == 12);
    assertTruth(arrayUtils.binarySearchGetLast(array, 16) == 12);
    assertTruth(arrayUtils.binarySearchGetLast(array, 17) == 12);
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
        assertTruth(arrayUtils.isInSortOrder(array));
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
        assertTruth(arrayUtils.isInSortOrder(array));
    }
}

