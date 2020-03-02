let canvas, canvasContext, pause, middleScreenX, middleScreenY;
//let ballHit = new Audio('res/ball_hit.wav');
//let newPoint = new Audio('res/new_point.wav');
let fps = 30;

let paddle1 = {
  y: 10,
  x: 10,
  up: false,
  down: false,
  height: 100,
  width: 10,
  score: 0
};
let paddle2 = {
  y: 10,
  x: 10,
  up: false,
  down: false,
  height: 100,
  width: 10,
  score: 0
};
let ball = { x: 0, y: 0, speed: 2.5, height: 5, width: 5, velX: -2, velY: 2 };

document.addEventListener(
  "keydown",
  function(e) {
    switch (e.keyCode) {
      case 32:
        pause = !pause;
        break;
      case 38:
        // Up for paddle 1
        paddle1.up = true;
        break;
      case 40:
        // Down for paddle 2
        paddle1.down = true;
        break;
      case 87:
        // Up for paddle 1
        console.log("d");
        paddle2.up = true;
        break;
      case 83:
        // Down for paddle 2
        paddle2.down = true;
        break;
    }
  },
  false
);

document.addEventListener(
  "keyup",
  function(e) {
    switch (e.keyCode) {
      case 38:
        // Up
        paddle1.up = false;
        break;
      case 40:
        // Down
        paddle1.down = false;
        break;
      case 87:
        // Up
        paddle2.up = false;
        break;
      case 83:
        // Down
        paddle2.down = false;
        break;
    }
  },
  false
);

function isColliding(obj1, obj2) {
  if (!("x" in obj1 && "y" in obj1 && "height" in obj1 && "width" in obj1)) {
    console.log("error");
  }
  if (!("x" in obj2 && "y" in obj2 && "height" in obj2 && "width" in obj2)) {
    console.log("error");
  }

  return (
    obj1.x < (obj2.x + obj2.width) &&
    (obj1.x + obj1.width) > obj2.x &&
    obj1.y < (obj2.y + obj2.height) &&
    (obj1.y + obj1.height) > obj2.y
  );
}

  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext("2d");
  ballStartDir = Math.floor(Math.random() * 2 + 1);
  middleScreenX = canvas.width / 2;
  middleScreenY = canvas.height / 2;

  ball.x = middleScreenX;
  ball.y = middleScreenY;
  paddle2.x = canvas.width - 20;

  if (ballStartDir == 1) {
    ball.up = false;
    ball.right = true;
  } else {
    (ball.false = true), (ball.left = true);
  }

  pause = false;

window.requestAnimationFrame(playGame);

function playGame() {
  clear();
  if (pause) {
    canvasContext.fillStyle = "red";
    canvasContext.fillRect(middleScreenX - 50, middleScreenY - 15, 100, 30);
    canvasContext.fillStyle = "white";
    canvasContext.font = "12px Arial";
    canvasContext.fillText("Paused!", middleScreenX-20, middleScreenY+5 );
    return;
  }
  tick();
  draw();
  window.requestAnimationFrame(playGame);
}

function clear() {
  canvasContext.fillStyle = "#222";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  canvasContext.fillStyle = "#43C6DB";
  canvasContext.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  canvasContext.fillStyle = "#DB44C7";
  canvasContext.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  canvasContext.fillStyle = "white";
  canvasContext.fillRect(ball.x, ball.y, ball.width, ball.height);

  canvasContext.font = "12px Arial";
  canvasContext.fillText("Player 1: " + paddle1.score, middleScreenX - 50, 20);
  canvasContext.fillText("Player 2: " + paddle2.score, middleScreenX + 50, 20);
}

function tick() {
  ball.x += ball.velX;
  ball.y += ball.velY;

  if (paddle1.up && paddle1.y > 10) { paddle1.y -= 5; }
  if (paddle1.down && paddle1.y < canvas.height - paddle1.height - 10) { paddle1.y += 5; }
  if (paddle2.up && paddle2.y > 10) { paddle2.y -= 5; }
  if (paddle2.down && paddle2.y < canvas.height - paddle2.height - 10) { paddle2.y += 5; }

  if (ball.y < 0 || ball.y > canvas.height - 10) {
    // Bounce back if top wall
    // does not check for side wall
       ball.velY *= -1;
     //ballHit.play();
  }

  if (ball.x < 0 || ball.x > canvas.width) {
      // resets in the middle and goes towards the winning side
      // gives point to respective player
       if(ball.x < 0) { paddle2.score++; }
       if(ball.x > canvas.width) { paddle1.score++; }
       //newPoint.play();
       ball.velX *= paddle1.score > paddle2.score ? 1 : -1;
         ball.x = middleScreenX;
       ball.y = middleScreenY;
  }

  if (isColliding(ball, paddle1) || isColliding(ball, paddle2)) {
    ball.velX *= -1;
    //ballHit.play();
  }
}