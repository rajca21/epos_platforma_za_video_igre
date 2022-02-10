const FPS = 30; // frejmovi po sekundi
const ASTEROID_EDGE = 0.4; // oblik asteroida (0 = none, 1 = lots)
const ASTEROID_NUM = 30; // pocetni broj asteroida
const ASTEROID_SIZE = 100; // pocetna velicina asteroida 
const ASTEROID_SPEED = 100; // maximalna brzina asteroida u pixelima u sekundi
const ASTEROID_VERT = 10; // srednja vrednost koliko ce asteroid da ima stranica

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SCREEN_WIDTH);
canvas.setAttribute("height", SCREEN_HEIGHT);
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");



//podesavanje asteroida
var asteroids = [];
createAsteroidBelt();

// podesavanja loopa asteroida
setInterval(update, 1000 / FPS);

function createAsteroidBelt() {
    asteroids = [];
    var x, y;
    for (var i = 0; i < ASTEROID_NUM; i++) {
       
            x = Math.floor(Math.random() * canvas.width);
            y = Math.floor(Math.random() * canvas.height);
            asteroids.push(newAsteroid(x,y));
    }
}


//objekat 
function newAsteroid(x, y) {
    var asteroid = {
        a: Math.random() * Math.PI * 2, 
        offs: [],
        r: ASTEROID_SIZE / 2,
        vert: Math.floor(Math.random() * (ASTEROID_VERT + 1) + ASTEROID_VERT / 2),
        x: x,
        y: y,
        xv: Math.random() * ASTEROID_SPEED / FPS * (Math.random() < 0.5 ? 1 : -1),
        yv: Math.random() * ASTEROID_SPEED / FPS * (Math.random() < 0.5 ? 1 : -1)
    };

  
    for (var i = 0; i < asteroid.vert; i++) {
        asteroid.offs.push(Math.random() * ASTEROID_EDGE * 2 + 1 - ASTEROID_EDGE);
    }

    return asteroid;
}

function update() {
    // da asteroidi ne ostavljaju 
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
   

    // crtanje asteroida
    ctx.strokeStyle = "slategrey";
    ctx.lineWidth = 1.5;
    var a, r, x, y, offs, vert;
    for (var i = 0; i < asteroids.length; i++) {

        // uzimanje propertija asteroida
        a = asteroids[i].a;
        r = asteroids[i].r;
        x = asteroids[i].x;
        y = asteroids[i].y;
        offs = asteroids[i].offs;
        vert = asteroids[i].vert;
        
        // crtanje puta
        ctx.beginPath();
        ctx.moveTo(
            x + r * offs[0] * Math.cos(a),
            y + r * offs[0] * Math.sin(a)
        );

        // crtanje oblika
        for (var j = 1; j < vert; j++) {
            ctx.lineTo(
                x + r * offs[j] * Math.cos(a + j * Math.PI * 2 / vert),
                y + r * offs[j] * Math.sin(a + j * Math.PI * 2 / vert)
            );
        }
        ctx.closePath();
        ctx.stroke();

        // pomeranje asteroida
        asteroids[i].x += asteroids[i].xv;
        asteroids[i].y += asteroids[i].yv;

        // kada asteroid ode van ekrana
        if (asteroids[i].x < 0 - asteroids[i].r) {
            asteroids[i].x = canvas.width + asteroids[i].r;
        } else if (asteroids[i].x > canvas.width + asteroids[i].r) {
            asteroids[i].x = 0 - asteroids[i].r
        }
        if (asteroids[i].y < 0 - asteroids[i].r) {
            asteroids[i].y = canvas.height + asteroids[i].r;
        } else if (asteroids[i].y > canvas.height + asteroids[i].r) {
            asteroids[i].y = 0 - asteroids[i].r
        }
    }

}











function startGame() {
    
    let gameCanvas = document.getElementById("canvas");
    let menu =document.getElementById("menu");
    

    menu.style.display= "none";
    gameCanvas.style.display = "block";

    
}