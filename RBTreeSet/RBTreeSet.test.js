/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth, assertError} from "../testUtils/testUtils.js";
import {RBTreeSet} from "./RBTreeSet.js";


export function testOverallMethods1() {
    let set = new RBTreeSet();

    set.debugVerifyIntegrity();
    assertTruth(set.getSize() == 0);

    set.rebalance();
    set.debugVerifyIntegrity();

    set.add(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 1);

    assertTruth(set.has(1));

    assertTruth(set.getItemByRank(0) == 1);
    assertTruth(set.getRankOfItem(1) == 0);

    assertTruth(set.getLeastUpperBoundItem(0) == 1);
    assertTruth(set.getLeastUpperBoundItem(1) == 1);
    assertTruth(set.getLeastUpperBoundItem(2) == null);

    assertTruth(set.getGreatestLowerBoundItem(0) == null);
    assertTruth(set.getGreatestLowerBoundItem(1) == 1);
    assertTruth(set.getGreatestLowerBoundItem(2) == 1);

    set.add(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2);

    assertTruth(set.has(2));

    assertTruth(set.getItemByRank(1) == 2);
    assertTruth(set.getRankOfItem(2) == 1);

    assertTruth(set.getLeastUpperBoundItem(1) == 1);
    assertTruth(set.getLeastUpperBoundItem(2) == 2);
    assertTruth(set.getLeastUpperBoundItem(3) == null);

    assertTruth(set.getGreatestLowerBoundItem(1) == 1);
    assertTruth(set.getGreatestLowerBoundItem(2) == 2);
    assertTruth(set.getGreatestLowerBoundItem(3) == 2);

    set.add(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2);

    assertTruth(set.has(1));

    assertTruth(set.getItemByRank(0) == 1);
    assertTruth(set.getRankOfItem(1) == 0);

    set.add(4);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3);

    assertTruth(set.has(4));

    assertTruth(set.getItemByRank(2) == 4);
    assertTruth(set.getRankOfItem(4) == 2);

    assertTruth(set.getLeastUpperBoundItem(3) == 4);
    assertTruth(set.getLeastUpperBoundItem(4) == 4);
    assertTruth(set.getLeastUpperBoundItem(5) == null);

    assertTruth(set.getGreatestLowerBoundItem(3) == 2);
    assertTruth(set.getGreatestLowerBoundItem(4) == 4);
    assertTruth(set.getGreatestLowerBoundItem(5) == 4);

    set.add(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3);

    assertTruth(set.has(2));

    assertTruth(set.getItemByRank(1) == 2);
    assertTruth(set.getRankOfItem(2) == 1);

    set.add(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4);

    assertTruth(set.has(3));

    assertTruth(set.getItemByRank(2) == 3);
    assertTruth(set.getRankOfItem(3) == 2);

    assertTruth(set.getItemByRank(3) == 4);
    assertTruth(set.getRankOfItem(4) == 3);

    assertTruth(set.getLeastUpperBoundItem(2) == 2);
    assertTruth(set.getLeastUpperBoundItem(3) == 3);
    assertTruth(set.getLeastUpperBoundItem(4) == 4);

    assertTruth(set.getGreatestLowerBoundItem(2) == 2);
    assertTruth(set.getGreatestLowerBoundItem(3) == 3);
    assertTruth(set.getGreatestLowerBoundItem(4) == 4);

    set.add(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4);

    assertTruth(set.has(3));

    assertTruth(set.getItemByRank(2) == 3);
    assertTruth(set.getRankOfItem(3) == 2);

    set.rebalance();
    set.debugVerifyIntegrity();

    set = set.clone();
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 4);

    assertTruth(set.has(1));
    assertTruth(set.has(2));
    assertTruth(set.has(3));
    assertTruth(set.has(4));

    assertTruth(!set.has(0));
    assertTruth(!set.has(5));

    assertTruth(set.getItemByRank(0) == 1);
    assertTruth(set.getItemByRank(1) == 2);
    assertTruth(set.getItemByRank(2) == 3);
    assertTruth(set.getItemByRank(3) == 4);

    assertError(() => set.getItemByRank(-1));
    assertError(() => set.getItemByRank(4));

    assertTruth(set.getRankOfItem(-1) == 0);
    assertTruth(set.getRankOfItem(1) == 0);
    assertTruth(set.getRankOfItem(2) == 1);
    assertTruth(set.getRankOfItem(3) == 2);
    assertTruth(set.getRankOfItem(4) == 3);
    assertTruth(set.getRankOfItem(5) == 4);

    //assertError(() => set.getRankOfItem(5));

    assertTruth(set.getLeastUpperBoundItem(0) == 1);
    assertTruth(set.getLeastUpperBoundItem(1) == 1);
    assertTruth(set.getLeastUpperBoundItem(2) == 2);
    assertTruth(set.getLeastUpperBoundItem(3) == 3);
    assertTruth(set.getLeastUpperBoundItem(4) == 4);
    assertTruth(set.getLeastUpperBoundItem(5) == null);

    assertTruth(set.getGreatestLowerBoundItem(0) == null);
    assertTruth(set.getGreatestLowerBoundItem(1) == 1);
    assertTruth(set.getGreatestLowerBoundItem(2) == 2);
    assertTruth(set.getGreatestLowerBoundItem(3) == 3);
    assertTruth(set.getGreatestLowerBoundItem(4) == 4);
    assertTruth(set.getGreatestLowerBoundItem(5) == 4);

    {
        let array = set.toArray();

        assertTruth(array.length == 4);

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1);
        }
    }

    {
        let array = new Array();

        set.doForEachItemInOrder(i => array.push(i));

        assertTruth(array.length == 4);

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1);
        }
    }

    set.remove(1);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 3);

    assertTruth(!set.has(1));

    assertTruth(set.getItemByRank(0) == 2);
    assertTruth(set.getRankOfItem(2) == 0);

    assertTruth(set.getItemByRank(1) == 3);
    assertTruth(set.getRankOfItem(3) == 1);

    assertTruth(set.getItemByRank(2) == 4);
    assertTruth(set.getRankOfItem(4) == 2);

    assertTruth(set.getLeastUpperBoundItem(0) == 2);
    assertTruth(set.getLeastUpperBoundItem(1) == 2);
    assertTruth(set.getLeastUpperBoundItem(3) == 3);

    assertTruth(set.getGreatestLowerBoundItem(0) == null);
    assertTruth(set.getGreatestLowerBoundItem(1) == null);
    assertTruth(set.getGreatestLowerBoundItem(3) == 3);

    //assertError(() => set.remove(1));

    set.remove(3);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 2);

    assertTruth(!set.has(3));

    assertTruth(set.getItemByRank(0) == 2);
    assertTruth(set.getRankOfItem(2) == 0);

    assertTruth(set.getItemByRank(1) == 4);
    assertTruth(set.getRankOfItem(4) == 1);

    assertTruth(set.getLeastUpperBoundItem(1) == 2);
    assertTruth(set.getLeastUpperBoundItem(2) == 2);
    assertTruth(set.getLeastUpperBoundItem(3) == 4);

    assertTruth(set.getGreatestLowerBoundItem(1) == null);
    assertTruth(set.getGreatestLowerBoundItem(2) == 2);
    assertTruth(set.getGreatestLowerBoundItem(3) == 2);

    //assertError(() => set.remove(3));

    set.remove(2);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 1);

    assertTruth(!set.has(2));

    assertTruth(set.getItemByRank(0) == 4);
    assertTruth(set.getRankOfItem(4) == 0);

    assertTruth(set.getLeastUpperBoundItem(2) == 4);
    assertTruth(set.getLeastUpperBoundItem(3) == 4);
    assertTruth(set.getLeastUpperBoundItem(4) == 4);

    assertTruth(set.getGreatestLowerBoundItem(3) == null);
    assertTruth(set.getGreatestLowerBoundItem(4) == 4);
    assertTruth(set.getGreatestLowerBoundItem(5) == 4);

    //assertError(() => set.remove(2));

    set.remove(4);
    set.debugVerifyIntegrity();

    assertTruth(set.getSize() == 0);

    assertTruth(!set.has(4));

    assertTruth(set.getLeastUpperBoundItem(0) == null);
    assertTruth(set.getLeastUpperBoundItem(1) == null);
    assertTruth(set.getLeastUpperBoundItem(3) == null);

    assertTruth(set.getGreatestLowerBoundItem(0) == null);
    assertTruth(set.getGreatestLowerBoundItem(1) == null);
    assertTruth(set.getGreatestLowerBoundItem(2) == null);

    //assertError(() => set.remove(4));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let set = new RBTreeSet();

    for (let i = 0; i < sizeOfTests; ++i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i + 1);
    }

    set = set.clone();

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.has(i));
    }

    assertTruth(!set.has(-1));
    assertTruth(!set.has(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getItemByRank(i) == i);
    }

    assertError(() => set.getItemByRank(-1));
    assertError(() => set.getItemByRank(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getRankOfItem(i) == i);
    }

    assertTruth(set.getRankOfItem(-1) == 0);
    assertTruth(set.getRankOfItem(sizeOfTests) == sizeOfTests);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getLeastUpperBoundItem(i) == i);
    }

    assertTruth(set.getLeastUpperBoundItem(-1) == 0);
    assertTruth(set.getLeastUpperBoundItem(sizeOfTests) == null);

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(set.getGreatestLowerBoundItem(i) == i);
    }

    assertTruth(set.getGreatestLowerBoundItem(-1) == null);
    assertTruth(set.getGreatestLowerBoundItem(sizeOfTests) == sizeOfTests - 1);

    for (let i = 0; i < sizeOfTests; ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(!set.has(i));
        assertTruth(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i - 1);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        set.add(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == sizeOfTests - i);
    }

    set.rebalance();
    set.debugVerifyIntegrity();

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        set.remove(i);
        set.debugVerifyIntegrity();

        assertTruth(set.getSize() == i);
    }
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let set = new RBTreeSet();
    let ref = new Set();

    for (let i = 0; i < sizeOfTests; ++i) {
        let item = Math.floor(sizeOfTests * Math.random());

        set.add(item);
        set.debugVerifyIntegrity();

        ref.add(item);

        assertTruth(set.has(item) == ref.has(item));
        assertTruth(set.getSize() == ref.size);
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
            //assertError(() => set.remove(item));
        }

        assertTruth(set.has(item) == ref.has(item));
        assertTruth(set.getSize() == ref.size);
    }
}

