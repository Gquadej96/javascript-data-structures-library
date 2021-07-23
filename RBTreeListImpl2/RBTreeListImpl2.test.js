/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue, assertThrows} from "../testUtils/testUtils.js";
import {RBTreeListImpl2} from "./RBTreeListImpl2.js";



export function testOverallMethods1() {
    let list = new RBTreeListImpl2();

    list.debugVerifyIntegrity();
    assertTrue(list.getSize() == 0);

    list.rebalance();
    list.debugVerifyIntegrity();

    list.add(0, 1);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 1);

    assertTrue(list.get(0) == 1);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(1));

    list.add(1, 2);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 2);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(2));

    list.add(1, 3);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 3);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 3);
    assertTrue(list.get(2) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(3));

    list.add(0, 4);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 4);

    assertTrue(list.get(0) == 4);
    assertTrue(list.get(1) == 1);
    assertTrue(list.get(2) == 3);
    assertTrue(list.get(3) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(4));

    list.add(2, 5);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 4);
    assertTrue(list.get(1) == 1);
    assertTrue(list.get(2) == 5);
    assertTrue(list.get(3) == 3);
    assertTrue(list.get(4) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(0, 1);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 1);
    assertTrue(list.get(2) == 5);
    assertTrue(list.get(3) == 3);
    assertTrue(list.get(4) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(1, 2);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);
    assertTrue(list.get(2) == 5);
    assertTrue(list.get(3) == 3);
    assertTrue(list.get(4) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(2, 3);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);
    assertTrue(list.get(2) == 3);
    assertTrue(list.get(3) == 3);
    assertTrue(list.get(4) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(3, 4);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);
    assertTrue(list.get(2) == 3);
    assertTrue(list.get(3) == 4);
    assertTrue(list.get(4) == 2);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(4, 5);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);
    assertTrue(list.get(2) == 3);
    assertTrue(list.get(3) == 4);
    assertTrue(list.get(4) == 5);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    assertThrows(() => list.set(-1, 0));
    assertThrows(() => list.set(5, 6));

    list.rebalance();
    list.debugVerifyIntegrity();

    list = list.clone();
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 5);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 2);
    assertTrue(list.get(2) == 3);
    assertTrue(list.get(3) == 4);
    assertTrue(list.get(4) == 5);

    {
        let array = list.toArray();

        assertTrue(array.length == 5);

        for (let i = 0; i < array.length; ++i) {
            assertTrue(array[i] == i + 1);
        }
    }

    {
        let array = new Array();

        list.doForEachItemInOrder(i => array.push(i));

        assertTrue(array.length == 5);

        for (let i = 0; i < array.length; ++i) {
            assertTrue(array[i] == i + 1);
        }
    }

    list.remove(1);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 4);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 3);
    assertTrue(list.get(2) == 4);
    assertTrue(list.get(3) == 5);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(4));

    list.remove(3);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 3);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 3);
    assertTrue(list.get(2) == 4);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(3));

    list.remove(2);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 2);

    assertTrue(list.get(0) == 1);
    assertTrue(list.get(1) == 3);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(2));

    list.remove(0);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 1);

    assertTrue(list.get(0) == 3);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(1));

    list.remove(0);
    list.debugVerifyIntegrity();

    assertTrue(list.getSize() == 0);

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(0));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let list = new RBTreeListImpl2();

    for (let i = 0; i < sizeOfTests; ++i) {
        list.add(i, i);
        list.debugVerifyIntegrity();

        assertTrue(list.getSize() == i + 1);
    }

    list = list.clone();

    list.rebalance();
    list.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(list.get(i) == i);
    }

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTrue(list.get(0) == i);
        list.remove(0);
        list.debugVerifyIntegrity();
        assertTrue(list.getSize() == sizeOfTests - i - 1);
    }

    list.rebalance();
    list.debugVerifyIntegrity();
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let list = new RBTreeListImpl2();
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

    assertTrue(list.getSize() == ref.length);

    for (let i = 0; i < ref.length; ++i) {
        assertTrue(list.get(i) == ref[i]);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        let index = Math.floor(ref.length * Math.random());

        list.remove(index);
        ref.splice(index, 1);
    }

    assertTrue(list.getSize() == ref.length);

    for (let i = 0; i < ref.length; ++i) {
        assertTrue(list.get(i) == ref[i]);
    }
}

