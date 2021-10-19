//Now I select the html elements intro variables
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const tetraminousArr = [[Z,'red'],[I,'cyan'],[J,'orange'],[L,'blue'],[O,'yellow'],[S,'green'],[T,'purple']];
//Now the canvas has a grid with the rules.js constants
ctx.canvas.width = cols*blockSize;
ctx.canvas.height = rows*blockSize;
//Scale property to scale the draw WxH****This is important because now all our units are : blocksize
ctx.scale(blockSize, blockSize);
ctx.lineWidth = 0.05;

//Some key variables

let dropStart = Date.now();
let dropTime = 1000;
let boardArr = [];
let gameOver = false;

//Now I create the  the board
for(let i = 0; i < rows; i++){
    boardArr[i] = [];
    for(let j = 0; j < cols; j++){
        boardArr[i][j] = empty;
    }
}
//Function that draws the board:
drawBoard();
function drawBoard(){
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            drawSquare(j, i, boardArr[i][j]);
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
console.table(boardArr);
//Creation of tetramino objects

let tetraminoes = generateTetra();
tetraminoes.drawTetrominos()


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
            console.log('you can\'t move up');
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






