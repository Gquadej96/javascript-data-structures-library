/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertTrue} from "../testUtils/testUtils.js";
import {RBTreeMapImpl2} from "./RBTreeMapImpl2.js";


export function testOverallMethods1() {
    let map = new RBTreeMapImpl2();

    assertEquals(0, map.getSize());

    map.set(1, 2);

    assertTrue(map.has(1));
    assertEquals(2, map.get(1));
    assertEquals(1, map.getSize());

    map.set(1, 3);

    assertTrue(map.has(1));
    assertEquals(3, map.get(1));
    assertEquals(1, map.getSize());
    assertEquals(0, map.getRankOfKey(1));

    map.set(2, 4);

    assertTrue(map.has(2));
    assertEquals(4, map.get(2));
    assertEquals(2, map.getSize());
    assertEquals(1, map.getRankOfKey(2));

    assertEquals(1, map.getKeyByRank(0));
    assertEquals(2, map.getKeyByRank(1));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let map = new RBTreeMapImpl2();

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, i + 1);
        assertEquals(i + 1, map.getSize());
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(map.has(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i + 1, map.get(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, map.getKeyByRank(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, map.getRankOfKey(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, null);
        assertTrue(!map.has(i));
        assertEquals(sizeOfTests - i - 1, map.getSize());
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertEquals(sizeOfTests - i, map.getSize());
    }

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        map.set(i, null);
        assertEquals(sizeOfTests - i - 1, map.getSize());
    }

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertEquals(sizeOfTests - i, map.getSize());
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, null);
        assertEquals(i, map.getSize());
    }
}

