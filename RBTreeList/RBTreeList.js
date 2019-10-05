/*
Author: Quade Jones
Email: Gquadej96@live.com
*/


export class RBTreeList {

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

			color: "RED", 

			item: item, 
			size: 1
		};
		//this._update_local_fields(p.value);
		

		while (true) {
			if (stack.length < 2) {
				break;
			}


			let parent = stack.pop();
			let grandparent = stack.pop();

			if (grandparent.value.left.value != null 
				&& grandparent.value.left.value.color == "RED" 
				&& grandparent.value.right.value != null 
				&& grandparent.value.right.value.color == "RED") {
				
				grandparent.value.left.value.color = "BLACK";
				grandparent.value.right.value.color = "BLACK";
				grandparent.value.color = "RED";

				this._update_local_fields(parent.value);
				this._update_local_fields(grandparent.value);

				p = grandparent;
			} 
			else {
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
						this._rotate_subtree_right(parent);

						this._update_local_fields(parent.value.left.value);
					}

					this._rotate_subtree_left(grandparent);

					grandparent.value.right.value.color = "RED";
					grandparent.value.color = "BLACK";

					this._update_local_fields(grandparent.value.right.value);
					this._update_local_fields(grandparent.value);
				} 
				else { // parent == grandparent.value.right
					if (p == parent.value.left) {
						this._rotate_subtree_left(parent);

						this._update_local_fields(parent.value.right.value);
					}

					this._rotate_subtree_right(grandparent);

					grandparent.value.left.value.color = "RED";
					grandparent.value.color = "BLACK";

					this._update_local_fields(grandparent.value.left.value);
					this._update_local_fields(grandparent.value);
				}

				p = grandparent;
			} 
			else {
				stack.push(grandparent);
				stack.push(parent);
			}
		}

		while (stack.length > 0) {
			p = stack.pop();

			this._update_local_fields(p.value);
		}

		p.value.color = "BLACK";
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

		if (target.color == "BLACK") {
			while (true) {
				if (stack.length < 1 
					|| (p.value != null 
					&& p.value.color == "RED")) {
					
					break;
				}


				let parent = stack.pop();
				let sibling;

				if (p == parent.value.left) {
					sibling = parent.value.right;
				} 
				else { // p == parent.value.right
					sibling = parent.value.left;
				}

				if (/*sibling.value != null 
					&& */sibling.value.color == "BLACK" 
					&& (sibling.value.left.value == null 
					|| sibling.value.left.value.color == "BLACK") 
					&& (sibling.value.right.value == null 
					|| sibling.value.right.value.color == "BLACK")) {
					
					sibling.value.color = "RED";

					this._update_local_fields(parent.value);

					p = parent;
				} 
				else {
					stack.push(parent);
					break;
				}
			}

			if (p.value != null 
				&& p.value.color == "RED") {
				
				p.value.color = "BLACK";
			} 
			else if (stack.length >= 1) {
				let parent = stack.pop();
				
				if (p == parent.value.left) {
					let sibling = parent.value.right;

					if (sibling.value.color == "RED") {
						this._rotate_subtree_right(parent);

						parent.value.left.value.color = "RED";
						parent.value.color = "BLACK";

						stack.push(parent);

						this._update_local_fields(parent.value.left.value);
						this._update_local_fields(parent.value);
						
						parent = parent.value.left;
					}

					if (sibling.value.right.value != null 
						&& sibling.value.right.value.color == "RED") {

						this._rotate_subtree_right(parent);

						parent.value.color = parent.value.left.value.color;
						parent.value.left.value.color = "BLACK";
						parent.value.right.value.color = "BLACK";

						this._update_local_fields(parent.value.left.value);
						this._update_local_fields(parent.value);
					} 
					else if (sibling.value.left.value != null 
						&& sibling.value.left.value.color == "RED") {
						
						this._rotate_subtree_left(sibling);
						this._rotate_subtree_right(parent);

						parent.value.color = parent.value.left.value.color;
						parent.value.left.value.color = "BLACK";

						this._update_local_fields(parent.value.left.value);
						this._update_local_fields(parent.value.right.value);
						this._update_local_fields(parent.value);
					} 
					else { /*
						(sibling.value.left.value == null 
						|| sibling.value.left.value.color == "BLACK") 
						&& (sibling.value.right.value == null 
						|| sibling.value.right.value.color == "BLACK")
						*/
						sibling.value.color = "RED";
						parent.value.color = "BLACK";
					}
				} 
				else { // p == parent.value.right
					let sibling = parent.value.left;

					if (sibling.value.color == "RED") {
						this._rotate_subtree_left(parent);

						parent.value.right.value.color = "RED";
						parent.value.color = "BLACK";

						stack.push(parent);

						this._update_local_fields(parent.value.right.value);
						this._update_local_fields(parent.value);
						
						parent = parent.value.right;
					}

					if (sibling.value.left.value != null 
						&& sibling.value.left.value.color == "RED") {

						this._rotate_subtree_left(parent);

						parent.value.color = parent.value.right.value.color;
						parent.value.left.value.color = "BLACK";
						parent.value.right.value.color = "BLACK";

						this._update_local_fields(parent.value.right.value);
						this._update_local_fields(parent.value);
					} 
					else if (sibling.value.right.value != null 
						&& sibling.value.right.value.color == "RED") {
						
						this._rotate_subtree_right(sibling);
						this._rotate_subtree_left(parent);

						parent.value.color = parent.value.right.value.color;
						parent.value.right.value.color = "BLACK";

						this._update_local_fields(parent.value.left.value);
						this._update_local_fields(parent.value.right.value);
						this._update_local_fields(parent.value);
					} 
					else { /*
						(sibling.value.left.value == null 
						|| sibling.value.left.value.color == "BLACK") 
						&& (sibling.value.right.value == null 
						|| sibling.value.right.value.color == "BLACK")
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

			this._update_local_fields(p.value);
		}

		if (p.value != null) {
			p.value.color = "BLACK";
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

				color: "BLACK", 

				item: null, 
				size: 1
			};
			//this._update_local_fields(p.value);
		}


		{
			let num_of_leaves = size + 1 - 2 ** Math.floor(Math.log2(size + 1));
			let p = this._root;

			for (let i = 0; 
				i < num_of_leaves; 
				++i) {
				
				this._rotate_subtree_right(p);
				this._update_local_fields(p.value.left.value);

				p.value.left.value.color = "RED";
				p = p.value.right;
			}
		}

		{
			let p = this._root;

			while (p.value.right.value != null) {
				do {
					this._rotate_subtree_right(p);
					this._update_local_fields(p.value.left.value);

					p.value.left.value.color = "BLACK";
					p = p.value.right;
				} while (p.value != null 
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

						color: ref.value.color, 

						item: ref.value.item, 
						size: ref.value.size
					}
				};
			} 
			else {
				return {value: null};
			}
		}


		let inst = new RBTreeList();

        inst._root = clone_subtree(this._root);

        return inst;
	}


	debug_verify_integrity() {
		// verify that the root is black.

		if (this._root.color != null 
			&& this._root.value.color == "RED") {
			
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
				let item = stack.pop();
				let path_depth = item.depth;

				p = item.p.right.value;

				while (p != null) {
					if (p.color == "BLACK") {
						path_depth = path_depth + 1;
					}

					stack.push({p: p, depth: path_depth});

					p = p.left.value;
				}

				if (path_depth != depth) {
					throw new Error("there are two distinct paths from the root to a leaf which have different black-lengths.");
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
					&& ((node.left.value != null 
					&& node.right.value.color == "RED") 
					|| (node.right.value != null 
					&& node.right.value.color == "RED"))) {

					throw new Error("there is a pair of consecutive reds within the tree.");
				}
			}
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

