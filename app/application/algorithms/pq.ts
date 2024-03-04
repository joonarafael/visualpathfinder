"use client";

// This Priority Queue class is a binary heap data structure.
// It stores enqueued nodes in a binary heap and maintains the order depending on the priority level associated with every node.

export default class PriorityQueue<T> {
	heap: { element: T; priority: number }[] = [];

	// add an element
	enqueue(element: T, priority: number): void {
		this.heap.push({ element, priority });
		this.bubbleUp();
	}

	// pop an element
	dequeue(): T | undefined {
		if (!this.isEmpty()) {
			const top = this.heap[0];
			const last = this.heap.pop();

			if (this.heap.length > 0 && last !== undefined) {
				this.heap[0] = last;
				this.bubbleDown();
			}

			return top?.element;
		}
	}

	// method to transfer the newly added element to its correct position in the binary heap
	bubbleUp(): void {
		let index = this.heap.length - 1;

		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);

			if (this.heap[index].priority < this.heap[parentIndex].priority) {
				this.swap(index, parentIndex);
				index = parentIndex;
			} else {
				break;
			}
		}
	}

	// method to maintain the correct order of the binary heap after top element has been popped
	bubbleDown(): void {
		let index = 0;

		while (true) {
			const leftChildIndex = 2 * index + 1;
			const rightChildIndex = 2 * index + 2;

			let smallestChildIndex = index;

			if (
				leftChildIndex < this.heap.length &&
				this.heap[leftChildIndex].priority <
					this.heap[smallestChildIndex].priority
			) {
				smallestChildIndex = leftChildIndex;
			}

			if (
				rightChildIndex < this.heap.length &&
				this.heap[rightChildIndex].priority <
					this.heap[smallestChildIndex].priority
			) {
				smallestChildIndex = rightChildIndex;
			}

			if (smallestChildIndex !== index) {
				this.swap(index, smallestChildIndex);
				index = smallestChildIndex;
			} else {
				break;
			}
		}
	}

	// helper function to perform the swap operation
	swap(i: number, j: number): void {
		const temp = this.heap[i];
		this.heap[i] = this.heap[j];
		this.heap[j] = temp;
	}

	// check if heap is empty
	isEmpty(): boolean {
		return this.heap.length === 0;
	}

	contains(element: T): boolean {
		return this.heap.some((item) => item.element === element);
	}
}
