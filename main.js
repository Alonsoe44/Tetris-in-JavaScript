
//Some key variables
let intScore = 0;
let holdPiece = [];
let dropStart = Date.now();
let dropTime = 1000;
let boardArr = [];
let holdArr = [];
let nextArr = [];
let gameOver = false;
let que = -1;
let holdHasSomething = false;
let holdUsedThisTurn = false;
let rowsDeleted = 0;
let pauseState = false;
let pauseMusicState = false;
let endInteractions = false;

//Now I create the  the board
for(let i = 0; i < rows; i++){
    boardArr[i] = [];
    for(let j = 0; j < cols; j++){
        boardArr[i][j] = empty;
    }
}
for(let i = 0; i < hrows; i++){
    holdArr[i] = [];
    for(let j = 0; j < hcols; j++){
        holdArr[i][j] = empty;
    }
}
for(let i = 0; i < nrows; i++){
    nextArr[i] = [];
    for(let j = 0; j < ncols; j++){
        nextArr[i][j] = empty;
    }
}

function drawBoard(r,c,arr,drawSq){
    for(let i = 0; i<r; i++){
        for(let j = 0; j<c; j++){
            drawSq(j, i, arr[i][j]);
        }
    }

}


//This function draws a 1 square in the grid
function drawSquare(x,y,color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 1, 1);
    ctx.strokeStyle = 'rgb(156, 156, 156)';
    ctx.strokeRect(x, y, 1, 1);
}
function hdrawSquare(x,y,color){
    ctxHold.fillStyle = color;
    ctxHold.fillRect(x, y, 1, 1);
    ctxHold.strokeStyle = 'rgb(156, 156, 156)';
    ctxHold.strokeRect(x, y, 1, 1);
}
function ndrawSquare(x,y,color){
    ctxNext.fillStyle = color;
    ctxNext.fillRect(x, y, 1, 1);
    ctxNext.strokeStyle = 'rgb(156, 156, 156)';
    ctxNext.strokeRect(x, y, 1, 1);
}

//let tetraminoes = new Tetraminoes(ObjectArray[0].type,ObjectArray[0].color);
//********************Main execution******************************
let ObjectArr = [generateNext(),generateNext(),generateNext()]
let tetraminoes = generateTetra();
drawBoard(rows,cols,boardArr,drawSquare);
drawBoard(hrows,hcols,holdArr,hdrawSquare);
drawBoard(nrows,ncols,nextArr,ndrawSquare);


ObjectArr[0].drawTetrominos();
ObjectArr[1].drawTetrominos();
ObjectArr[2].drawTetrominos();
drop();
function startNewGame(){
    gameOver = true;
    endInteractions = false;
    lvlCount = 1;
    intScore = 0;
    lvlPoints = 1000;
    dropTime = 1000;

    level.innerHTML = 'Level ' + lvlCount;
    score.innerHTML = intScore;
    for(let i = 0; i < rows; i++){
        boardArr[i] = [];
        for(let j = 0; j < cols; j++){
            boardArr[i][j] = empty;
        }
    }
    for(let i = 0; i < hrows; i++){
        holdArr[i] = [];
        for(let j = 0; j < hcols; j++){
            holdArr[i][j] = empty;
        }
    }
    for(let i = 0; i < nrows; i++){
        nextArr[i] = [];
        for(let j = 0; j < ncols; j++){
            nextArr[i][j] = empty;
        }
    }
    drawBoard(rows,cols,boardArr,drawSquare);
    drawBoard(hrows,hcols,holdArr,hdrawSquare);
    drawBoard(nrows,ncols,nextArr,ndrawSquare);
    tetraminoes = generateTetra();
    ObjectArr = [generateNext(),generateNext(),generateNext()]


    ObjectArr[0].drawTetrominos();
    ObjectArr[1].drawTetrominos();
    ObjectArr[2].drawTetrominos();
    gameOver = false;
    drop();
}



//I add an even listener for the arrows press and buttons
infoButton.onclick = () =>{
    //Here i play the audio with my voice
}
buttonPause.onclick = () =>{
    if(!pauseState&&!endInteractions){
        pauseGame();
    } else if(!endInteractions){
        unpauseGame();
    }
}
pauseMusicButton.onclick = () =>{
    if(!pauseMusicState){
        pauseMusic();
    } else {
        unPauseMusic();
    }
}
document.addEventListener('keydown', function(event) {
    switch (event.key){
        case 'a':
            if(tetraminoes.y>=-1&&!gameOver){
                tetraminoes.moveLeft();
            }
            break;
        case 'd':
            if(tetraminoes.y>=-1&&!gameOver){
                tetraminoes.moveRight();
            }
            break;
        case 'w':
            if(!gameOver){
                tetraminoes.rotateRight();
            } 
            break;
        case 's':
            if(!gameOver){
                tetraminoes.moveDown();
            }
            break;
        case 'Enter':

            break;
        case 'q':
            if(!holdUsedThisTurn&&!gameOver) {
                tetraminoes.hold();
            }
            break;
        case ' ':
            tetraminoes.inGround = false;
            if(!gameOver){
                for(let i = 0; i<rows && !tetraminoes.inGround; i++){
                    tetraminoes.moveDown();
                }
            }
            break;
        case 'm':
            if(!gameOver){
                tetraminoes.rotateRight();
            }
            break;
        case 'r':
            startNewGame();
            break;
        default:
            break
    }
});
//Random tetramino generator function
function generateTetra(){
    let randomN = Math.floor(Math.random()*tetraminousArr.length);
    return new Tetraminoes(tetraminousArr[randomN][0],tetraminousArr[randomN][1]);
}

function generateNext(){
    let randomN = Math.floor(Math.random()*tetraminousArr.length);
    let yPosition = [1,6,11];
    que = (que + 1) % yPosition.length;
    return new tetraminoNext(tetraminousArr[randomN][0],tetraminousArr[randomN][1],yPosition[que]);
}
function generateLast(){
    let randomN = Math.floor(Math.random()*tetraminousArr.length);
    return new tetraminoNext(tetraminousArr[randomN][0],tetraminousArr[randomN][1],11);
}
//Time to drop the pieces
function drop(){
    let now = Date.now();
    let diffStart_Call = now - dropStart;
    if(diffStart_Call>dropTime){
        tetraminoes.moveDown();
        dropStart = Date.now();
    }
    if(!gameOver){
        requestAnimationFrame(drop);
    } 
}
function pauseMusic(){
    pauseMusicState = true;
    mainTheme.pause();
    pauseMusicButton.style.color = 'white';
}
function unPauseMusic(){
    mainTheme.play();
    pauseMusicState = false;
    pauseMusicButton.style.color = '#403221';
}
function pauseGame() {
    gameOver = true;
    pauseState = true;
    ctx.font = "3px Gilroy-Bold ☞";
    ctx.fillStyle = '#403221';
    ctx.fillText("Pause", 1, 8);
    buttonPause.style.color = 'white';
}
function unpauseGame() {
    gameOver = false;
    pauseState = false;
    drawBoard(rows,cols,boardArr,drawSquare);
    tetraminoes.drawTetrominos();
    buttonPause.style.color = '#403221';
    drop();
}


//https://www.youtube.com/watch?v=om5yYcg1lT4







