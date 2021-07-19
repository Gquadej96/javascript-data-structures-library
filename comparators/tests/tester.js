/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators.js";
import {RBTreeSet} from "../../RBTreeSet/RBTreeSet.js";


function assert_truth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1 for "ArrayElementComparator".

{
    let comparator = new comparators.ArrayElementComparator();

    assert_truth(comparator.compare([1], [1]) == 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([1], [2]) < 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([1], [0]) > 0, "unexpected relation between elements.");

    assert_truth(comparator.compare([1, 1], [1, 1]) == 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([1], [1, 1]) < 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([1, 1], [1]) > 0, "unexpected relation between elements.");

    assert_truth(comparator.compare([2, 1], [1, 1]) > 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([2], [1, 1]) > 0, "unexpected relation between elements.");
    assert_truth(comparator.compare([1, 2], [1, 1]) > 0, "unexpected relation between elements.");
}


// test set #2 for "ArrayElementComparator".

{
    let max_num_of_trials = 1000;
    let max_size_of_elements = 1000;
    let max_array_length = 100;

    let set = new RBTreeSet(new comparators.ArrayElementComparator());

    for (let i = 0; 
        i < max_num_of_trials; 
        ++i) {
        
        let length = Math.floor(max_array_length * Math.random()) + 1;
        let array = new Array();

        for (let j = 0; 
            j < length; 
            ++j) {
            
            array.push(Math.floor(max_size_of_elements * Math.random()));
        }

        set.add(array);
    }

    set.debug_verify_integrity();
}


// test set #1 for "StringComparator".

{
    let comparator = new comparators.StringComparator();

    assert_truth(comparator.compare("a", "a") == 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("a", "b") < 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("b", "a") > 0, "unexpected relation between strings.");

    assert_truth(comparator.compare("aa", "a") > 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("aa", "aa") == 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("aa", "b") < 0, "unexpected relation between strings.");

    assert_truth(comparator.compare("b", "ab") > 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("a", "abc") < 0, "unexpected relation between strings.");
    assert_truth(comparator.compare("b", "abc") > 0, "unexpected relation between strings.");
}


// test set #1 for "ObjectFieldComparator".

{
    let comparator = new comparators.ObjectFieldComparator();

    assert_truth(comparator.compare({a: 1, b: 2}, {a: 1, b: 2}) == 0, "unexpected relation between elements.");
    assert_truth(comparator.compare({a: 1, b: 2}, {a: 1, b: 2, c: 3}) < 0, "unexpected relation between elements.");
    assert_truth(comparator.compare({a: 1, b: 2, c: 3}, {a: 1, b: 2}) > 0, "unexpected relation between elements.");

    assert_truth(comparator.compare({a: 2, b: 2}, {a: 1, b: 3}) > 0, "unexpected relation between elements.");
    assert_truth(comparator.compare({a: 2, b: 2}, {a: 1, b: 2, c: 3}) > 0, "unexpected relation between elements.");
    assert_truth(comparator.compare({a: 1, b: 3}, {a: 1, b: 2}) > 0, "unexpected relation between elements.");
}


// test set #2 for "ObjectFieldComparator".

{
    let max_num_of_trials = 1000;
    let max_size_of_elements = 1000;
    let max_num_of_properties = 100;

    let set = new RBTreeSet(new comparators.ObjectFieldComparator());

    for (let i = 0; 
        i < max_num_of_trials; 
        ++i) {
        
        let length = Math.floor(max_num_of_properties * Math.random()) + 1;
        let map = {};

        for (let j = 0; 
            j < length; 
            ++j) {
            
            map[new Number(Math.floor(max_size_of_elements * Math.random())).toString()] = (Math.floor(max_size_of_elements * Math.random()));
        }

        set.add(map);
    }

    set.debug_verify_integrity();
}

