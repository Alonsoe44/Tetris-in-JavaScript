//This js file has all the constants for the game

//This is the board grid

const cols = 10;
const rows = 20;
const hcols = 4;
const hrows = 6;
const ncols = 4;
const nrows = 16;
const blockSize= 30;
const scaleNum = blockSize/1.5;
const empty = '#F6D7BB';
const Z = [[
        [1,1,0],
        [0,1,1],
        [0,0,0]
    ],
    [
        [0,0,1],
        [0,1,1],
        [0,1,0]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,0],
        [1,1,0],
        [1,0,0]
    ]
];
const I = [
    [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 0, 1, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
    ],
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ]
];

const J = [
    [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [0, 1, 0],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ]
];

const L = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
    ]
];

const O = [
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 0, 0],
    ]
];

const S = [
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [1, 0, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];

const T = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    [
        [0, 1, 0],
        [1, 1, 0],
        [0, 1, 0]
    ]
];
//Now I select the html elements intro variables

const canvas = document.getElementById('mainBoard');
const holdBoard = document.getElementById('holdBoard');
const nextBoard = document.getElementById('nextBoard');
//Context
const ctxHold = holdBoard.getContext('2d');
const ctxNext = nextBoard.getContext('2d');
const ctx = canvas.getContext('2d');
//Tetraminous Array
const tetraminousArr = [[Z,'#A7514A'],[I,'#13ACC3'],[J,'#3F52B4'],[L,'#DA753A'],[O,'#FFC103'],[S,'#4AA74F'],[T,'#934D98']];
//Now the canvas has a grid with the rules.js constants
ctx.canvas.width = cols*blockSize;
ctx.canvas.height = rows*blockSize;

ctxHold.canvas.width = hcols*scaleNum;
ctxHold.canvas.heigth = hrows*scaleNum;

ctxNext.canvas.width = ncols*scaleNum;
ctxNext.canvas.heigth = nrows*scaleNum;
//Scale property to scale the draw WxH****This is important because now all our units are : blocksize
ctx.scale(blockSize, blockSize);
ctxHold.scale(scaleNum,scaleNum);
ctxNext.scale(scaleNum,scaleNum);

//This is the line  Width
ctxHold.lineWidth = 0.05;
ctxNext.lineWidth = 0.05;
ctx.lineWidth = 0.05;
//This is for hte score
const score = document.getElementById('currentScore');
const level = document.getElementById('levelTxt');
const bestScore = document.getElementById('bestScore');
let lvlCount = 1;
let lvlPoints = 500;
function setNewLevel(){
    dropTime -= 100;
    lvlCount ++;
    lvlPoints+= 500;
    level.innerHTML = 'Level ' + lvlCount;
}
function setBestScore(){
    if(intScore>bestScore.innerHTML){
        bestScore.innerHTML = intScore;
    }
}
function setScore(newScore){
    intScore = intScore+newScore;
    score.innerHTML = intScore;
}

