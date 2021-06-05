const $canvas = document.getElementById("myCanvas");
const $ctx = $canvas.getContext("2d");

let x = $canvas.width/2;
let y = $canvas.height-30;

let dx = 5;
let dy = -5;
let dxp = 5;

const ballRadius = 10;
const wid = $canvas.width;
const hi = $canvas.height;
let ballColor = 'skyblue';
let paddleColor = 'blue';
let paddleColorE = 'black'
const paddleHeightM = 8;
const paddleWidthM = 120;
const paddleHeightE = 8;
let paddleWidthE = 120;
let paddleEMove = 20;
const moveEasy = 10;
const moveNormal = 15;
const moveHard = 20;
let paddleXMW = (wid-paddleWidthM)/2;
let paddleXMH = hi-paddleHeightM;
let paddleXEW = (wid-paddleWidthE)/2;
let paddleXEH = 0;
let rightPressed = false;
let leftPressed = false;

//ボタン情報の取得あと文も
const $doc = document;
const $levels = $doc.getElementById('levels');
const $level = $levels.querySelectorAll('[data-lev]');
const tex = $doc.getElementById('tex')

//ボタンを消す関数
const reset = (a) => {
    $level[a].style.display = 'none';
};


//操作方法の定義
document.addEventListener("keydown",(e) => {keyDownHandler(e);});
document.addEventListener("keyup", (e) => {keyUpHandler(e);});
document.addEventListener("mousemove", (e) => mouseMoveHandler(e));

const keyDownHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
};

const keyUpHandler = (e) => {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
};

const mouseMoveHandler = (e) => {
    let relativeX = e.clientX - $canvas.offsetLeft;
    if(relativeX > 0 && relativeX < $canvas.width) {
        paddleXMW = relativeX - paddleWidthM/2;
    }
};

//ballを描く
const drawball = () => {
    $ctx.beginPath();
    $ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    $ctx.fillStyle = '#A00';
    $ctx.fill();
    $ctx.closePath(); 
};

drawball();

//paddleを描く
const drawPaddleMy = () => {
    $ctx.beginPath();
    $ctx.rect(paddleXMW, paddleXMH, paddleWidthM, paddleHeightM);
    $ctx.fillStyle = paddleColor;
    $ctx.fill();
    $ctx.closePath();
};

drawPaddleMy();

//paddleを描く２
const drawPaddleEn = () => {
    $ctx.beginPath();
    $ctx.rect(paddleXEW, paddleXEH, paddleWidthE, paddleHeightE);
    $ctx.fillStyle = paddleColorE;
    $ctx.fill();
    $ctx.closePath();
};

drawPaddleEn();

//合体.動かす関数
const draw = () => {
    $ctx.clearRect(0, 0, wid, hi);
    drawball(); 
    drawPaddleMy();
    drawPaddleEn();

    if(x + dx > wid - ballRadius || x + dx < 0 + ballRadius){
        dx = -dx;
    }

    if(y + dy < 0 + ballRadius + paddleHeightE && (x > paddleXEW && x < paddleXEW + paddleWidthE)){
        dy = -(Math.random()/8 + 1 )*dy;
        dx = (Math.random()/8 + 1 )*dx;
    }
    else if(y < 0){
        alert("YOU WIN !!");
        document.location.reload();
        x = $canvas.width/2;
        y = $canvas.height-30;
        paddleXMW = (wid-paddleWidthM)/2;
        paddleXEW = (wid-paddleWidthE)/2;

    }

    if(y + dy > hi - ballRadius - paddleHeightM && (x > paddleXMW && x < paddleXMW + paddleWidthM)){
        dy = -(Math.random()/8 + 1 )*dy;
        dx = (Math.random()/8 + 1 )*dx;
    }
    else if(y > hi ){
        alert("GAMEOVER....");
        document.location.reload();
        x = $canvas.width/2;
        y = $canvas.height-30;
        paddleXMW = (wid-paddleWidthM)/2;
        paddleXEW = (wid-paddleWidthE)/2;
    }

    if(rightPressed && paddleXMW < wid-paddleWidthM){
        paddleXMW += 15;
    }
    else if(leftPressed && paddleXMW > 0) {
        paddleXMW -= 15;
    }
    
    if(paddleXEW + paddleWidthE*3/4 < x){
        paddleXEW += paddleEMove;
    }
    else if(paddleXEW + paddleWidthE*1/4> x ){
        paddleXEW -= paddleEMove;
    }

    x += dx;
    y += dy;

    requestAnimationFrame(draw);    

};

//難易度選択する関数
const handleClick = (e) => {
    e.preventDefault();

    const $target = e.target;
    const targetVal = $target.dataset.lev;

    let index = 0;
    while(index < $level.length){
        reset(index);
        index++;
    }

    if(targetVal === '0'){
        paddleEMove = moveEasy;
        tex.innerText = '難易度：Easy';
    }
    else if(targetVal === '1'){
        paddleEMove = moveNormal;
        tex.innerText = '難易度：Normal';
    }
    else{
        paddleEMove = moveHard;
        paddleWidthE = 180;
        tex.innerText = '難易度：Hard';
    }
    window.alert('Are you ready??');
    draw(); 
};

//クリックされたら実行する
let index = 0;
    while(index < $level.length){
        $level[index].addEventListener('click', (e) => handleClick(e));
        index++;
    }




