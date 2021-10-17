class Piece{
    constructor(ctx){
        this.ctx = ctx;

        this.color = 'blue';
        this.shape = [
            [2,0,0],
            [2,2,2],
            [0,0,0]
        ];

        //Starting position
        this.x = 3;
        this.y = 0;
    }
}