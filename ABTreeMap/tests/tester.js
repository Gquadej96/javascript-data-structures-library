/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {ABTreeMap} from "../ABTreeMap.js";


function assert_truth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1.

{
    let map = new ABTreeMap(2, 3);

    assert_truth(map.get_size() == 0, "unexpected size of the map.");


    map.set(1, 2);

    assert_truth(map.has(1), "there is an entry missing from the map.");
    assert_truth(map.get(1) == 2, "unexpected value mapped to a key.");
    assert_truth(map.get_size() == 1, "unexpected size of the map.");

    
    map.set(1, 3);

    assert_truth(map.has(1), "there is an entry missing from the map.");
    assert_truth(map.get(1) == 3, "unexpected value mapped to a key.");
    assert_truth(map.get_size() == 1, "unexpected size of the map.");
    assert_truth(map.get_rank_of_key(1) == 0, "unexpected rank of a key.");


    map.set(2, 4);

    assert_truth(map.has(2), "there is an entry missing from the map.");
    assert_truth(map.get(2) == 4, "unexpected value of a key.");
    assert_truth(map.get_size() == 2, "unexpected size of the map.");
    assert_truth(map.get_rank_of_key(2) == 1, "unexpected rank of a key.");

    assert_truth(map.get_key_by_rank(0) == 1, "unexpected key from rank.");
    assert_truth(map.get_key_by_rank(1) == 2, "unexpected key from rank.");
}


// test set #2.

{
    let size_of_tests = 1000;

    let map = new ABTreeMap(2, 3);

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {

        map.set(i, i + 1);

        assert_truth(map.get_size() == i + 1, "unexpected size of map.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        assert_truth(map.has(i), "there is an item missing from the map.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        assert_truth(map.get(i) == i + 1, "unexpected value of a key.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        assert_truth(map.get_key_by_rank(i) == i, "unexpected key from rank.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        assert_truth(map.get_rank_of_key(i) == i, "unexpected rank of a key.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        map.set(i, null);
        
        assert_truth(!map.has(i), "there is an unexpected entry in the map.")
        assert_truth(map.get_size() == size_of_tests - i - 1, "unexpected size of the map.");
    }

    for (let i = size_of_tests - 1; 
        i >= 0; 
        --i) {
        
        map.set(i, i + 1);

        assert_truth(map.get_size() == size_of_tests - i, "unexpected size of the set.");
    }

    for (let i = 0; 
        i < Math.floor(size_of_tests / 2); 
        ++i) {
        
        map.set(i, null);

        assert_truth(map.get_size() == size_of_tests - i - 1, "unexpected size of the set.");
    }

    for (let i = Math.floor(size_of_tests / 2) - 1; 
        i >= 0; 
        --i) {

        map.set(i, i + 1);

        assert_truth(map.get_size() == size_of_tests - i, "unexpected size of the set.");
    }

    for (let i = size_of_tests - 1; 
        i >= 0; 
        --i) {
        
        map.set(i, null);

        assert_truth(map.get_size() == i, "unexpected size of the set.");
    }
}
