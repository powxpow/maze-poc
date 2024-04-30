class MazePlayer {
    constructor(id, color, move, canvas, maze) {
        this.id = id;
        this.color = color;
        this.canvas = canvas; //GAME canvas
        this.maze = maze
        this.currentTile = {colX: -1, rowY: -1}
        this.requestedmove = move;
		this.sprite = document.createElement('canvas');
		let size = 32
		this.sprite.width = size
		this.sprite.height = size
		this.sprite.style.border = "solid black 0.2mm";
		this.#drawPlayerSprite()
    }

	#drawPlayerSprite = () => {
		let ctx = this.sprite.getContext('2d')
		let size = 32
		let px = size / 2
		let py = (size + 4) / 2
		let r1= size / 4
		let r2= size / 5
		this.#drawPlayerShadow(ctx,px,py+r1,r1*1.5,r2*0.5,0,0,2*Math.PI,{globalCompositeOperation:'destination-out', fillStyle:'silver'});
		this.#drawPlayerEgg(ctx,px,py,r1+1,this.color);
	}

	#drawPlayerEgg = (ctx,x,y,r,color) => {
		ctx.save();
        let radgrad = ctx.createRadialGradient(x-4,y-8,0,x-4,y-8,r);
        radgrad.addColorStop(0, 'white');
        radgrad.addColorStop(1, color);
		ctx.fillStyle = radgrad // color 'cyan', 'tan', 'lightgreen', 'pink', 'chocolate'
		ctx.strokeStyle = 'black'
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI); //bottom half is circle
		ctx.ellipse(x,y,r,r*1.5,0,Math.PI,2*Math.PI); //top half is ellipse
		ctx.closePath();
		ctx.fill()
		ctx.stroke()
		ctx.restore();
	}

	#drawPlayerShadow = (ctx,x,y,r1,r2,rot,a1,a2) => {
		ctx.save();
		ctx.fillStyle = 'rgba(0,0,0, 0.5)' //opacity 
		ctx.beginPath();
		ctx.scale(1,1)
		ctx.ellipse(x,y,r1,r2,rot,a1,a2);
		ctx.closePath();
		ctx.fill()
		ctx.restore();
	}
}