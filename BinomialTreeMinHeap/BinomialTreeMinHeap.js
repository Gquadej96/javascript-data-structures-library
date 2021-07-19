/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators/comparators.js";


export class BinomialTreeMinHeap {

    _first = null;
    _comparator = new comparators.UniversalComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
    }


    _mergeNodeList(list) {
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
                } else {
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
            } else {
                if (end == null) {
                    first = p[0];
                    end = first;
                } else {
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
            } else {
                end.next = p[0];
            }
        } else if (end != null) {
            end.next = null;
        }

        this._first = first;
    }


    merge(binomialTreeMinHeap) {
        if (!(binomialTreeMinHeap instanceof BinomialTreeMinHeap)) {
            throw new Error("the argument to merge must be an instance of a BinomialTreeMinHeap.");
        }

        this._mergeNodeList(binomialTreeMinHeap._first);
        binomialTreeMinHeap._first = null;
    }


    enqueue(item) {
        this._mergeNodeList({
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

        let pMin = p;
        let pMinPrev = null;

        while (p != null) {
            if (this._comparator.compare(p.item, pMin.item) < 0) {
                pMin = p;
                pMinPrev = prev;
            }

            prev = p;
            p = p.next;
        }

        if (pMinPrev == null) { // pMin == this._first
            this._first = pMin.next;

            this._mergeNodeList(pMin.first);
        } else {
            pMinPrev.next = pMin.next;

            this._mergeNodeList(pMin.first);
        }

        return pMin.item;
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


    getSize() {
        let p = this._first;
        let size = 0;

        while (p != null) {
            size = size + p.size;
            p = p.next;
        }

        return size;
    }


    clone() {
        function getInfoAndCloneSubtreeAndCloneSiblings(node) {
            let first = null;
            let end = null;

            if (node != null) {
                let info = getInfoAndCloneSubtreeAndCloneSiblings(node.first);

                first = {
                    item: node.item, 
                    first: info.first, 
                    end: info.end, 
                    next: null, 
                    size: node.size
                };
                end = first;
                node = node.next;
            }

            while (node != null) {
                let info = getInfoAndCloneSubtreeAndCloneSiblings(node.first);

                end.next = {
                    item: node.item, 
                    first: info.first, 
                    end: info.end, 
                    next: null, 
                    size: node.size
                };
                end = end.next;
                node = node.next;
            }

            return {
                first: first, 
                end: end
            };
        }

        let inst = new BinomialTreeMinHeap(this._comparator);
        let info = getInfoAndCloneSubtreeAndCloneSiblings(this._first);

        inst._first = info.first;
        return inst;
    }


    debugVerifyIntegrity() {
        // verify the linked-list attributes of each node.

        {
            function getEndAndVerifySubtreeAndVerifySiblings(node) {
                let prev = null;

                if (node != null) {
                    let end = getEndAndVerifySubtreeAndVerifySiblings(node.first);

                    if (node.end != end) {
                        throw new Error("the \"end\" attribute of a node does not contain the end of the linked-list at its node.");
                    }

                    prev = node;
                    node = node.next;
                }

                let first = prev;

                while (node != null) {
                    if (node == first) {
                        throw new Error("there is a cycle in the linked-list attributes of a node.");
                    }

                    let end = getEndAndVerifySubtreeAndVerifySiblings(node.first);

                    if (node.end != end) {
                        throw new Error("the \"end\" attribute of a node does not contain the end of the linked-list at its node.");
                    }

                    prev = node;
                    node = node.next;
                }

                return prev;
            }

            getEndAndVerifySubtreeAndVerifySiblings(this._first);
        }


        // verify the "size" attribute of each node.

        {
            let stack = new Array();
            let p = this._first;

            while (p != null) {
                do {
                    stack.push(p);
                    p = p.first;
                } while (p != null);

                p = stack.pop();

                if (p.size != 1) {
                    throw new Error("the \"size\" attribute of a node does not match the size of its subtree.");
                }

                p = p.next;
            }

            while (stack.length > 0) {
                p = stack.pop();

                {
                    let q = p.first;
                    let size = 1;

                    while (q != null) {
                        size = size + q.size;
                        q = q.next;
                    }

                    if (size != p.size) {
                        throw new Error("the size attribute of a node does not match the size of its subtree.");
                    }
                }

                p = p.next;

                while (p != null) {
                    stack.push(p);
                    p = p.first;
                }
            }
        }


        // verify the heap tree property.

        {
            let self = this;

            function verifySubtreeAndVerifySiblings(node) {
                while (node != null) {
                    let p = node.first;

                    while (p != null) {
                        if (!(self._comparator.compare(p.item, node.item) >= 0)) {
                            throw new Error("the heap tree property is not satisfied.");
                        }

                        p = p.next;
                    }

                    verifySubtreeAndVerifySiblings(node.first);
                    node = node.next;
                }
            }

            verifySubtreeAndVerifySiblings(this._first);
        }
    }
}

