/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTrue} from "../testUtils/testUtils.js";
import * as comparators from "./comparators.js";
import {RBTreeSet} from "../RBTreeSet/RBTreeSet.js";


export function testObjectReferenceComparator() {
    let comparator = new comparators.ObjectReferenceComparator();
    let objects = [new Object(), new Object(), new Object()];
    let c0c1 = comparator.compare(objects[0], objects[1]);
    let c0c2 = comparator.compare(objects[0], objects[2]);
    let c1c2 = comparator.compare(objects[1], objects[2]);

    assertTrue(c0c1 == comparator.compare(objects[0], objects[1]));
    assertTrue(c0c2 == comparator.compare(objects[0], objects[2]));
    assertTrue(c1c2 == comparator.compare(objects[1], objects[2]));
    
    assertTrue(c0c1 == -comparator.compare(objects[1], objects[0]));
    assertTrue(c0c2 == -comparator.compare(objects[2], objects[0]));
    assertTrue(c1c2 == -comparator.compare(objects[2], objects[1]));
}


export function testArrayElementComparator1() {
    let comparator = new comparators.ArrayElementComparator();

    assertTrue(comparator.compare([1], [1]) == 0);
    assertTrue(comparator.compare([1], [2]) < 0);
    assertTrue(comparator.compare([1], [0]) > 0);

    assertTrue(comparator.compare([1, 1], [1, 1]) == 0);
    assertTrue(comparator.compare([1], [1, 1]) < 0);
    assertTrue(comparator.compare([1, 1], [1]) > 0);

    assertTrue(comparator.compare([2, 1], [1, 1]) > 0);
    assertTrue(comparator.compare([2], [1, 1]) > 0);
    assertTrue(comparator.compare([1, 2], [1, 1]) > 0);
}


export function testArrayElementComparator2() {
    let maxNumOfTrials = 1000;
    let maxSizeOfElements = 1000;
    let maxArrayLength = 100;

    let set = new RBTreeSet(new comparators.ArrayElementComparator());

    for (let i = 0; i < maxNumOfTrials; ++i) {
        let length = Math.floor(maxArrayLength * Math.random()) + 1;
        let array = new Array();

        for (let j = 0; j < length; ++j) {
            array.push(Math.floor(maxSizeOfElements * Math.random()));
        }

        set.add(array);
    }

    set.debugVerifyIntegrity();
}


export function testStringComparator() {
    let comparator = new comparators.StringComparator();

    assertTrue(comparator.compare("a", "a") == 0);
    assertTrue(comparator.compare("a", "b") < 0);
    assertTrue(comparator.compare("b", "a") > 0);

    assertTrue(comparator.compare("aa", "a") > 0);
    assertTrue(comparator.compare("aa", "aa") == 0);
    assertTrue(comparator.compare("aa", "b") < 0);

    assertTrue(comparator.compare("b", "ab") > 0);
    assertTrue(comparator.compare("a", "abc") < 0);
    assertTrue(comparator.compare("b", "abc") > 0);
}


export function testObjectFieldComparator1() {
    let comparator = new comparators.ObjectFieldComparator();

    assertTrue(comparator.compare({a: 1, b: 2}, {a: 1, b: 2}) == 0);
    assertTrue(comparator.compare({a: 1, b: 2}, {a: 1, b: 2, c: 3}) < 0);
    assertTrue(comparator.compare({a: 1, b: 2, c: 3}, {a: 1, b: 2}) > 0);

    assertTrue(comparator.compare({a: 2, b: 2}, {a: 1, b: 3}) > 0);
    assertTrue(comparator.compare({a: 2, b: 2}, {a: 1, b: 2, c: 3}) > 0);
    assertTrue(comparator.compare({a: 1, b: 3}, {a: 1, b: 2}) > 0);
}


export function testObjectFieldComparator2() {
    let maxNumOfTrials = 1000;
    let maxSizeOfElements = 1000;
    let maxNumOfProperties = 100;
    let set = new RBTreeSet(new comparators.ObjectFieldComparator());

    for (let i = 0; i < maxNumOfTrials; ++i) {
        let length = Math.floor(maxNumOfProperties * Math.random()) + 1;
        let map = {};

        for (let j = 0; j < length; ++j) {
            map[new Number(Math.floor(maxSizeOfElements * Math.random())).toString()] = (Math.floor(maxSizeOfElements * Math.random()));
        }

        set.add(map);
    }

    set.debugVerifyIntegrity();
}
