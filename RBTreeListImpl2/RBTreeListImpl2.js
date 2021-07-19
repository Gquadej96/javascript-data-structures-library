
/**
 * Author: Quade Jones
 * GitHub: https://github.com/Gquadej96
 */


export class RBTreeListImpl2 {

    _root = null;


    constructor() {
        
    }


    _updateLocalFields(node) {
        let size = 1;

        if (node.left != null) {
            size = size + node.left.size;
        }

        if (node.right != null) {
            size = size + node.right.size;
        }

        node.size = size;
    }


    _rotateSubtreeLeft(node) {
        let root = node.left;

        node.left = root.right;
        root.right = node;

        if (node.left != null) {
            node.left.parent = node;
        }

        root.parent = node.parent;
        node.parent = root;

        return root;
    }


    _rotateSubtreeRight(node) {
        let root = node.right;

        node.right = root.left;
        root.left = node;

        if (node.right != null) {
            node.right.parent = node;
        }

        root.parent = node.parent;
        node.parent = root;

        return root;
    }


    add(index, item) {
        let size = this.getSize();

        if (index < 0 || index > size) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root;
        let prev = {parent: null, res: 0};

        if (index < size) {
            while (true) {
                let leftSize = 0;

                if (p.left != null) {
                    leftSize = p.left.size;
                }

                if (index == leftSize) {
                    break;
                } else if (index < leftSize) {
                    p = p.left;
                } else { // index > leftSize
                    index = index - leftSize - 1;
                    p = p.right;
                }
            }

            prev = {parent: p, res: -1};
            p = p.left;
        }
        
        while (p != null) {
            prev = {parent: p, res: 1};
            p = p.right;
        }

        p = {
            left: null, 
            right: null, 
            parent: prev.parent, 
            color: "RED", 
            item: item, 
            size: 1
        };
        //this._updateLocalFields(p);

        if (prev.parent != null) {
            let parent = prev.parent;

            if (prev.res < 0) {
                parent.left = p;
            } else { // prev.res > 0
                parent.right = p;
            }
        }

        while (p.parent != null 
            && p.parent.parent != null) {
            
            let parent = p.parent;
            let grandparent = parent.parent;

            if (grandparent.left != null 
                && grandparent.left.color == "RED" 
                && grandparent.right != null 
                && grandparent.right.color == "RED") {
                
                grandparent.color = "RED";
                grandparent.left.color = "BLACK";
                grandparent.right.color = "BLACK";

                this._updateLocalFields(parent);
                this._updateLocalFields(grandparent);

                p = grandparent;
                continue;
            }

            break;
        }

        if (p.parent != null 
            && p.parent.color == "RED") { // p.parent.parent != null
            
            let parent = p.parent;
            let grandparent = parent.parent;

            let prevGrandparent = grandparent;

            if (parent == grandparent.left) {
                if (p == parent.right) {
                    parent = this._rotateSubtreeRight(parent);
                    grandparent.left = parent;

                    this._updateLocalFields(parent.left);
                }

                grandparent = this._rotateSubtreeLeft(grandparent);
                grandparent.color = "BLACK";
                grandparent.right.color = "RED";

                this._updateLocalFields(grandparent.right);
                this._updateLocalFields(grandparent);
            } else { // parent == grandparent.right
                if (p == parent.left) {
                    parent = this._rotateSubtreeLeft(parent);
                    grandparent.right = parent;

                    this._updateLocalFields(parent.right);
                }

                grandparent = this._rotateSubtreeRight(grandparent);
                grandparent.color = "BLACK";
                grandparent.left.color = "RED";

                this._updateLocalFields(grandparent.left);
                this._updateLocalFields(grandparent);
            }

            if (grandparent.parent != null) {
                let greatGrandparent = grandparent.parent;

                if (prevGrandparent == greatGrandparent.left) {
                    greatGrandparent.left = grandparent;
                } else { // prevGrandparent == greatGrandparent.right
                    greatGrandparent.right = grandparent;
                }
            }

            p = grandparent;
        }

        while (p.parent != null) {
            p = p.parent;
            this._updateLocalFields(p);
        }

        this._root = p;
        this._root.color = "BLACK";
    }


