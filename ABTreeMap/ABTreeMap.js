/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import {ABTreeSet} from "../ABTreeSet/ABTreeSet.js";
import * as comparators from "../comparators/comparators.js";


export class ABTreeMap {

    _entries = null;
    _key_comparator = new comparators.UniversalComparator();


    constructor(A, B, key_comparator) {
        key_comparator = key_comparator || this._key_comparator;
        this._key_comparator = key_comparator;

        A = A || 2;
        B = B || 3;

        this._entries = new ABTreeSet(A, B, new class {
            compare(a, b) {
                return key_comparator.compare(a.key, b.key);
            }
        });
    }


    set(key, value) {
        if (value != null) {
            let entry = this._entries.get_LUB({key: key, value: undefined});

            if (entry == null 
                || this._key_comparator.compare(key, entry.key) != 0) {
                
                this._entries.add({key: key, value: value});
                return;
            }

            entry.value = value;
        } 
        else {
            this._entries.remove({key: key, value: undefined});
        }
    }


    get(key) {
        let entry = this._entries.get_LUB({key: key, value: undefined});

        if (entry == null 
            || this._key_comparator.compare(key, entry.key) != 0) {
            
            throw new Error("the item does not exist in the map.");
        }

        return entry.value;
    }


    has(key) {
        return this._entries.has({key: key, value: undefined});
    }


    get_size() {
        return this._entries.get_size();
    }


    get_rank_of_key(key) {
        return this._entries.get_rank_of_item({key: key, value: undefined});
    }


    get_key_by_rank(rank) {
        return this._entries.get_item_by_rank(rank).key;
    }


    do_for_each_entry_in_order(consumer) {
        this._entries.do_for_each_item_in_order((item) => {consumer(item.key, item.value);});
    }


    rebalance() {
        this._entries.rebalance();
    }


    to_array() {
        return this._entries.to_array().map((v) => {return {key: v.key, value: v.value};});
    }


    clone() {
        let inst = new ABTreeMap(this._A, this._B, this._key_comparator);

        inst._entries = this._entries.clone();

        return inst;
    }


    debug_verify_integrity() {
        this._entries.debug_verify_integrity();
    }


    debug_describe_items() {
        let string = "{";

        this.do_for_each_item_in_order(
        (key, value) => {
            string = string + "([" + key + "] = [" + value + "]), ";
        });

        if (this.get_size() > 0) {
            string = string.substring(0, string.length - ", ".length);
        }

        string = string + "}";

        return string;
    }
}