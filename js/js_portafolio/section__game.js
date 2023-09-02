alert('¡Bienvenido a mi portafolio! encontraras los enlaces a mis paginas');
const ball = document.querySelector('.ball');
const paddle = document.querySelector('.paddle');
const obstacle = document.querySelectorAll('.obstacle');
const holes = document.querySelectorAll('.hole');
const startButton = document.querySelector('.startButton');
const gameContainer = document.querySelector('.game__container');

//queda pendiente verificar las rutas de sound, es posible que sea arror del servidor
//deberia ser /../../assets/sound/sound_portafolio/paddle.wav'); 
const paddleSound = new Audio('./assets/sound/sound_portafolio/paddle.wav');
const obstacleSound = new Audio('./assets/sound/sound_portafolio/paddle.wav');
const wallSound = new Audio('./assets/sound/sound_portafolio/paddle.wav');
const holeSound = new Audio('./assets/sound/sound_portafolio/hole.wav');
const startButtonSound = new Audio('./assets/sound/sound_portafolio/start.wav');
const loseSound = new Audio('./assets/sound/sound_portafolio/lose.wav');


let ballX = 300;
let ballY = 100;
let ballSpeedX = Math.random() < 0.5 ? -3 : 3;
let ballSpeedY = 0;
let gameStarted = false;

function updateBallPosition() {
    if (gameStarted) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Detección de colisión con bordes
        if (ballX <= 0 || ballX >= 580) {
            ballSpeedX = -ballSpeedX;
            wallSound.play(); // Reproduce el sonido de choque contra los bordes
        }
        if (ballY <= 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Detección de colisión con el suelo
        if (ballY >= 480) {
            gameOver();
            loseSound.play();
            return;
        }

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        // Colisión con el paddle
        if (checkCollision(ball, paddle)) {
            const deltaX = ballX - (paddle.offsetLeft + paddle.offsetWidth / 2);
            ballSpeedX = deltaX * 0.2;
            ballSpeedY = -ballSpeedY;
            paddleSound.play(); // Reproduce el sonido de colisión con el paddle
        }
        
        obstacle.forEach(singleObstacle => {
            if (checkCollision(ball, singleObstacle)) {
                const deltaY = ballY - (singleObstacle.offsetTop + singleObstacle.offsetHeight / 2);
                ballSpeedX = deltaY * 0.2;
                ballSpeedY = -ballSpeedY;
                obstacleSound.play(); // Reproduce el sonido de colisión con el obstáculo
            }
        });
        
        holes.forEach((hole, index) => {
            if (checkCollision(ball, hole)) {
                if (index === 3) {
                    // Dirige a una sección de la misma página (reemplaza 'seccion-destino' por el ID real)
                    window.scrollTo({ top: document.getElementById('footer').offsetTop, behavior: 'smooth' });
                } else {
                    // Abre una nueva página
                    window.open(hole.dataset.link, '_blank');
                }
                resetBall();
                holeSound.play(); // Reproduce el sonido de colisión con el agujero
            }
        });
        

        /*holes.forEach(hole => {
            if (checkCollision(ball, hole)) {
                window.open(hole.dataset.link, '_blank');
                resetBall();
                holeSound.play(); // Reproduce el sonido de colisión con el agujero
            }
        });*/
    }

    requestAnimationFrame(updateBallPosition);
}

function checkCollision(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function resetBall() {
    ballX = 300;
    ballY = 100;
    ballSpeedX = Math.random() < 0.5 ? -3 : 3;
    ballSpeedY = 0;
    gameStarted = false;
    startButton.disabled = false; // Habilitar el botón de inicio nuevamente
}

function gameOver() {
    loseSound.play();
    alert('¡Game Over! reinit your game');
    resetBall();
}

document.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    paddle.style.left = (x - 420) + 'px';
});

startButton.addEventListener('click', () => {
    if (!gameStarted) {
        gameStarted = true;
        ballSpeedY = 3;
        startButton.disabled = true; // Deshabilitar el botón de inicio durante el juego
        startButtonSound.play();
        updateBallPosition();
    }
});

updateBallPosition();


/*function updateBallPosition() {
    if (gameStarted) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Detección de colisión con bordes
        if (ballX <= 0 || ballX >= 580) {
            ballSpeedX = -ballSpeedX;
        }
        if (ballY <= 0) {
            ballSpeedY = -ballSpeedY;
        }

        // Detección de colisión con el suelo
        if (ballY >= 480) {
            gameOver();
            return;
        }

        ball.style.left = ballX + 'px';
        ball.style.top = ballY + 'px';

        // Colisión con el paddle
        if (checkCollision(ball, paddle)) {
            const deltaX = ballX - (paddle.offsetLeft + paddle.offsetWidth / 2);
            ballSpeedX = deltaX * 0.2;
            ballSpeedY = -ballSpeedY;
        }
        
        obstacle.forEach(singleObstacle => {
            if (checkCollision(ball, singleObstacle)) {
                const deltaY = ballY - (singleObstacle.offsetTop + singleObstacle.offsetHeight / 2);
                ballSpeedX = deltaY * 0.2;
                ballSpeedY = -ballSpeedY;
            }
        });
        
        holes.forEach(hole => {
            if (checkCollision(ball, hole)) {
                window.open(hole.dataset.link, '_blank');
                resetBall();
            }
        });
    }

    requestAnimationFrame(updateBallPosition);
}*/