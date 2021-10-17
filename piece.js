//With this class Tetrominoes I will generate the instances and their properties
class Tetraminoes{
    constructor(type, color) {
        // The type of tetromino
        this.type = type;
        // The position or rotation
        this.position = 0;
        //Color property
        this.color = color;
        //The type and position in realtime while playing
        this.activePosition = this.type[this.position];

        //These are the coordinates where all tetrominoes start
        this.x = 3;
        this.y = -2;
    }

    //Methods for the tetraminoes

    //Draw and undraw
    //With this function draw tetrominow by type, and coordiantes
    drawTetrominos(){
        for(let i = 0; i<this.activePosition.length;i++){
            for(let j = 0; j<this.activePosition.length; j++){
                if(this.activePosition[i][j]===1){
                    drawSquare(j+this.x,i+this.y,this.color);
                    ctx.strokeStyle = this.color;
                    ctx.strokeRect(j+this.x, i+this.y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //With this function undraw tetrominow by type, and coordiantes
    undrawTetrominos(){
        for(let i = 0; i<this.activePosition.length;i++){
            for(let j = 0; j<this.activePosition.length; j++){
                if(this.activePosition[i][j]===1){
                    drawSquare(j+this.x,i+this.y,empty);
                    ctx.strokeStyle = 'rgb(156, 156, 156)';
                    ctx.strokeRect(j+this.x, i+this.y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //Movement of the pieces
    moveLeft(){
        if(!this.collision(-1,0)){
            this.undrawTetrominos();
            this.x--;
            this.drawTetrominos();
        }

    }
    moveRight(){
        if(!this.collision(1,0)){
            this.undrawTetrominos();
            this.x++;
            this.drawTetrominos();
        }

    }
    moveDown(){
        if(!this.collision(0,1)){
            this.undrawTetrominos();
            this.y++;
            this.drawTetrominos();
        }else{
            this.lock();
            tetraminoes = generateTetra();
        }

    }
    //Collision detection function
    collision(adX, adY){
        for(let i = 0; i<this.activePosition.length;i++){
            for(let j = 0; j<this.activePosition.length; j++){
                if(this.activePosition[i][j]===1){
                    if(this.x +j+adX<0 || this.x+j+adX>=cols || this.y+i+adY>=rows){
                        return true;
                    }
                    if(this.y+i+adY<0){continue;}
                    if(boardArr[this.y+i+adY][this.x+j]!==empty){
                        return true;
                     }
                }
            }//end 2nd loop
        }//end first loop
        return false;
    }
    //Rotation of the tetramino
    rotateRight(){
        this.undrawTetrominos();
        this.position = (this.position+1)%this.type.length;
        this.activePosition = this.type[this.position];
        this.drawTetrominos();
    }

    //Lock the piece
    lock(){
        for(let i = 0; i<this.activePosition.length;i++){
            for(let j = 0; j<this.activePosition.length; j++){
                if(this.activePosition[i][j]===1){
                    boardArr[this.y+i][this.x+j] = this.color;
                    ctx.fillStyle = boardArr[this.y+i][this.x+j];
                    ctx.fillRect(this.x+j, this.y+i, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
        console.table(boardArr);
    }
}