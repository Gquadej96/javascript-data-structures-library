/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import * as array_tools from "../array_tools.js";


function assert_truth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1 for "is_in_sort_order".

{
    assert_truth(array_tools.is_in_sort_order([]), "unable to verify sorted array.");
    assert_truth(array_tools.is_in_sort_order([1]), "unable to verify sorted array.");
    assert_truth(array_tools.is_in_sort_order([1, 2, 3, 4, 5]), "unable to verify sorted array.");
}


// test set #1 for "heap_sort".

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

        array_tools.heap_sort(array);

        assert_truth(array_tools.is_in_sort_order(array), "the array is not sorted properly.");
    }
}


// test set #1 for "binary_search_get_first".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(array_tools.binary_search_get_first(array, 1) == 0, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 2) == 2, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 3) == 3, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 10) == 8, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 11) == 10, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 20) == 12, "unexpected insert point for item.");

    assert_truth(array_tools.binary_search_get_first(array, 6) == 6, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 8) == 7, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 14) == 12, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 15) == 12, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 16) == 12, "unexpected insert point for item.");
    assert_truth(array_tools.binary_search_get_first(array, 17) == 12, "unexpected insert point for item.");
}


// test set #1 for "binary_search_get_first_successor".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(array_tools.binary_search_get_first_successor(array, 1) == 2, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 2) == 3, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 3) == 4, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 10) == 10, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 11) == 11, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 20) == 14, "unexpected first successor for item.");

    assert_truth(array_tools.binary_search_get_first_successor(array, 6) == 6, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 8) == 7, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 14) == 12, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 15) == 12, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 16) == 12, "unexpected first successor for item.");
    assert_truth(array_tools.binary_search_get_first_successor(array, 17) == 12, "unexpected first successor for item.");
}


// test set #1 for "binary_search_get_last".

{
    // indices:  0  1  2  3  4  5  6  7  8   9   10  11  12  13  14
    let array = [1, 1, 2, 3, 4, 5, 7, 9, 10, 10, 11, 13, 20, 20, 21];

    assert_truth(array_tools.binary_search_get_last(array, 1) == 1, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 2) == 2, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 3) == 3, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 10) == 9, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 11) == 10, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 20) == 13, "unexpected last occurance of item.");

    assert_truth(array_tools.binary_search_get_last(array, 6) == 6, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 8) == 7, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 14) == 12, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 15) == 12, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 16) == 12, "unexpected last occurance of item.");
    assert_truth(array_tools.binary_search_get_last(array, 17) == 12, "unexpected last occurance of item.");
}


// test set #1 for "insert_sort".

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

        array_tools.insert_sort(array);

        assert_truth(array_tools.is_in_sort_order(array), "the array is not sorted properly.");
    }
}


// test set #1 for "quick_select".

{
    let num_of_tests = 100;
    let max_length_of_arrays = 100;
    let max_size_of_elements = 50;

    let sort = (array) => {
        let new_array = new Array(array.length);

        for (let i = 0; 
            i < new_array.length; 
            ++i) {
            new_array[i] = array_tools.quick_select(array, i);
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

        assert_truth(array_tools.is_in_sort_order(array), "the array is not sorted properly.");
    }
}

