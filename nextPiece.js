//With this class Tetrominoes I will generate the instances and their properties
class tetraminoNext {
    constructor(type, color, _y) {
        // The type of tetromino
        this.type = type;
        // The position or rotation
        this.position = 0;
        //Color property
        this.color = color;
        //The type and position in realtime while playing
        this.activePosition = this.type[this.position];

        //These are the coordinates where all tetrominoes start
        this.x = 0;
        this._y = 0+_y;
    }

    //Methods for the tetraminoes

    //Draw and undraw
    //With this function draw tetrominow by type, and coordiantes
    drawTetrominos() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.type[1][i][j] === 1) {
                    ndrawSquare(j + this.x, i + this._y, this.color);
                    ctxNext.strokeStyle = this.color;
                    ctxNext.strokeRect(j + this.x, i + this._y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function

    //With this function undraw tetrominos by type, and coordiantes
    undrawTetrominos() {
        for (let i = 0; i < this.activePosition.length; i++) {
            for (let j = 0; j < this.activePosition.length; j++) {
                if (this.activePosition[i][j] === 1) {
                    drawSquare(j + this.x, i + this._y, empty);
                    ctxNext.strokeStyle = 'rgb(156, 156, 156)';
                    ctxNext.strokeRect(j + this.x, i + this._y, 1, 1);
                }//end if
            }//end 2nd loop
        }//end first loop
    }//end function


    moveUp() {          //I move the object 5 squares up
            this.undrawTetrominos();
            this._y = this._y-5;
            this.drawTetrominos();
    }
}