//This js file has all the constants for the game

//This is the board grid

const cols = 10;
const rows = 20;
const hcols = 4;
const hrows = 6;
const ncols = 4;
const nrows = 16;
const blockSize= 42;
const scaleNum = blockSize/1.5;
const empty = 'white';
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
//I HAVE A BIG BUG THAT YOU CAN DIE IF YOU MOVE YOUR PIECE WHEN GENERATED LOOK FOR KEYLISTENER AND TURN NO IF Y<0
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
