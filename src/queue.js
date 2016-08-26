const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() < this.maxSize) {
			this.heap.push(data, priority);
		} else {
			throw 'Max size of {} exceeded.'.format(this.maxSize);
		}
	}

	shift() {
		if (!this.isEmpty()) {
			return this.heap.pop();
		} else {
			throw 'Can not pop from empty queue.';
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