    remove(index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }
        
        let p = this._root;

        while (true) {
            let leftSize = 0;

            if (p.left != null) {
                leftSize = p.left.size;
            }

            if (index == leftSize) {
                break;
            } else if (index < leftSize) {
                p = p.left;
            } else { // index > leftSize
                index = index - leftSize - 1;
                p = p.right;
            }
        }

        let prev = p;
        let target;
        let parent;

        if (p.left != null) {
            p = p.left;

            if (p.right != null) {
                do {
                    p = p.right;
                } while (p.right != null);

                prev.item = p.item;

                parent = p.parent;
                parent.right = p.left;

                target = p;
                p = p.left;
            } else {
                prev.item = p.item;

                parent = p.parent;
                parent.left = p.left;

                target = p;
                p = p.left;
            }
        } else {
            parent = p.parent;

            if (parent != null) {
                if (p == parent.left) {
                    parent.left = p.right;
                } else { // p == parent.right
                    parent.right = p.right;
                }
            }

            target = p;
            p = p.right;
        }

        if (p != null) {
            p.parent = parent;
        }

        if (target.color == "BLACK") {
            while ((p == null 
                || p.color == "BLACK") 
                && parent != null) {
                
                let sibling;

                // parent.left != null || parent.right != null
                if (p == parent.left) {
                    sibling = parent.right;
                } else { // p == parent.right
                    sibling = parent.left;
                }

                if (sibling.color == "BLACK" 
                    && (sibling.left == null 
                    || sibling.left.color == "BLACK") 
                    && (sibling.right == null 
                    || sibling.right.color == "BLACK")) {
                    
                    sibling.color = "RED";

                    this._updateLocalFields(parent);

                    p = parent;
                    parent = parent.parent;
                    continue;
                }

                break;
            }

            if (p != null 
                && p.color == "RED") {
                
                p.color = "BLACK";
            } else if (parent != null) {
                if (p == parent.left) {
                    let sibling = parent.right;

                    if (sibling.color == "RED") {
                        let prevParent = parent;
                        
                        parent = this._rotateSubtreeRight(parent);

                        parent.color = "BLACK";
                        parent.left.color = "RED";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        parent = parent.left;
                        sibling = parent.right;
                    }

                    if (sibling.right != null 
                        && sibling.right.color == "RED") {

                        let prevParent = parent;

                        parent = this._rotateSubtreeRight(parent);

                        parent.color = parent.left.color;
                        parent.left.color = "BLACK";
                        parent.right.color = "BLACK";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        this._updateLocalFields(parent.left);
                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    } else if (sibling.left != null 
                        && sibling.left.color == "RED") {

                        let prevParent = parent;
                        
                        sibling = this._rotateSubtreeLeft(sibling);
                        parent.right = sibling;
                        parent = this._rotateSubtreeRight(parent);

                        parent.color = parent.left.color;
                        parent.left.color = "BLACK";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        this._updateLocalFields(parent.left);
                        this._updateLocalFields(parent.right);
                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    } else { /*
                        (sibling.left == null || sibling.left.color == "BLACK") 
                        && (sibling.right == null || sibling.right.color == "BLACK")
                        */

                        sibling.color = "RED";
                        parent.color = "BLACK";

                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    }
                } else { // p == parent.right
                    let sibling = parent.left;

                    if (sibling.color == "RED") {
                        let prevParent = parent;

                        parent = this._rotateSubtreeLeft(parent);

                        parent.color = "BLACK";
                        parent.right.color = "RED";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        parent = parent.right;
                        sibling = parent.left;
                    }

                    if (sibling.left != null 
                        && sibling.left.color == "RED") {

                        let prevParent = parent;

                        parent = this._rotateSubtreeLeft(parent);

                        parent.color = parent.right.color;
                        parent.left.color = "BLACK";
                        parent.right.color = "BLACK";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        this._updateLocalFields(parent.right);
                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    } else if (sibling.right != null 
                        && sibling.right.color == "RED") {
                        
                        let prevParent = parent;

                        sibling = this._rotateSubtreeRight(sibling);
                        parent.left = sibling;
                        parent = this._rotateSubtreeLeft(parent);

                        parent.color = parent.right.color;
                        parent.right.color = "BLACK";

                        if (parent.parent != null) {
                            let grandparent = parent.parent;
        
                            if (prevParent == grandparent.left) {
                                grandparent.left = parent;
                            } else { // prevParent == grandparent.right
                                grandparent.right = parent;
                            }
                        }

                        this._updateLocalFields(parent.left);
                        this._updateLocalFields(parent.right);
                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    } else { /*
                        (sibling.left == null || sibling.left.color == "BLACK") 
                        && (sibling.right == null || sibling.right.color == "BLACK")
                        */

                        sibling.color = "RED";
                        parent.color = "BLACK";

                        this._updateLocalFields(parent);

                        p = parent;
                        parent = parent.parent;
                    }
                }
            }
        }

