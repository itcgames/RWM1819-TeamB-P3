class Player {

    constructor(x, y, grid)
    {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.width = 32;
        this.height = 32;
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
        this.velocity = new Vector2(0,0);
        //Create circle collider
        this.collider = new CollisionCircle(this.x, this.y, this.width);
        this.load();
        this.frameIndex = 0;
       
        this.loop = true;

       // this.wall = type;

        this.moveDistance = 32;
        this.moveDirection = new Vector2(0,0);
        this.speed = .4;
          
        this.halt = .4;
        this.position = new Vector2(this.x,this.y);
        var image = new Image(256,32);
        image.src = "./ASSETS/SPRITES/Pacman72.png"
        this.pS = new Sprite(this.position.x, this.position.y, 32, 32, image, 32,32, true, 8)

        this.gridPosition = new Vector2(this.position.x/ 32, this.position.y /32);
        this.gridRef = grid;
    }

    load()
    {
        this.image.src = "./ASSETS/SPRITES/Pacman72.png"

    }

    render(ctx, input)
    {
        ctx.save();

            if(this.moveDirection.x === 1)
            {
                ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height /2));
                ctx.rotate(0 * Math.PI /180);
                ctx.translate((this.position.x + (this.width/2)) * -1, (this.position.y + (this.height /2)) * -1);
            }
       
            if(this.moveDirection.y === -1)
            {
                ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height /2));
                ctx.rotate(270 * Math.PI /180);
                ctx.translate((this.position.x + (this.width/2)) * -1, (this.position.y + (this.height /2)) * -1);
            }

            if(this.moveDirection.y === +1)
            {
                ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height /2));
                ctx.rotate(90 * Math.PI /180);
                ctx.translate((this.position.x + (this.width/2)) * -1, (this.position.y + (this.height /2)) * -1);
            }

            if(this.moveDirection.x === -1)
            {
                ctx.translate(this.position.x + (this.width/2), this.position.y + (this.height /2));
                ctx.rotate(180 * Math.PI /180);
                ctx.translate((this.position.x + (this.width/2)) * -1, (this.position.y + (this.height /2)) * -1);
            }

          


            this.pS.draw(this.position.x, this.position.y);
            ctx.restore();
      //ctx.drawImage(this.image, 0,0,32,32, this.position.x, this.position.y, this.width, this.height, true, 5);
    }

    handleInput(input)
    {
        if(input.isButtonPressed("ArrowUp"))
        {
                if(this.canMoveUp())
                {         
                    this.moveDirection = new Vector2(0,-1);       
               }       
        }

        if(input.isButtonPressed("ArrowDown"))
        {
                if(this.canMoveDown())
                {
                     this.moveDirection = new Vector2(0,+1);
               }   
        }

        if(input.isButtonPressed("ArrowLeft"))
        {
                if(this.canMoveLeft())
                {
                    this.moveDirection = new Vector2(-1,0);
               }   
        }

        if(input.isButtonPressed("ArrowRight"))
        {
                if(this.canMoveRight())
                {
                    this.moveDirection = new Vector2(+1,0);
               }   
        }

      
    }

        update(dt)
        {
            this.halt += dt;
            
            if(this.halt >= this.speed)
            {
                let canMove = false;
                
                if(this.moveDirection.x === 1 &&
                    this.canMoveRight())
                    {
                        canMove = true;
                    }
                
                if(this.moveDirection.y === -1 &&
                    this.canMoveUp())
                    {
                        canMove = true;
                    }
           

           
                if(this.moveDirection.y === +1 &&
                    this.canMoveDown())
                    {
                        canMove = true;
                    }
            

           
                if(this.moveDirection.x === -1 &&
                    this.canMoveLeft())
                    {
                        canMove = true;
                    }
            
            if(canMove)
            {
                this.halt = 0;
                this.position.plusEquals(this.moveDirection.multiply(this.moveDistance));
                this.gridPosition.plusEquals(this.moveDirection);
            }
        }
            //Set collider position every frame
            this.collider.setPosition(this.x, this.y);
        }

        canMoveUp()
        {
            if(this.gridPosition.y - 1 >= 0)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y -1)].isCollidable === false)
                {
                        return true;
                }
            
            }
            return false;
        }

        canMoveDown()
        {
            if(this.gridPosition.y + 1 < 31)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x, this.gridPosition.y + 1)].isCollidable === false)
                {
                return true;
                }
            }
            return false;
        }

        canMoveLeft()
        {
            if(this.gridPosition.x - 1 >= -0)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x -1, this.gridPosition.y)].isCollidable == false)
                {
                    return true;
                }
            }
            return false;
        }

        canMoveRight()
        {
            if(this.gridPosition.x + 1 < 31)
            {
                if(this.gridRef.tiles[new Vector2(this.gridPosition.x +1, this.gridPosition.y)].isCollidable === false)
                {
                    return true;
                }
            }
            return false;
        }
    
}

if (typeof module !== "undefined") {
    module.exports = Player;
}
