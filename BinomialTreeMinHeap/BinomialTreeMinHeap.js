
import * as comparators from "../comparators/comparators.js";


export class BinomialTreeMinHeap {

    _first = null;
    _comparator = new comparators.UniversalComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
    }


    _merge_node_list(list) {
        let p = [this._first, list].filter((node) => node != null);

        let first = null;
        let end = null;

        while (p.length >= 2) {
            p.sort((a, b) => a.size - b.size);

            if (p[0].size == p[1].size) {
                if (this._comparator.compare(p[0].item, p[1].item) > 0) {
                    let temp = p[0];

                    p[0] = p[1];
                    p[1] = temp;
                }

                if (p[0].end == null) {
                    p[0].first = p[1];
                    p[0].end = p[0].first;
                } 
                else {
                    p[0].end.next = p[1];
                    p[0].end = p[0].end.next;
                }

                p[0].size = p[0].size + p[1].size;

                p.push(p[0].next);
                p[0].next = null;

                {
                    let temp = p[1];

                    p[1] = p[1].next;
                    temp.next = null;
                }
            } 
            else {
                if (end == null) {
                    first = p[0];
                    end = first;
                } 
                else {
                    end.next = p[0];
                    end = end.next;
                }

                p[0] = p[0].next;
                //temp.next = null;
            }

            p = p.filter((node) => node != null);
        }

        if (p.length == 1) {
            if (end == null) {
                first = p[0];
                end = first;
            } 
            else {
                end.next = p[0];
            }
        } 
        else if (end != null) {
            end.next = null;
        }

        this._first = first;
    }


    merge(binomial_tree_min_heap) {
        if (!(binomial_tree_min_heap instanceof BinomialTreeMinHeap)) {
            throw new Error("the argument to merge must be an instance of a BinomialTreeMinHeap.");
        }

        this._merge_node_list(binomial_tree_min_heap._first);
        binomial_tree_min_heap._first = null;
    }


    enqueue(item) {
        this._merge_node_list({
            item: item, 

            first: null, 
            end: null, 

            next: null, 

            size: 1
        });
    }


    dequeue() {
        if (this._first == null) {
            throw new Error("the heap is empty.");
        }


        let p = this._first;
        let prev = null;

        let p_min = p;
        let p_min_prev = null;

        while (p != null) {
            if (this._comparator.compare(p.item, p_min.item) < 0) {
                p_min = p;
                p_min_prev = prev;
            }

            prev = p;
            p = p.next;
        }

        if (p_min_prev == null) { // p_min == this._first
            this._first = p_min.next;

            this._merge_node_list(p_min.first);
        } 
        else {
            p_min_prev.next = p_min.next;

            this._merge_node_list(p_min.first);
        }

        return p_min.item;
    }


    peek() {
        if (this._first == null) {
            throw new Error("the heap is empty.");
        }


        let p = this._first;
        let min = p.item;

        while (p != null) {
            if (this._comparator.compare(p.item, min) < 0) {
                min = p.item;
            }

            p = p.next;
        }

        return min;
    }


    get_size() {
        let p = this._first;
        let size = 0;

        while (p != null) {
            size = size + p.size;
            p = p.next;
        }

        return size;
    }
}

