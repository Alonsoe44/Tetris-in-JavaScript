
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

//Creation of tetramino object

//let tetraminoes = new Tetraminoes(ObjectArray[0].type,ObjectArray[0].color);
let ObjectArr = [generateNext(),generateNext(),generateNext()]

let tetraminoes = generateTetra();

ObjectArr[0].drawTetrominos();
ObjectArr[1].drawTetrominos();
ObjectArr[2].drawTetrominos();

//I add an even listener for the arrows press
document.addEventListener('keydown', function(event) {
    switch (event.key){
        case 'a':
            if(tetraminoes.y>=-1){
                tetraminoes.moveLeft();
            }
            break;
        case 'd':
            if(tetraminoes.y>=-1){
                tetraminoes.moveRight();
            }
            break;
        case 'w':
            tetraminoes.inGround = false;
            for(let i = 0; i<rows && !tetraminoes.inGround; i++){
                tetraminoes.moveDown();
            }
            break;
        case 's':
            tetraminoes.moveDown();
            break;
        case 'Enter':

            break;
        case 'j':
            if(!holdUsedThisTurn) {
                tetraminoes.hold();
            }
            break;
        case 'n':
            break;
        case 'm':
            tetraminoes.rotateRight();
            break;
        case ' ':
            tetraminoes.rotateRight();
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

//drop();

//https://www.youtube.com/watch?v=om5yYcg1lT4







