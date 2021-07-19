/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


export class AVLTreeList {

    _root = {value: null};


    constructor() {
        
    }


    _update_local_fields(node) {
        let size = 1;

        if (node.left.value != null) {
            size = size + node.left.value.size;
        }
    
        if (node.right.value != null) {
            size = size + node.right.value.size;
        }

        node.size = size;
    }


    _rotate_subtree_left(ref) {
        let root = ref.value;

        ref.value = root.left.value;
        root.left.value = ref.value.right.value;
        ref.value.right.value = root;
    }


    _rotate_subtree_right(ref) {
        let root = ref.value;

        ref.value = root.right.value;
        root.right.value = ref.value.left.value;
        ref.value.left.value = root;
    }


    insert(index, item) {
        let size = this.get_size();

        if (index < 0 
            || index > size) {
            
            throw new Error("the index is out of bounds in the list.");
        }


        let stack = new Array();
        let p = this._root;

        if (index < size) {
            while (true) {
                stack.push(p);


                let left_size = 0;

                if (p.value.left.value != null) {
                    left_size = p.value.left.value.size;
                }

                if (index == left_size) {
                    break;
                } 
                else if (index < left_size) {
                    p = p.value.left;
                } 
                else { // index > left_size
                    index = index - left_size - 1;
                    p = p.value.right;
                }
            }

            p = p.value.left;
        }

        while (p.value != null) {
            stack.push(p);
            p = p.value.right;
        }

        p.value = {
            left: {value: null}, 
            right: {value: null}, 

            bias: 0, 

            item: item, 
            size: 1
        };
        //this._update_local_fields(p.value);


        while (stack.length > 0) {
            let parent = stack.pop();

            if (p == parent.value.left) {
                if (parent.value.bias == 0) {
                    parent.value.bias = -1;

                    this._update_local_fields(parent.value);
                    p = parent;
                } 
                else if (parent.value.bias < 0) {
                    if (p.value.bias == 0) { // should never happen.
                        this._rotate_subtree_left(parent);

                        parent.value.right.value.bias = -1;
                        parent.value.bias = 1;

                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    } 
                    else if (p.value.bias < 0) {
                        this._rotate_subtree_left(parent);

                        parent.value.right.value.bias = 0;
                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    } 
                    else { // p.value.bias > 0
                        this._rotate_subtree_right(p);
                        this._rotate_subtree_left(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } 
                        else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } 
                        else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    }
                } 
                else { // parent.value.bias > 0
                    parent.value.bias = 0;

                    this._update_local_fields(parent.value);
                    p = parent;
                    break;
                }
            } 
            else { // p == parent.value.right
                if (parent.value.bias == 0) {
                    parent.value.bias = 1;

                    this._update_local_fields(parent.value);
                    p = parent;
                } 
                else if (parent.value.bias < 0) {
                    parent.value.bias = 0;

                    this._update_local_fields(parent.value);
                    p = parent;
                    break;
                } 
                else { // parent.value.bias > 0
                    if (p.value.bias == 0) { // should never happen.
                        this._rotate_subtree_right(parent);

                        parent.value.left.value.bias = 1;
                        parent.value.bias = -1;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    } 
                    else if (p.value.bias < 0) {
                        this._rotate_subtree_left(p);
                        this._rotate_subtree_right(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } 
                        else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } 
                        else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    } 
                    else { // p.value.bias > 0
                        this._rotate_subtree_right(parent);

                        parent.value.left.value.bias = 0;
                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    }
                }
            }
        }


        while (stack.length > 0) {
            p = stack.pop();

            this._update_local_fields(p.value);
        }
    }


    remove(index) {
        if (index < 0 
            || index >= this.get_size()) {
            
            throw new Error("the index is out of bounds in the list.");
        }
        

        let stack = new Array();
        let p = this._root;

        while (true) {
            stack.push(p);


            let left_size = 0;

            if (p.value.left.value != null) {
                left_size = p.value.left.value.size;
            }

            if (index == left_size) {
                break;
            } 
            else if (index < left_size) {
                p = p.value.left;
            } 
            else { // index > left_size
                index = index - left_size - 1;
                p = p.value.right;
            }
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
                } while (p.value != null);

                p = stack.pop();

                replacement = p.value.left.value;
            } 
            else {
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

                    this._update_local_fields(parent.value);
                    p = parent;
                    break;
                } 
                else if (parent.value.bias < 0) {
                    parent.value.bias = 0;

                    this._update_local_fields(parent.value);
                    p = parent;
                } else { // parent.value.bias > 0
                    p = parent.value.right;

                    if (p.value.bias == 0) {
                        this._rotate_subtree_right(parent);

                        parent.value.left.value.bias = 1;
                        parent.value.bias = -1;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    } 
                    else if (p.value.bias < 0) {
                        this._rotate_subtree_left(p);
                        this._rotate_subtree_right(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } 
                        else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } 
                        else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    } 
                    else { // p.value.bias > 0
                        this._rotate_subtree_right(parent);

                        parent.value.left.value.bias = 0;
                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    }
                }
            } 
            else { // p == parent.value.right;
                if (parent.value.bias == 0) {
                    parent.value.bias = -1;

                    this._update_local_fields(parent.value);
                    p = parent;
                    break;
                } 
                else if (parent.value.bias < 0) {
                    p = parent.value.left;

                    if (p.value.bias == 0) {
                        this._rotate_subtree_left(parent);

                        parent.value.right.value.bias = -1;
                        parent.value.bias = 1;

                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                        break;
                    } 
                    else if (p.value.bias < 0) {
                        this._rotate_subtree_left(parent);

                        parent.value.right.value.bias = 0;
                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    } 
                    else { // p.value.bias > 0
                        this._rotate_subtree_right(p);
                        this._rotate_subtree_left(parent);

                        if (parent.value.bias == 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 0;
                        } 
                        else if (parent.value.bias < 0) {
                            parent.value.left.value.bias = 0;
                            parent.value.right.value.bias = 1;
                        } 
                        else { // parent.value.bias > 0
                            parent.value.left.value.bias = -1;
                            parent.value.right.value.bias = 0;
                        }

                        parent.value.bias = 0;

                        this._update_local_fields(parent.value.left.value);
                        this._update_local_fields(parent.value.right.value);
                        this._update_local_fields(parent.value);
                        p = parent;
                    }
                } else { // parent.value.bias > 0
                    parent.value.bias = 0;

                    this._update_local_fields(parent.value);
                    p = parent;
                }
            }
        }


        while (stack.length > 0) {
            p = stack.pop();

            this._update_local_fields(p.value);
        }
    }


    get(index) {
        if (index < 0 
            || index >= this.get_size()) {
            
            throw new Error("the index is out of bounds in the list.");
        }


        let p = this._root.value;

        while (true) {
            let left_size = 0;

            if (p.left.value != null) {
                left_size = p.left.value.size;
            }

            if (index == left_size) {
                return p.item;
            } 
            else if (index < left_size) {
                p = p.left.value;
            } 
            else { // index > left_size
                index = index - left_size - 1;
                p = p.right.value;
            }
        }

        // not reachable.
    }


    set(index, item) {
        if (index < 0 
            || index >= this.get_size()) {
            
            throw new Error("the index is out of bounds in the list.");
        }


        let p = this._root.value;

        while (true) {
            let left_size = 0;

            if (p.left.value != null) {
                left_size = p.left.value.size;
            }

            if (index == left_size) {
                p.item = item;
                return;
            } 
            else if (index < left_size) {
                p = p.left.value;
            } 
            else { // index > left_size
                index = index - left_size - 1;
                p = p.right.value;
            }
        }

        // not reachable.
    }


    get_size() {
        if (this._root.value != null) {
            return this._root.value.size;
        } 
        else {
            return 0;
        }
    }


    do_for_each_item_in_order(consumer) {
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
        let size = this.get_size();

        {
            let p = this._root;

            while (p.value != null) {
                if (p.value.left.value != null) {
                    this._rotate_subtree_left(p);
                } 
                else {
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
            //this._update_local_fields(p.value);
        }


        {
            let p = this._root.value;

            while (p != null) {
                p.bias = 0;
                p = p.right.value;
            }
        }


        {
            let num_of_leaves = size + 1 - 2 ** Math.floor(Math.log2(size + 1));
            let p = this._root;

            for (let i = 0; 
                i < num_of_leaves; 
                ++i) {
                
                this._rotate_subtree_right(p);
                this._update_local_fields(p.value.left.value);

                p.value.bias = 1;
                p = p.value.right;
            }
        }

        {
            let p = this._root;

            while (p.value.right.value != null) {
                do {
                    this._rotate_subtree_right(p);
                    this._update_local_fields(p.value.left.value);


                    let bias = p.value.left.value.bias;

                    p.value.left.value.bias = (p.value.bias + p.value.left.value.bias) % 2 * -1;
                    p.value.bias = bias;
                    p = p.value.right;
                } 
                while (p.value != null 
                    /*&& p.value.right.value != null*/);

                p = this._root;
            }
        }

        this._root.value = this._root.value.left.value;
    }


    to_array() {
        let array = new Array();

        this.do_for_each_item_in_order((item) => array.push(item));

        return array;
    }
    

    clone() {
        function clone_subtree(ref) {
            if (ref.value != null) {
                return {
                    value: {
                        left: clone_subtree(ref.value.left), 
                        right: clone_subtree(ref.value.right), 
        
                        bias: ref.value.bias, 
                        
                        item: ref.value.item, 
                        size: ref.value.size
                    }
                };
            } 
            else {
                return {value: null};
            }
        }


        let inst = new AVLTreeList();

        inst._root = clone_subtree(this._root);

        return inst;
    }


    debug_verify_integrity() {
        // verify the "bias" attribute of each node.

        {
            function get_height_and_verify_subtree(node) {
                if (node == null) {
                    return 0;
                }


                let left_height = get_height_and_verify_subtree(node.left.value);
                let right_height = get_height_and_verify_subtree(node.right.value);

                let bias = right_height - left_height;

                if (bias != node.bias) {
                    throw new Error("the bias attribute of a node does not match the bias implied by the height of its subtrees.");
                }


                let height = Math.max(left_height, right_height);

                return height + 1;
            };

            get_height_and_verify_subtree(this._root.value);
        }


        // verify the "size" attribute of each node.

        {
            function get_size_and_verify_subtree(node) {
                if (node == null) {
                    return 0;
                }

                
                let size = get_size_and_verify_subtree(node.left.value) + get_size_and_verify_subtree(node.right.value) + 1;

                if (size != node.size) {
                    throw new Error("the size attribute of a node does not match the size of its subtree.");
                }

                return size;
            };

            get_size_and_verify_subtree(this._root.value);
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