        while (parent != null) {
            this._updateLocalFields(parent);
            p = parent;
            parent = parent.parent;
        }

        this._root = p;
    }


    get(index) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root;

        while (true) {
            let leftSize = 0;

            if (p.left != null) {
                leftSize = p.left.size;
            }

            if (index == leftSize) {
                return p.item;
            } else if (index < leftSize) {
                p = p.left;
            } else { // index > leftSize
                index = index - leftSize - 1;
                p = p.right;
            }
        }

        // not reachable.
    }
    

    set(index, item) {
        if (index < 0 || index >= this.getSize()) {
            throw new Error("the index is out of bounds in the list.");
        }

        let p = this._root;

        while (true) {
            let leftSize = 0;

            if (p.left != null) {
                leftSize = p.left.size;
            }

            if (index == leftSize) {
                p.item = item;
                return;
            } else if (index < leftSize) {
                p = p.left;
            } else { // index > leftSize
                index = index - leftSize - 1;
                p = p.right;
            }
        }

        // not reachable.
    }


    getSize() {
        if (this._root != null) {
            return this._root.size;
        } else {
            return 0;
        }
    }
    

    doForEachItemInOrder(consumer) {
        let p = this._root;

        if (p != null) {
            while (p.left != null) {
                p = p.left;
            }

            let prev = null;

            while (true) {
                if (prev == p.left) {
                    consumer(p.item);
    
                    if (p.right != null) {
                        p = p.right;
        
                        while (p.left != null) {
                            p = p.left;
                        }
        
                        prev = null;
                        continue;
                    }
                }
    
                prev = p;
                p = p.parent;

                if (p == null) {
                    break;
                }
            }
        }
    }


    rebalance() {
        if (this._root == null) {
            return;
        }

        let size = this.getSize();

        {
            let p = this._root; // p != null

            while (p.left != null) {
                p = this._rotateSubtreeLeft(p);
            }

            let prev = p;

            this._root = p;
            p = p.right;

            while (p != null) {
                while (p.left != null) {
                    p = this._rotateSubtreeLeft(p);
                }
                
                p.parent.right = p;

                prev = p;
                p = p.right;
            }

            prev.right = { // a dummy node.
                left: null, 
                right: null, 
                color: "BLACK", 
                item: null, 
                size: 1
            };
            //this._updateLocalFields(p.value);
        }


        {
            let numOfLeaves = size + 1 - 2 ** Math.floor(Math.log2(size + 1));
            let p = this._root;
            
            if (numOfLeaves >= 1) {
                p = this._rotateSubtreeRight(p);
                this._root = p;

                this._updateLocalFields(p.left);

                p.left.color = "RED";
                p = p.right;
            }

            for (let i = 1; i < numOfLeaves; ++i) {
                
                p = this._rotateSubtreeRight(p);
                p.parent.right = p;

                this._updateLocalFields(p.left);

                p.left.color = "RED";
                p = p.right;
            }
        }

        {
            let p = this._root; // p != null

            while (p.right != null) {
                p = this._rotateSubtreeRight(p);
                this._root = p;

                this._updateLocalFields(p.left);

                p.left.color = "BLACK";
                p = p.right;

                while (p != null /*&& p.right != null*/) {
                    
                    p = this._rotateSubtreeRight(p);
                    p.parent.right = p;

                    this._updateLocalFields(p.left);

                    p.left.color = "BLACK";
                    p = p.right;
                }

                p = this._root;
            }
        }

        this._root = this._root.left;
        this._root.parent = null;
    }
    

    toArray() {
        let array = new Array();

        this.doForEachItemInOrder((item) => array.push(item));

        return array;
    }


    clone() {
        function cloneSubtree(node, parent) {
            if (node != null) {
                let newNode = {
                    left: null, 
                    right: null, 
                    parent: parent, 
                    color: node.color, 
                    item: node.item, 
                    size: node.size
                };

                newNode.left = cloneSubtree(node.left, newNode);
                newNode.right = cloneSubtree(node.right, newNode);

                return newNode;
            } else {
                return null;
            }
        }


        let inst = new RBTreeListImpl2(this._comparator);

        inst._root = cloneSubtree(this._root, null);

        return inst;
    }
    

    debugVerifyIntegrity() {
        // verify that the root is black.

        if (this._root != null && this._root.color == "RED") {
            throw new Error("the root is not black.");
        }


        // verify that all paths from the root to a leaf have the same black-length.

        {
            let stack = new Array();
            let p = this._root;
            let depth = 0;

            while (p != null) {
                if (p.color == "BLACK") {
                    depth = depth + 1;
                }

                stack.push({p: p, depth: depth});

                p = p.left;
            }

            while (stack.length > 0) {
                let info = stack.pop();
                let pathDepth = info.depth;

                p = info.p.right;

                while (p != null) {
                    if (p.color == "BLACK") {
                        pathDepth = pathDepth + 1;
                    }

                    stack.push({p: p, depth: pathDepth});

                    p = p.left;
                }

                if (pathDepth != depth) {
                    throw new Error("there are two paths from the root to a leaf which have different black-lengths.");
                }
            }
        }


        // verify that no paths have consecutive red nodes.

        {
            let stack = new Array();
            
            stack.push(this._root);

            while (stack.length > 0) {
                let node = stack.pop();

                if (node == null) {
                    continue;
                }

                stack.push(node.left);
                stack.push(node.right);

                if (node.color == "RED" 
                    && (
                        (node.left != null && node.right.color == "RED") 
                        || (node.right != null && node.right.color == "RED")
                    )) {
                    throw new Error("there is a pair of consecutive reds within the tree.");
                }
            }
        }
        

        // verify the "parent" attribute of each node.

        {
            if (this._root != null && this._root.parent != null) {
                throw new Error("the parent attribute of the root is not null.");
            }

            let stack = new Array();
            
            stack.push(this._root);

            while (stack.length > 0) {
                let node = stack.pop();

                if (node == null) {
                    continue;
                }

                stack.push(node.left);
                stack.push(node.right);

                if ((node.left != null && node.left.parent != node) 
                    || (node.right != null && node.right.parent != node)) {
                    throw new Error("the parent attribute of a node does not match the parent of its subtree.");
                }
            }
        }


        // verify the "size" attribute of each node.

        {
            function getSizeAndVerifySubtree(node) {
                if (node == null) {
                    return 0;
                }

                let size = getSizeAndVerifySubtree(node.left) + getSizeAndVerifySubtree(node.right) + 1;

                if (size != node.size) {
                    throw new Error("the size attribute of a node does not match the size of its subtree.");
                }

                return size;
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

