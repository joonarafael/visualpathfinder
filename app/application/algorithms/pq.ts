"use client";

// Priority Queue class for the A* algorithm.
// Priority Queue is a binary heap data structure where each element is associated with a priority.

export default class PriorityQueue<T> {
	queue: { element: T; priority: number }[] = [];

	enqueue(element: T, priority: number): void {
		this.queue.push({ element, priority });
		this.bubbleUp(this.queue.length - 1);
	}

	dequeue(): T | undefined {
		// explicitly specify return type as T
		if (this.isEmpty()) return undefined;
		const min = this.queue[0];
		this.queue[0] = this.queue.pop() as { element: T; priority: number }; // type cast
		this.heapify(0);
		return min.element;
	}

	// maintain the heap property (move element up until priority is equal to or greater than parent)
	bubbleUp(index: number): void {
		while (index > 0) {
			const parentIndex = Math.floor((index - 1) / 2);
			if (this.queue[index].priority >= this.queue[parentIndex].priority) break;
			[this.queue[index], this.queue[parentIndex]] = [
				this.queue[parentIndex],
				this.queue[index],
			];
			index = parentIndex;
		}
	}

	// restore the heap property (lowest priority at the root of the heap)
	heapify(index: number): void {
		const lastIndex = this.queue.length - 1;
		let largest = index;
		const left = 2 * index + 1;
		const right = 2 * index + 2;

		if (
			left <= lastIndex &&
			this.queue[left].priority < this.queue[largest].priority
		) {
			largest = left;
		}

		if (
			right <= lastIndex &&
			this.queue[right].priority < this.queue[largest].priority
		) {
			largest = right;
		}

		if (largest !== index) {
			[this.queue[index], this.queue[largest]] = [
				this.queue[largest],
				this.queue[index],
			];
			this.heapify(largest);
		}
	}

	isEmpty(): boolean {
		return this.queue.length === 0;
	}
}
