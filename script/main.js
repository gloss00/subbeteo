let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext('2d');

let ballRadius = 6;

let x = canvas.width/2;
let y = canvas.height/2;
let dx = 2;
let dy = -2;

let lineWidth = 4;

let paddleWidth = 10;
let paddleHeight = 75;
let paddleLeftY = (canvas.height - paddleHeight) /2
let paddleRightY = (canvas.height - paddleHeight) /2
let paddlePadding = 5;

let scoreRight = 0;
let scoreLeft = 0;

let upPressedRight = false;
let downPressedRight = false;
let upPressedLeft = false;
let downPressedLeft = false;

drawPitch = () => {
    ctx.beginPath();
    ctx.fillStyle = "#33773b";
    ctx.strokeStyle = "#33773b";
    ctx.lineWidth = lineWidth;


    ctx.fillRect((canvas.width - lineWidth) * 0.25, 0, lineWidth, canvas.height);
    ctx.fillRect((canvas.width - lineWidth) * 0.5, 0, lineWidth, canvas.height);
    ctx.fillRect((canvas.width - lineWidth) * 0.75, 0, lineWidth, canvas.height);

    ctx.strokeRect(-lineWidth, 125, 150, 250);
    ctx.strokeRect(-lineWidth, 175, 75, 150);

    ctx.strokeRect(canvas.width - 129, 125, 150, 250);
    ctx.strokeRect(canvas.width - 75, 175, 75, 150);


    ctx.arc(canvas.width/2, canvas.height/2, 40, 0, Math.PI*2);
    ctx.stroke();


    ctx.closePath();
}

drawBall = () => {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
}

drawPaddleRight = () => {
    ctx.beginPath();
    ctx.fillStyle = "#F4FFF0";
    ctx.fillRect(canvas.width - paddlePadding - paddleWidth, paddleRightY, paddleWidth, paddleHeight);
    ctx.closePath();
}

drawPaddleLeft = () => {
    ctx.beginPath();
    ctx.fillStyle = "#F4FFF0";
    ctx.fillRect(paddlePadding, paddleLeftY, paddleWidth, paddleHeight);
    ctx.closePath();
}

drawScoreLeft = () => {
    ctx.font = "32px arial";
    ctx.fillStyle = "#d9d9d9";
    ctx.fillText("Score: " + scoreLeft ,8,40);
}

drawScoreRight = () => {
    ctx.font = "32px arial";
    ctx.fillStyle = "#d9d9d9";
    ctx.fillText("Score: " + scoreRight ,canvas.width - 130,40);
}

resetBall = (right) => {
    paddleLeftY = (canvas.height - paddleHeight) /2;
    paddleRightY = (canvas.height - paddleHeight) /2;
    y = (canvas.height - ballRadius) /2;

    if(right){
        x = canvas.width - paddlePadding - paddleWidth - ballRadius;
        dx = -2
        dy = -2;
    } else {
        x = paddlePadding + paddleWidth + ballRadius;
        dy = -2;
        dx = 2;
    }
}

draw = () => {
    //clear and draw functions
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPitch();
    drawBall();
    drawPaddleRight();
    drawPaddleLeft();
    drawScoreRight();
    drawScoreLeft();

    //logic
    if(x + dx > canvas.width - paddlePadding - paddleWidth + ballRadius){
        scoreLeft ++;
        if(scoreLeft == 5 ){
            document.getElementById("winnerScreen").style.csstext = "display = block, visibility = visible";
            document.getElementById("teamSubText").innerHTML = "Left player wins"
        } else {
        resetBall("right");
    }

    } else if (x + dx  < paddlePadding + paddleWidth){
        scoreRight   ++;
        console.log(scoreRight);
        if(scoreRight == 5 ){
            console.log('block enetered');
            document.querySelector("#winnerScreen").style.cssText = "display: block; visibility: visible";
            document.getElementById("teamSubText").innerHTML = "Right player wins"
        } else {
        resetBall();
    }

    } else if (x + dx + ballRadius > canvas.width - paddlePadding - paddleWidth && y + dy > paddleRightY && y+ dy < paddleRightY + paddleHeight){
        dx = -dx;

    } else if (x + dx - ballRadius < paddlePadding + paddleWidth && y + dy > paddleLeftY && y + dy < paddleLeftY + paddleHeight){
        dx = -dx;

    }

    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius){
        dy = -dy;
    }






    //controls
    if(upPressedRight && paddleRightY > 0){
        paddleRightY -= 7;
    }

    if(downPressedRight && paddleRightY + paddleHeight < canvas.height){
        paddleRightY +=7;
    }

    if(upPressedLeft && paddleLeftY > 0){
        paddleLeftY -= 7;
    }

    if(downPressedLeft && paddleLeftY + paddleHeight < canvas.height){
        paddleLeftY +=7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
};

keyDownHandler = (e) => {
    if(e.key == "ArrowUp"){
        upPressedRight = true;
    }
    if(e.key == "ArrowDown"){
        downPressedRight = true;
    }
    if(e.key == "w"){
        upPressedLeft = true;
    }
    if(e.key == "s"){
        downPressedLeft = true;
    }
}

keyUpHandler = (e) => {
        if(e.key == "ArrowUp"){
            upPressedRight = false;
        }
        if(e.key == "ArrowDown"){
            downPressedRight = false;
        }
        if(e.key == "w"){
            upPressedLeft = false;

        }
        if(e.key == "s"){
            downPressedLeft = false;
        }

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
draw();
