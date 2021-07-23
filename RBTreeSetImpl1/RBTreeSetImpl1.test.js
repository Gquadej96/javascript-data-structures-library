/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {RBTreeSetImpl1} from "./RBTreeSetImpl1.js";


export function testOverallMethods1() {
    let set = new RBTreeSetImpl1();

    set.debugVerifyIntegrity();
    assertEquals(0, set.getSize());

    set.rebalance();
    set.debugVerifyIntegrity();

    set.add(1);
    set.debugVerifyIntegrity();

    assertEquals(1, set.getSize());

    assertTrue(set.has(1));

    assertEquals(1, set.getItemByRank(0));
    assertEquals(0, set.getRankOfItem(1));

    assertEquals(1, set.getLeastUpperBoundItem(0));
    assertEquals(1, set.getLeastUpperBoundItem(1));
    assertEquals(null, set.getLeastUpperBoundItem(2));

    assertEquals(null, set.getGreatestLowerBoundItem(0));
    assertEquals(1, set.getGreatestLowerBoundItem(1));
    assertEquals(1, set.getGreatestLowerBoundItem(2));

    set.add(2);
    set.debugVerifyIntegrity();

    assertEquals(2, set.getSize());

    assertTrue(set.has(2));

    assertEquals(2, set.getItemByRank(1));
    assertEquals(1, set.getRankOfItem(2));

    assertEquals(1, set.getLeastUpperBoundItem(1));
    assertEquals(2, set.getLeastUpperBoundItem(2));
    assertEquals(null, set.getLeastUpperBoundItem(3));

    assertEquals(1, set.getGreatestLowerBoundItem(1));
    assertEquals(2, set.getGreatestLowerBoundItem(2));
    assertEquals(2, set.getGreatestLowerBoundItem(3));

    set.add(1);
    set.debugVerifyIntegrity();

    assertEquals(2, set.getSize());

    assertTrue(set.has(1));

    assertEquals(1, set.getItemByRank(0));
    assertEquals(0, set.getRankOfItem(1));

    set.add(4);
    set.debugVerifyIntegrity();

    assertEquals(3, set.getSize());

    assertTrue(set.has(4));

    assertEquals(4, set.getItemByRank(2));
    assertEquals(2, set.getRankOfItem(4));

    assertEquals(4, set.getLeastUpperBoundItem(3));
    assertEquals(4, set.getLeastUpperBoundItem(4));
    assertEquals(null, set.getLeastUpperBoundItem(5));

    assertEquals(2, set.getGreatestLowerBoundItem(3));
    assertEquals(4, set.getGreatestLowerBoundItem(4));
    assertEquals(4, set.getGreatestLowerBoundItem(5));

    set.add(2);
    set.debugVerifyIntegrity();

    assertEquals(3, set.getSize());

    assertTrue(set.has(2));

    assertEquals(2, set.getItemByRank(1));
    assertEquals(1, set.getRankOfItem(2));

    set.add(3);
    set.debugVerifyIntegrity();

    assertEquals(4, set.getSize());

    assertTrue(set.has(3));

    assertEquals(3, set.getItemByRank(2));
    assertEquals(2, set.getRankOfItem(3));

    assertEquals(4, set.getItemByRank(3));
    assertEquals(3, set.getRankOfItem(4));

    assertEquals(2, set.getLeastUpperBoundItem(2));
    assertEquals(3, set.getLeastUpperBoundItem(3));
    assertEquals(4, set.getLeastUpperBoundItem(4));

    assertEquals(2, set.getGreatestLowerBoundItem(2));
    assertEquals(3, set.getGreatestLowerBoundItem(3));
    assertEquals(4, set.getGreatestLowerBoundItem(4));

    set.add(3);
    set.debugVerifyIntegrity();

    assertEquals(4, set.getSize());

    assertTrue(set.has(3));

    assertEquals(3, set.getItemByRank(2));
    assertEquals(2, set.getRankOfItem(3));

    set.rebalance();
    set.debugVerifyIntegrity();
    
    set = set.clone();
    set.debugVerifyIntegrity();

    assertEquals(4, set.getSize());

    assertTrue(set.has(1));
    assertTrue(set.has(2));
    assertTrue(set.has(3));
    assertTrue(set.has(4));

    assertTrue(!set.has(0));
    assertTrue(!set.has(5));

    assertEquals(1, set.getItemByRank(0));
    assertEquals(2, set.getItemByRank(1));
    assertEquals(3, set.getItemByRank(2));
    assertEquals(4, set.getItemByRank(3));

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(4));

    assertEquals(0, set.getRankOfItem(-1));
    assertEquals(0, set.getRankOfItem(1));
    assertEquals(1, set.getRankOfItem(2));
    assertEquals(2, set.getRankOfItem(3));
    assertEquals(3, set.getRankOfItem(4));
    assertEquals(4, set.getRankOfItem(5));

    //assertThrows(() => set.getRankOfItem(5));

    assertEquals(1, set.getLeastUpperBoundItem(0));
    assertEquals(1, set.getLeastUpperBoundItem(1));
    assertEquals(2, set.getLeastUpperBoundItem(2));
    assertEquals(3, set.getLeastUpperBoundItem(3));
    assertEquals(4, set.getLeastUpperBoundItem(4));
    assertEquals(null, set.getLeastUpperBoundItem(5));

    assertEquals(null, set.getGreatestLowerBoundItem(0));
    assertEquals(1, set.getGreatestLowerBoundItem(1));
    assertEquals(2, set.getGreatestLowerBoundItem(2));
    assertEquals(3, set.getGreatestLowerBoundItem(3));
    assertEquals(4, set.getGreatestLowerBoundItem(4));
    assertEquals(4, set.getGreatestLowerBoundItem(5));

    {
        let array = set.toArray();

        assertEquals(4, array.length);

        for (let i = 0; i < array.length; ++i) {
            assertEquals(i + 1, array[i]);
        }
    }

    {
        let array = new Array();

        set.doForEachItemInOrder(i => array.push(i));

        assertEquals(4, array.length);

        for (let i = 0; i < array.length; ++i) {
            assertEquals(i + 1, array[i]);
        }
    }

    set.remove(1);
    set.debugVerifyIntegrity();

    assertEquals(3, set.getSize());

    assertTrue(!set.has(1));

    assertEquals(2, set.getItemByRank(0));
    assertEquals(0, set.getRankOfItem(2));

    assertEquals(3, set.getItemByRank(1));
    assertEquals(1, set.getRankOfItem(3));

    assertEquals(4, set.getItemByRank(2));
    assertEquals(2, set.getRankOfItem(4));

    assertEquals(2, set.getLeastUpperBoundItem(0));
    assertEquals(2, set.getLeastUpperBoundItem(1));
    assertEquals(3, set.getLeastUpperBoundItem(3));

    assertEquals(null, set.getGreatestLowerBoundItem(0));
    assertEquals(null, set.getGreatestLowerBoundItem(1));
    assertEquals(3, set.getGreatestLowerBoundItem(3));

    //assertThrows(() => set.remove(1));

    set.remove(3);
    set.debugVerifyIntegrity();

    assertEquals(2, set.getSize());

    assertTrue(!set.has(3));

    assertEquals(2, set.getItemByRank(0));
    assertEquals(0, set.getRankOfItem(2));

    assertEquals(4, set.getItemByRank(1));
    assertEquals(1, set.getRankOfItem(4));

    assertEquals(2, set.getLeastUpperBoundItem(1));
    assertEquals(2, set.getLeastUpperBoundItem(2));
    assertEquals(4, set.getLeastUpperBoundItem(3));

    assertEquals(null, set.getGreatestLowerBoundItem(1));
    assertEquals(2, set.getGreatestLowerBoundItem(2));
    assertEquals(2, set.getGreatestLowerBoundItem(3));

    //assertThrows(() => set.remove(3));

    set.remove(2);
    set.debugVerifyIntegrity();

    assertEquals(1, set.getSize());

    assertTrue(!set.has(2));

    assertEquals(4, set.getItemByRank(0));
    assertEquals(0, set.getRankOfItem(4));

    assertEquals(4, set.getLeastUpperBoundItem(2));
    assertEquals(4, set.getLeastUpperBoundItem(3));
    assertEquals(4, set.getLeastUpperBoundItem(4));

    assertEquals(null, set.getGreatestLowerBoundItem(3));
    assertEquals(4, set.getGreatestLowerBoundItem(4));
    assertEquals(4, set.getGreatestLowerBoundItem(5));

    //assertThrows(() => set.remove(2));

    set.remove(4);
    set.debugVerifyIntegrity();

    assertEquals(0, set.getSize());

    assertTrue(!set.has(4));

    assertEquals(null, set.getLeastUpperBoundItem(0));
    assertEquals(null, set.getLeastUpperBoundItem(1));
    assertEquals(null, set.getLeastUpperBoundItem(3));

    assertEquals(null, set.getGreatestLowerBoundItem(0));
    assertEquals(null, set.getGreatestLowerBoundItem(1));
    assertEquals(null, set.getGreatestLowerBoundItem(2));

    //assertThrows(() => set.remove(4));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let set = new RBTreeSetImpl1();

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertEquals(i + 1, set.getSize());
    }

    set = set.clone();

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.has(i));
    }

    assertTrue(!set.has(-1));
    assertTrue(!set.has(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, set.getItemByRank(i));
    }

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, set.getRankOfItem(i));
    }

    assertEquals(0, set.getRankOfItem(-1));
    assertEquals(sizeOfTests, set.getRankOfItem(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, set.getLeastUpperBoundItem(i));
    }

    assertEquals(0, set.getLeastUpperBoundItem(-1));
    assertEquals(null, set.getLeastUpperBoundItem(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, set.getGreatestLowerBoundItem(i));
    }

    assertEquals(null, set.getGreatestLowerBoundItem(-1));
    assertEquals(sizeOfTests - 1, set.getGreatestLowerBoundItem(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTrue(!set.has(i), "this is an unexpected item in the set.");
        assertEquals(sizeOfTests - i - 1, set.getSize());
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertEquals(sizeOfTests - i, set.getSize());
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertEquals(sizeOfTests - i - 1, set.getSize());
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertEquals(sizeOfTests - i, set.getSize());
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertEquals(i, set.getSize());
    }
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let set = new RBTreeSetImpl1();
    let ref = new Set();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        set.add(item);
        set.debugVerifyIntegrity();
        ref.add(item);
        assertEquals(ref.has(item), set.has(item));
        assertEquals(ref.size, set.getSize());
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
            //assertThrows(() => set.remove(item));
        }

        assertEquals(ref.has(item), set.has(item));
        assertEquals(ref.size, set.getSize());
    }
}

