import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const PongGame = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    useEffect(() => {
        setPageSubtitle('Pong game');
    }, [setPageTitle, setPageSubtitle]);

    var canvas;
    var canvasContext;
    var ballSizeX = 10;
    var ballSizeY = 10;
    var ballX = 50;
    var ballY = 50;
    var ballSpeedX = 0;
    var ballSpeedY = 0;
    
    const PADDLE_WIDTH = 10;
    const PADDLE_HEIGHT = 100;
    
    var paddle1Y = 250;
    var paddle2Y = 250;
    var player1Score = 0;
    var player2Score = 0;
    const WINNING_SCORE = 3;
    
    var showingWinScreen = false;

    useEffect(() => {
        canvas = document.getElementById('gameCanvas');
        canvasContext = canvas.getContext('2d');
    
        paddle1Y = (canvas.height - PADDLE_HEIGHT)/2;
        paddle2Y = (canvas.height - PADDLE_HEIGHT)/2;
        ballX = (canvas.width - ballSizeX)/2;
        ballY = (canvas.height - ballSizeY)/2;
    
        var framesPerSeconds = 30;
        setInterval(function() {
                moveEverything();
                drawEverything();
            }, 1000/framesPerSeconds);
    
        canvas.addEventListener('mousemove',
            function(evt) {
                var mousePos = calculateMousePos(evt);
                var bottomLimit = canvas.height - PADDLE_HEIGHT;
                var middlePosition = mousePos.y - (PADDLE_HEIGHT/2);
    
                //paddle1Y = middlePosition.y < bottomLimit ? middlePosition : bottomLimit;
                paddle1Y = middlePosition;
                
            });
    }, [] );
    
    window.addEventListener("keypress", 
        function (evt){
            if(ballSpeedX==0 && ballSpeedY==0) {
                if(evt.keyCode==32) {
                    showingWinScreen = false;
                    player1Score = 0;
                    player2Score = 0;
    
                    ballSpeedX = Math.floor(Math.random() * 10);
                    ballSpeedY = Math.floor(Math.random() * 10);
                }
            }
        }
    );
    
    function calculateMousePos(evt) {
        var rect = canvas.getBoundingClientRect();
        var root = document.documentElement;
        var mouseX = evt.clientX - rect.left - root.scrollLeft;
        var mouseY = evt.clientY - rect.top - root.scrollTop;
        
        return { x:mouseX, y:mouseY };
    }
    
    function ballReset() {
        var gameEnded = false;
    
        if(player1Score >= WINNING_SCORE) {
            alert("Player 1 wins");
            gameEnded = true;
            showingWinScreen = true;
        } else if(player2Score >= WINNING_SCORE) {
            alert("Player 2 wins");
            gameEnded = true;
            showingWinScreen = true;
        }
    
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        if(gameEnded) {
            ballSpeedX = 0;
            ballSpeedY = 0;
        } else {
            ballSpeedX = -ballSpeedX;
            ballSpeedY = Math.floor(Math.random() * 10);
        }
    }
    
    function computerMovement() {
        var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
        if(paddle2YCenter < ballY-35) {
            paddle2Y += 5;
        } else if(paddle2YCenter > ballY+35) {
            paddle2Y -= 5;
        }
    }
    
    function moveEverything() {
        if(showingWinScreen == true) {
            return;
        }
        
        computerMovement();
    
        ballX += ballSpeedX;
        ballY += ballSpeedY;
        
        if(ballX < 0) {
            if(ballY > paddle1Y && (ballY < paddle1Y + PADDLE_HEIGHT)) {
                ballSpeedX = -ballSpeedX;
    
                var deltaY = ballY - (paddle1Y+(PADDLE_HEIGHT/2));
                ballSpeedY = deltaY * 0.35;
            } else {
                player2Score++;
                ballReset();
            }
        }
    
        if((ballX + ballSizeX) > canvas.width) {
            if(ballY > paddle2Y && (ballY < paddle2Y + PADDLE_HEIGHT)) {
                ballSpeedX = -ballSpeedX;
                
                var deltaY = ballY - (paddle2Y+(PADDLE_HEIGHT/2));
                ballSpeedY = deltaY * 0.35;
            } else {
                player1Score++;
                ballReset();
            }
        }
    
        if((ballY + ballSizeY) > canvas.height || ballY < 0) {
            ballSpeedY = -ballSpeedY;
        }
    }
    
    function colorRect(leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    }
    
    function colorCircle(centerX, centerY, radius, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true);
        canvasContext.fill();
    }
    
    function drawNet() {
        for(var i=0; i<canvas.height;i+=40) {
            colorRect((canvas.width/2)-1, i, 2, 20, 'white');
        }
    }
    
    function drawEverything() {
        colorRect(0, 0, canvas.width, canvas.height, 'black');
    
        if(showingWinScreen == true) {
            canvasContext.fillStyle = 'white';
            canvasContext.fillText("Press [space] to start game", (canvas.width/2)-50, 90);
            return;
        }
        
        canvasContext.fillStyle = 'white';
        canvasContext.fillText("Press [space] to start game", (canvas.width/2)-50, 30);
    
        drawNet();
        
        colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
        colorRect(canvas.width-PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
        colorCircle(ballX, ballY, ballSizeX, 'white');
    
    
        canvasContext.fillStyle = 'white';
        canvasContext.fillText(player1Score, 100, 100);
    
        canvasContext.fillStyle = 'white';
        canvasContext.fillText(player2Score, canvas.width-100, 100);
    }
    return <canvas id="gameCanvas" width="800" height="600"></canvas>
}

export default PongGame;