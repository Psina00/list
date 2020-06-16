 	 		      //////////////
 				 /////model////
				//////////////


var gameCanvas       = document.createElement("canvas"),
	gameRaw          = document.getElementById("playingZone").appendChild(gameCanvas);
	gameRaw.width	 = 700,
	gameRaw.height   = 800,
	bricks           = [],
	board            = {},
	ball             = {};
var game;
function brickCreate(x, y, stat){
	if(stat==1){
		brickDraw           = gameRaw.getContext('2d');
		brickDraw.fillStyle = '#e67e22'
		brickDraw.beginPath();
		brickDraw.fillRect(x+10, y+5, 75, 28);
	}
}
function brick(x,y){
	this.status 		 = 1;//1-active / 0-inactive
	this.posX            = x;
	this.posY            = y;
	brickCreate(x,y, this.status);
}

function ballDraw(x,y){
	let ballItem = gameRaw.getContext('2d');
		ballItem.beginPath();
		ballItem.arc(x, y, 15, 0, 2*Math.PI);
		ballItem.stroke();
}

function ballParams(x, y, velX, velY){
		this.velX        = velX;
		this.velY        = velY;
		this.x           = x;
		this.y           = y;
		ballDraw(x, y);
}

function boardDraw(x, y){
	let boardItem        = gameRaw.getContext('2d');
		boardItem.beginPath();
		boardItem.fillRect(x, y, 90, 10);
}

function boardParams(x, y){
		this.x           = x;
		this.y           = y;
		boardDraw(x, y);
}

  			      //////////////
			   	 /////view/////
			    //////////////
var count;
function gameStart(){
	game = 0;
	count = 0;
	ball = {};
	board = {};
	for(let i=0; i<5; i++){
		for(let g=0; g<8; g++){
			bricks[count] = new brick(87*g,33*i);
			count++;
		}
	}
	ball  = new ballParams(350,720, 0, 0);
	board = new boardParams(305,736);
	ball.velX = Math.random() * (10) -5;
	ball.velY = -15;
		game = setInterval(function(){
			ball.x+=ball.velX;
			ball.y+=ball.velY;
			for(let i=0; i<bricks.length; i++){
				if((bricks[i].posY-15 <= ball.y) && (bricks[i].posY+43 >= ball.y) && (bricks[i].posX+102 >= ball.x) && (bricks[i].posX-15 <= ball.x) && (bricks[i].status==1)){
					bricks[i].status = 0;
					if((bricks[i].posY-15 <= ball.y) && (bricks[i].posY+43 >= ball.y) && (bricks[i].posX+87 >= ball.x) && (bricks[i].posX <= ball.x)){
						ball.velY = -ball.velY;
					}
					else if((bricks[i].posY <= ball.y) && (bricks[i].posY+28 >= ball.y) && (bricks[i].posX+102 >= ball.x) && (bricks[i].posX-15 <= ball.x)){
						ball.velX = -ball.velX;
					}

				}
			}
			if((ball.y == 720) && (ball.x >= board.x-15) && (ball.x <= board.x+105)){
				ball.velY = -ball.velY;
			}
			if((ball.y <= 15) && (ball.x > 15) && (ball.x < 785)){
				console.log('lul');
				ball.velY = -ball.velY;
			}
			if(ball.x <= 15){
				ball.velX = -ball.velX;
			}
			if(ball.x >= 685){
				ball.velX = -ball.velX;
			}
			if(ball.y >= 775){
				gameOver();
			}
			redraw(ball.x,ball.y,board.x,board.y,bricks);
		}, 33);
}
gameStart();

function redraw(ballX,ballY,boardX,boardY,bricks){
	gameRaw.getContext('2d').clearRect(0, 0, gameRaw.width, gameRaw.height);
	for(let i=0; i<bricks.length; i++){
		brickCreate(bricks[i].posX , bricks[i].posY, bricks[i].status);
	}
	ballDraw(ball.x, ball.y);
	boardDraw(board.x, board.y);
}




 				  //////////////
 			     //controller//
			    //////////////



addEventListener("keydown", function(e){
		switch(e.keyCode){
			case 37:
				board.x += -20;
				break;
			case 39:
				board.x += 20;
				break;
		}
	});



function gameOver(){
	clearInterval(game);
	gameStart();
	/*addEventListener("keydown", function(e){
		if(e.keyCode == 32){
			gameStart();
		}
	});*/
}
