//MazeMaps current rules: 
//1) only one square of the bottom row is open (maze start)
//2) only one square of the top row is open (maze end)
class MazeMaps {
	constructor () {
		let map1 = [
			0b11111111101, 0b10000000001, 0b10111111111, 0b10000000001,
			0b11111111101, 0b10000000001, 0b10111111111, 0b10000000001,
			0b11111111101, 0b10000000001, 0b10111111111 ]
		let map0 = [ 
			0b11111011111, 0b11111011111, 0b11111011111, 0b11100000111,
			0b11100000111, 0b11100000111, 0b11100000111, 0b11100000111, 
			0b11111011111, 0b11111011111, 0b11111011111 ]
		let map2 = [
			0b11111111101, 0b10000000101, 0b10111110101, 0b10100000101,
			0b10101111101, 0b10101000101, 0b10101010101, 0b10101010101,
			0b10101010101, 0b10100010001, 0b10111111111 ]

		/*
		let connector = [ 0b10000000001 ]

		let map4 = []
			map4.push(...map0)
			map4.push(...connector)
			map4.push(...map1)
			map4.push(...connector)
			map4.push(...map2) */
	
		this.mazes = [
			{name: "Straight Maze", maze: this.#toMaze(map0)},
			{name: "Zig Zag Maze", maze: this.#toMaze(map1)},
			{name: "Simple Maze", maze: this.#toMaze(map2)},
		]
	}

	#toMaze (map) {
		let maze = []
		for (const [rowIdx, row] of map.entries()) {
			let binStr = row.toString(2).split('')
			//feedback(rowIdx + ' ' + binStr + ' ' + binStr.length)
			maze.push(binStr)
		}
		return maze
	}

	getNextMaze(maze) {
		let rtn = maze
		let idx = this.mazes.findIndex(x => x.name == maze.name)
		if(idx >= 0 && idx < this.mazes.length - 1) {
			rtn = this.mazes[idx + 1]
		}
   		return rtn
	}

	getStartLocation(maze) {
		//get the last row
		let rowIdx = maze.length - 1
		let loc = {row: rowIdx, col: 0}
		for (const [colIdx, square] of maze[rowIdx].entries()) {
			if(square==0) {
				loc.col = colIdx
			}
		}
		return loc
	}

	getTileType(maze, row, col) {
		//0 floor, 1 wall
		let rtn = 1
		if (maze[row] != undefined) {
			if(maze[row][col] != undefined) {
				rtn = maze[row][col]
			}
		}
		return rtn
	}
}