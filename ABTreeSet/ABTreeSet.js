/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


import * as comparators from "../comparators/comparators.js";
import * as arrayTools from "../arrayTools/arrayTools.js"


export class ABTreeSet {

    _root = null;
    _comparator = new comparators.UniversalComparator();
    _A = 2;
    _B = 3;


    constructor(A, B, comparator) {
        if ((B + 1) / 2 < A || A < 2) {
            throw new Error("the inequality (B + 1) / 2 >= A >= 2 does not hold.");
        }

        this._root = {
            index: [], 
            branches: null, 

            size: 0
        };
        //this._updateLocalFields(this._root);

        this._comparator = comparator || this._comparator;
        this._A = A || this._A;
        this._B = B || this._B;
    }


    _updateLocalFields(node) {
        if (node.branches != null) {
            let size = 0;

            for (let branch of node.branches) {
                size = size + branch.size;
            }

            node.size = size;
        } else {
            node.size = node.index.length;
        }
    }


    add(item) {
        let stack = new Array();
        let p = this._root;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            stack.push({p: p, branch: branch});
            p = p.branches[branch];
        }

        {
            let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (lastBranch < p.index.length
                && this._comparator.compare(item, p.index[lastBranch]) == 0) {
                
                //throw new Error("the item already exists in the set.");
                return;
            }

            p = {p: p, branch: lastBranch};
        }

        p.p.index.splice(p.branch, 0, item);

        if (p.p.index.length <= this._B) {
            this._updateLocalFields(p.p);

            while (stack.length > 0) {
                p = stack.pop();

                this._updateLocalFields(p.p);
            }

            return;
        }

        let newIndex;
        let nextBranch;

        {
            let leftBranchSize = Math.floor(p.p.index.length / 2);

            newIndex = p.p.index[leftBranchSize - 1];
            nextBranch = {
                index: p.p.index.splice(leftBranchSize), 
                branches: null, 
                size: null
            };

            this._updateLocalFields(p.p);
            this._updateLocalFields(nextBranch);
        }

        while (stack.length > 0) {
            let parent = stack.pop();

            parent.p.index.splice(parent.branch, 0, newIndex);
            parent.p.branches.splice(parent.branch + 1, 0, nextBranch);

            if (parent.p.branches.length <= this._B) {
                this._updateLocalFields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._updateLocalFields(p.p);
                }

                return;
            }

            let leftBranchSize = Math.floor(parent.p.branches.length / 2);

            newIndex = parent.p.index[leftBranchSize - 1];
            nextBranch = {
                index: parent.p.index.splice(leftBranchSize), 
                branches: parent.p.branches.splice(leftBranchSize), 
                size: null
            };

            this._updateLocalFields(parent.p);
            this._updateLocalFields(nextBranch);

            parent.p.index.splice(leftBranchSize - 1, 1);

