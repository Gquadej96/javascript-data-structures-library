/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators/comparators.js";


export class BinaryTreeMinHeap {

    _root = null;
    _end = null;
    _size = 0;
    _comparator = new comparators.UniversalComparator();


    constructor(comparator) {
        this._comparator = comparator || this._comparator;
    }


    enqueue(item) {
        if (this._end == null) {
            this._root = {
                parent: null, 
                left: null, 
                right: null, 
                item: item
            };
            this._end = this._root;
        } else {
            let p = this._end;

            while (p.parent != null && p.parent.right == p) {
                p = p.parent;
            }

            insertNodeLeft: {
                if (p.parent != null) {
                    if (p.parent.right != null) {
                        p = p.parent.right;
                    } else {
                        p.parent.right = {
                            parent: p.parent, 
                            left: null, 
                            right: null, 
                            item: item
                        };
                        this._end = p.parent.right;
                        break insertNodeLeft;
                    }
                }

                while (p.left != null) {
                    p = p.left;
                }

                p.left = {
                    parent: p, 
                    left: null, 
                    right: null, 
                    item: item
                };
                this._end = p.left;
            }

            p = this._end;

            while (p.parent != null && this._comparator.compare(p.item, p.parent.item) < 0) {
                let temp = p.parent.item;

                p.parent.item = p.item;
                p.item = temp;

                p = p.parent;
            }
        }

        this._size = this._size + 1;
    }


    dequeue() {
        if (this._end == null) {
            throw new Error("the heap is empty.");
        }

        let item = this._root.item;

        if (this._end == this._root) {
            this._root = null;
            this._end = this._root;
        } else {
            let prevEnd = this._end;
            let p = prevEnd;

            while (p.parent != null 
                && p.parent.left == p) {
                
                p = p.parent;
            }

            if (prevEnd.parent.left == prevEnd) {
                prevEnd.parent.left = null;
            } else {
                prevEnd.parent.right = null;
            }

            updateNodeRight: {
                if (p.parent != null) {
                    if (p.parent.left != null) {
                        p = p.parent.left;
                    } else { // should never happen.
                        this._end = p.parent;
                        break updateNodeRight;
                    }
                }

                while (p.right != null) {
                    p = p.right;
                }

                this._end = p;
            }


            p = this._root;
            p.item = prevEnd.item;

            while (p.right != null 
                && (this._comparator.compare(p.item, p.left.item) > 0 
                || this._comparator.compare(p.item, p.right.item) > 0)) {
                
                if (this._comparator.compare(p.left.item, p.right.item) < 0) {
                    let temp = p.item;

                    p.item = p.left.item;
                    p.left.item = temp;

                    p = p.left;
                } else {
                    let temp = p.item;

                    p.item = p.right.item;
                    p.right.item = temp;

                    p = p.right;
                }
            }

            if (p.left != null && this._comparator.compare(p.item, p.left.item) > 0) {
                let temp = p.item;

                p.item = p.left.item;
                p.left.item = temp;

                //p = p.left;
            }
        }

        this._size = this._size - 1;
        return item;
    }


    peek() {
        if (this._root == null) {
            throw new Error("the heap is empty.");
        }

        return this._root.item;
    }


    getSize() {
        return this._size;
    }


    clone() {
        function cloneSubtree(node, parent) {
            if (node != null) {
                let newNode = {
                    parent: parent, 
                    left: null, 
                    right: null, 
                    item: node.item, 
                };
                
                newNode.left = cloneSubtree(node.left, newNode);
                newNode.right = cloneSubtree(node.right, newNode);
                return newNode;
            } else {
                return null;
            }
        }

        let inst = new BinaryTreeMinHeap(this._comparator);

        inst._root = cloneSubtree(this._root, null);

        function getLeftDepthOfSubtree(node) {
            let depth = 0;

            while (node != null) {
                node = node.left;
                depth = depth + 1;
            }

            return depth;
        }
        
        function findEndOfSubtree(node, depth) {
            if (node.left == null && node.right == null) {
                return node;
            }

            let sampleDepth = getLeftDepthOfSubtree(node.right) + 1;

            if (sampleDepth < depth) {
                return findEndOfSubtree(node.left, depth - 1);
            } else {
                return findEndOfSubtree(node.right, depth - 1);
            }
        }

        let depth = getLeftDepthOfSubtree(inst._root);

        if (inst._root == null) {
            inst._end = null;
        } else {
            inst._end = findEndOfSubtree(inst._root, depth);
        }

        inst._size = this._size;
        return inst;
    }


