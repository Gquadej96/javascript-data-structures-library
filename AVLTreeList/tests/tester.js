/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {AVLTreeList} from "../AVLTreeList.js";


function assertTruth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function assertError(func, message) {
    try {
        func();
    } catch (error) {
        return;
    }

    throw new Error(message);
}


// test list #1.

{
    let list = new AVLTreeList();


    list.debugVerifyIntegrity();
    assertTruth(list.getSize() == 0, "unexpected size of the list.");


    list.rebalance();
    list.debugVerifyIntegrity();


    list.add(0, 1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 1, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 1), "there is no error when retrieving an item which is out-of-bounds in the list.");

    list.add(1, 2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 2, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 2), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.add(1, 3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 3, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 3), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.add(0, 4);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 4, "unexpected size of the list.");

    assertTruth(list.get(0) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 4), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.add(2, 5);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 5, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(0, 1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 5, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(1, 2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 5, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(2, 3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(3, 4);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 2, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.set(4, 5);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 5, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 5), "there is no error when retrieving an item which is out-of-bounds in the list.");

    assertError(list.set.bind(list, -1, 0), "there is no error when modifying an item which is out-of-bounds in the list.");
    assertError(list.set.bind(list, 5, 6), "there is no error when modifying an item which is out-of-bounds in the list.");


    list.rebalance();
    list.debugVerifyIntegrity();
    

    list = list.clone();
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 2, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(4) == 5, "there is an incorrect item in the list.");

    {
        let array = list.toArray();

        assertTruth(array.length == 5, "the array form of the list is incorrect.");

        for (let i = 0; 
            i < array.length; 
            ++i) {
            
            assertTruth(array[i] == i + 1, "the array form of the list is incorrect.");
        }
    }

    {
        let array = new Array();

        list.doForEachItemInOrder((i) => array.push(i));

        assertTruth(array.length == 5, "the iteration of the list is incorrect.");

        for (let i = 0; 
            i < array.length; 
            ++i) {
            
            assertTruth(array[i] == i + 1, "the iteration of the list is incorrect.");
        }
    }


    list.remove(1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 4, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 4, "there is an incorrect item in the list.");
    assertTruth(list.get(3) == 5, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 4), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 3, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 3, "there is an incorrect item in the list.");
    assertTruth(list.get(2) == 4, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 3), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 2, "unexpected size of the list.");

    assertTruth(list.get(0) == 1, "there is an incorrect item in the list.");
    assertTruth(list.get(1) == 3, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 2), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(0);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 1, "unexpected size of the list.");

    assertTruth(list.get(0) == 3, "there is an incorrect item in the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 1), "there is no error when retrieving an item which is out-of-bounds in the list.");


    list.remove(0);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 0, "unexpected size of the list.");

    assertError(list.get.bind(list, -1), "there is no error when retrieving an item which is out-of-bounds in the list.");
    assertError(list.get.bind(list, 0), "there is no error when retrieving an item which is out-of-bounds in the list.");
}


// test list #2.

{
    let sizeOfTests = 1000;
    let list = new AVLTreeList();

    for (let i = 0; i < sizeOfTests; ++i) {
        list.add(i, i);
        list.debugVerifyIntegrity();

        assertTruth(list.getSize() == i + 1, "unexpected size of list.");
    }

    list = list.clone();

    list.rebalance();
    list.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(list.get(i) == i, "there is an incorrect item in the list.");
    }

    assertError(list.get.bind(list, -1), "there is an unexpected item in the list.");
    assertError(list.get.bind(list, sizeOfTests), "there is an unexpected item in the list.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(list.get(0) == i, "this is an incorrect item in the list.");
        
        list.remove(0);
        list.debugVerifyIntegrity();

        assertTruth(list.getSize() == sizeOfTests - i - 1, "unexpected size of the list.");
    }

    list.rebalance();
    list.debugVerifyIntegrity();
}


// test list #3.

{
    let sizeOfTests = 1000;
    let list = new AVLTreeList();
    let ref = new Array();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());
        let index = Math.floor((ref.length + 1) * Math.random());

        list.add(index, item);
        list.debugVerifyIntegrity();

        ref.splice(index, 0, item);
    }

    list.rebalance();
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == ref.length, "unexpected size of list.");

    for (let i = 0; i < ref.length; ++i) {
        assertTruth(list.get(i) == ref[i], "there is incorrect membership in the list.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        let index = Math.floor(ref.length * Math.random());

        list.remove(index);
        ref.splice(index, 1);
    }

    assertTruth(list.getSize() == ref.length, "unexpected size of list.");

    for (let i = 0; i < ref.length; ++i) {
        assertTruth(list.get(i) == ref[i], "there is incorrect membership in the list.");
    }
}

