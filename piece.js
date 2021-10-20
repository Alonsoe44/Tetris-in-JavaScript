//With this class Tetrominoes I will generate the instances and their properties
class Tetraminoes {
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
    drawTetrominos() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.activePosition[i][j] === 1) {
                    drawSquare(j + this.x, i + this.y, this.color);
                    ctx.strokeStyle = this.color;
                    ctx.strokeRect(j + this.x, i + this.y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //With this function undraw tetrominos by type, and coordiantes
    undrawTetrominos() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.activePosition[i][j] === 1) {
                    drawSquare(j + this.x, i + this.y, empty);
                    ctx.strokeStyle = 'rgb(156, 156, 156)';
                    ctx.strokeRect(j + this.x, i + this.y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //Movement of the pieces
    moveLeft() {
        if (!this.collision(-1, 0, this.position)) {
            this.undrawTetrominos();
            this.x--;
            this.drawTetrominos();
        }

    }

    moveRight() {
        if (!this.collision(1, 0, this.position)) {
            this.undrawTetrominos();
            this.x++;
            this.drawTetrominos();
        }

    }

    moveDown() {
        if (!this.collision(0, 1, this.position)) {
            this.undrawTetrominos();
            this.y++;
            this.drawTetrominos();
        } else {
            this.lock();
            tetraminoes = new Tetraminoes(ObjectArr[0].type,ObjectArr[0].color);
            drawBoard(nrows,ncols,nextArr,ndrawSquare);
            ObjectArr[0]= ObjectArr[1];
            ObjectArr[1] = ObjectArr[2];
            ObjectArr[2] = generateLast();
            ObjectArr[0].drawTetrominos();
            ObjectArr[1].drawTetrominos();
            ObjectArr[2].drawTetrominos();


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

    //Collision detection function
    collision(adX, adY, rotation) {
        for (let i = 0; i < this.type[rotation].length; i++) {
            for (let j = 0; j < this.type[rotation].length; j++) {
                if (this.type[rotation][i][j] === 1) {
                    if (this.y + i + adY < 0) {
                        continue;
                    }
                    if (this.x + j + adX < 0 || this.x + j + adX >= cols || this.y + i + adY >= rows) {
                        return true;
                    }

                    if (boardArr[this.y + i + adY][this.x + j + adX] !== empty) {
                        return true;
                    }
                }
            }//end 2nd loop
        }//end first loop
        return false;
    }

    //Lock the piece
    lock() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.y + i < 0) {
                    gameOver = true;
                    alert('Game Over');
                    break;
                }
                if (this.activePosition[i][j] === 1) {
                    boardArr[this.y + i][this.x + j] = this.color;
                    ctx.fillStyle = boardArr[this.y + i][this.x + j];
                    ctx.fillRect(this.x + j, this.y + i, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }

    //Empty the full row
    checkLastRow() {
        for (let i = 0; i < rows; i++) {
            let isRowFull = true;
            for (let j = 0; j < cols; j++) {
                isRowFull = isRowFull && (boardArr[i][j] !== empty);
            }
            if (isRowFull) {
                for (let y = i; y > 1; y--) {
                    for (let x = 0; x < cols; x++) {
                        boardArr[y][x] = boardArr[y - 1][x];
                        drawSquare(x, y, boardArr[y][x]);
                    }
                }
                for (let x = 0; x < cols; x++) {
                    boardArr[0][x] = empty;
                }
                console.table(boardArr);
            }
        }
    }

    //Let's hold that piece
    hold() {
        //push this piece into the next array
        this.undrawTetrominos();
        //Erases all
        drawBoard(hrows, hcols, holdArr, hdrawSquare);
        holdPiece[0] = [this.type, this.color];
        this.drawTetrominosHold()
        tetraminoes = generateTetra();
    }

    drawTetrominosHold() {
        for (let i = 0; i < this.type[1].length; i++) {
            for (let j = 0; j < this.type[1].length; j++) {
                if (this.type[1][i][j] === 1) {
                    hdrawSquare(j, i, this.color);
                    ctxHold.strokeStyle = this.color;
                    ctxHold.strokeRect(j, i, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function
}