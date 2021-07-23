/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertEquals, assertThrows} from "../testUtils/testUtils.js";
import {ABTreeList} from "./ABTreeList.js";


export function testOverallMethods1() {
    let list = new ABTreeList(2, 3);

    list.debugVerifyIntegrity();
    assertEquals(0, list.getSize());

    list.rebalance();
    list.debugVerifyIntegrity();

    list.add(0, 1);
    list.debugVerifyIntegrity();

    assertEquals(1, list.getSize());

    assertEquals(1, list.get(0));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(1));

    list.add(1, 2);
    list.debugVerifyIntegrity();

    assertEquals(2, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(2));

    list.add(1, 3);
    list.debugVerifyIntegrity();

    assertEquals(3, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(3, list.get(1));
    assertEquals(2, list.get(2));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(3));

    list.add(0, 4);
    list.debugVerifyIntegrity();

    assertEquals(4, list.getSize());

    assertEquals(4, list.get(0));
    assertEquals(1, list.get(1));
    assertEquals(3, list.get(2));
    assertEquals(2, list.get(3));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(4));

    list.add(2, 5);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(4, list.get(0));
    assertEquals(1, list.get(1));
    assertEquals(5, list.get(2));
    assertEquals(3, list.get(3));
    assertEquals(2, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(0, 1);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(1, list.get(1));
    assertEquals(5, list.get(2));
    assertEquals(3, list.get(3));
    assertEquals(2, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(1, 2);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));
    assertEquals(5, list.get(2));
    assertEquals(3, list.get(3));
    assertEquals(2, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(2, 3);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));
    assertEquals(3, list.get(2));
    assertEquals(3, list.get(3));
    assertEquals(2, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(3, 4);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));
    assertEquals(3, list.get(2));
    assertEquals(4, list.get(3));
    assertEquals(2, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    list.set(4, 5);
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));
    assertEquals(3, list.get(2));
    assertEquals(4, list.get(3));
    assertEquals(5, list.get(4));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(5));

    assertThrows(() => list.set(-1, 0));
    assertThrows(() => list.set(5, 6));

    list.rebalance();
    list.debugVerifyIntegrity();
    

    list = list.clone();
    list.debugVerifyIntegrity();

    assertEquals(5, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(2, list.get(1));
    assertEquals(3, list.get(2));
    assertEquals(4, list.get(3));
    assertEquals(5, list.get(4));

    {
        let array = list.toArray();

        assertEquals(5, array.length);

        for (let i = 0; i < array.length; ++i) {
            assertEquals(i + 1, array[i]);
        }
    }

    {
        let array = new Array();

        list.doForEachItemInOrder(i => array.push(i));

        assertEquals(5, array.length);

        for (let i = 0; i < array.length; ++i) {
            assertEquals(i + 1, array[i]);
        }
    }

    list.remove(1);
    list.debugVerifyIntegrity();

    assertEquals(4, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(3, list.get(1));
    assertEquals(4, list.get(2));
    assertEquals(5, list.get(3));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(4));

    list.remove(3);
    list.debugVerifyIntegrity();

    assertEquals(3, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(3, list.get(1));
    assertEquals(4, list.get(2));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(3));

    list.remove(2);
    list.debugVerifyIntegrity();

    assertEquals(2, list.getSize());

    assertEquals(1, list.get(0));
    assertEquals(3, list.get(1));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(2));

    list.remove(0);
    list.debugVerifyIntegrity();

    assertEquals(1, list.getSize());

    assertEquals(3, list.get(0));

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(1));


    list.remove(0);
    list.debugVerifyIntegrity();

    assertEquals(0, list.getSize());

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(0));
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let list = new ABTreeList(2, 3);

    for (let i = 0; i < sizeOfTests; ++i) {
        list.add(i, i);
        list.debugVerifyIntegrity();

        assertEquals(i + 1, list.getSize());
    }

    list = list.clone();

    list.rebalance();
    list.debugVerifyIntegrity();

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, list.get(i));
    }

    assertThrows(() => list.get(-1));
    assertThrows(() => list.get(sizeOfTests));

    for (let i = 0; i < sizeOfTests; ++i) {
        assertEquals(i, list.get(0));
        list.remove(0);
        list.debugVerifyIntegrity();
        assertEquals(sizeOfTests - i - 1, list.getSize());
    }

    list.rebalance();
    list.debugVerifyIntegrity();
}


export function testOverallMethods3() {
    let sizeOfTests = 1000;
    let list = new ABTreeList(2, 3);
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

    assertEquals(ref.length, list.getSize());

    for (let i = 0; i < ref.length; ++i) {
        assertEquals(ref[i], list.get(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        let index = Math.floor(ref.length * Math.random());

        list.remove(index);
        ref.splice(index, 1);
    }

    assertEquals(ref.length, list.getSize());

    for (let i = 0; i < ref.length; ++i) {
        assertEquals(ref[i], list.get(i));
    }
}

