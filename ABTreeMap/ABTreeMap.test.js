/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {assertTruth} from "../testUtils/testUtils.js";
import {ABTreeMap} from "./ABTreeMap.js";


export function testOverallMethods1() {
    let map = new ABTreeMap(2, 3);

    assertTruth(map.getSize() == 0);

    map.set(1, 2);

    assertTruth(map.has(1));
    assertTruth(map.get(1) == 2);
    assertTruth(map.getSize() == 1);
    
    map.set(1, 3);

    assertTruth(map.has(1));
    assertTruth(map.get(1) == 3);
    assertTruth(map.getSize() == 1);
    assertTruth(map.getRankOfKey(1) == 0);

    map.set(2, 4);

    assertTruth(map.has(2));
    assertTruth(map.get(2) == 4);
    assertTruth(map.getSize() == 2);
    assertTruth(map.getRankOfKey(2) == 1);

    assertTruth(map.getKeyByRank(0) == 1);
    assertTruth(map.getKeyByRank(1) == 2);
}


export function testOverallMethods2() {
    let sizeOfTests = 1000;
    let map = new ABTreeMap(2, 3);

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, i + 1);
        assertTruth(map.getSize() == i + 1);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.has(i));
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.get(i) == i + 1);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.getKeyByRank(i) == i);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        assertTruth(map.getRankOfKey(i) == i);
    }

    for (let i = 0; i < sizeOfTests; ++i) {
        map.set(i, null);
        assertTruth(!map.has(i))
        assertTruth(map.getSize() == sizeOfTests - i - 1);
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertTruth(map.getSize() == sizeOfTests - i);
    }

    for (let i = 0; i < Math.floor(sizeOfTests / 2); ++i) {
        map.set(i, null);
        assertTruth(map.getSize() == sizeOfTests - i - 1);
    }

    for (let i = Math.floor(sizeOfTests / 2) - 1; i >= 0; --i) {
        map.set(i, i + 1);
        assertTruth(map.getSize() == sizeOfTests - i);
    }

    for (let i = sizeOfTests - 1; i >= 0; --i) {
        map.set(i, null);
        assertTruth(map.getSize() == i);
    }
}
