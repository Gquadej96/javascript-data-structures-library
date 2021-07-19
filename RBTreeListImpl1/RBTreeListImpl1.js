/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class RBTreeListImpl1 {

    _root = {value: null};


    constructor() {
        
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


    add(index, item) {
        let size = this.getSize();

        if (index < 0 || index > size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let stack = new Array();
        let p = this._root;

        if (index < size) {
            while (true) {
                stack.push(p);

                let leftSize = 0;

                if (p.value.left.value != null) {
                    leftSize = p.value.left.value.size;
                }

                if (index == leftSize) {
                    break;
                } else if (index < leftSize) {
                    p = p.value.left;
                } else { // index > leftSize
                    index = index - leftSize - 1;
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
            color: "RED", 
            item: item, 
            size: 1
        };
        //this._updateLocalFields(p.value);
        

        while (true) {
            if (stack.length < 2) {
                break;
            }

            let parent = stack.pop();
            let grandparent = stack.pop();

            if (grandparent.value.left.value != null && grandparent.value.left.value.color == "RED" 
                && grandparent.value.right.value != null && grandparent.value.right.value.color == "RED") {
                
                grandparent.value.left.value.color = "BLACK";
                grandparent.value.right.value.color = "BLACK";
                grandparent.value.color = "RED";

                this._updateLocalFields(parent.value);
                this._updateLocalFields(grandparent.value);

                p = grandparent;
            } else {
                stack.push(grandparent);
                stack.push(parent);
                break;
            }
        }

        if (stack.length >= 2) {
            let parent = stack.pop();
            let grandparent = stack.pop();

            if (parent.value.color == "RED") {
                if (parent == grandparent.value.left) {
                    if (p == parent.value.right) {
                        this._rotateSubtreeRight(parent);

                        this._updateLocalFields(parent.value.left.value);
                    }

                    this._rotateSubtreeLeft(grandparent);

                    grandparent.value.right.value.color = "RED";
                    grandparent.value.color = "BLACK";

                    this._updateLocalFields(grandparent.value.right.value);
                    this._updateLocalFields(grandparent.value);
                } else { // parent == grandparent.value.right
                    if (p == parent.value.left) {
                        this._rotateSubtreeLeft(parent);

                        this._updateLocalFields(parent.value.right.value);
                    }

                    this._rotateSubtreeRight(grandparent);

                    grandparent.value.left.value.color = "RED";
                    grandparent.value.color = "BLACK";

                    this._updateLocalFields(grandparent.value.left.value);
                    this._updateLocalFields(grandparent.value);
                }

                p = grandparent;
            } else {
                stack.push(grandparent);
                stack.push(parent);
            }
        }

        while (stack.length > 0) {
            p = stack.pop();

            this._updateLocalFields(p.value);
        }

        p.value.color = "BLACK";
    }


    remove(index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }

        let stack = new Array();
        let p = this._root;

        while (true) {
            stack.push(p);

            let leftSize = 0;

            if (p.value.left.value != null) {
                leftSize = p.value.left.value.size;
            }

            if (index == leftSize) {
                break;
            } else if (index < leftSize) {
                p = p.value.left;
            } else { // index > leftSize
                index = index - leftSize - 1;
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
            } else {
                p = stack.pop(); // p = p
                replacement = p.value.right.value;
            }

            target = p.value;
            p.value = replacement;

            successor.item = target.item;
        }

        if (target.color == "BLACK") {
            while (true) {
                if (stack.length < 1 || (p.value != null && p.value.color == "RED")) {
                    break;
                }

                let parent = stack.pop();
                let sibling;

                if (p == parent.value.left) {
                    sibling = parent.value.right;
                } else { // p == parent.value.right
                    sibling = parent.value.left;
                }

                if (/*sibling.value != null 
                    && */sibling.value.color == "BLACK" 
                    && (sibling.value.left.value == null || sibling.value.left.value.color == "BLACK") 
                    && (sibling.value.right.value == null || sibling.value.right.value.color == "BLACK")) {
                    
                    sibling.value.color = "RED";
                    this._updateLocalFields(parent.value);
                    p = parent;
                } else {
                    stack.push(parent);
                    break;
                }
            }

            if (p.value != null && p.value.color == "RED") {
                p.value.color = "BLACK";
            } else if (stack.length >= 1) {
                let parent = stack.pop();
                
                if (p == parent.value.left) {
                    let sibling = parent.value.right;

                    if (sibling.value.color == "RED") {
                        this._rotateSubtreeRight(parent);

                        parent.value.left.value.color = "RED";
                        parent.value.color = "BLACK";

                        stack.push(parent);

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                        
                        parent = parent.value.left;
                    }

                    if (sibling.value.right.value != null && sibling.value.right.value.color == "RED") {
                        this._rotateSubtreeRight(parent);

                        parent.value.color = parent.value.left.value.color;
                        parent.value.left.value.color = "BLACK";
                        parent.value.right.value.color = "BLACK";

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value);
                    } else if (sibling.value.left.value != null && sibling.value.left.value.color == "RED") {
                        this._rotateSubtreeLeft(sibling);
                        this._rotateSubtreeRight(parent);

                        parent.value.color = parent.value.left.value.color;
                        parent.value.left.value.color = "BLACK";

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                    } else { /*
                        (sibling.value.left.value == null || sibling.value.left.value.color == "BLACK") 
                        && (sibling.value.right.value == null || sibling.value.right.value.color == "BLACK")
                        */
                        sibling.value.color = "RED";
                        parent.value.color = "BLACK";
                    }
                } else { // p == parent.value.right
                    let sibling = parent.value.left;

                    if (sibling.value.color == "RED") {
                        this._rotateSubtreeLeft(parent);

                        parent.value.right.value.color = "RED";
                        parent.value.color = "BLACK";

                        stack.push(parent);

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                        
                        parent = parent.value.right;
                    }

                    if (sibling.value.left.value != null && sibling.value.left.value.color == "RED") {
                        this._rotateSubtreeLeft(parent);

                        parent.value.color = parent.value.right.value.color;
                        parent.value.left.value.color = "BLACK";
                        parent.value.right.value.color = "BLACK";

                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                    } else if (sibling.value.right.value != null && sibling.value.right.value.color == "RED") {
                        this._rotateSubtreeRight(sibling);
                        this._rotateSubtreeLeft(parent);

                        parent.value.color = parent.value.right.value.color;
                        parent.value.right.value.color = "BLACK";

                        this._updateLocalFields(parent.value.left.value);
                        this._updateLocalFields(parent.value.right.value);
                        this._updateLocalFields(parent.value);
                    } else { /*
                        (sibling.value.left.value == null || sibling.value.left.value.color == "BLACK") 
                        && (sibling.value.right.value == null || sibling.value.right.value.color == "BLACK")
                        */
                        sibling.value.color = "RED";
                        parent.value.color = "BLACK";
                    }
                }

                p = parent;
            }
        }

        while (stack.length > 0) {
            p = stack.pop();

            this._updateLocalFields(p.value);
        }

        if (p.value != null) {
            p.value.color = "BLACK";
        }
    }
    

    get(index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root.value;

        while (true) {
            let leftSize = 0;

            if (p.left.value != null) {
                leftSize = p.left.value.size;
            }

            if (index == leftSize) {
                return p.item;
            } else if (index < leftSize) {
                p = p.left.value;
            } else { // index > leftSize
                index = index - leftSize - 1;
                p = p.right.value;
            }
        }

        // not reachable.
    }
    

    set(index, item) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root.value;

        while (true) {
            let leftSize = 0;

            if (p.left.value != null) {
                leftSize = p.left.value.size;
            }

            if (index == leftSize) {
                p.item = item;
                return;
            } else if (index < leftSize) {
                p = p.left.value;
            } else { // index > leftSize
                index = index - leftSize - 1;
                p = p.right.value;
            }
        }

        // not reachable.
    }


    getSize() {
        if (this._root.value != null) {
            return this._root.value.size;
        } else {
            return 0;
        }
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
                color: "BLACK", 
                item: null, 
                size: 1
            };
            //this._updateLocalFields(p.value);
        }


        {
            let numOfLeaves = size + 1 - 2 ** Math.floor(Math.log2(size + 1));
            let p = this._root;

            for (let i = 0; i < numOfLeaves; ++i) {
                this._rotateSubtreeRight(p);
                this._updateLocalFields(p.value.left.value);

                p.value.left.value.color = "RED";
                p = p.value.right;
            }
        }

        {
            let p = this._root;

            while (p.value.right.value != null) {
                do {
                    this._rotateSubtreeRight(p);
                    this._updateLocalFields(p.value.left.value);

                    p.value.left.value.color = "BLACK";
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
                        color: ref.value.color, 
                        item: ref.value.item, 
                        size: ref.value.size
                    }
                };
            } else {
                return {value: null};
            }
        }

        let inst = new RBTreeListImpl1();

        inst._root = cloneSubtree(this._root);
        return inst;
    }


    debugVerifyIntegrity() {
        // verify that the root is black.

        if (this._root.color != null && this._root.value.color == "RED") {
            throw new Error("the root is not black.");
        }


        // verify that all paths from the root to a leaf have the same black-length.

        {
            let stack = new Array();
            let p = this._root.value;
            let depth = 0;

            while (p != null) {
                if (p.color == "BLACK") {
                    depth = depth + 1;
                }

                stack.push({p: p, depth: depth});
                p = p.left.value;
            }

            while (stack.length > 0) {
                let info = stack.pop();
                let pathDepth = info.depth;

                p = info.p.right.value;

                while (p != null) {
                    if (p.color == "BLACK") {
                        pathDepth = pathDepth + 1;
                    }

                    stack.push({p: p, depth: pathDepth});
                    p = p.left.value;
                }

                if (pathDepth != depth) {
                    throw new Error("there are two paths from the root to a leaf which have different black-lengths.");
                }
            }
        }


        // verify that no paths have consecutive red nodes.

        {
            let stack = new Array();
            
            stack.push(this._root.value);

            while (stack.length > 0) {
                let node = stack.pop();

                if (node == null) {
                    continue;
                }

                stack.push(node.left.value);
                stack.push(node.right.value);

                if (node.color == "RED" 
                    && (
                        (node.left.value != null && node.right.value.color == "RED") 
                        || (node.right.value != null && node.right.value.color == "RED")
                    )) {
                    throw new Error("there is a pair of consecutive reds within the tree.");
                }
            }
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

