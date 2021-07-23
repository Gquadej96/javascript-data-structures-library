/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {ABTreeSet} from "./ABTreeSet.js";


export function testOverallMethods1() {
    let set = new ABTreeSet(2, 3);

    set.debugVerifyIntegrity();
    assertTrue(set.getSize() == 0);

    set.rebalance();
    set.debugVerifyIntegrity();

    set.add(1);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 1);

    assertTrue(set.has(1));

    assertTrue(set.getItemByRank(0) == 1);
    assertTrue(set.getRankOfItem(1) == 0);

    assertTrue(set.getLeastUpperBoundItem(0) == 1);
    assertTrue(set.getLeastUpperBoundItem(1) == 1);
    assertTrue(set.getLeastUpperBoundItem(2) == null);

    assertTrue(set.getGreatestLowerBoundItem(0) == null);
    assertTrue(set.getGreatestLowerBoundItem(1) == 1);
    assertTrue(set.getGreatestLowerBoundItem(2) == 1);

    set.add(2);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 2);

    assertTrue(set.has(2));

    assertTrue(set.getItemByRank(1) == 2);
    assertTrue(set.getRankOfItem(2) == 1);

    assertTrue(set.getLeastUpperBoundItem(1) == 1);
    assertTrue(set.getLeastUpperBoundItem(2) == 2);
    assertTrue(set.getLeastUpperBoundItem(3) == null);

    assertTrue(set.getGreatestLowerBoundItem(1) == 1);
    assertTrue(set.getGreatestLowerBoundItem(2) == 2);
    assertTrue(set.getGreatestLowerBoundItem(3) == 2);

    set.add(1);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 2);

    assertTrue(set.has(1));

    assertTrue(set.getItemByRank(0) == 1);
    assertTrue(set.getRankOfItem(1) == 0);

    set.add(4);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 3);

    assertTrue(set.has(4));

    assertTrue(set.getItemByRank(2) == 4);
    assertTrue(set.getRankOfItem(4) == 2);

    assertTrue(set.getLeastUpperBoundItem(3) == 4);
    assertTrue(set.getLeastUpperBoundItem(4) == 4);
    assertTrue(set.getLeastUpperBoundItem(5) == null);

    assertTrue(set.getGreatestLowerBoundItem(3) == 2);
    assertTrue(set.getGreatestLowerBoundItem(4) == 4);
    assertTrue(set.getGreatestLowerBoundItem(5) == 4);

    set.add(2);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 3);

    assertTrue(set.has(2));

    assertTrue(set.getItemByRank(1) == 2);
    assertTrue(set.getRankOfItem(2) == 1);

    set.add(3);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 4);

    assertTrue(set.has(3));

    assertTrue(set.getItemByRank(2) == 3);
    assertTrue(set.getRankOfItem(3) == 2);

    assertTrue(set.getItemByRank(3) == 4);
    assertTrue(set.getRankOfItem(4) == 3);

    assertTrue(set.getLeastUpperBoundItem(2) == 2);
    assertTrue(set.getLeastUpperBoundItem(3) == 3);
    assertTrue(set.getLeastUpperBoundItem(4) == 4);

    assertTrue(set.getGreatestLowerBoundItem(2) == 2);
    assertTrue(set.getGreatestLowerBoundItem(3) == 3);
    assertTrue(set.getGreatestLowerBoundItem(4) == 4);

    set.add(3);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 4);

    assertTrue(set.has(3));

    assertTrue(set.getItemByRank(2) == 3);
    assertTrue(set.getRankOfItem(3) == 2);

    set.rebalance();
    set.debugVerifyIntegrity();
    
    set = set.clone();
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 4);

    assertTrue(set.has(1));
    assertTrue(set.has(2));
    assertTrue(set.has(3));
    assertTrue(set.has(4));

    assertTrue(!set.has(0));
    assertTrue(!set.has(5));

    assertTrue(set.getItemByRank(0) == 1);
    assertTrue(set.getItemByRank(1) == 2);
    assertTrue(set.getItemByRank(2) == 3);
    assertTrue(set.getItemByRank(3) == 4);

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(4));

    assertTrue(set.getRankOfItem(-1) == 0);
    assertTrue(set.getRankOfItem(1) == 0);
    assertTrue(set.getRankOfItem(2) == 1);
    assertTrue(set.getRankOfItem(3) == 2);
    assertTrue(set.getRankOfItem(4) == 3);
    assertTrue(set.getRankOfItem(5) == 4);

    //assertThrows(() => set.getRankOfItem(5));

    assertTrue(set.getLeastUpperBoundItem(0) == 1);
    assertTrue(set.getLeastUpperBoundItem(1) == 1);
    assertTrue(set.getLeastUpperBoundItem(2) == 2);
    assertTrue(set.getLeastUpperBoundItem(3) == 3);
    assertTrue(set.getLeastUpperBoundItem(4) == 4);
    assertTrue(set.getLeastUpperBoundItem(5) == null);

    assertTrue(set.getGreatestLowerBoundItem(0) == null);
    assertTrue(set.getGreatestLowerBoundItem(1) == 1);
    assertTrue(set.getGreatestLowerBoundItem(2) == 2);
    assertTrue(set.getGreatestLowerBoundItem(3) == 3);
    assertTrue(set.getGreatestLowerBoundItem(4) == 4);
    assertTrue(set.getGreatestLowerBoundItem(5) == 4);

    {
        let array = set.toArray();

        assertTrue(array.length == 4);

        for (let i = 0; i < array.length; ++i) {
            assertTrue(array[i] == i + 1);
        }
    }

    {
        let array = new Array();

        set.doForEachItemInOrder(i => array.push(i));

        assertTrue(array.length == 4);

        for (let i = 0; i < array.length; ++i) {
            assertTrue(array[i] == i + 1);
        }
    }

    set.remove(1);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 3);

    assertTrue(!set.has(1));

    assertTrue(set.getItemByRank(0) == 2);
    assertTrue(set.getRankOfItem(2) == 0);

    assertTrue(set.getItemByRank(1) == 3);
    assertTrue(set.getRankOfItem(3) == 1);

    assertTrue(set.getItemByRank(2) == 4);
    assertTrue(set.getRankOfItem(4) == 2);

    assertTrue(set.getLeastUpperBoundItem(0) == 2);
    assertTrue(set.getLeastUpperBoundItem(1) == 2);
    assertTrue(set.getLeastUpperBoundItem(3) == 3);

    assertTrue(set.getGreatestLowerBoundItem(0) == null);
    assertTrue(set.getGreatestLowerBoundItem(1) == null);
    assertTrue(set.getGreatestLowerBoundItem(3) == 3);

    //assertThrows(() => set.remove(1));

    set.remove(3);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 2);

    assertTrue(!set.has(3));

    assertTrue(set.getItemByRank(0) == 2);
    assertTrue(set.getRankOfItem(2) == 0);

    assertTrue(set.getItemByRank(1) == 4);
    assertTrue(set.getRankOfItem(4) == 1);

    assertTrue(set.getLeastUpperBoundItem(1) == 2);
    assertTrue(set.getLeastUpperBoundItem(2) == 2);
    assertTrue(set.getLeastUpperBoundItem(3) == 4);

    assertTrue(set.getGreatestLowerBoundItem(1) == null);
    assertTrue(set.getGreatestLowerBoundItem(2) == 2);
    assertTrue(set.getGreatestLowerBoundItem(3) == 2);

    //assertThrows(() => set.remove(3));

    set.remove(2);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 1);

    assertTrue(!set.has(2));

    assertTrue(set.getItemByRank(0) == 4);
    assertTrue(set.getRankOfItem(4) == 0);

    assertTrue(set.getLeastUpperBoundItem(2) == 4);
    assertTrue(set.getLeastUpperBoundItem(3) == 4);
    assertTrue(set.getLeastUpperBoundItem(4) == 4);

    assertTrue(set.getGreatestLowerBoundItem(3) == null);
    assertTrue(set.getGreatestLowerBoundItem(4) == 4);
    assertTrue(set.getGreatestLowerBoundItem(5) == 4);

    //assertThrows(() => set.remove(2));

    set.remove(4);
    set.debugVerifyIntegrity();

    assertTrue(set.getSize() == 0);

    assertTrue(!set.has(4));

    assertTrue(set.getLeastUpperBoundItem(0) == null);
    assertTrue(set.getLeastUpperBoundItem(1) == null);
    assertTrue(set.getLeastUpperBoundItem(3) == null);

    assertTrue(set.getGreatestLowerBoundItem(0) == null);
    assertTrue(set.getGreatestLowerBoundItem(1) == null);
    assertTrue(set.getGreatestLowerBoundItem(2) == null);

    //assertThrows(() => set.remove(4));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let set = new ABTreeSet(2, 3);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i + 1);
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
        assertTrue(set.getItemByRank(i) == i);
    }

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getRankOfItem(i) == i);
    }

    assertTrue(set.getRankOfItem(-1) == 0);
    assertTrue(set.getRankOfItem(sizeOfTests) == sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getLeastUpperBoundItem(i) == i);
    }

    assertTrue(set.getLeastUpperBoundItem(-1) == 0);
    assertTrue(set.getLeastUpperBoundItem(sizeOfTests) == null);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getGreatestLowerBoundItem(i) == i);
    }

    assertTrue(set.getGreatestLowerBoundItem(-1) == null);
    assertTrue(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(!set.has(i));
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i);
    }
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let set = new ABTreeSet(5, 10);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i + 1);
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
        assertTrue(set.getItemByRank(i) == i);
    }

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getRankOfItem(i) == i);
    }

    assertTrue(set.getRankOfItem(-1) == 0);
    assertTrue(set.getRankOfItem(sizeOfTests) == sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getLeastUpperBoundItem(i) == i);
    }

    assertTrue(set.getLeastUpperBoundItem(-1) == 0);
    assertTrue(set.getLeastUpperBoundItem(sizeOfTests) == null);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getGreatestLowerBoundItem(i) == i);
    }

    assertTrue(set.getGreatestLowerBoundItem(-1) == null);
    assertTrue(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(!set.has(i));
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i);
    }
}


