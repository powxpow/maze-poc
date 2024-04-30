class GameMaze {
    constructor(players, maps) {
		this.maps = maps;
        this.players = players;
        this.active = true;
        for(let i=0; i < players.length; i++) {
            let ctx = players[i].canvas.getContext('2d');
            let maze = players[i].maze.maze;
            MazeDraw.drawMaze(ctx, maze);
            MazeDraw.saveMaze(ctx);
            let start = this.maps.getStartLocation(maze);
            let loc = { 'rowY': start.row, 'colX': start.col};
            this.players[i].currentTile = loc;
            MazeDraw.drawPlayerSpriteAt(ctx, players[i].sprite, loc.rowY, loc.colX);
        }
        this.server = new GameMazeServerLocal(players);
    }

    run = () => {
        if(this.active) {
            //reset the maze(s) that are being used
            for (let player of this.players) {
                MazeDraw.restoreMaze(player.canvas.getContext('2d'))
            }
            for (let player of this.players) {
                let moves = player.requestedmove
                let tile = player.currentTile                
                if(moves.length > 0) {
                    tile = this.server.requestMove(player.id, moves)
                    player.currentTile = tile
                }

				let ctx = player.canvas.getContext('2d');
				let newMaze = this.server.checkNewMaze(player.id)
				if(newMaze) {
					let nextMaze = this.maps.getNextMaze(player.maze)
					player.maze = nextMaze
					let isLast = (nextMaze.name == this.maps.mazes.at(-1).name)
					let start = this.maps.getStartLocation(nextMaze.maze);
					let loc = { 'rowY': start.row, 'colX': start.col};
					player.currentTile = loc;
					MazeDraw.drawNewMaze(ctx, nextMaze.maze, player.sprite, loc, isLast)
				} else {
                	MazeDraw.drawPlayerSpriteAt(ctx, player.sprite, tile.rowY, tile.colX)
				}
			}
        }
    }
}