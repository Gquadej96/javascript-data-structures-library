/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


import * as comparators from "../comparators/comparators.js";
import * as array_tools from "../array_tools/array_tools.js"


export class ABTreeSet {

    _root = null;
    _comparator = new comparators.UniversalComparator();
    _A = 2;
    _B = 3;


    constructor(A, B, comparator) {
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

        this._comparator = comparator || this._comparator;
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


    add(item) {
        let stack = new Array();
        let p = this._root;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            stack.push({p: p, branch: branch});
            p = p.branches[branch];
        }

        {
            let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (last_branch < p.index.length
                && this._comparator.compare(item, p.index[last_branch]) == 0) {
                
                //throw new Error("the item already exists in the set.");
                return;
            }

            p = {p: p, branch: last_branch};
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


        let new_index;
        let next_branch;

        {
            let left_branch_size = Math.floor(p.p.index.length / 2);

            new_index = p.p.index[left_branch_size - 1];
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

            parent.p.index.splice(parent.branch, 0, new_index);
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

            new_index = parent.p.index[left_branch_size - 1];
            next_branch = {
                index: parent.p.index.splice(left_branch_size), 
                branches: parent.p.branches.splice(left_branch_size), 

                size: NaN
            };

            this._update_local_fields(parent.p);
            this._update_local_fields(next_branch);

            parent.p.index.splice(left_branch_size - 1, 1);

            p = parent;
        }


        this._root = {
            index: [new_index], 
            branches: [this._root, next_branch], 

            size: NaN
        };

        this._update_local_fields(this._root);
    }


    remove(item) {
        let stack = new Array();
        let p = this._root;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            stack.push({p: p, branch: branch});
            p = p.branches[branch];
        }

        {
            let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (last_branch >= p.index.length 
                || this._comparator.compare(item, p.index[last_branch]) != 0) {
                
                //throw new Error("the item does not exist in the set.");
                return;
            }

            p = {p: p, branch: last_branch};
        }

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

                    parent.p.index[parent_sibling_branch] = sibling.index[sibling.index.length - 1];

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.index.length == this._A
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);

                    parent.p.index.splice(parent.p.index.length - 1, 1);
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

                    parent.p.index[parent.branch] = p.p.index[p.p.index.length - 1];

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.index.length == this._A
                    sibling.index.splice(0, 0, ...p.p.index);

                    parent.p.index.splice(parent.branch, 1);
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
                    p.p.index.splice(0, 0, parent.p.index[parent_sibling_branch]);
                    p.p.branches.splice(0, 0, sibling.branches[sibling.branches.length - 1]);

