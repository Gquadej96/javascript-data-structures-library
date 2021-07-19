/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators/comparators.js";


export class AVLTreeSet {

    _root = {value: null};
    _comparator = new comparators.UniversalComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
    }


    _updateLocalFields(node) {
        let size = 1;

        if (node.left.value != null) {
            size = size + node.left.value.size;
        }
    
        if (node.right.value != null) {
            size = size + node.right.value.size;
        }

        node.size = size;
    }


    _rotateSubtreeLeft(ref) {
        let root = ref.value;

        ref.value = root.left.value;
        root.left.value = ref.value.right.value;
        ref.value.right.value = root;
    }


    _rotateSubtreeRight(ref) {
        let root = ref.value;

        ref.value = root.right.value;
        root.right.value = ref.value.left.value;
        ref.value.left.value = root;
    }


    add(item) {
        let stack = new Array();
        let p = this._root;

        while (p.value != null) {
            stack.push(p);

            let res = this._comparator.compare(item, p.value.item);

            if (res == 0) {
                //throw new Error("the item already exists in the set.");
                return;
            } else if (res < 0) {
                p = p.value.left;
            } else { // res > 0
                p = p.value.right;
            }
        }


        p.value = {
            left: {value: null}, 
            right: {value: null}, 
            bias: 0, 
            item: item, 
            size: 1
        };
        //this._updateLocalFields(p.value);


        while (stack.length > 0) {
            let parent = stack.pop();

            if (p == parent.value.left) {
                if (parent.value.bias == 0) {
                    parent.value.bias = -1;

                    this._updateLocalFields(parent.value);
                    p = parent;
                } else if (parent.value.bias < 0) {
                    if (p.value.bias == 0) { // should never happen.
                        this._rotateSubtreeLeft(parent);

                        parent.value.right.value.bias = -1;
                        parent.value.bias = 1;

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    } else if (p.value.bias < 0) {
                        this._rotateSubtreeLeft(parent);

                        parent.value.right.value.bias = 0;
                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    } else { // p.value.bias > 0
                        this._rotateSubtreeRight(p);
                        this._rotateSubtreeLeft(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    }
                } else { // parent.value.bias > 0
                    parent.value.bias = 0;

                    this._updateLocalFields(parent.value);
                    p = parent;
                    break;
                }
            } else { // p == parent.value.right
                if (parent.value.bias == 0) {
                    parent.value.bias = 1;

                    this._updateLocalFields(parent.value);
                    p = parent;
                } else if (parent.value.bias < 0) {
                    parent.value.bias = 0;

                    this._updateLocalFields(parent.value);
                    p = parent;
                    break;
                } else { // parent.value.bias > 0
                    if (p.value.bias == 0) { // should never happen.
                        this._rotateSubtreeRight(parent);

                        parent.value.left.value.bias = 1;
                        parent.value.bias = -1;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    } else if (p.value.bias < 0) {
                        this._rotateSubtreeLeft(p);
                        this._rotateSubtreeRight(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    } else { // p.value.bias > 0
                        this._rotateSubtreeRight(parent);

                        parent.value.left.value.bias = 0;
                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    }
                }
            }
        }

        while (stack.length > 0) {
            p = stack.pop();

            this._updateLocalFields(p.value);
        }
    }


    remove(item) {
        let stack = new Array();
        let p = this._root;

        while (true) {
            if (p.value == null) {
                //throw new Error("the item does not exist in the set.");
                return;
            }

            stack.push(p);

            let res = this._comparator.compare(item, p.value.item);

            if (res == 0) {
                break;
            } else if (res < 0) {
                p = p.value.left;
            } else { // res > 0
                p = p.value.right;
            }
        }

        if (p.value == null) {
            //throw new Error("the item does not exist in the set.");
            return;
        }

        let target;

        {
            let successor = p.value;
            let replacement;

            if (p.value.left.value != null) {
                p = p.value.left;

                do {
                    stack.push(p);
                    p = p.value.right;
                } 
                while (p.value != null);

                p = stack.pop();

                replacement = p.value.left.value;
            } else {
                p = stack.pop(); // p = p
                replacement = p.value.right.value;
            }

            target = p.value;
            p.value = replacement;

            successor.item = target.item;
        }

        while (stack.length > 0) {
            let parent = stack.pop();

            if (p == parent.value.left) {
                if (parent.value.bias == 0) {
                    parent.value.bias = 1;

                    this._updateLocalFields(parent.value);
                    p = parent;
                    break;
                } else if (parent.value.bias < 0) {
                    parent.value.bias = 0;

                    this._updateLocalFields(parent.value);
                    p = parent;
                } else { // parent.value.bias > 0
                    p = parent.value.right;

                    if (p.value.bias == 0) {
                        this._rotateSubtreeRight(parent);

                        parent.value.left.value.bias = 1;
                        parent.value.bias = -1;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    } else if (p.value.bias < 0) {
                        this._rotateSubtreeLeft(p);
                        this._rotateSubtreeRight(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    } else { // p.value.bias > 0
                        this._rotateSubtreeRight(parent);

                        parent.value.left.value.bias = 0;
                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    }
                }
            } else { // p == parent.value.right;
                if (parent.value.bias == 0) {
                    parent.value.bias = -1;

                    this._updateLocalFields(parent.value);
                    p = parent;
                    break;
                } else if (parent.value.bias < 0) {
                    p = parent.value.left;

                    if (p.value.bias == 0) {
                        this._rotateSubtreeLeft(parent);

                        parent.value.right.value.bias = -1;
                        parent.value.bias = 1;

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                        break;
                    }  else if (p.value.bias < 0) {
                        this._rotateSubtreeLeft(parent);

                        parent.value.right.value.bias = 0;
                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    }  else { // p.value.bias > 0
                        this._rotateSubtreeRight(p);
                        this._rotateSubtreeLeft(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        p = parent;
                    }
                } else { // parent.value.bias > 0
                    parent.value.bias = 0;

                    this._updateLocalFields(parent.value);
                    p = parent;
                }
            }
        }

        while (stack.length > 0) {
            p = stack.pop();

            this._updateLocalFields(p.value);
        }
    }


    has(item) {
        let p = this._root.value;

        while (p != null) {
            let res = this._comparator.compare(item, p.item);

            if (res == 0) {
                return true;
            } else if (res < 0) {
                p = p.left.value;
            } else {
                p = p.right.value;
            }
        }

        return false;
    }


    getSize() {
        if (this._root.value != null) {
            return this._root.value.size;
        } else {
            return 0;
        }
    }


    getRankOfItem(item) {
        let p = this._root.value;
        let rank = 0;

        while (p != null) {
            let res = this._comparator.compare(item, p.item);
            let leftSize = 0;

            if (p.left.value != null) {
                leftSize = p.left.value.size;
            }

            if (res == 0) {
                rank = rank + leftSize;
                return rank;
            } else if (res < 0) {
                p = p.left.value;
            } else { // res > 0
                rank = rank + leftSize + 1;
                p = p.right.value;
            }
        }

        //throw new Error("the item does not exist in the set.");
        return rank;
    }


    getItemByRank(rank) {
        if (rank < 0 || rank >= this.getSize()) {
            throw new Error("there is no item of this rank in the set.");
        }

        let p = this._root.value;

        while (true) {
            let leftSize = 0;

            if (p.left.value != null) {
                leftSize = p.left.value.size;
            }

            if (rank == leftSize) {
                return p.item;
            } else if (rank < leftSize) {
                p = p.left.value;
            } else { // rank > leftSize
                rank = rank - leftSize - 1;
                p = p.right.value;
            }
        }

        // not reachable.
    }


    getLeastUpperBoundItem(item) {
        let p = this._root.value;
        let upperBound = null;

        while (p != null) {
            let res = this._comparator.compare(item, p.item);

            if (res == 0) {
                upperBound = p.item;
                return upperBound;
            } else if (res < 0) {
                upperBound = p.item;
                p = p.left.value;
            } else { // res > 0
                p = p.right.value;
            }
        }

        return upperBound;
    }


    getGreatestLowerBoundItem(item) {
        let p = this._root.value;
        let lowerBound = null;

        while (p != null) {
            let res = this._comparator.compare(item, p.item);

            if (res == 0) {
                lowerBound = p.item;
                return lowerBound;
            } else if (res < 0) {
                p = p.left.value;
            } else { // res > 0
                lowerBound = p.item;
                p = p.right.value;
            }
        }

        return lowerBound;
    }


    doForEachItemInOrder(consumer) {
        let stack = new Array();
        let p = this._root.value;

        while (p != null) {
            stack.push(p);
            p = p.left.value;
        }

        while (stack.length > 0) {
            p = stack.pop();

            consumer(p.item);

            p = p.right.value;

            while (p != null) {
                stack.push(p);
                p = p.left.value;
            }
        }
    }
    
    
    rebalance() {
        let size = this.getSize();

        {
            let p = this._root;

            while (p.value != null) {
                if (p.value.left.value != null) {
                    this._rotateSubtreeLeft(p);
                } else {
                    p = p.value.right;
                }
            }

            p.value = { // a dummy node.
                left: {value: null}, 
                right: {value: null}, 
                bias: 0, 
                item: null, 
                size: 1
            };
            //this._updateLocalFields(p.value);
        }

        {
            let p = this._root.value;

            while (p != null) {
                p.bias = 0;
                p = p.right.value;
            }
        }

        {
            let numOfLeaves = size + 1 - 2 ** Math.floor(Math.log2(size + 1));
            let p = this._root;

            for (let i = 0; i < numOfLeaves; ++i) {
                this._rotateSubtreeRight(p);
                this._updateLocalFields(p.value.left.value);

                p.value.bias = 1;
                p = p.value.right;
            }
        }

        {
            let p = this._root;

            while (p.value.right.value != null) {
                do {
                    this._rotateSubtreeRight(p);
                    this._updateLocalFields(p.value.left.value);

                    let bias = p.value.left.value.bias;

                    p.value.left.value.bias = (p.value.bias + p.value.left.value.bias) % 2 * -1;
                    p.value.bias = bias;
                    p = p.value.right;
                } while (p.value != null /*&& p.value.right.value != null*/);

                p = this._root;
            }
        }

        this._root.value = this._root.value.left.value;
    }


    toArray() {
        let array = new Array();

        this.doForEachItemInOrder(item => array.push(item));
        return array;
    }
    

    clone() {
        function cloneSubtree(ref) {
            if (ref.value != null) {
                return {
                    value: {
                        left: cloneSubtree(ref.value.left), 
                        right: cloneSubtree(ref.value.right), 
                        bias: ref.value.bias, 
                        item: ref.value.item, 
                        size: ref.value.size
                    }
                };
            } else {
                return {value: null};
            }
        }

        let inst = new AVLTreeSet(this._comparator);

        inst._root = cloneSubtree(this._root);
        return inst;
    }


    debugVerifyIntegrity() {
        // verify the "bias" attribute of each node.

        {
            function getHeightAndVerifySubtree(node) {
                if (node == null) {
                    return 0;
                }

                let leftHeight = getHeightAndVerifySubtree(node.left.value);
                let rightHeight = getHeightAndVerifySubtree(node.right.value);

                let bias = rightHeight - leftHeight;

                if (bias != node.bias) {
                    throw new Error("the bias attribute of a node does not match the bias implied by the height of its subtrees.");
                }

                let height = Math.max(leftHeight, rightHeight);

                return height + 1;
            };

            getHeightAndVerifySubtree(this._root.value);
        }


        // verify the "size" attribute of each node.

        {
            function getSizeAndVerifySubtree(node) {
                if (node == null) {
                    return 0;
                }
                
                let size = getSizeAndVerifySubtree(node.left.value) + getSizeAndVerifySubtree(node.right.value) + 1;

                if (size != node.size) {
                    throw new Error("the size attribute of a node does not match the size of its subtree.");
                }

                return size;
            };

            getSizeAndVerifySubtree(this._root.value);
        }


        // verify the search tree property.

        {
            let stack = new Array();
            let prev = null;
            let p = this._root.value;

            if (p != null) {
                let q = p;

                while (q.right.value != null) {
                    q = q.right.value;
                }

                stack.push({p: p, upperBound: q.item});

                prev = p;
                p = p.left.value;
            }

            while (p != null) {
                stack.push({p: p, upperBound: prev.item});

                if (!(this._comparator.compare(p.item, prev.item) <= 0)) {
                    throw new Error("the search tree property is not satisfied.");
                }

                prev = p;
                p = p.left.value;
            }

            while (stack.length > 0) {
                let info = stack.pop();

                prev = null;
                p = info.p.right.value;

                if (p != null) {
                    stack.push({p: p, upperBound: info.upperBound});

                    prev = p;
                    p = p.left.value;
                } else {
                    if (!(this._comparator.compare(info.p.item, info.upperBound) <= 0)) {
                        throw new Error("the search tree property is not satisfied.");
                    }

                    break;
                }

                while (p != null) {
                    stack.push({p: p, upperBound: prev.item});

                    if (!(this._comparator.compare(p.item, prev.item) <= 0)) {
                        throw new Error("the search tree property is not satisfied.");
                    }

                    prev = p;
                    p = p.left.value;
                }

                if (!(this._comparator.compare(info.p.item, prev.item) <= 0)) {
                    throw new Error("the search tree property is not satisfied.");
                }
            }
        }
    }


    debugDescribeItems() {
        let string = "{";

        this.doForEachItemInOrder(item => {
            string = string + "[" + item + "], ";
        });

        if (this.getSize() > 0) {
            string = string.substring(0, string.length - ", ".length);
        }

        string = string + "}";
        return string;
    }
}

