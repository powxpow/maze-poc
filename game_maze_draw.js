class MazeDraw {
	static drawMaze(ctx, maze, isLast) {
		this.#drawFloors(ctx, maze, isLast)
		this.#drawWalls(ctx, maze)
	}

	static #drawFloors(ctx, maze, isLast) {
		for (const [rowIdx, row] of maze.entries()) {
			for (const [colIdx, square] of row.entries()) {
				if(square==0) {
					let grad = ctx.createLinearGradient(200, 20, 10, 20);
					switch (rowIdx) {
						case 0:
							if(isLast) {
								grad.addColorStop(1, '#fbb');
								grad.addColorStop(0, '#b00');
							} else {
								grad.addColorStop(1, '#f8f');
								grad.addColorStop(0, '#808');
							}
							
							break;
						case 10:
							grad.addColorStop(1, 'rgba(127, 255, 123, 1)');
							grad.addColorStop(0, 'rgba(0, 255, 0, 1)');
							break;
						default:
							grad.addColorStop(1, 'rgba(255, 255, 255, 1)');
							grad.addColorStop(0, 'rgba(120, 120, 120, 1)');
					}
					let fill = grad
					let border = grad
					this.#drawTile(ctx, rowIdx, colIdx, fill, border)
				}
			}
		}
	}

	static #drawWalls(ctx, maze) {
		for (const [rowIdx, row] of maze.entries()) {
			for (const [colIdx, square] of row.entries()) {
				if(square==1) {
					let fill = '#444';
					let border = 'black';
					this.#drawTile(ctx, rowIdx, colIdx, fill, border);
				}
			}
		}
	}

	static #drawTile(ctx, row, col, fill, border) {
		const size = 32;
		let aLeft = col * size
		let aTop = row * size
		ctx.save()
		ctx.fillStyle = fill
		ctx.beginPath()
		ctx.fillRect(aLeft,aTop,size, size);
		ctx.closePath()
		ctx.strokeStyle = border
		ctx.beginPath()
		ctx.strokeRect(aLeft, aTop, size, size);
		ctx.closePath()
		ctx.restore()
	}

	static saveMaze(ctx, override) {
		let canv1 = ctx.canvas
		if (override || !canv1.save) {
			//only save it once (background image)
			canv1.save = document.createElement("canvas")
			canv1.save.width = canv1.width
			canv1.save.height = canv1.height
			canv1.save.getContext('2d').drawImage(canv1, 0, 0);
		}
	}

	static restoreMaze(ctx) {
		ctx.drawImage(ctx.canvas.save, 0, 0);
	}

	static drawPlayerSpriteAt(ctx, sprite, rowY, colX) {
		let size = 32
		let px = colX * size
		let py = rowY * size
		ctx.drawImage(sprite, px, py);
	}

    static drawNewMaze = (ctx, maze, sprite, loc, isLast) => {
		MazeDraw.drawMaze(ctx, maze, isLast);
		MazeDraw.saveMaze(ctx, true);
		MazeDraw.drawPlayerSpriteAt(ctx, sprite, loc.rowY, loc.colX);

	}
}