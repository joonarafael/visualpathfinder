"use client";

// Priority Queue class for the A* algorithm.
// Priority Queue is a queue/stack data structure where each element is associated with a priority.

export default class PriorityQueue<T> {
	queue: { element: T; priority: number }[] = [];

	enqueue(element: T, priority: number): void {
		this.queue.push({ element, priority });
		this.sort();
	}

	dequeue(): T | undefined {
		if (!this.isEmpty()) {
			return this.queue.shift()?.element;
		}
	}

	sort(): void {
		this.queue.sort((a, b) => a.priority - b.priority);
	}

	isEmpty(): boolean {
		return this.queue.length === 0;
	}
}
