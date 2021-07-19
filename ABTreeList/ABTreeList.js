/*
Author: Quade Jones
Email: Gquadej96@live.com
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
        //this._update_local_fields(this._root);

        this._A = A || this._A;
        this._B = B || this._B;
    }


    _update_local_fields(node) {
        if (node.branches != null) {
            let size = 0;

            for (let branch of node.branches) {
                size = size + branch.size;
            }

            node.size = size;
        } 
        else {
            node.size = node.index.length;
        }
    }


    insert(index, item) {
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
        } 
        else {
            while (p.branches != null) {
                stack.push({p: p, branch: p.branches.length - 1});
                p = p.branches[p.branches.length - 1];
            }

            p = {p: p, branch: p.index.length};
        }

        p.p.index.splice(p.branch, 0, item);

        if (p.p.index.length <= this._B) {
            this._update_local_fields(p.p);

            while (stack.length > 0) {
                p = stack.pop();

                this._update_local_fields(p.p);
            }

            return;
        }


        let next_branch;

        {
            let left_branch_size = Math.floor(p.p.index.length / 2);

            next_branch = {
                index: p.p.index.splice(left_branch_size), 
                branches: null, 

                size: NaN
            };

            this._update_local_fields(p.p);
            this._update_local_fields(next_branch);
        }


        while (stack.length > 0) {
            let parent = stack.pop();

            parent.p.branches.splice(parent.branch + 1, 0, next_branch);

            if (parent.p.branches.length <= this._B) {
                this._update_local_fields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._update_local_fields(p.p);
                }

                return;
            }


            let left_branch_size = Math.floor(parent.p.branches.length / 2);

            next_branch = {
                branches: parent.p.branches.splice(left_branch_size), 

                size: NaN
            };

            this._update_local_fields(parent.p);
            this._update_local_fields(next_branch);

            p = parent;
        }


        this._root = {
            branches: [this._root, next_branch], 

            size: NaN
        };

        this._update_local_fields(this._root);
    }


    remove(index) {
        if (index < 0 
            || index >= this._root.size) {

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
            this._update_local_fields(p.p);

            while (stack.length > 0) {
                p = stack.pop();

                this._update_local_fields(p.p);
            }

            return;
        }


        if (stack.length > 0) {
            let parent = stack.pop();

            if (parent.branch == parent.p.branches.length - 1) {
                let parent_sibling_branch = parent.branch - 1;
                let sibling = parent.p.branches[parent_sibling_branch];

                if (sibling.index.length > this._A) {
                    p.p.index.splice(0, 0, sibling.index[sibling.index.length - 1]);
                    sibling.index.splice(sibling.index.length - 1, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.index.length == this._A
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);

                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._update_local_fields(sibling);
                }
            } 
            else { // parent.branch < parent.p.branches.length - 1
                let parent_sibling_branch = parent.branch + 1;
                let sibling = parent.p.branches[parent_sibling_branch];

                if (sibling.index.length > this._A) {
                    p.p.index.splice(p.p.index.length, 0, sibling.index[0]);
                    sibling.index.splice(0, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.index.length == this._A
                    sibling.index.splice(0, 0, ...p.p.index);

                    parent.p.branches.splice(parent.branch, 1);

                    this._update_local_fields(sibling);
                }
            }

            if (parent.p.branches.length >= this._A) {
                this._update_local_fields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._update_local_fields(p.p);
                }

                return;
            }

            p = parent;
        }


        while (stack.length > 0) {
            let parent = stack.pop();

            if (parent.branch == parent.p.branches.length - 1) {
                let parent_sibling_branch = parent.branch - 1;
                let sibling = parent.p.branches[parent_sibling_branch];

                if (sibling.branches.length > this._A) {
                    p.p.branches.splice(0, 0, sibling.branches[sibling.branches.length - 1]);

                    sibling.branches.splice(sibling.branches.length - 1, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.branches.length == this._A
                    sibling.branches.splice(sibling.branches.length, 0, ...p.p.branches);

                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._update_local_fields(sibling);
                }
            } 
            else { // parent.branch < parent.p.branches.length - 1
                let parent_sibling_branch = parent.branch + 1;
                let sibling = parent.p.branches[parent_sibling_branch];

                if (sibling.branches.length > this._A) {
                    p.p.branches.splice(p.p.branches.length, 0, sibling.branches[0]);

                    sibling.branches.splice(0, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.branches.length == this._A
                    sibling.branches.splice(0, 0, ...p.p.branches);

                    parent.p.branches.splice(parent.branch, 1);

                    this._update_local_fields(sibling);
                }
            }

            if (parent.p.branches.length >= this._A) {
                this._update_local_fields(parent.p);

                while (stack.length > 0) {
                    p = stack.pop();

                    this._update_local_fields(p.p);
                }

                return;
            }

            p = parent;
        }

        if (this._root.branches != null 
            && this._root.branches.length == 1) {
            
            this._root = this._root.branches[0];
        } 
        else {
            this._update_local_fields(this._root);
        }
    }


    get(index) {
        if (index < 0 
            || index >= this._root.size) {

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
        if (index < 0 
            || index >= this._root.size) {

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


    get_size() {
        return this._root.size;
    }


    rebalance() {
        let level = this.to_array();

        {
            let new_level = new Array();

            while (level.length > this._A + this._B) {
                let new_branch = {
                    index: level.splice(0, this._B), 
                    branches: null, 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            }

            if (level.length > this._B) {
                let new_left_branch_size = level.length - this._A;
                let new_left_branch = {
                    index: level.splice(0, new_left_branch_size), 
                    branches: null, 

                    size: NaN
                };

                this._update_local_fields(new_left_branch);

                new_level.push(new_left_branch);


                let new_branch = {
                    index: level, 
                    branches: null, 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            } 
            else { // level.length <= this._B && level.length > this._A
                let new_branch = {
                    index: level, 
                    branches: null, 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            }

            level = new_level;
        }

        while (level.length >= this._A) {
            let new_level = new Array();

            while (level.length > this._A + this._B) {
                let new_branch = {
                    branches: level.splice(0, this._B), 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            }

            if (level.length > this._B) {
                let new_left_branch_size = level.length - this._A;
                let new_left_branch = {
                    branches: level.splice(0, new_left_branch_size), 

                    size: NaN
                };

                this._update_local_fields(new_left_branch);

                new_level.push(new_left_branch);


                let new_branch = {
                    branches: level, 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            } 
            else { // level.length <= this._B && level.length > this._A
                let new_branch = {
                    branches: level, 

                    size: NaN
                };

                this._update_local_fields(new_branch);

                new_level.push(new_branch);
            }

            level = new_level;
        }

        if (level.length == 1) {
            this._root = level[0];
        } 
        else {
            let new_branch = {
                branches: level, 

                size: NaN
            };

            this._update_local_fields(new_branch);

            this._root = new_branch;
        }
    }


    do_for_each_item_in_order(consumer) {
        function do_for_each_item_in_subtree_in_order(node) {
            if (node.branches != null) {
                for (let branch of node.branches) {
                    do_for_each_item_in_subtree_in_order(branch);
                }
            } 
            else {
                for (let item of node.index) {
                    consumer(item);
                }
            }
        }

        do_for_each_item_in_subtree_in_order(this._root);
    }


    to_array() {
        let array = new Array();

        this.do_for_each_item_in_order((item) => array.push(item));

        return array;
    }


    clone() {
        function clone_subtree(node) {
            if (node.branches != null) {
                return {
                    branches: node.branches.map((branch) => clone_subtree(branch)), 

                    size: node.size
                };
            } 
            else {
                return {
                    index: node.index.slice(), 
                    branches: null, 

                    size: node.size
                };
            }
        }


        let inst = new ABTreeList(this._A, this._B);

        inst._root = clone_subtree(this._root);

        return inst;
    }


    debug_verify_integrity() {
        // verify that the root node has an appropriate number of children.

        if (this._root.branches != null) {
            if (this._root.branches.length < 2 
                || this._root.branches.length > this._B) {
                
                throw new Error("the root node does not have an approprite number of children.");
            }
        } 
        else { // this._root.branches == null
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

                    if (p.branches.length < this._A 
                        || p.branches.length > this._B) {
                        
                        throw new Error("a node does not have an appropriate number of children.");
                    }
                } 
                else { // (p) is a leaf node.
                    if (p.index.length < this._A 
                        || p.index.length > this._B) {
                        
                        throw new Error("a node does not have an appropriate number of children.");
                    }
                }
            }
        }


        // verify the "size" attribute of each node.

        {
            function get_size_and_verify_subtree(node) {
                if (node.branches != null) {
                    let size = 0;

                    for (let branch of node.branches) {
                        size = size + get_size_and_verify_subtree(branch);
                    }

                    if (size != node.size) {
                        throw new Error("the size attribute of a node does not match the size of its subtree.");
                    }

                    return size;
                } 
                else {
                    if (node.index.length != node.size) {
                        throw new Error("the size attribute of a node does not match the size of its subtree.");
                    }

                    return node.index.length;
                }
            };

            get_size_and_verify_subtree(this._root);
        }
    }


    debug_describe_items() {
        let string = "(";

        this.do_for_each_item_in_order(
        (item) => {
            string = string + "[" + item + "], ";
        });

        if (this.get_size() > 0) {
            string = string.substring(0, string.length - ", ".length);
        }

        string = string + ")";

        return string;
    }
}

