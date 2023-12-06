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

