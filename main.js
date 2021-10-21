//Now I select the html elements intro variables
const canvas = document.getElementById('board');
const holdBoard = document.getElementById('hold');
const nextBoard = document.getElementById('next');
//Context
const ctxHold = holdBoard.getContext('2d');
const ctxNext = nextBoard.getContext('2d');
const ctx = canvas.getContext('2d');
//Tetraminous Array
const tetraminousArr = [[Z,'red'],[I,'cyan'],[J,'orange'],[L,'blue'],[O,'yellow'],[S,'green'],[T,'purple']];
//Now the canvas has a grid with the rules.js constants
ctx.canvas.width = cols*blockSize;
ctx.canvas.height = rows*blockSize;

ctxHold.canvas.width = hcols*blockSize;
ctxHold.canvas.heigth = hrows*blockSize;

ctxNext.canvas.width = ncols*blockSize;
ctxNext.canvas.heigth = nrows*blockSize;
//Scale property to scale the draw WxH****This is important because now all our units are : blocksize
ctx.scale(blockSize, blockSize);
ctxHold.scale(blockSize,blockSize);
ctxNext.scale(blockSize,blockSize);

//This is the line  Width
ctxHold.lineWidth = 0.05;
ctxNext.lineWidth = 0.05;
ctx.lineWidth = 0.05;

//Some key variables
let holdPiece = [];
let dropStart = Date.now();
let dropTime = 1000;
let boardArr = [];
let holdArr = [];
let nextArr = [];
let futurePieces = [];
let gameOver = false;
let que = -1;
let holdHasSomething = false;
let holdUsedThisTurn = false;

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
//Function that draws the board:
drawBoard(rows,cols,boardArr,drawSquare);
drawBoard(hrows,hcols,holdArr,hdrawSquare);
drawBoard(nrows,ncols,nextArr,ndrawSquare);
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
console.table(boardArr);
//Creation of tetramino object

//let tetraminoes = new Tetraminoes(ObjectArray[0].type,ObjectArray[0].color);
let ObjectArr = [generateNext(),generateNext(),generateNext()]
let tetraminoes = generateTetra();





//I add an even listener for the arrows press
document.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (event.key){
        case 'ArrowLeft':
            tetraminoes.moveLeft();
            break;
        case 'ArrowRight':
            tetraminoes.moveRight();
            break;
        case 'ArrowUp':
            if(!holdUsedThisTurn) {
                tetraminoes.hold();
            }
            break;
        case 'ArrowDown':
            tetraminoes.moveDown();
            break;
        case 'Enter':
            tetraminoes.rotateRight();
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

drop();
ObjectArr[0].drawTetrominos();
ObjectArr[1].drawTetrominos();
ObjectArr[2].drawTetrominos();







