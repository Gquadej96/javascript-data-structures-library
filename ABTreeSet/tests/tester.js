/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {ABTreeSet} from "../ABTreeSet.js";


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


// test set #1.

{
    let set = new ABTreeSet(2, 3);

    set.debugVerifyIntegrity();
    assertTruth(set.getSize() == 0, "unexpected size of the set.");


    set.rebalance();
    set.debugVerifyIntegrity();


    set.add(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 1, "unexpected size of the set.");

    assertTruth(set.has(1), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(0) == 1, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(1) == 0, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(0) == 1, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(1) == 1, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(2) == null, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(0) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(1) == 1, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(2) == 1, "unexpected lower bound for an item.");


    set.add(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2, "unexpected size of the set.");

    assertTruth(set.has(2), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(1) == 2, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(2) == 1, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(1) == 1, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(2) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == null, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(1) == 1, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(2) == 2, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(3) == 2, "unexpected lower bound for an item.");


    set.add(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2, "unexpected size of the set.");

    assertTruth(set.has(1), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(0) == 1, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(1) == 0, "unexpected rank of an item.");


    set.add(4);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3, "unexpected size of the set.");

    assertTruth(set.has(4), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(2) == 4, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(4) == 2, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(3) == 4, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(4) == 4, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(5) == null, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(3) == 2, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(4) == 4, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(5) == 4, "unexpected lower bound for an item.");


    set.add(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3, "unexpected size of the set.");

    assertTruth(set.has(2), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(1) == 2, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(2) == 1, "unexpected rank of an item.");


    set.add(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4, "unexpected size of the set.");

    assertTruth(set.has(3), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(2) == 3, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(3) == 2, "unexpected rank of an item.");

    assertTruth(set.getItemByRank(3) == 4, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(4) == 3, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(2) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == 3, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(4) == 4, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(2) == 2, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(3) == 3, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(4) == 4, "unexpected lower bound for an item.");


    set.add(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4, "unexpected size of the set.");

    assertTruth(set.has(3), "there is an item missing from the set.");

    assertTruth(set.getItemByRank(2) == 3, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(3) == 2, "unexpected rank of an item.");


    set.rebalance();
    set.debugVerifyIntegrity();
    

    set = set.clone();
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4, "unexpected size of the set.");

    assertTruth(set.has(1), "there is an item missing from the set.");
    assertTruth(set.has(2), "there is an item missing from the set.");
    assertTruth(set.has(3), "there is an item missing from the set.");
    assertTruth(set.has(4), "there is an item missing from the set.");

    assertTruth(!set.has(0), "there is an unexpected item in the set.");
    assertTruth(!set.has(5), "there is an unexpected item in the set.");

    assertTruth(set.getItemByRank(0) == 1, "unexpected item from rank.");
    assertTruth(set.getItemByRank(1) == 2, "unexpected item from rank.");
    assertTruth(set.getItemByRank(2) == 3, "unexpected item from rank.");
    assertTruth(set.getItemByRank(3) == 4, "unexpected item from rank.");

    assertError(set.getItemByRank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
    assertError(set.getItemByRank.bind(set, 4), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

    assertTruth(set.getRankOfItem(-1) == 0, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(1) == 0, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(2) == 1, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(3) == 2, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(4) == 3, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(5) == 4, "unexpected rank of an item.");

    //assertError(set.getRankOfItem.bind(set, 5), "no error thrown when attempting to get the rank a missing item from the set.");

    assertTruth(set.getLeastUpperBoundItem(0) == 1, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(1) == 1, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(2) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == 3, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(4) == 4, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(5) == null, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(0) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(1) == 1, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(2) == 2, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(3) == 3, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(4) == 4, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(5) == 4, "unexpected lower bound for an item.");

    {
        let array = set.toArray();

        assertTruth(array.length == 4, "the array form of the set is incorrect.");

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1, "the array form of the set is incorrect.");
        }
    }

    {
        let array = new Array();

        set.doForEachItemInOrder(i => array.push(i));

        assertTruth(array.length == 4, "the iteration of the set is incorrect.");

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1, "the iteration of the set is incorrect.");
        }
    }


    set.remove(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3, "unexpected size of the set.");

    assertTruth(!set.has(1), "there is an unexpected item in the set.");

    assertTruth(set.getItemByRank(0) == 2, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(2) == 0, "unexpected rank of an item.");

    assertTruth(set.getItemByRank(1) == 3, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(3) == 1, "unexpected rank of an item.");

    assertTruth(set.getItemByRank(2) == 4, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(4) == 2, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(0) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(1) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == 3, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(0) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(3) == 3, "unexpected lower bound for an item.");

    //assertError(set.remove.bind(set, 1), "no error thrown when attempting to remove a missing item from the set.");


    set.remove(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2, "unexpected size of the set.");

    assertTruth(!set.has(3), "there is an unexpected item in the set.");

    assertTruth(set.getItemByRank(0) == 2, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(2) == 0, "unexpected rank of an item.");

    assertTruth(set.getItemByRank(1) == 4, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(4) == 1, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(1) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(2) == 2, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == 4, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(2) == 2, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(3) == 2, "unexpected lower bound for an item.");

    //assertError(set.remove.bind(set, 3), "no error thrown when attempting to remove a missing item from the set.");


    set.remove(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 1, "unexpected size of the set.");

    assertTruth(!set.has(2), "there is an unexpected item in the set.");

    assertTruth(set.getItemByRank(0) == 4, "unexpected item from rank.");
    assertTruth(set.getRankOfItem(4) == 0, "unexpected rank of an item.");

    assertTruth(set.getLeastUpperBoundItem(2) == 4, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == 4, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(4) == 4, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(3) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(4) == 4, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(5) == 4, "unexpected lower bound for an item.");

    //assertError(set.remove.bind(set, 2), "no error thrown when attempting to remove a missing item from the set.");


    set.remove(4);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 0, "unexpected size of the set.");

    assertTruth(!set.has(4), "there is an unexpected item in the set.");

    assertTruth(set.getLeastUpperBoundItem(0) == null, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(1) == null, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(3) == null, "unexpected upper bound for an item.");

    assertTruth(set.getGreatestLowerBoundItem(0) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(2) == null, "unexpected lower bound for an item.");

    //assertError(set.remove.bind(set, 4), "no error thrown when attempting to remove a missing item from the set.");
}


