/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {RBTreeMap} from "../RBTreeMap.js";


function assertTruth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1.

{
    let map = new RBTreeMap();

    assertTruth(map.getSize() == 0, "unexpected size of the map.");


    map.set(1, 2);

    assertTruth(map.has(1), "there is an entry missing from the map.");
    assertTruth(map.get(1) == 2, "unexpected value mapped to a key.");
    assertTruth(map.getSize() == 1, "unexpected size of the map.");

    
    map.set(1, 3);

    assertTruth(map.has(1), "there is an entry missing from the map.");
    assertTruth(map.get(1) == 3, "unexpected value mapped to a key.");
    assertTruth(map.getSize() == 1, "unexpected size of the map.");
    assertTruth(map.getRankOfKey(1) == 0, "unexpected rank of a key.");


    map.set(2, 4);

    assertTruth(map.has(2), "there is an entry missing from the map.");
    assertTruth(map.get(2) == 4, "unexpected value of a key.");
    assertTruth(map.getSize() == 2, "unexpected size of the map.");
    assertTruth(map.getRankOfKey(2) == 1, "unexpected rank of a key.");

    assertTruth(map.getKeyByRank(0) == 1, "unexpected key from rank.");
    assertTruth(map.getKeyByRank(1) == 2, "unexpected key from rank.");
}


// test set #2.

{
    let sizeOfTests = 1000;
    let map = new RBTreeMap();

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, i + 1);

        assertTruth(map.getSize() == i + 1, "unexpected size of map.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.has(i), "there is an item missing from the map.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.get(i) == i + 1, "unexpected value of a key.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.getKeyByRank(i) == i, "unexpected key from rank.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.getRankOfKey(i) == i, "unexpected rank of a key.");
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, null);
        
        assertTruth(!map.has(i), "there is an unexpected entry in the map.")
        assertTruth(map.getSize() == sizeOfTests - i - 1, "unexpected size of the map.");
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, i + 1);

        assertTruth(map.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        map.set(i, null);

        assertTruth(map.getSize() == sizeOfTests - i - 1, "unexpected size of the set.");
    }

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        map.set(i, i + 1);

        assertTruth(map.getSize() == sizeOfTests - i, "unexpected size of the set.");
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, null);

        assertTruth(map.getSize() == i, "unexpected size of the set.");
    }
}

