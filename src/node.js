class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		// Append left child
		if (this.left == null) {
			this.left = node;
		// Append right child
		} else if (this.right == null) {
			this.right = node;
		}
		node.parent = this;
	}

	removeChild(node) {
		// Remove left child
		if (this.left == node)  {
			this.left = null;
		// Remove right child
		} else if (this.right == node) {
			this.right = null;
		} else {
			throw 'Passed node is not a child of this node';
		}
		node.parent = null;
	}

	remove() {
		if (this.parent != null) {
			this.parent.removeChild(this);
		} 
	}

	swapWithParent() {
		if (this.parent != null) {
			const grandParent = this.parent.parent;
			const parent = this.parent;
			const leftChild = this.left;
			const rightChild = this.right;
			const sibling = this.getSibling();
			// Update  Parent's parent
			this.parent.parent = this;
			// Update Child's parent
			this.parent = grandParent;
			// Update Sibling's parent
			this.assignAsParentTo(sibling);
			// Update Child's children
			if (this == parent.left) {
				this.right = parent.right;
				this.left = parent;
			} else {
				this.left = parent.left;
				this.right = parent;
			}
			// Update Parent's children
			parent.left = leftChild;
			parent.right = rightChild;
			// Update Children's parent
            parent.assignAsParentTo(leftChild);
            parent.assignAsParentTo(rightChild);
			// Update Grandparent's children
			if (grandParent != null) {
				if (grandParent.left == parent) {
					grandParent.left = this;
				} else if (grandParent.right == parent) {
					grandParent.right = this;
				}
			}
		}
	}

	assignAsParentTo(node) {
	    if (node != null) {
	        node.parent = this;
        }
    }

	getSibling() {
		if (this.parent != null) {
			if (this.parent.left == this) {
				return this.parent.right;
			} else if (this.parent.right == this) {
				return this.parent.left;
			}
		}
		return null;
	}

	getChildWithHigherPriority() {
		if (this.right == null) {
		    return this.left;
        } else {
            return this.left.priority >= this.right.priority ? this.left : this.right;
        }
	}
}

module.exports = Node;
