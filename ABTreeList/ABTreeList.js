/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class ABTreeList {

    _root = null;
    _A = 2;
    _B = 3;


    constructor(A, B) {
        if ((B + 1) / 2 < A 
            || A < 2) {

            throw new Error("the inequality (B + 1) / 2 >= A >= 2 does not hold.");
        }

        this._root = {
            index: [], 
            branches: null, 

            size: 0
        };
        //this._updateLocalFields(this._root);

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


    add(index, item) {
        if (index < 0 
            || index > this._root.size) {

            throw new Error("the index is out of bounds in the list.");
        }


        let stack = new Array();
        let p = this._root;

        if (index < this._root.size) {
            while (p.branches != null) {
                let i = 0;

                while (index >= p.branches[i].size) {
                    index = index - p.branches[i].size;
                    ++i;
                }

                stack.push({p: p, branch: i});
                p = p.branches[i];
            }

            p = {p: p, branch: index};
        } else {
            while (p.branches != null) {
                stack.push({p: p, branch: p.branches.length - 1});
                p = p.branches[p.branches.length - 1];
            }

            p = {p: p, branch: p.index.length};
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

        let nextBranch;

        {
            let leftBranchSize = Math.floor(p.p.index.length / 2);

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

            nextBranch = {
                branches: parent.p.branches.splice(leftBranchSize), 
                size: null
            };

            this._updateLocalFields(parent.p);
            this._updateLocalFields(nextBranch);

            p = parent;
        }

        this._root = {
            branches: [this._root, nextBranch], 
            size: null
        };

        this._updateLocalFields(this._root);
    }


    remove(index) {
        if (index < 0 || index >= this._root.size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let stack = new Array();
        let p = this._root;

        while (p.branches != null) {
            let i = 0;

            while (index >= p.branches[i].size) {
                index = index - p.branches[i].size;
                ++i;
            }

            stack.push({p: p, branch: i});
            p = p.branches[i];
        }

        p = {p: p, branch: index};

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

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);

                    //return;
                } else { // sibling.index.length == this._A
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);

                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._updateLocalFields(sibling);
                }
            } else { // parent.branch < parent.p.branches.length - 1
                let parentSiblingBranch = parent.branch + 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.index.length > this._A) {
                    p.p.index.splice(p.p.index.length, 0, sibling.index[0]);
                    sibling.index.splice(0, 1);

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);

                    //return;
                } else { // sibling.index.length == this._A
                    sibling.index.splice(0, 0, ...p.p.index);

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
                    p.p.branches.splice(0, 0, sibling.branches[sibling.branches.length - 1]);

                    sibling.branches.splice(sibling.branches.length - 1, 1);

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);

                    //return;
                } else { // sibling.branches.length == this._A
                    sibling.branches.splice(sibling.branches.length, 0, ...p.p.branches);

                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._updateLocalFields(sibling);
                }
            } else { // parent.branch < parent.p.branches.length - 1
                let parentSiblingBranch = parent.branch + 1;
                let sibling = parent.p.branches[parentSiblingBranch];

                if (sibling.branches.length > this._A) {
                    p.p.branches.splice(p.p.branches.length, 0, sibling.branches[0]);

                    sibling.branches.splice(0, 1);

                    this._updateLocalFields(p.p);
                    this._updateLocalFields(sibling);

                    //return;
                } else { // sibling.branches.length == this._A
                    sibling.branches.splice(0, 0, ...p.p.branches);

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


    get(index) {
        if (index < 0 || index >= this._root.size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root;

        while (p.branches != null) {
            let i = 0;

            while (index >= p.branches[i].size) {
                index = index - p.branches[i].size;
                ++i;
            }

            p = p.branches[i];
        }

        return p.index[index];
    }


    set(index, item) {
        if (index < 0 || index >= this._root.size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root;

        while (p.branches != null) {
            let i = 0;

            while (index >= p.branches[i].size) {
                index = index - p.branches[i].size;
                ++i;
            }

            p = p.branches[i];
        }

        p.index[index] = item;
    }


    getSize() {
        return this._root.size;
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

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            }

            if (level.length > this._B) {
                let newLeftBranchSize = level.length - this._A;
                let newLeftBranch = {
                    index: level.splice(0, newLeftBranchSize), 
                    branches: null, 
                    size: null
                };

                this._updateLocalFields(newLeftBranch);

                newLevel.push(newLeftBranch);

                let newBranch = {
                    index: level, 
                    branches: null, 
                    size: null
                };

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            } else { // level.length <= this._B && level.length > this._A
                let newBranch = {
                    index: level, 
                    branches: null, 
                    size: null
                };

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            }

            level = newLevel;
        }

        while (level.length >= this._A) {
            let newLevel = new Array();

            while (level.length > this._A + this._B) {
                let newBranch = {
                    branches: level.splice(0, this._B), 
                    size: null
                };

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            }

            if (level.length > this._B) {
                let newLeftBranchSize = level.length - this._A;
                let newLeftBranch = {
                    branches: level.splice(0, newLeftBranchSize), 
                    size: null
                };

                this._updateLocalFields(newLeftBranch);

                newLevel.push(newLeftBranch);

                let newBranch = {
                    branches: level, 
                    size: null
                };

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            } else { // level.length <= this._B && level.length > this._A
                let newBranch = {
                    branches: level, 
                    size: null
                };

                this._updateLocalFields(newBranch);

                newLevel.push(newBranch);
            }

            level = newLevel;
        }

        if (level.length == 1) {
            this._root = level[0];
        } else {
            let newBranch = {
                branches: level, 
                size: null
            };

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

        let inst = new ABTreeList(this._A, this._B);

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

