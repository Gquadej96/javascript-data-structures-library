/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import {RBTreeSetImpl1} from "../RBTreeSetImpl1/RBTreeSetImpl1.js";
import * as comparators from "../comparators/comparators.js";


export class RBTreeMapImpl1 {

    _entries = null;
    _keyComparator = new comparators.UniversalComparator();


    constructor(keyComparator) {
        keyComparator = keyComparator || this._keyComparator;
        this._keyComparator = keyComparator;

        this._entries = new RBTreeSetImpl1(
            new class {
                compare(a, b) {
                    return keyComparator.compare(a.key, b.key);
                }
            }
        );
    }


    set(key, value) {
        if (value != null) {
            let entry = this._entries.getLeastUpperBoundItem({key: key, value: undefined});

            if (entry == null || this._keyComparator.compare(key, entry.key) != 0) {
                this._entries.add({key: key, value: value});
                return;
            }

            entry.value = value;
        } else {
            this._entries.remove({key: key, value: undefined});
        }
    }


    get(key) {
        let entry = this._entries.getLeastUpperBoundItem({key: key, value: undefined});

        if (entry == null || this._keyComparator.compare(key, entry.key) != 0) {
            throw new Error("the item does not exist in the map.");
        }

        return entry.value;
    }


    has(key) {
        return this._entries.has({key: key, value: undefined});
    }


    getSize() {
        return this._entries.getSize();
    }


    getRankOfKey(key) {
        return this._entries.getRankOfItem({key: key, value: undefined});
    }


    getKeyByRank(rank) {
        return this._entries.getItemByRank(rank).key;
    }


    doForEachEntryInOrder(consumer) {
        this._entries.doForEachItemInOrder(item => {consumer(item.key, item.value);});
    }


    rebalance() {
        this._entries.rebalance();
    }


    toArray() {
        return this._entries.toArray().map(v => {return {key: v.key, value: v.value};});
    }


    clone() {
        let inst = new RBTreeMapImpl1(this._keyComparator);

        inst._entries = this._entries.clone();
        return inst;
    }


    debugVerifyIntegrity() {
        this._entries.debugVerifyIntegrity();
    }


    debugDescribeItems() {
        let string = "{";

        this.doForEachItemInOrder((key, value) => {
            string = string + "([" + key + "] = [" + value + "]), ";
        });

        if (this.getSize() > 0) {
            string = string.substring(0, string.length - ", ".length);
        }

        string = string + "}";
        return string;
    }
}

