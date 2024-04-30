class GameMazeServerLocal {
    constructor(players) {
        this.players = []
        //copy the players, so we maintain location on the server
        players.forEach( (player) => this.players.push(Object.assign({}, player)))
        this.maps = new MazeMaps()

        //check to see if the canvas is being shared
        //(for a real multiserver, see if both players on same IP Address and canvas.ids need to be appended to with hash)
        let canvii = []
        for(let player of players) {
            canvii.push(player.canvas.id)
        }
        this.sharedCanvii = canvii.filter(function(itm, i){
            return canvii.lastIndexOf(itm)== i && canvii.indexOf(itm)!= i;
        });
      }

    //TODO: limit the number of moves (prevent someone submitting the complete maze)
    //TODO: put this on a timer so someone can't spam the server with moves
    //TODO: tie the requestMove to the server's versions of the player instead of letting it be submitted "by id"
        //that is: prevent player2 from submitting player1's moves
    //TODO? some synchronization players so that all players get to move?

    requestMove = (playerId, moves) => {
        let player = this.players.find(x => x.id == playerId);
        let maze = player.maze.maze;
        player.currentTile = this.#getTile(maze, moves, player.currentTile);
        if(player.currentTile.rowY == 0) {

            //check to see if the canvas is being shared
            let isShared = this.sharedCanvii.findIndex(x => x == player.canvas.id) > -1;
            let allAtEnd = true;
            if(isShared) {
                let sharingPlayers = this.players.filter(x => x.canvas.id == player.canvas.id)
                for(let p of sharingPlayers) {
                    allAtEnd = p.currentTile.rowY == 0
                    if(!allAtEnd) {
                        break;
                    }
                }

                if(allAtEnd) {
                    let nextMaze = this.maps.getNextMaze(player.maze)
                    if (nextMaze.name != player.maze.name)
                    {
                        let start = this.maps.getStartLocation(nextMaze.maze);
                        let loc = { 'rowY': start.row, 'colX': start.col};
                        for(let p of sharingPlayers) {
                            p.maze = nextMaze;
                            p.currentTile = loc;
                            p.newMaze = true
                        }
                    }
                }
            } else {
                let nextMaze = this.maps.getNextMaze(player.maze)
                if (nextMaze.name != player.maze.name)
                {
                    let start = this.maps.getStartLocation(nextMaze.maze);
                    let loc = { 'rowY': start.row, 'colX': start.col};
                    player.maze = nextMaze;
                    player.currentTile = loc;
                    player.newMaze = true
                }
            }
        }
        return player.currentTile;
    }

    checkNewMaze(playerId) {
        let player = this.players.find(x => x.id == playerId);
        let rtn = player.newMaze;
        if(player.newMaze) {
            player.newMaze = false
        }
        return rtn
    }

    #getTile = (maze, moves, currentTile) => {
        let rtn = currentTile
        let reqMove = Object.assign({}, currentTile)
        let endMove = Object.assign({}, currentTile)
        if(moves.length > 0) {
            for(let move of moves) {
                switch(move) {
                    case  '↑':
                        reqMove.rowY = reqMove.rowY - 1;
                        break;
                    case '←':
                        reqMove.colX = reqMove.colX - 1;
                        break;
                    case '↓':
                        reqMove.rowY = reqMove.rowY + 1
                        break;
                    case '→':
                        reqMove.colX = reqMove.colX + 1;
                        break;
                }
                let tileType = this.maps.getTileType(maze, reqMove.rowY, reqMove.colX);
                //update every approved move (prevents moving through walls at edges)
                if(tileType == 0) { /*0 == floor*/
                    //update every valid move
                    endMove = Object.assign({}, reqMove)
                } else {
                    reqMove = Object.assign({}, endMove) //set it back
                }
            }
            if(endMove.colX != currentTile.colX || endMove.rowY != currentTile.rowY) {
                rtn = endMove
            }
            return rtn
        }
    }
}