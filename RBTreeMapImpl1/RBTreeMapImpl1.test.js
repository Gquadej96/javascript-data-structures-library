/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue} from "../testUtils/testUtils.js";
import {RBTreeMapImpl1} from "./RBTreeMapImpl1.js";


export function testOverallMethods1() {
    let map = new RBTreeMapImpl1();

    assertTrue(map.getSize() == 0);

    map.set(1, 2);

    assertTrue(map.has(1));
    assertTrue(map.get(1) == 2);
    assertTrue(map.getSize() == 1);
    
    map.set(1, 3);

    assertTrue(map.has(1));
    assertTrue(map.get(1) == 3);
    assertTrue(map.getSize() == 1);
    assertTrue(map.getRankOfKey(1) == 0);

    map.set(2, 4);

    assertTrue(map.has(2));
    assertTrue(map.get(2) == 4);
    assertTrue(map.getSize() == 2);
    assertTrue(map.getRankOfKey(2) == 1);

    assertTrue(map.getKeyByRank(0) == 1);
    assertTrue(map.getKeyByRank(1) == 2);
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let map = new RBTreeMapImpl1();

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, i + 1);
        assertTrue(map.getSize() == i + 1);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(map.has(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(map.get(i) == i + 1);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(map.getKeyByRank(i) == i);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(map.getRankOfKey(i) == i);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, null);
        assertTrue(!map.has(i));
        assertTrue(map.getSize() == sizeOfTests - i - 1);
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertTrue(map.getSize() == sizeOfTests - i);
    }

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        map.set(i, null);
        assertTrue(map.getSize() == sizeOfTests - i - 1);
    }

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertTrue(map.getSize() == sizeOfTests - i);
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, null);
        assertTrue(map.getSize() == i);
    }
}

