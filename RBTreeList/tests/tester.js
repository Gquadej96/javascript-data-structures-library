/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {RBTreeList} from "../RBTreeList.js";


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


// test list #1.

{
    let list = new RBTreeList();


    list.debug_verify_integrity();
    assert_truth(list.get_size() == 0, "unexpected size of the list.");


    list.rebalance();
    list.debug_verify_integrity();


    list.insert(0, 1);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 1, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 1), "there is no error when retrieving an item which is out-of-bounds in the list.");

    list.insert(1, 2);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 2, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 2), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.insert(1, 3);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 3, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 3), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.insert(0, 4);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 4, "unexpected size of the list.");

    assert_truth(list.get(0) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 4), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.insert(2, 5);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 5, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(0, 1);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 5, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(1, 2);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 5, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(2, 3);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(3, 4);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 2, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(4, 5);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 5, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");

    assert_error(list.set.bind(list, -1, 0), "there is no error when modifying an item which is out-of-bounds in the list.");
    assert_error(list.set.bind(list, 5, 6), "there is no error when modifying an item which is out-of-bounds in the list.");


    list.rebalance();
    list.debug_verify_integrity();
    

    list = list.clone();
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 5, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 2, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(4) == 5, "there is an incorrect item in the list.");

    {
        let array = list.to_array();

        assert_truth(array.length == 5, "the array form of the list is incorrect.");

        for (let i = 0; 
            i < array.length; 
            ++i) {
            
            assert_truth(array[i] == i + 1, "the array form of the list is incorrect.");
        }
    }

    {
        let array = new Array();

        list.do_for_each_item_in_order((i) => array.push(i));

        assert_truth(array.length == 5, "the iteration of the list is incorrect.");

        for (let i = 0; 
            i < array.length; 
            ++i) {
            
            assert_truth(array[i] == i + 1, "the iteration of the list is incorrect.");
        }
    }


    list.remove(1);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 4, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 4, "there is an incorrect item in the list.");
    assert_truth(list.get(3) == 5, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 4), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(3);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 3, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 3, "there is an incorrect item in the list.");
    assert_truth(list.get(2) == 4, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 3), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(2);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 2, "unexpected size of the list.");

    assert_truth(list.get(0) == 1, "there is an incorrect item in the list.");
    assert_truth(list.get(1) == 3, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 2), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(0);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 1, "unexpected size of the list.");

    assert_truth(list.get(0) == 3, "there is an incorrect item in the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 1), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(0);
    list.debug_verify_integrity();

    assert_truth(list.get_size() == 0, "unexpected size of the list.");

    assert_error(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assert_error(list.get.bind(list, 0), "there is no error when retrieving an item which is out-of-bounds in the list.");
}


// test list #2.

{
    let size_of_tests = 1000;

    let list = new RBTreeList();

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {

        list.insert(i, i);
        list.debug_verify_integrity();

        assert_truth(list.get_size() == i + 1, "unexpected size of list.");
    }

    list = list.clone();

    list.rebalance();
    list.debug_verify_integrity();

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        assert_truth(list.get(i) == i, "there is an incorrect item in the list.");
    }

    assert_error(list.get.bind(list, -1), "there is an unexpected item in the list.");
    assert_error(list.get.bind(list, size_of_tests), "there is an unexpected item in the list.");

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {

        assert_truth(list.get(0) == i, "this is an incorrect item in the list.");
        
        list.remove(0);
        list.debug_verify_integrity();

        assert_truth(list.get_size() == size_of_tests - i - 1, "unexpected size of the list.");
    }

    list.rebalance();
    list.debug_verify_integrity();
}


// test list #3.

{
    let size_of_tests = 1000;

    let list = new RBTreeList();
    let ref = new Array();

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        let item = Math.floor(size_of_tests * Math.random());
        let index = Math.floor((ref.length + 1) * Math.random());

        list.insert(index, item);
        list.debug_verify_integrity();

        ref.splice(index, 0, item);
    }

    list.rebalance();
    list.debug_verify_integrity();

    assert_truth(list.get_size() == ref.length, "unexpected size of list.");

    for (let i = 0; 
        i < ref.length; 
        ++i) {
        assert_truth(list.get(i) == ref[i], "there is incorrect membership in the list.");
    }

    for (let i = 0; 
        i < size_of_tests; 
        ++i) {
        
        let index = Math.floor(ref.length * Math.random());

        list.remove(index);
        ref.splice(index, 1);
    }

    assert_truth(list.get_size() == ref.length, "unexpected size of list.");

    for (let i = 0; 
        i < ref.length; 
        ++i) {
        assert_truth(list.get(i) == ref[i], "there is incorrect membership in the list.");
    }
}

