const FPS = 30; // frejmovi po sekundi
const ASTEROID_EDGE = 0.4; // oblik asteroida (0 = none, 1 = lots)
const ASTEROID_NUM = 15; // pocetni broj asteroida
const ASTEROID_SIZE = 100; // pocetna velicina asteroida 
const ASTEROID_SPEED = 100; // maximalna brzina asteroida u pixelima u sekundi
const ASTEROID_VERT = 10; // srednja vrednost koliko ce asteroid da ima stranica
const FRICTION = 0.7; // trenje (0 = bez trenja, 1 = mnogo trenja)
const SHIP_SIZE = 30; // visina broda u pixelima
const SHIP_THRUST = 5; // ubrzanje broda u pixelima po sekundi
const TURN_SPEED = 360; // brzina obrtanja broda u stepenu po sekundi
var help = 0;

const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SCREEN_WIDTH);
canvas.setAttribute("height", SCREEN_HEIGHT);
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// podesavanje broda kao objekta
var ship = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    r: SHIP_SIZE / 2,
    a: 90 / 180 * Math.PI, // pretvaranje u radijane
    rot: 0,
    thrusting: false, // nema ubrzanje na pocetku
    thrust: {
        x: 0,
        y: 0
    }
}

//podesavanje asteroida
var asteroids = [];
createAsteroidBelt();

// podesavanja loopa 
setInterval(update, 1000 / FPS);

// podesavanje eventhandlera za drzanje dugmeta
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//pritiskanje dugmeta / drzanje
 function keyDown(/** @type {KeyboardEvent} */ ev) {
     switch(ev.keyCode) {
         case 37: // leva strelica (okretanje broda u levo)
             ship.rot = TURN_SPEED / 180 * Math.PI / FPS;
             break;
         case 38: // gornja strelica (ubrzavanje broda napred)
             ship.thrusting = true;
             break;
         case 39: // desna strelica (okretanje broda u desno)
             ship.rot = -TURN_SPEED / 180 * Math.PI / FPS;
             break;
     }
 }
//podizanje dugmeta / odpustanje
 function keyUp(/** @type {KeyboardEvent} */ ev) {
     switch(ev.keyCode) {
         case 37: // leva strelica (prekidanje okretanju broda u levo)
             ship.rot = 0;
             break;
         case 38: // gornja strelica (prekidanje ubrzavanja broda napred)
             ship.thrusting = false;
             break;
         case 39: // desna strelica (prekidanje okretanja broda u desno)
             ship.rot = 0;
             break;
     }
 }

 function distBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
} 

function createAsteroidBelt() {
    asteroids = [];
    var x, y;
    for (var i = 0; i < ASTEROID_NUM; i++) {
        do{
            x = Math.floor(Math.random() * canvas.width);
            y = Math.floor(Math.random() * canvas.height);
            asteroids.push(newAsteroid(x,y));
        } while (distBetweenPoints(ship.x, ship.y, x, y) < ASTEROID_SIZE * 2 + ship.r);
        asteroids.push(newAsteroid(x, y));
    }
}

//objekat asteroida
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
    // pozadina / polje igrice / popunjavanje kanvasa
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ----------------BROD-------------------
        // ubrzavanje broda
        if (ship.thrusting) {
            ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
            ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

            // crtanje izduvnih gasova
            ctx.fillStyle = "red";
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = SHIP_SIZE / 10;
            ctx.beginPath();
            ctx.moveTo( // levo
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - 0.5 * Math.cos(ship.a))
            );
            ctx.lineTo( // pravo (iza broda)
                ship.x - ship.r * 4 / 3 * Math.cos(ship.a),
                ship.y + ship.r * 4 / 3 * Math.sin(ship.a)
            );
            ctx.lineTo( // desno
                ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - 0.5 * Math.sin(ship.a)),
                ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + 0.5 * Math.cos(ship.a))
            );
            ctx.closePath();
            // ctx.fill();
            ctx.stroke();
        } else { // dolazi do else kad pustimo strelicu na gore
            // dodajemo trenje (brod usporava polako kad prestane ubrzanje)
            ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
            ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
        }
        if (help==1){
        // crtanje broda
        ctx.strokeStyle = "white";
        ctx.lineWidth = SHIP_SIZE / 20;
        ctx.beginPath();
        ctx.moveTo( // vrh broda
            ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
            ship.y - 4 / 3 * ship.r * Math.sin(ship.a)
        );
        ctx.lineTo( // leva strana
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) + Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) - Math.cos(ship.a))
        );
        ctx.lineTo( // desna strana
            ship.x - ship.r * (2 / 3 * Math.cos(ship.a) - Math.sin(ship.a)),
            ship.y + ship.r * (2 / 3 * Math.sin(ship.a) + Math.cos(ship.a))
        );
        ctx.closePath();
        ctx.stroke();
        
        // tackica na sredini broda
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);}

        // okretanje broda
        ship.a += ship.rot;

        // pomeranje broda
        ship.x += ship.thrust.x;
        ship.y += ship.thrust.y;

        // kada brod ode na ivicu ekrana
        if (ship.x < 0 - ship.r) {
            ship.x = canvas.width + ship.r;
        } else if (ship.x > canvas.width + ship.r) {
            ship.x = 0 - ship.r;
        }
        if (ship.y < 0 - ship.r) {
            ship.y = canvas.height + ship.r;
        } else if (ship.y > canvas.height + ship.r) {
            ship.y = 0 - ship.r;
        }

        
    // ----------------ASTEROIDI-------------------
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
    help = 1;    
}