            p = parent;
        }

        this._root = {
            index: [newIndex], 
            branches: [this._root, nextBranch], 
            size: null
        };

        this._updateLocalFields(this._root);
    }


    remove(item) {
        let stack = new Array();
        let p = this._root;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            stack.push({p: p, branch: branch});
            p = p.branches[branch];
        }

        {
            let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (lastBranch >= p.index.length 
                || this._comparator.compare(item, p.index[lastBranch]) != 0) {
                
                //throw new Error("the item does not exist in the set.");
                return;
            }

            p = {p: p, branch: lastBranch};
        }

        p.p.index.splice(p.branch, 1);

        if (p.p.index.length >= this._A) {
            this._updateLocalFields(p.p);

            while (stack.length > 0) {
                p = stack.pop();

                this._updateLocalFields(p.p);
            }

            return;
        }

        if (stack.length > 0) {
            let parent = stack.pop();

            if (parent.branch == parent.p.branches.length - 1) {
                let parentSiblingBranch = parent.branch - 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.index.length > this._A) {
                    p.p.index.splice(0, 0, sibling.index[sibling.index.length - 1]);
                    sibling.index.splice(sibling.index.length - 1, 1);

                    parent.p.index[parentSiblingBranch] = sibling.index[sibling.index.length - 1];

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);
                    //return;
                } else { // sibling.index.length == this._A
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);

                    parent.p.index.splice(parent.p.index.length - 1, 1);
                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._updateLocalFields(sibling);
                }
            } else { // parent.branch < parent.p.branches.length - 1
                let parentSiblingBranch = parent.branch + 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.index.length > this._A) {
                    p.p.index.splice(p.p.index.length, 0, sibling.index[0]);
                    sibling.index.splice(0, 1);

                    parent.p.index[parent.branch] = p.p.index[p.p.index.length - 1];

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);
                    //return;
                } else { // sibling.index.length == this._A
                    sibling.index.splice(0, 0, ...p.p.index);

                    parent.p.index.splice(parent.branch, 1);
                    parent.p.branches.splice(parent.branch, 1);

                    this._updateLocalFields(sibling);
                }
            }

            if (parent.p.branches.length >= this._A) {
                this._updateLocalFields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._updateLocalFields(p.p);
                }

                return;
            }

            p = parent;
        }

        while (stack.length > 0) {
            let parent = stack.pop();

            if (parent.branch == parent.p.branches.length - 1) {
                let parentSiblingBranch = parent.branch - 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.branches.length > this._A) {
                    p.p.index.splice(0, 0, parent.p.index[parentSiblingBranch]);
                    p.p.branches.splice(0, 0, sibling.branches[sibling.branches.length - 1]);

                    parent.p.index[parentSiblingBranch] = sibling.index[sibling.index.length - 1];
                    sibling.index.splice(sibling.index.length - 1, 1);
                    sibling.branches.splice(sibling.branches.length - 1, 1);

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);
                    //return;
                } else { // sibling.branches.length == this._A
                    sibling.index.splice(sibling.index.length, 0, parent.p.index[parentSiblingBranch]);
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);
                    sibling.branches.splice(sibling.branches.length, 0, ...p.p.branches);

                    parent.p.index.splice(parent.p.index.length - 1, 1);
                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._updateLocalFields(sibling);
                }
            } else { // parent.branch < parent.p.branches.length - 1
                let parentSiblingBranch = parent.branch + 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.branches.length > this._A) {
                    p.p.index.splice(p.p.index.length, 0, parent.p.index[parent.branch]);
                    p.p.branches.splice(p.p.branches.length, 0, sibling.branches[0]);

                    parent.p.index[parent.branch] = sibling.index[0];
                    sibling.index.splice(0, 1);
                    sibling.branches.splice(0, 1);

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);
                    //return;
                } else { // sibling.branches.length == this._A
                    sibling.index.splice(0, 0, parent.p.index[parent.branch]);
                    sibling.index.splice(0, 0, ...p.p.index);
                    sibling.branches.splice(0, 0, ...p.p.branches);

                    parent.p.index.splice(parent.branch, 1);
                    parent.p.branches.splice(parent.branch, 1);

                    this._updateLocalFields(sibling);
                }
            }

            if (parent.p.branches.length >= this._A) {
                this._updateLocalFields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._updateLocalFields(p.p);
                }

                return;
            }

            p = parent;
        }

        if (this._root.branches != null 
            && this._root.branches.length == 1) {
            
            this._root = this._root.branches[0];
        } else {
            this._updateLocalFields(this._root);
        }
    }


    has(item) {
        let p = this._root;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            p = p.branches[branch];
        }

        let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

        return (lastBranch < p.index.length 
            && this._comparator.compare(item, p.index[lastBranch]) == 0);
    }


    getSize() {
        return this._root.size;
    }


    getRankOfItem(item) {
        let p = this._root;
        let rank = 0;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            for (let i = 0; i < branch; ++i) {
                rank = rank + p.branches[i].size;
            }

            p = p.branches[branch];
        }

        let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

        rank = rank + lastBranch;
        return rank;
    }


    getItemByRank(rank) {
        if (rank < 0 || rank >= this._root.size) {
            throw new Error("there is no item of this rank in the set.");
        }

        let p = this._root;

        while (p.branches != null) {
            let i = 0;

            while (rank >= p.branches[i].size) {
                rank = rank - p.branches[i].size;
                ++i;
            }

            p = p.branches[i];
        }

        return p.index[rank];
    }


    getLeastUpperBoundItem(item) {
        let p = this._root;
        let nextUpperBound = null;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (branch != p.branches.length - 1) {
                nextUpperBound = p.branches[branch + 1];
            }

            p = p.branches[branch];
        }

        {
            let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (lastBranch < p.index.length) {
                return p.index[lastBranch];
            }
        }

        if (nextUpperBound != null) {
            p = nextUpperBound;

            while (p.branches != null) {
                p = p.branches[0];
            }

            return p.index[0];
        } else {
            return null;
        }
    }


    getGreatestLowerBoundItem(item) {
        let p = this._root;
        let nextLowerBound = null;

        while (p.branches != null) {
            let branch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (branch != 0) {
                nextLowerBound = p.branches[branch - 1];
            }

            p = p.branches[branch];
        }

        {
            let lastBranch = arrayTools.binarySearchGetFirst(p.index, item, this._comparator);

            if (lastBranch < p.index.length 
                && this._comparator.compare(item, p.index[lastBranch]) == 0) {
                
                return p.index[lastBranch];
            }

            lastBranch = lastBranch - 1;

            if (lastBranch >= 0) {
                return p.index[lastBranch];
            }
        }

        if (nextLowerBound != null) {
            p = nextLowerBound;

            while (p.branches != null) {
                p = p.branches[p.branches.length - 1];
            }

            return p.index[p.index.length - 1];
        } else {
            return null;
        }
    }


    rebalance() {
        let level = this.toArray();

        {
            let newLevel = new Array();

            while (level.length > this._A + this._B) {
                let newBranch = {
                    index: level.splice(0, this._B), 
                    branches: null, 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                this._updateLocalFields(newBranch);

                newLevel.push({branch: newBranch, max: newMax});
            }

            if (level.length > this._B) {
                let newLeftBranchSize = level.length - this._A;
                let newLeftBranch = {
                    index: level.splice(0, newLeftBranchSize), 
                    branches: null, 
                    size: null
                };
                let newLeftMax = newLeftBranch.index[newLeftBranch.index.length - 1];

                this._updateLocalFields(newLeftBranch);

                newLevel.push({branch: newLeftBranch, max: newLeftMax});

                let newBranch = {
                    index: level, 
                    branches: null, 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                this._updateLocalFields(newBranch);
                newLevel.push({branch: newBranch, max: newMax});
            } else { // level.length <= this._B && level.length > this._A
                let newBranch = {
                    index: level, 
                    branches: null, 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                this._updateLocalFields(newBranch);
                newLevel.push({branch: newBranch, max: newMax});
            }

            level = newLevel;
        }

        while (level.length >= this._A) {
            let newLevel = new Array();

            while (level.length > this._A + this._B) {
                let range = level.splice(0, this._B);
                let newBranch = {
                    index: range.map(subtree => subtree.max), 
                    branches: range.map(subtree => subtree.branch), 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                newBranch.index.splice(newBranch.index.length - 1, 1);
                this._updateLocalFields(newBranch);
                newLevel.push({branch: newBranch, max: newMax});
            }

            if (level.length > this._B) {
                let newLeftBranchSize = level.length - this._A;
                let leftRange = level.splice(0, newLeftBranchSize);
                let newLeftBranch = {
                    index: leftRange.map(subtree => subtree.max), 
                    branches: leftRange.map(subtree => subtree.branch), 
                    size: null
                };
                let newLeftMax = newLeftBranch.index[newLeftBranch.index.length - 1];

                newLeftBranch.index.splice(newLeftBranch.index.length - 1, 1);
                this._updateLocalFields(newLeftBranch);
                newLevel.push({branch: newLeftBranch, max: newLeftMax});

                let newBranch = {
                    index: level.map(subtree => subtree.max), 
                    branches: level.map(subtree => subtree.branch), 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                newBranch.index.splice(newBranch.index.length - 1, 1);
                this._updateLocalFields(newBranch);
                newLevel.push({branch: newBranch, max: newMax});
            } else { // level.length <= this._B && level.length > this._A
                let newBranch = {
                    index: level.map(subtree => subtree.max), 
                    branches: level.map(subtree => subtree.branch), 
                    size: null
                };
                let newMax = newBranch.index[newBranch.index.length - 1];

                newBranch.index.splice(newBranch.index.length - 1, 1);
                this._updateLocalFields(newBranch);
                newLevel.push({branch: newBranch, max: newMax});
            }

            level = newLevel;
        }

        if (level.length == 1) {
            this._root = level[0].branch;
        } else {
            let newBranch = {
                index: level.map(subtree => subtree.max), 
                branches: level.map(subtree => subtree.branch), 
                size: null
            };

            newBranch.index.splice(newBranch.index.length - 1, 1);
            this._updateLocalFields(newBranch);
            this._root = newBranch;
        }
    }


    doForEachItemInOrder(consumer) {
        function doForEachItemInSubtreeInOrder(node) {
            if (node.branches != null) {
                for (let branch of node.branches) {
                    doForEachItemInSubtreeInOrder(branch);
                }
            } else {
                for (let item of node.index) {
                    consumer(item);
                }
            }
        }

        doForEachItemInSubtreeInOrder(this._root);
    }


    toArray() {
        let array = new Array();

        this.doForEachItemInOrder(item => array.push(item));
        return array;
    }


    clone() {
        function cloneSubtree(node) {
            if (node.branches != null) {
                return {
                    index: node.index.slice(), 
                    branches: node.branches.map(branch => cloneSubtree(branch)), 
                    size: node.size
                };
            } else {
                return {
                    index: node.index.slice(), 
                    branches: null, 
                    size: node.size
                };
            }
        }

        let inst = new ABTreeSet(this._A, this._B, this._comparator);

        inst._root = cloneSubtree(this._root);
        return inst;
    }


    debugVerifyIntegrity() {
        // verify that the root node has an appropriate number of children.

        if (this._root.branches != null) {
            if (this._root.branches.length < 2 || this._root.branches.length > this._B) {
                throw new Error("the root node does not have an approprite number of children.");
            }
        } else { // this._root.branches == null
            if (this._root.index.length > this._B) {
                throw new Error("the root node does not have an appropriate number of children.");
            }
        }


        // verify that each node (except the root) has at least (_A) children and at most (_B) children.

        {
            let stack = new Array();

            if (this._root.branches != null) {
                for (let branch of this._root.branches) {
                    stack.push(branch);
                }
            }

            while (stack.length > 0) {
                let p = stack.pop();

                if (p.branches != null) { // (p) is an internal node.
                    for (let branch of p.branches) {
                        stack.push(branch);
                    }

                    if (p.branches.length < this._A || p.branches.length > this._B) {
                        throw new Error("a node does not have an appropriate number of children.");
                    }
                } else { // (p) is a leaf node.
                    if (p.index.length < this._A || p.index.length > this._B) {
                        throw new Error("a node does not have an appropriate number of children.");
                    }
                }
            }
        }


        // verify the "size" attribute of each node.

        {
            function getSizeAndVerifySubtree(node) {
                if (node.branches != null) {
                    let size = 0;

                    for (let branch of node.branches) {
                        size = size + getSizeAndVerifySubtree(branch);
                    }

                    if (size != node.size) {
                        throw new Error("the size attribute of a node does not match the size of its subtree.");
                    }

                    return size;
                } else {
                    if (node.index.length != node.size) {
                        throw new Error("the size attribute of a node does not match the size of its subtree.");
                    }

                    return node.index.length;
                }
            };

            getSizeAndVerifySubtree(this._root);
        }


        // verify the search tree property.

        {
            let self = this;

            function getMaxAndVerifySubtree(node, min) {
                if (node.branches != null) {
                    {
                        let max = getMaxAndVerifySubtree(node.branches[0], min);

                        if (self._comparator.compare(node.index[0], max) < 0) {
                            throw new Error("the search tree property is not satisfied.");
                        }
                    }

                    for (let i = 1; i < node.index.length; ++i) {
                        let max = getMaxAndVerifySubtree(node.branches[i], node.index[i - 1]);

                        if (self._comparator.compare(node.index[i], max) < 0) {
                            throw new Error("the search tree property is not satisfied.");
                        }
                    }

                    return getMaxAndVerifySubtree(node.branches[node.branches.length - 1], node.index[node.index.length - 1]);
                } else {
                    if (self._comparator.compare(node.index[0], min) < 0) {
                        throw new Error("the search tree property is not satisfied.");
                    }

                    return node.index[node.index.length - 1];
                }
            }

            let p = this._root;

            while (p.branches != null) {
                p = p.branches[0];
            }

            if (p.index.length > 0) {
                getMaxAndVerifySubtree(this._root, p.index[0]);
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