export function testOverallMethods4() {
    let sizeOfTests = 10000;
    let set = new ABTreeSet(30, 59);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i + 1);
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
        assertTrue(set.getItemByRank(i) == i);
    }

    assertThrows(() => set.getItemByRank(-1));
    assertThrows(() => set.getItemByRank(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getRankOfItem(i) == i);
    }

    assertTrue(set.getRankOfItem(-1) == 0);
    assertTrue(set.getRankOfItem(sizeOfTests) == sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getLeastUpperBoundItem(i) == i);
    }

    assertTrue(set.getLeastUpperBoundItem(-1) == 0);
    assertTrue(set.getLeastUpperBoundItem(sizeOfTests) == null);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(set.getGreatestLowerBoundItem(i) == i);
    }

    assertTrue(set.getGreatestLowerBoundItem(-1) == null);
    assertTrue(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(!set.has(i));
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();
        assertTrue(set.getSize() == i);
    }
}


export function testOverallMethods5() {
    let sizeOfTests = 1000;
    let set = new ABTreeSet(2, 3);
    let ref = new Set();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        set.add(item);
        set.debugVerifyIntegrity();

        ref.add(item);

        assertTrue(set.has(item) == ref.has(item));
        assertTrue(set.getSize() == ref.size);
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

        assertTrue(set.has(item) == ref.has(item));
        assertTrue(set.getSize() == ref.size);
    }
}

