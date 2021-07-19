/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as arrayTools from "../arrayTools.js";


function assert_truth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1 for "isInSortOrder".

{
    assert_truth(arrayTools.isInSortOrder([]), "unable to verify sorted array.");
    assert_truth(arrayTools.isInSortOrder([1]), "unable to verify sorted array.");
    assert_truth(arrayTools.isInSortOrder([1, 2, 3, 4, 5]), "unable to verify sorted array.");
}


// test set #1 for "heapSort".

{
    let num_of_tests = 100;
    let max_length_of_arrays = 100;
    let max_size_of_elements = 50;

    for (let i = 0; 
        i < num_of_tests; 
        ++i) {
        
        let length = Math.floor(max_length_of_arrays * Math.random());
        let array = new Array(length);

        for (let j = 0; 
            j < length; 
            ++j) {
            
            array[j] = Math.floor(max_size_of_elements * Math.random());
        }

        arrayTools.heapSort(array);

        assert_truth(arrayTools.isInSortOrder(array), "the array is not sorted properly.");
    }
}


// test set #1 for "binarySearchGetFirst".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(arrayTools.binarySearchGetFirst(array, 1) == 0, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 2) == 2, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 3) == 3, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 10) == 8, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 11) == 10, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 20) == 12, "unexpected insert point for item.");

    assert_truth(arrayTools.binarySearchGetFirst(array, 6) == 6, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 8) == 7, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 14) == 12, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 15) == 12, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 16) == 12, "unexpected insert point for item.");
    assert_truth(arrayTools.binarySearchGetFirst(array, 17) == 12, "unexpected insert point for item.");
}


// test set #1 for "binarySearchGetFirstSuccessor".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 1) == 2, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 2) == 3, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 3) == 4, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 10) == 10, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 11) == 11, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 20) == 14, "unexpected first successor for item.");

    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 6) == 6, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 8) == 7, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 14) == 12, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 15) == 12, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 16) == 12, "unexpected first successor for item.");
    assert_truth(arrayTools.binarySearchGetFirstSuccessor(array, 17) == 12, "unexpected first successor for item.");
}


// test set #1 for "binarySearchGetLast".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(arrayTools.binarySearchGetLast(array, 1) == 1, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 2) == 2, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 3) == 3, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 10) == 9, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 11) == 10, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 20) == 13, "unexpected last occurance of item.");

    assert_truth(arrayTools.binarySearchGetLast(array, 6) == 6, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 8) == 7, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 14) == 12, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 15) == 12, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 16) == 12, "unexpected last occurance of item.");
    assert_truth(arrayTools.binarySearchGetLast(array, 17) == 12, "unexpected last occurance of item.");
}


// test set #1 for "insertionSort".

{
    let num_of_tests = 100;
    let max_length_of_arrays = 100;
    let max_size_of_elements = 50;

    for (let i = 0; 
        i < num_of_tests; 
        ++i) {
        
        let length = Math.floor(max_length_of_arrays * Math.random());
        let array = new Array(length);

        for (let j = 0; 
            j < length; 
            ++j) {
            
            array[j] = Math.floor(max_size_of_elements * Math.random());
        }

        arrayTools.insertionSort(array);

        assert_truth(arrayTools.isInSortOrder(array), "the array is not sorted properly.");
    }
}


// test set #1 for "quickSelect".

{
    let num_of_tests = 100;
    let max_length_of_arrays = 100;
    let max_size_of_elements = 50;

    let sort = (array) => {
        let new_array = new Array(array.length);

        for (let i = 0; 
            i < new_array.length; 
            ++i) {
            new_array[i] = arrayTools.quickSelect(array, i);
        }

        for (let i = 0; 
            i < array.length; 
            ++i) {
            array[i] = new_array[i];
        }
    };

    for (let i = 0; 
        i < num_of_tests; 
        ++i) {
        
        let length = Math.floor(max_length_of_arrays * Math.random());
        let array = new Array(length);

        for (let j = 0; 
            j < length; 
            ++j) {
            
            array[j] = Math.floor(max_size_of_elements * Math.random());
        }

        sort(array);

        assert_truth(arrayTools.isInSortOrder(array), "the array is not sorted properly.");
    }
}

