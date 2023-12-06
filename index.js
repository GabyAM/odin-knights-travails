function knightMoves(start, end) {
	const moves = [
		[1, 2],
		[1, -2],
		[-1, 2],
		[-1, -2],
		[2, 1],
		[2, -1],
		[-2, -1],
		[-2, 1],
	];

	function getValidMoves(pos) {
		const movesArray = [];
		for (const move of moves) {
			const column = move[0] + pos[0];
			const row = move[1] + pos[1];
			if (column >= 0 && column <= 7 && row >= 0 && row <= 7) {
				movesArray.push([column, row]);
			}
		}
		return movesArray;
	}

	/*console.log(
		"valid moves for [0,0]: " +
			getValidMoves([3, 3]).map((move) => {
				return `[${move}]`;
			})
	);*/

	//compares two arrays
	function areEqual(first, second) {
		if (first.length !== second.length) return false;
		for (let i = 0; i < first.length; i++) {
			if (first[i] !== second[i]) {
				return false;
			}
		}
		return true;
	}

	function containsArray(searchArray, targetArray) {
		for (let i = 0; i < searchArray.length; i++) {
			const item = searchArray[i];
			if (areEqual(item, targetArray)) {
				return true;
			}
		}
		return false;
	}

	const queue = [];
	const parents = new Map();
	queue.push(start);
	let contains = areEqual(queue, end);
	while (queue.length) {
		const currentPos = queue.shift();
		/*if the queue already contains the end of the sequence,
		it means that the shortest path was already found
		so there is no need to keep searching*/
		if (contains) {
			break;
		}
		const validMoves = getValidMoves(currentPos);
		validMoves.forEach((move) => {
			if (!parents.has(`[${move}]`)) parents.set(`[${move}]`, currentPos);
			queue.push(move);
		});
		contains = containsArray(validMoves, end);
	}
	const sequence = [];
	let ref = end;
	sequence.push(`[${ref}]`);
	while (!areEqual(ref, start)) {
		ref = parents.get(`[${ref}]`);
		sequence.push(`[${ref}]`);
	}

	return sequence.reverse();
	/*
	BFS algorythm
	-start from the start cell coordinates, queue it
	-dequeue and queue all the possible moves (calculated with an array of moves)
		for a move to be valid, the current coordinates after applying the move, should be between [0,0] & [7,7]
	-repeat until the queue value is equal to the end value
		(update: repeat until the queue contains the end value)
	*/
}

function test() {
	function testFunction(start, end, expectedLength) {
		const func = knightMoves(start, end);
		if (func.length > expectedLength) {
			console.log("Error: The sequence is longer than expected");
		} else {
			console.log(
				`Passed: the sequence from ${start} to ${end} is ${func}`
			);
		}
	}

	let start;
	let end;

	start = [0, 0];
	end = [1, 2];
	testFunction(start, end, 2);

	start = [2, 3];
	end = [4, 4];
	testFunction(start, end, 2);

	start = [7, 7];
	end = [6, 5];
	testFunction(start, end, 2);

	start = [3, 5];
	end = [7, 1];
	testFunction(start, end, 5);

	start = [0, 0];
	end = [7, 7];
	testFunction(start, end, 8);

	start = [2, 1];
	end = [6, 6];
	testFunction(start, end, 5);

	start = [1, 4];
	end = [7, 0];
	testFunction(start, end, 6);
}

test();