    debugVerifyIntegrity() {
        // verify the shape of the tree.

        {
            function getInfoAndVerifySubtree(node) {
                if (node == null) {
                    return {
                        isFull: true, 
                        depth: 0
                    };
                }

                let leftInfo = getInfoAndVerifySubtree(node.left);
                let rightInfo = getInfoAndVerifySubtree(node.right);

                if (rightInfo.depth > leftInfo.depth) {
                    throw new Error("the tree is not a complete binary tree.");
                }

                if (leftInfo.depth - rightInfo.depth > 1) {
                    throw new Error("the tree is not a complete binary tree.");
                }

                if (leftInfo.depth - rightInfo.depth == 0) {
                    if (!leftInfo.isFull) {
                        throw new Error("the tree is not a complete binary tree.");
                    }
                } else if (leftInfo.depth - rightInfo.depth == 1) {
                    if (!rightInfo.isFull) {
                        throw new Error("the tree is not a complete binary tree.");
                    }
                }

                return {
                    isFull: rightInfo.isFull && leftInfo.depth == rightInfo.depth, 
                    depth: Math.max(leftInfo.depth, rightInfo.depth)
                };
            }

            getInfoAndVerifySubtree(this._root);
        }


        // verify the "end" field of the structure.

        {
            function getLeftDepthOfSubtree(node) {
                let depth = 0;
    
                while (node != null) {
                    node = node.left;
                    depth = depth + 1;
                }
    
                return depth;
            }
    
            
            function findEndOfSubtree(node, depth) {
                if (node.left == null && node.right == null) {
                    return node;
                }
    
                let sampleDepth = getLeftDepthOfSubtree(node.right) + 1;
    
                if (sampleDepth < depth) {
                    return findEndOfSubtree(node.left, depth - 1);
                } else {
                    return findEndOfSubtree(node.right, depth - 1);
                }
            }

            let depth = getLeftDepthOfSubtree(this._root);
            let end;
    
            if (this._root == null) {
                end = null;
            } else {
                end = findEndOfSubtree(this._root, depth);
            }

            if (this._end != end) {
                throw new Error("the \"end\" field of the structure is incorrect.");
            }
        }


        // verify the "size" field of the structure.

        {
            let size;

            if (this._root == null) {
                size = 0;
            } else {
                let p = this._root;

                size = 1;

                while (true) {
                    while (p.left != null) {
                        p = p.left;
                        size = size + 1;
                    }

                    while (p.parent != null 
                        && (p.parent.right == null 
                        || p.parent.right == p)) {
                        
                        p = p.parent;
                    }

                    if (p.parent != null) {
                        p = p.parent.right;
                        size = size + 1;
                    } else {
                        break;
                    }
                }
            }

            if (this._size != size) {
                throw new Error("the \"size\" field of the structure is incorrect.");
            }
        }


        // verify the heap tree property.

        {
            let stack = new Array();
            let p = this._root;
            let prev = null;

            if (p != null) {
                stack.push(p);

                prev = p;
                p = p.left;
            }

            while (p != null) {
                stack.push(p);

                if (!(this._comparator.compare(p.item, prev.item) >= 0)) {
                    throw new Error("the heap tree property is not satisfied.");
                }

                prev = p;
                p = p.left;
            }

            while (stack.length > 0) {
                prev = stack.pop();
                p = prev.right;

                while (p != null) {
                    stack.push(p);

                    if (!(this._comparator.compare(p.item, prev.item) >= 0)) {
                        throw new Error("the heap tree property is not satisfied.");
                    }

                    prev = p;
                    p = p.left;
                }
            }
        }
    }
}