                    parent.p.index[parent_sibling_branch] = sibling.index[sibling.index.length - 1];
                    sibling.index.splice(sibling.index.length - 1, 1);
                    sibling.branches.splice(sibling.branches.length - 1, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.branches.length == this._A
                    sibling.index.splice(sibling.index.length, 0, parent.p.index[parent_sibling_branch]);
                    sibling.index.splice(sibling.index.length, 0, ...p.p.index);
                    sibling.branches.splice(sibling.branches.length, 0, ...p.p.branches);

                    parent.p.index.splice(parent.p.index.length - 1, 1);
                    parent.p.branches.splice(parent.p.branches.length - 1, 1);

                    this._update_local_fields(sibling);
                }
            } 
            else { // parent.branch < parent.p.branches.length - 1
                let parent_sibling_branch = parent.branch + 1;
                let sibling = parent.p.branches[parent_sibling_branch];

                if (sibling.branches.length > this._A) {
                    p.p.index.splice(p.p.index.length, 0, parent.p.index[parent.branch]);
                    p.p.branches.splice(p.p.branches.length, 0, sibling.branches[0]);

                    parent.p.index[parent.branch] = sibling.index[0];
                    sibling.index.splice(0, 1);
                    sibling.branches.splice(0, 1);

                    this._update_local_fields(p.p);
                    this._update_local_fields(sibling);

                    //return;
                } 
                else { // sibling.branches.length == this._A
                    sibling.index.splice(0, 0, parent.p.index[parent.branch]);
                    sibling.index.splice(0, 0, ...p.p.index);
                    sibling.branches.splice(0, 0, ...p.p.branches);

                    parent.p.index.splice(parent.branch, 1);
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


    has(item) {
        let p = this._root;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            p = p.branches[branch];
        }


        let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

        return (last_branch < p.index.length 
            && this._comparator.compare(item, p.index[last_branch]) == 0);
    }


    get_size() {
        return this._root.size;
    }


    get_rank_of_item(item) {
        let p = this._root;
        let rank = 0;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            for (let i = 0; 
                i < branch; 
                ++i) {
                
                rank = rank + p.branches[i].size;
            }

            p = p.branches[branch];
        }


        let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

        rank = rank + last_branch;

        return rank;
    }


    get_item_by_rank(rank) {
        if (rank < 0 
            || rank >= this._root.size) {

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


    get_LUB(item) {
        let p = this._root;
        let next_upper_bound = null;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (branch != p.branches.length - 1) {
                next_upper_bound = p.branches[branch + 1];
            }

            p = p.branches[branch];
        }

        {
            let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (last_branch < p.index.length) {
                return p.index[last_branch];
            }
        }

        if (next_upper_bound != null) {
            p = next_upper_bound;

            while (p.branches != null) {
                p = p.branches[0];
            }

            return p.index[0];
        } 
        else {
            return null;
        }
    }


    get_GLB(item) {
        let p = this._root;
        let next_lower_bound = null;

        while (p.branches != null) {
            let branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (branch != 0) {
                next_lower_bound = p.branches[branch - 1];
            }

            p = p.branches[branch];
        }

        {
            let last_branch = array_tools.binary_search_get_first(p.index, item, this._comparator);

            if (last_branch < p.index.length 
                && this._comparator.compare(item, p.index[last_branch]) == 0) {
                
                return p.index[last_branch];
            }

            last_branch = last_branch - 1;

            if (last_branch >= 0) {
                return p.index[last_branch];
            }
        }

        if (next_lower_bound != null) {
            p = next_lower_bound;

            while (p.branches != null) {
                p = p.branches[p.branches.length - 1];
            }

            return p.index[p.index.length - 1];
        } 
        else {
            return null;
        }
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
                let new_max = new_branch.index[new_branch.index.length - 1];

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            }

            if (level.length > this._B) {
                let new_left_branch_size = level.length - this._A;
                let new_left_branch = {
                    index: level.splice(0, new_left_branch_size), 
                    branches: null, 

                    size: NaN
                };
                let new_left_max = new_left_branch.index[new_left_branch.index.length - 1];

                this._update_local_fields(new_left_branch);

                new_level.push({branch: new_left_branch, max: new_left_max});


                let new_branch = {
                    index: level, 
                    branches: null, 

                    size: NaN
                };
                let new_max = new_branch.index[new_branch.index.length - 1];

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            } 
            else { // level.length <= this._B && level.length > this._A
                let new_branch = {
                    index: level, 
                    branches: null, 

                    size: NaN
                };
                let new_max = new_branch.index[new_branch.index.length - 1];

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            }

            level = new_level;
        }

        while (level.length >= this._A) {
            let new_level = new Array();

            while (level.length > this._A + this._B) {
                let range = level.splice(0, this._B);
                let new_branch = {
                    index: range.map((subtree) => subtree.max), 
                    branches: range.map((subtree) => subtree.branch), 

                    size: NaN
                };
                let new_max = new_branch.index[new_branch.index.length - 1];

                new_branch.index.splice(new_branch.index.length - 1, 1);

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            }

            if (level.length > this._B) {
                let new_left_branch_size = level.length - this._A;
                let left_range = level.splice(0, new_left_branch_size);
                let new_left_branch = {
                    index: left_range.map((subtree) => subtree.max), 
                    branches: left_range.map((subtree) => subtree.branch), 

                    size: NaN
                };
                let new_left_max = new_left_branch.index[new_left_branch.index.length - 1];

                new_left_branch.index.splice(new_left_branch.index.length - 1, 1);

                this._update_local_fields(new_left_branch);

                new_level.push({branch: new_left_branch, max: new_left_max});


                let new_branch = {
                    index: level.map((subtree) => subtree.max), 
                    branches: level.map((subtree) => subtree.branch), 

                    size: NaN
                };
                let new_max = new_branch.index[new_branch.index.length - 1];

                new_branch.index.splice(new_branch.index.length - 1, 1);

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            } 
            else { // level.length <= this._B && level.length > this._A
                let new_branch = {
                    index: level.map((subtree) => subtree.max), 
                    branches: level.map((subtree) => subtree.branch), 

                    size: NaN
                };
                let new_max = new_branch.index[new_branch.index.length - 1];

                new_branch.index.splice(new_branch.index.length - 1, 1);

                this._update_local_fields(new_branch);

                new_level.push({branch: new_branch, max: new_max});
            }

            level = new_level;
        }

        if (level.length == 1) {
            this._root = level[0].branch;
        } 
        else {
            let new_branch = {
                index: level.map((subtree) => subtree.max), 
                branches: level.map((subtree) => subtree.branch), 

                size: NaN
            };

            new_branch.index.splice(new_branch.index.length - 1, 1);

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
                    index: node.index.slice(), 
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


        let inst = new ABTreeSet(this._A, this._B, this._comparator);

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


        // verify the search tree property.

        {
            let self = this;

            function get_max_and_verify_subtree(node, min) {
                if (node.branches != null) {
                    {
                        let max = get_max_and_verify_subtree(node.branches[0], min);

                        if (self._comparator.compare(node.index[0], max) < 0) {
                            throw new Error("the search tree property is not satisfied.");
                        }
                    }

                    for (let i = 1; 
                        i < node.index.length; 
                        ++i) {
                        
                        let max = get_max_and_verify_subtree(node.branches[i], node.index[i - 1]);

                        if (self._comparator.compare(node.index[i], max) < 0) {
                            throw new Error("the search tree property is not satisfied.");
                        }
                    }

                    return get_max_and_verify_subtree(node.branches[node.branches.length - 1], node.index[node.index.length - 1]);
                } 
                else {
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
                get_max_and_verify_subtree(this._root, p.index[0]);
            }
        }
    }


    debug_describe_items() {
		let string = "{";

		this.do_for_each_item_in_order(
		(item) => {
			string = string + "[" + item + "], ";
		});

		if (this.get_size() > 0) {
			string = string.substring(0, string.length - ", ".length);
		}

		string = string + "}";

		return string;
	}
}

