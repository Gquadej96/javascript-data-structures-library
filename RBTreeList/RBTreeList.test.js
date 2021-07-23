/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth, assertError} from "../testUtils/testUtils.js";
import {RBTreeList} from "./RBTreeList.js";


export function testOverallMethods1() {
    let list = new RBTreeList();

    list.debugVerifyIntegrity();
    assertTruth(list.getSize() == 0);

    list.rebalance();
    list.debugVerifyIntegrity();

    list.add(0, 1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 1);

    assertTruth(list.get(0) == 1);

    assertError(() => list.get(-1));
    assertError(() => list.get(1));

    list.add(1, 2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 2);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(2));


    list.add(1, 3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 3);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 3);
    assertTruth(list.get(2) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(3));

    list.add(0, 4);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 4);

    assertTruth(list.get(0) == 4);
    assertTruth(list.get(1) == 1);
    assertTruth(list.get(2) == 3);
    assertTruth(list.get(3) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(4));

    list.add(2, 5);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 4);
    assertTruth(list.get(1) == 1);
    assertTruth(list.get(2) == 5);
    assertTruth(list.get(3) == 3);
    assertTruth(list.get(4) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    list.set(0, 1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 1);
    assertTruth(list.get(2) == 5);
    assertTruth(list.get(3) == 3);
    assertTruth(list.get(4) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    list.set(1, 2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);
    assertTruth(list.get(2) == 5);
    assertTruth(list.get(3) == 3);
    assertTruth(list.get(4) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    list.set(2, 3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);
    assertTruth(list.get(2) == 3);
    assertTruth(list.get(3) == 3);
    assertTruth(list.get(4) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    list.set(3, 4);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);
    assertTruth(list.get(2) == 3);
    assertTruth(list.get(3) == 4);
    assertTruth(list.get(4) == 2);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    list.set(4, 5);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);
    assertTruth(list.get(2) == 3);
    assertTruth(list.get(3) == 4);
    assertTruth(list.get(4) == 5);

    assertError(() => list.get(-1));
    assertError(() => list.get(5));

    assertError(() => list.set(-1, 0));
    assertError(() => list.set(5, 6));

    list.rebalance();
    list.debugVerifyIntegrity();

    list = list.clone();
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 5);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 2);
    assertTruth(list.get(2) == 3);
    assertTruth(list.get(3) == 4);
    assertTruth(list.get(4) == 5);

    {
        let array = list.toArray();

        assertTruth(array.length == 5);

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1);
        }
    }

    {
        let array = new Array();

        list.doForEachItemInOrder(i => array.push(i));

        assertTruth(array.length == 5);

        for (let i = 0; i < array.length; ++i) {
            assertTruth(array[i] == i + 1);
        }
    }

    list.remove(1);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 4);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 3);
    assertTruth(list.get(2) == 4);
    assertTruth(list.get(3) == 5);

    assertError(() => list.get(-1));
    assertError(() => list.get(4));

    list.remove(3);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 3);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 3);
    assertTruth(list.get(2) == 4);

    assertError(() => list.get(-1));
    assertError(() => list.get(3));

    list.remove(2);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 2);

    assertTruth(list.get(0) == 1);
    assertTruth(list.get(1) == 3);

    assertError(() => list.get(-1));
    assertError(() => list.get(2));

    list.remove(0);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 1);

    assertTruth(list.get(0) == 3);

    assertError(() => list.get(-1));
    assertError(() => list.get(1));

    list.remove(0);
    list.debugVerifyIntegrity();

    assertTruth(list.getSize() == 0);

    assertError(() => list.get(-1));
    assertError(() => list.get(0));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let list = new RBTreeList();

    for (let i = 0; i < sizeOfTests; ++i) {
        list.add(i, i);
        list.debugVerifyIntegrity();
        assertTruth(list.getSize() == i + 1);
    }

    list = list.clone();

    list.rebalance();
    list.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(list.get(i) == i);
    }

    assertError(() => list.get(-1));
    assertError(() => list.get(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(list.get(0) == i);
        list.remove(0);
        list.debugVerifyIntegrity();
        assertTruth(list.getSize() == sizeOfTests - i - 1);
    }

    list.rebalance();
    list.debugVerifyIntegrity();
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let list = new RBTreeList();
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

    assertTruth(list.getSize() == ref.length);

    for (let i = 0; i < ref.length; ++i) {
        assertTruth(list.get(i) == ref[i]);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        let index = Math.floor(ref.length * Math.random());

        list.remove(index);
        ref.splice(index, 1);
    }

    assertTruth(list.getSize() == ref.length);

    for (let i = 0; i < ref.length; ++i) {
        assertTruth(list.get(i) == ref[i]);
    }
}

