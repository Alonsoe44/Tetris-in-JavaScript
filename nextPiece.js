//With this class Tetrominoes I will generate the instances and their properties
class tetraminoNext {
    constructor(type, color, _y) {
        // The type of tetromino
        this.type = type;
        // The position or rotation
        this.position = 0;
        //Color property
        this.color = color;
        //The type and position in realtime while playing
        this.activePosition = this.type[this.position];

        //These are the coordinates where all tetrominoes start
        this.x = 0;
        this._y = 1+_y;
        console.log(`This is happening inside the nextPiece Class _y: ${_y}`);
    }

    //Methods for the tetraminoes

    //Draw and undraw
    //With this function draw tetrominow by type, and coordiantes
    drawTetrominos() {
        console.log(`Now i am drawing with this y coordinate ${this._y}`);
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.type[1][i][j] === 1) {
                    ndrawSquare(j + this.x, i + this._y, this.color);
                    ctxNext.strokeStyle = this.color;
                    ctxNext.strokeRect(j + this.x, i + this._y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //With this function undraw tetrominos by type, and coordiantes
    undrawTetrominos() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.activePosition[i][j] === 1) {
                    drawSquare(j + this.x, i + this._y, empty);
                    ctxNext.strokeStyle = 'rgb(156, 156, 156)';
                    ctxNext.strokeRect(j + this.x, i + this._y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //Movement of the pieces

    moveDown() {
        if (!this.collision(0, 1, this.position)) {
            this.undrawTetrominos();
            this._y++;
            this.drawTetrominos();
        } else {
            this.lock();
            tetraminoes = generateTetra();
            this.checkLastRow();
        }

    }

    //Rotation of the tetramino
    rotateRight() {
        let nextPosition = (this.position + 1) % this.type.length;
        if (!this.collision(0, 0, nextPosition)) {
            this.undrawTetrominos();
            this.position = (this.position + 1) % this.type.length;
            this.activePosition = this.type[this.position];
            this.drawTetrominos();
        } else {
            if (this.x < cols / 2) {
                this.moveRight();
                this.rotateRight()
            } else {
                this.moveLeft();
                this.rotateRight()
            }
        }

    }

    //Lock the piece
    lock() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this._y + i < 0) {
                    gameOver = true;
                    alert('Game Over');
                    break;
                }
                if (this.activePosition[i][j] === 1) {
                    boardArr[this._y + i][this.x + j] = this.color;
                    ctx.fillStyle = boardArr[this._y + i][this.x + j];
                    ctx.fillRect(this.x + j, this._y + i, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }
}