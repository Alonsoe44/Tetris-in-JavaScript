//With this class Tetrominoes I will generate the instances and their properties
class Tetraminoes {
    constructor(type, color) {
        this.type = type;           // The type of tetromino
        this.position = 0;          // The position or rotation
        this.color = color;         // Color property
        this.activePosition = this.type[this.position]; //The type and position in realtime while playing
        this.x = 3;                 //These are the coordinates where all tetrominos start
        this.y = -2;
        this.inGround = true;
    }

    //Methods for the tetraminoes

    //Draw and undraw
    drawTetrominos() { //With this function draw tetrominos by type, and coordinates
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.activePosition[i][j] === 1) {
                    drawSquare(j + this.x, i + this.y, this.color);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    undrawTetrominos() { //With this function undraw tetrominos by type, and coordinates
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
        if(!pauseMusicState){
            mainTheme.play();
        }
        if (!this.collision(-1, 0, this.position)) {
            if(!(this.type==Z && this.x==0&&this.y==-1)){
                moveSound.currentTime = 0;
                moveSound.play();
                this.undrawTetrominos();
                this.x--;
                this.drawTetrominos();
            }
        }
    }
    moveRight() {
        if(!pauseMusicState){
            mainTheme.play();
        }
        if (!this.collision(1, 0, this.position)) {
            if(!(this.type==S && this.x==7&&this.y==-1)){
                moveSound.currentTime = 0;
                moveSound.play();
                this.undrawTetrominos();
                this.x++;
                this.drawTetrominos();
            }
        }
    }
    moveDown() {
        if (!this.collision(0, 1, this.position)) {
            this.undrawTetrominos();
            this.y++;
            this.drawTetrominos();
        } else {
            this.lock();
            lockSound.currentTime = 0;
            lockSound.play();
            this.emptyAndDrawNextBoard();
            this.checkLastRow();
            holdUsedThisTurn = false;
            drawBoard(rows,cols,boardArr,drawSquare);
        }

    }

    //Rotation of the tetramino
    rotateRight() {
        let nextPosition = (this.position + 1) % this.type.length;
        if (!this.collision(0, 0, nextPosition)) {
            rotateSound.pause();
            rotateSound.currentTime = 0;
            rotateSound.play();
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
                    this.gameOverTime();
                }
                if (this.activePosition[i][j] === 1) {

                    boardArr[this.y + i][this.x + j] = this.color;
                    ctx.fillStyle = boardArr[this.y + i][this.x + j];
                    ctx.fillRect(this.x + j, this.y + i, 1, 1);
                    ctx.strokeStyle = 'rgb(156, 156, 156)';
                    ctx.strokeRect(j + this.x, i + this.y, 1, 1);
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
                rowsDeleted++;
                setScore(200);
                if(intScore/lvlPoints>=1){
                    setNewLevel();
                }
                for (let y = i; y > 1; y--) {
                    for (let x = 0; x < cols; x++) {
                        boardArr[y][x] = boardArr[y - 1][x];
                        drawSquare(x, y, boardArr[y][x]);
                    }
                }
                for (let x = 0; x < cols; x++) {
                    boardArr[0][x] = empty;
                }
            }
        }
        this.checkforTetris();
        rowsDeleted = 0;
    }

    //Let's hold that piece
    hold() {
        holdUsedThisTurn = true;
        if(!holdHasSomething) {
            holdHasSomething = true;
            this.undrawTetrominos();  //Erases the tetramino from the main board
            drawBoard(hrows, hcols, holdArr, hdrawSquare); //Draws an empty board
            holdPiece[0] = [this.type, this.color];
            this.drawTetrominosHold();
            this.emptyAndDrawNextBoard();
        } else{
            this.undrawTetrominos();
            //Erases all
            drawBoard(hrows, hcols, holdArr, hdrawSquare);
            this.drawTetrominosHold();
            //goes the game
            tetraminoes = new Tetraminoes(holdPiece[0][0],holdPiece[0][1]);
            holdPiece[0] = [this.type, this.color];
        }
        drawBoard(rows,cols,boardArr,drawSquare);
    }

    drawTetrominosHold() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.type[1][i][j] === 1) {
                    hdrawSquare(j, i+1, this.color);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function
    emptyAndDrawNextBoard() {
        tetraminoes = new Tetraminoes(ObjectArr[0].type,ObjectArr[0].color);
        drawBoard(nrows,ncols,nextArr,ndrawSquare);
        ObjectArr[0]= ObjectArr[1];
        ObjectArr[1].moveUp();
        ObjectArr[1] = ObjectArr[2];
        ObjectArr[2].moveUp();
        ObjectArr[2] = generateLast();

        ObjectArr[0].drawTetrominos();  //draws NextPieces
        ObjectArr[1].drawTetrominos();
        ObjectArr[2].drawTetrominos();
    }

    checkforTetris(){
                if(rowsDeleted===4){
                    let randonAudioIndex = parseInt(Math.random()*tetrisVoices.length);
                    tetrisSound.currentTime = 0;
                    tetrisSound.play();
                    tetrisVoices[randonAudioIndex].currentTime = 0;
                    tetrisVoices[randonAudioIndex].play();
                } else if(rowsDeleted===2 || rowsDeleted===3){
                    cleanLineSound.currentTime = 0;
                    cleanLineSound.play();
                    let randonAudioIndex = parseInt(Math.random()*clearLineVoices.length);
                    clearLineVoices[randonAudioIndex].currentTime = 0;
                    clearLineVoices[randonAudioIndex].play();
                } else if(rowsDeleted===1){
                    cleanLineSound.currentTime = 0;
                    cleanLineSound.play();
                }
    }

    gameOverTime(){
        gameOver = true;
        endInteractions = true;
        gameOverSound.play();
        this.printGameOver();
    }

    printGameOver(){
        ctx.font = "3px Gilroy-Bold ☞";
        ctx.fillStyle = '#403221';
        ctx.fillText("Game", 1, 8);
        ctx.fillText("Over", 1, 11);
        ctx.font = "1.5px Gilroy-Bold ☞";
        ctx.fillText("Press r", 3, 14);
        setBestScore();
    }
}