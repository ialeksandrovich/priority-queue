const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.sizeCounter = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	pop() {
		if (!this.isEmpty()) {
			this.sizeCounter--;
			let detachedNode = this.detachRoot();
			if (this.parentNodes.length > 0) { // if not last node detached
				this.restoreRootFromLastInsertedNode(detachedNode);
				this.shiftNodeDown(this.root);
			}
			return detachedNode.data;
		}
	}

	detachRoot() {
		let detachedNode = this.root;
		if (this.parentNodes[0] == detachedNode) {
			this.parentNodes.shift();
		}
		this.root = null;
		return detachedNode;
	}

	restoreRootFromLastInsertedNode(detachedNode) {
		if (this.size() > 0) {
		    let lastInsertedNode = this.parentNodes[this.parentNodes.length - 1];
            let detachedNodeChildren = [detachedNode.left, detachedNode.right];
            // Handle parentNodes changes
            // if lastInsertedNode is child of detached root
            if (detachedNodeChildren.indexOf(lastInsertedNode) >= 0) {
                this.parentNodes.unshift(lastInsertedNode);
            // if lastInsertedNode is right child of non-root
            } else if (lastInsertedNode.parent.right == lastInsertedNode) {
                this.parentNodes.unshift(lastInsertedNode.parent);
            }
            this.parentNodes.pop();
            // Assign new root
            this.root = lastInsertedNode;
            // Remove last inserted node
            lastInsertedNode.remove();
            // Handle detached node's right relationship
            lastInsertedNode.right = detachedNode.right;
            lastInsertedNode.assignAsParentTo(lastInsertedNode.right);
            // Handle detached node's left relationship
            lastInsertedNode.left = detachedNode.left;
            lastInsertedNode.assignAsParentTo(lastInsertedNode.left);
		}
	}

	size() {
		return this.sizeCounter;
	}

	isEmpty() {
		return this.sizeCounter == 0;
	}

	clear() {
		this.sizeCounter = 0;
		this.root = null;
		this.parentNodes = [];
	}

	insertNode(node) {
		if (this.isEmpty()) {
			// Assings passed node to this.root if heap is empty
			this.root = node;
		} else {
			// Inserts nodes to correct places
			this.parentNodes[0].appendChild(node);
			// Maintains this.parentNodes in correct state
			if (this.parentNodes[0].right != null) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
		this.sizeCounter++;
	}

	shiftNodeUp(node) {
		let indexOfNode = this.parentNodes.indexOf(node);
        let indexOfParent = this.parentNodes.indexOf(node.parent);

		if (node.parent == null) {
				this.root = node;
			} else if (node.priority > node.parent.priority) {
            // Only one node is in parent nodes
			if (indexOfNode >= 0 && indexOfParent <0) {
				this.parentNodes[indexOfNode] = node.parent;
			// Both are in parent nodes
			} else if (indexOfNode >= 0 && indexOfParent >= 0) {
				this.parentNodes[indexOfNode] = node.parent;
				this.parentNodes[indexOfParent] = node;
			}
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	shiftNodeDown(node) {
        let swapCandidateNode = node.getChildWithHigherPriority();
        let indexOfNode = this.parentNodes.indexOf(node);
        let indexOfswapCandidateNode = this.parentNodes.indexOf(swapCandidateNode);
		if (swapCandidateNode != null) {

            if (swapCandidateNode.priority >= node.priority) {
                if (this.root == node) {
                    this.root = swapCandidateNode;
                }
                // Only one node is in parent nodes
                if (indexOfswapCandidateNode >= 0 && indexOfNode < 0) {
                    this.parentNodes[indexOfswapCandidateNode] = node;
                // Both are in parent nodes
                } else if (indexOfswapCandidateNode >= 0 && indexOfNode >= 0) {
                    this.parentNodes[indexOfNode] = swapCandidateNode;
                    this.parentNodes[indexOfswapCandidateNode] = node;
                }
                swapCandidateNode.swapWithParent();
                this.shiftNodeDown(node);
            }
		}
	}
}

module.exports = MaxHeap;
