/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class LinkedList {

    _first = null;
    _size = 0;


    constructor() {

    }


    add(index, item) {
        if (index < 0 || index > this._size) {
            throw new Error("the index is out of bounds in the list.");
        }

        if (index == 0) {
            this._first = {
                item: item, 
                next: this._first
            };
        } else {
            let p = this._first;

            for (let i = 1; i < index; ++i) {
                p = p.next;
            }

            p.next = {
                item: item, 
                next: p.next
            };
        }

        this._size = this._size + 1;
    }


    remove(index) {
        if (index < 0 || index >= this._size) {
            throw new Error("the index is out of bounds in the list.");
        }

        if (index == 0) {
            this._first = this._first.next;
        } else {
            let p = this._first;

            for (let i = 1; i < index; ++i) {
                p = p.next;
            }

            p.next = p.next.next;
        }

        this._size = this._size - 1;
    }


    get(index) {
        if (index < 0 || index >= this._size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._first;

        for (let i = 0; i < index; ++i) {
            p = p.next;
        }

        return p.item;
    }


    set(index, item) {
        if (index < 0 || index >= this._size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._first;

        for (let i = 0; i < index; ++i) {
            p = p.next;
        }

        p.item = item;
    }


    getSize() {
        return this._size;
    }


    doForEachItemInOrder(consumer) {
        let p = this._first;

        while (p != null) {
            consumer(p.item);
            p = p.next;
        }
    }


    rebalance() {
        // nothing to do (only here to satisfy interface).
    }


    toArray() {
        let p = this._first;
        let array = new Array();

        while (p != null) {
            array.push(p.item);
            p = p.next;
        }

        return array;
    }


    clone() {
        let p = this._first;

        let first = null;
        let end = null;

        if (p != null) {
            first = {
                item: p.item, 
                next: null
            };
            end = first;
            p = p.next;
        }

        while (p != null) {
            end.next = {
                item: p.item, 
                next: null
            };
            end = end.next;
            p = p.next;
        }


        let inst = new LinkedList();

        inst._first = first;
        inst._size = this._size;
        return inst;
    }


    debugVerifyIntegrity() {
        // verify the linked-list fields of the structure.

        {
            let p = this._first;

            if (p != null) {
                p = p.next;
            }

            while (p != null) {
                if (p == this._first) {
                    throw new Error("there is a cycle in the linked-list fields of the structure.");
                }

                p = p.next;
            }
        }


        // verify the "size" field of the structure.

        {
            let p = this._first;
            let size = 0;

            while (p != null) {
                size = size + 1;
                p = p.next;
            }

            if (this._size != size) {
                throw new Error("the \"size\" field of the structure does not match the size of the linked-list of the structure.");
            }
        }
    }


    debugDescribeItems() {
        let string = "(";

        this.doForEachItemInOrder(item => {
            string = string + "[" + item + "], ";
        });

        if (this.getSize() > 0) {
            string = string.substring(0, string.length - ", ".length);
        }

        string = string + ")";
        return string;
    }
}

