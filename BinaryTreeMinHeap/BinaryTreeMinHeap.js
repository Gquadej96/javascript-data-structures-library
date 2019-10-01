
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
        } 
        else {
            let p = this._end;

            while (p.parent != null 
                && p.parent.right == p) {
                
                p = p.parent;
            }

            insert_node_left: {
                if (p.parent != null) {
                    if (p.parent.right != null) {
                        p = p.parent.right;
                    } 
                    else {
                        p.parent.right = {
                            parent: p.parent, 
                            left: null, 
                            right: null, 

                            item: item
                        };
                        this._end = p.parent.right;
                        break insert_node_left;
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

            while (p.parent != null 
                && this._comparator.compare(p.item, p.parent.item) < 0) {
                
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
        } 
        else {
            let prev_end = this._end;
            let p = prev_end;

            while (p.parent != null 
                && p.parent.left == p) {
                
                p = p.parent;
            }

            if (prev_end.parent.left == prev_end) {
                prev_end.parent.left = null;
            } 
            else {
                prev_end.parent.right = null;
            }

            update_node_right: {
                if (p.parent != null) {
                    if (p.parent.left != null) {
                        p = p.parent.left;
                    } 
                    else { // should never happen.
                        this._end = p.parent;
                        break update_node_right;
                    }
                }

                while (p.right != null) {
                    p = p.right;
                }

                this._end = p;
            }


            p = this._root;
            p.item = prev_end.item;

            while (p.right != null 
                && (this._comparator.compare(p.item, p.left.item) > 0 
                || this._comparator.compare(p.item, p.right.item) > 0)) {
                
                if (this._comparator.compare(p.left.item, p.right.item) < 0) {
                    let temp = p.item;

                    p.item = p.left.item;
                    p.left.item = temp;

                    p = p.left;
                } 
                else {
                    let temp = p.item;

                    p.item = p.right.item;
                    p.right.item = temp;

                    p = p.right;
                }
            }

            if (p.left != null 
                && this._comparator.compare(p.item, p.left.item) > 0) {
                
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


    get_size() {
        return this._size;
    }


    clone() {
		function clone_subtree(node, parent) {
			if (node != null) {
				let new_node = {
                    parent: parent, 
                    left: null, 
                    right: null, 
                    
					item: node.item, 
                };
                
                new_node.left = clone_subtree(node.left, new_node);
                new_node.right = clone_subtree(node.right, new_node);

                return new_node;
			} 
			else {
				return null;
			}
		}


		let inst = new BinaryTreeMinHeap(this._comparator);

        inst._root = clone_subtree(this._root, null);


        function get_left_depth_of_subtree(node) {
            let depth = 0;

            while (node != null) {
                node = node.left;
                depth = depth + 1;
            }

            return depth;
        }

        
        function find_end_of_subtree(node, depth) {
            if (node.left == null 
                && node.right == null) {
                
                return node;
            }


            let sample_depth = get_left_depth_of_subtree(node.right) + 1;

            if (sample_depth < depth) {
                return find_end_of_subtree(node.left, depth - 1);
            } 
            else {
                return find_end_of_subtree(node.right, depth - 1);
            }
        }


        let depth = get_left_depth_of_subtree(inst._root);

        if (inst._root == null) {
            inst._end = null;
        } 
        else {
            inst._end = find_end_of_subtree(inst._root, depth);
        }


        inst._size = this._size;

        return inst;
	}


    debug_verify_integrity() {
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


        // verify the shape of the tree.

        {
            function get_info_and_verify_subtree(node) {
                if (node == null) {
                    return {
                        is_full: true, 
                        depth: 0
                    };
                }


                let left_info = get_info_and_verify_subtree(node.left);
                let right_info = get_info_and_verify_subtree(node.right);

                if (right_info.depth > left_info.depth) {
                    throw new Error("the tree is not a complete binary tree.");
                }

                if (left_info.depth - right_info.depth > 1) {
                    throw new Error("the tree is not a complete binary tree.");
                }

                if (left_info.depth - right_info.depth == 0) {
                    if (!left_info.is_full) {
                        throw new Error("the tree is not a complete binary tree.");
                    }
                }
                else if (left_info.depth - right_info.depth == 1) {
                    if (!right_info.is_full) {
                        throw new Error("the tree is not a complete binary tree.");
                    }
                }

                return {
                    is_full: right_info.is_full && left_info.depth == right_info.depth, 
                    depth: Math.max(left_info.depth, right_info.depth)
                };
            }

            get_info_and_verify_subtree(this._root);
        }


        // verify the "end" field of the structure.

        {
            function get_left_depth_of_subtree(node) {
                let depth = 0;
    
                while (node != null) {
                    node = node.left;
                    depth = depth + 1;
                }
    
                return depth;
            }
    
            
            function find_end_of_subtree(node, depth) {
                if (node.left == null 
                    && node.right == null) {
                    
                    return node;
                }
    
    
                let sample_depth = get_left_depth_of_subtree(node.right) + 1;
    
                if (sample_depth < depth) {
                    return find_end_of_subtree(node.left, depth - 1);
                } 
                else {
                    return find_end_of_subtree(node.right, depth - 1);
                }
            }
    
    
            let depth = get_left_depth_of_subtree(this._root);
            let end;
    
            if (this._root == null) {
                end = null;
            } 
            else {
                end = find_end_of_subtree(this._root, depth);
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
            } 
            else {
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
                    } 
                    else {
                        break;
                    }
                }
            }

            if (this._size != size) {
                throw new Error("the \"size\" field of the structure is incorrect.");
            }
        }
    }
}

