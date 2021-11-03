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
//buttons
const infoButton = document.getElementById('infoButton');
const buttonPause = document.getElementById('pauseIcon');
const pauseMusicButton = document.getElementById('pauseMusic');
//Now I select the html elements intro variables
const canvas = document.getElementById('mainBoard');
const holdBoard = document.getElementById('holdBoard');
const nextBoard = document.getElementById('nextBoard');
//Context
const ctxHold = holdBoard.getContext('2d');
const ctxNext = nextBoard.getContext('2d');
const ctx = canvas.getContext('2d');
//Music and effects
const mainTheme = document.getElementById('tetrisSong');
const moveSound = document.getElementById('moveSound');
const rotateSound = document.getElementById('rotateSound');
const lockSound = document.getElementById('lockSound');
const cleanLineSound = document.getElementById('cleanLineSound');
const tetrisSound = document.getElementById('tetrisSound');
const gameOverSound = document.getElementById('SfxGameOver');
//Voice effects
const clearLineVoice1 = document.getElementById('SfxClearLineVoice1');
const clearLineVoice2 = document.getElementById('SfxClearLineVoice2');
const clearLineVoice3 = document.getElementById('SfxClearLineVoice3');
const clearLineVoice4 = document.getElementById('SfxClearLineVoice4');
const clearLineVoice5 = document.getElementById('SfxClearLineVoice5');
const clearLineVoice6 = document.getElementById('SfxClearLineVoice6');
const clearLineVoice7 = document.getElementById('SfxClearLineVoice7');
const clearLineVoice8 = document.getElementById('SfxClearLineVoice8');
const clearLineVoice9 = document.getElementById('SfxClearLineVoice9');
const tetrisVoice1 = document.getElementById('SfxTetrisVoice1');
const tetrisVoice2 = document.getElementById('SfxTetrisVoice2');
const tetrisVoice3 = document.getElementById('SfxTetrisVoice3');
const tetrisVoice4 = document.getElementById('SfxTetrisVoice4');
const tetrisVoice5 = document.getElementById('SfxTetrisVoice5');
//Arrays of audios

let clearLineVoices = [clearLineVoice1, clearLineVoice2, clearLineVoice3, clearLineVoice4,
     clearLineVoice5, clearLineVoice6, clearLineVoice7, clearLineVoice8, clearLineVoice9];
let tetrisVoices = [tetrisVoice1, tetrisVoice2, tetrisVoice3, tetrisVoice4, tetrisVoice5,];     

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
//I need some code to do this web mobile friendly
//Needs an audio extra or credits or buttons info