// test set #2.

{
    let sizeOfTests = 1000;
    let set = new ABTreeSet(2, 3);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i + 1, "unexpected size of set.");
    }

    set = set.clone();

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.has(i), "there is an item missing from the set.");
    }

    assertTruth(!set.has(-1), "there is an unexpected item in the set.");
    assertTruth(!set.has(sizeOfTests), "there is an unexpected item in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getItemByRank(i) == i, "unexpected item from rank.");
    }

    assertError(set.getItemByRank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
    assertError(set.getItemByRank.bind(set, sizeOfTests), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getRankOfItem(i) == i, "unexpected rank of an item.");
    }

    assertTruth(set.getRankOfItem(-1) == 0, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(sizeOfTests) == sizeOfTests, "unexpected rank of an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getLeastUpperBoundItem(i) == i, "unexpected upper bound for an item.");
    }

    assertTruth(set.getLeastUpperBoundItem(-1) == 0, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(sizeOfTests) == null, "unexpected upper bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getGreatestLowerBoundItem(i) == i, "unexpected lower bound for an item.");
    }

    assertTruth(set.getGreatestLowerBoundItem(-1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1, "unexpected lower bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(!set.has(i), "this is an unexpected item in the set.");
        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i, "unexpected size of the set.");
    }
}


// test set #2.

{
    let sizeOfTests = 1000;
    let set = new ABTreeSet(5, 10);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i + 1, "unexpected size of set.");
    }

    set = set.clone();

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.has(i), "there is an item missing from the set.");
    }

    assertTruth(!set.has(-1), "there is an unexpected item in the set.");
    assertTruth(!set.has(sizeOfTests), "there is an unexpected item in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getItemByRank(i) == i, "unexpected item from rank.");
    }

    assertError(set.getItemByRank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
    assertError(set.getItemByRank.bind(set, sizeOfTests), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getRankOfItem(i) == i, "unexpected rank of an item.");
    }

    assertTruth(set.getRankOfItem(-1) == 0, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(sizeOfTests) == sizeOfTests, "unexpected rank of an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getLeastUpperBoundItem(i) == i, "unexpected upper bound for an item.");
    }

    assertTruth(set.getLeastUpperBoundItem(-1) == 0, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(sizeOfTests) == null, "unexpected upper bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getGreatestLowerBoundItem(i) == i, "unexpected lower bound for an item.");
    }

    assertTruth(set.getGreatestLowerBoundItem(-1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1, "unexpected lower bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(!set.has(i), "this is an unexpected item in the set.");
        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i, "unexpected size of the set.");
    }
}

// test set #3.

{
    let sizeOfTests = 10000;
    let set = new ABTreeSet(30, 59);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i + 1, "unexpected size of set.");
    }

    set = set.clone();

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.has(i), "there is an item missing from the set.");
    }

    assertTruth(!set.has(-1), "there is an unexpected item in the set.");
    assertTruth(!set.has(sizeOfTests), "there is an unexpected item in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getItemByRank(i) == i, "unexpected item from rank.");
    }

    assertError(set.getItemByRank.bind(set, -1), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");
    assertError(set.getItemByRank.bind(set, sizeOfTests), "no error thrown when attempting to get the item of a rank which is out of bounds in the set.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getRankOfItem(i) == i, "unexpected rank of an item.");
    }

    assertTruth(set.getRankOfItem(-1) == 0, "unexpected rank of an item.");
    assertTruth(set.getRankOfItem(sizeOfTests) == sizeOfTests, "unexpected rank of an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getLeastUpperBoundItem(i) == i, "unexpected upper bound for an item.");
    }

    assertTruth(set.getLeastUpperBoundItem(-1) == 0, "unexpected upper bound for an item.");
    assertTruth(set.getLeastUpperBoundItem(sizeOfTests) == null, "unexpected upper bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getGreatestLowerBoundItem(i) == i, "unexpected lower bound for an item.");
    }

    assertTruth(set.getGreatestLowerBoundItem(-1) == null, "unexpected lower bound for an item.");
    assertTruth(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1, "unexpected lower bound for an item.");

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(!set.has(i), "this is an unexpected item in the set.");
        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i, "unexpected size of the set.");
    }
}


// test set #4.

{
    let sizeOfTests = 1000;
    let set = new ABTreeSet(2, 3);
    let ref = new Set();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        set.add(item);
        set.debugVerifyIntegrity();

        ref.add(item);

        assertTruth(set.has(item) == ref.has(item), "there is incorrect membership in the set.");
        assertTruth(set.getSize() == ref.size, "unexpected size of the set.");
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        if (ref.has(item)) {
            set.remove(item);
            set.debugVerifyIntegrity();

            ref.delete(item);
        } else {
            //assertError(set.remove.bind(set), "no error thrown when attempting to remove a missing item from the set.");
        }

        assertTruth(set.has(item) == ref.has(item), "there is incorrect membership in the set.");
        assertTruth(set.getSize() == ref.size, "unexpected size of the set.");
    }
}

