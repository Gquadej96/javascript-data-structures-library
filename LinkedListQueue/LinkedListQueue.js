/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class LinkedListQueue {

    _first = null;
    _end = null;
    _size = 0;


    constructor() {

    }


    enqueue(item) {
        if (this._end == null) {
            this._first = {
                item: item, 

                next: null
            };
            this._end = this._first;
        } 
        else {
            this._end.next = {
                item: item, 

                next: null
            };
            this._end = this._end.next;
        }

        this._size = this._size + 1;
    }


    dequeue() {
        if (this._first == null) {
            throw new Error("the queue is empty.");
        }

        
        let item = this._first.item;

        this._first = this._first.next;

        if (this._first == null) {
            this._end = null;
        }

        this._size = this._size - 1;

        return item;
    }


    peek() {
        if (this._first == null) {
            throw new Error("the queue is empty.");
        }

        return this._first.item;
    }


    get_size() {
        return this._size;
    }


    to_array() {
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


        let inst = new LinkedListQueue();

        inst._first = first;
        inst._end = end;
        inst._size = this._size;

        return inst;
    }


    debug_verify_integrity() {
        // verify the linked-list fields of the structure.

        {
            let p = this._first;
            let prev = null;

            if (p != null) {
                prev = p;
                p = p.next;
            }

            while (p != null) {
                if (p == this._first) {
                    throw new Error("there is a cycle in the linked-list fields of the structure.");
                }

                prev = p;
                p = p.next;
            }

            if (this._end != prev) {
                throw new Error("the \"end\" field of the structure does not contain the end of the linked-list of the structure.");
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


    debug_describe_items() {
        let p = this._first;

        let string = "(";

        if (p != null) {
            string = string + "[" + p.item + "]";
            p = p.next;
        }

        while (p != null) {
            string = string + ", [" + p.item + "]";
            p = p.next;
        }

        string = string + ")";

        return string;
    }
}

