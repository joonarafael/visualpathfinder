import PriorityQueue from "@/app/application/algorithms/pq";

describe("PriorityQueue", () => {
	let pq: PriorityQueue<number>;

	beforeEach(() => {
		pq = new PriorityQueue<number>();
	});

	test("enqueue adds elements with correct priority", () => {
		pq.enqueue(3, 1);
		pq.enqueue(1, 3);
		pq.enqueue(2, 2);

		expect(pq.heap).toEqual([
			{ element: 3, priority: 1 },
			{ element: 1, priority: 3 },
			{ element: 2, priority: 2 },
		]);
	});

	test("dequeue removes and returns the highest priority element", () => {
		pq.enqueue(3, 1);
		pq.enqueue(1, 3);
		pq.enqueue(2, 2);

		const result = pq.dequeue();

		expect(result).toBe(3);
		expect(pq.heap).toEqual([
			{ element: 2, priority: 2 },
			{ element: 1, priority: 3 },
		]);
	});

	test("dequeue returns undefined when the queue is empty", () => {
		const result = pq.dequeue();

		expect(result).toBeUndefined();
	});

	test("sort maintains the correct order of elements", () => {
		pq.enqueue(3, 1);
		pq.enqueue(1, 3);
		pq.enqueue(2, 2);

		expect(pq.heap).toEqual([
			{ element: 3, priority: 1 },
			{ element: 1, priority: 3 },
			{ element: 2, priority: 2 },
		]);
	});

	test("isEmpty returns true when the queue is empty", () => {
		expect(pq.isEmpty()).toBe(true);
	});

	test("isEmpty returns false when the queue is not empty", () => {
		pq.enqueue(3, 1);

		expect(pq.isEmpty()).toBe(false);
	});
});
