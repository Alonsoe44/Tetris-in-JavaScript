//Now I select the html elements intro variables
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

//Now the canvas has a grid with the rules.js constants
ctx.canvas.width = cols*blockSize;
ctx.canvas.height = rows*blockSize;
//Scale property to scale the draw WxH
ctx.scale(blockSize, blockSize);




