/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators.js";
import {RBTreeSet} from "../../RBTreeSet/RBTreeSet.js";


function assertTruth(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}


// test set #1 for "ArrayElementComparator".

{
    let comparator = new comparators.ArrayElementComparator();

    assertTruth(comparator.compare([1], [1]) == 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([1], [2]) < 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([1], [0]) > 0, "unexpected relation between elements.");

    assertTruth(comparator.compare([1, 1], [1, 1]) == 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([1], [1, 1]) < 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([1, 1], [1]) > 0, "unexpected relation between elements.");

    assertTruth(comparator.compare([2, 1], [1, 1]) > 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([2], [1, 1]) > 0, "unexpected relation between elements.");
    assertTruth(comparator.compare([1, 2], [1, 1]) > 0, "unexpected relation between elements.");
}


// test set #2 for "ArrayElementComparator".

{
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


// test set #1 for "StringComparator".

{
    let comparator = new comparators.StringComparator();

    assertTruth(comparator.compare("a", "a") == 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("a", "b") < 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("b", "a") > 0, "unexpected relation between strings.");

    assertTruth(comparator.compare("aa", "a") > 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("aa", "aa") == 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("aa", "b") < 0, "unexpected relation between strings.");

    assertTruth(comparator.compare("b", "ab") > 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("a", "abc") < 0, "unexpected relation between strings.");
    assertTruth(comparator.compare("b", "abc") > 0, "unexpected relation between strings.");
}


// test set #1 for "ObjectFieldComparator".

{
    let comparator = new comparators.ObjectFieldComparator();

    assertTruth(comparator.compare({a: 1, b: 2}, {a: 1, b: 2}) == 0, "unexpected relation between elements.");
    assertTruth(comparator.compare({a: 1, b: 2}, {a: 1, b: 2, c: 3}) < 0, "unexpected relation between elements.");
    assertTruth(comparator.compare({a: 1, b: 2, c: 3}, {a: 1, b: 2}) > 0, "unexpected relation between elements.");

    assertTruth(comparator.compare({a: 2, b: 2}, {a: 1, b: 3}) > 0, "unexpected relation between elements.");
    assertTruth(comparator.compare({a: 2, b: 2}, {a: 1, b: 2, c: 3}) > 0, "unexpected relation between elements.");
    assertTruth(comparator.compare({a: 1, b: 3}, {a: 1, b: 2}) > 0, "unexpected relation between elements.");
}


// test set #2 for "ObjectFieldComparator".

{
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

