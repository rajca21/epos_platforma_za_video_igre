const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight;

const canvas = document.createElement("canvas");
canvas.setAttribute("width", SCREEN_WIDTH);
canvas.setAttribute("height", SCREEN_HEIGHT);
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

const FPS = 30; // frejmovi po sekundi
const ASTEROID_EDGE = 0.4; // oblik asteroida (0 = none, 1 = lots)
const ASTEROID_NUM = 3; // pocetni broj asteroida
const ASTEROID_SIZE = 100; // pocetna velicina asteroida 
const ASTEROID_SPEED = 100; // maximalna brzina asteroida u pixelima u sekundi
const ASTEROID_VERT = 10; // srednja vrednost koliko ce asteroid da ima stranica
const FRICTION = 0.7; // trenje (0 = bez trenja, 1 = mnogo trenja)
const SHIP_SIZE = 30; // visina broda u pixelima
const SHIP_THRUST = 5; // ubrzanje broda u pixelima po sekundi
const TURN_SPEED = 360; // brzina obrtanja broda u stepenu po sekundi
//kolizija 
const SHIP_DESTROYED_TIME = 0.3; // duzina unistenja broda 
const SHOW_FRAME = false; // obod broda i asteroida, kada se dodirnu da dodje do eksplozije, ako se stavi true vide se granice
var help = 0;
//laser
const LASER_DIST = 0.4; // max distanca lasera
const LASER_MAX = 10; // max broj lasera na ekranu
const LASER_SPD = 500; // brzinu lasera u pixelima po sekundi
const LASER_EXPLODE_DUR = 0.1; // eksplozija lasera u sekundama
var level, asteroids, ship, score;
newGame();
 

function newGame(){
    // podesavanje broda kao objekta
    ship = newShip();
    
    createAsteroidBelt();
}

function newShip(){
    return{
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: SHIP_SIZE / 2,
        a: 90 / 180 * Math.PI, // pretvaranje u radijane
        rot: 0,
        destroyTime: 0,
        ripship: false,
        thrusting: false, // nema ubrzanje na pocetku
        canShoot: true,
        explodeTime: 0,
        lasers:[],
        thrust: {
            x: 0,
            y: 0
        }
    }
}

//podesavanje asteroida
/*var asteroids = [];
createAsteroidBelt();*/

// podesavanja loopa 
setInterval(update, 1000 / FPS);
//unistavanje broda
function destroyShip(){
    ship.destroyTime = Math.ceil(SHIP_DESTROYED_TIME * FPS);
}


// podesavanje eventhandlera za drzanje dugmeta
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//pritiskanje dugmeta / drzanje
 function keyDown(/** @type {KeyboardEvent} */ ev) {
     if (ship.ripship){
         return;
     }
     if(help == 1){
     switch(ev.keyCode) {
         case 32: // space = (pewpew)
             shootLaser();
             break;
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
 }
//podizanje dugmeta / odpustanje
 function keyUp(/** @type {KeyboardEvent} */ ev) {
    if (ship.ripship){
        return;
    }
     if(help == 1){
     switch(ev.keyCode) {
         case 32: // space ( moze da puca ponovo )
             ship.canShoot = true;
             break;
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
            asteroids.push(newAsteroid(x,y, Math.ceil(ASTEROID_SIZE / 2)));
        } while (distBetweenPoints(ship.x, ship.y, x, y) < ASTEROID_SIZE * 2 + ship.r);
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 2)));
    }
}

function destroyAsteroid(index) {
    if (!ship.ripship){
    var x = asteroids[index].x;
    var y = asteroids[index].y;
    var r = asteroids[index].r;

    // deli se asteroid na 2 ako je moguce
    if (r == Math.ceil(ASTEROID_SIZE / 2)) { // veliki asteroid
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 4)));
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 4)));
    } else if (r == Math.ceil(ASTEROID_SIZE / 4)) { // srednji asteroid
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 8)));
        asteroids.push(newAsteroid(x, y, Math.ceil(ASTEROID_SIZE / 8)));
    }

    // unistavanje asteroida
    asteroids.splice(index, 1);
    }
}

//objekat asteroida
function newAsteroid(x, y, r) {
    var asteroid = {
        a: Math.random() * Math.PI * 2, 
        offs: [],
        r: r,
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

function shootLaser() {
    
    if (ship.canShoot && ship.lasers.length < LASER_MAX) {
        ship.lasers.push({ //iz vrha broda
            x: ship.x + 4 / 3 * ship.r * Math.cos(ship.a),
            y: ship.y - 4 / 3 * ship.r * Math.sin(ship.a),
            xv: LASER_SPD * Math.cos(ship.a) / FPS,
            yv: -LASER_SPD * Math.sin(ship.a) / FPS,
            dist: 0,
            explodeTime: 0
        });
    }

    ship.canShoot = false;
}

function update() {
    var destroying = ship.destroyTime > 0;
    // pozadina / polje igrice / popunjavanje kanvasa
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // ----------------BROD-------------------
        // ubrzavanje broda
        if (ship.thrusting && !ship.ripship) {
            ship.thrust.x += SHIP_THRUST * Math.cos(ship.a) / FPS;
            ship.thrust.y -= SHIP_THRUST * Math.sin(ship.a) / FPS;

            // crtanje izduvnih gasova
            if(!destroying){
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
            }
        } else { // dolazi do else kad pustimo strelicu na gore
            // dodajemo trenje (brod usporava polako kad prestane ubrzanje)
            ship.thrust.x -= FRICTION * ship.thrust.x / FPS;
            ship.thrust.y -= FRICTION * ship.thrust.y / FPS;
        }
        if (help==1 && !ship.ripship){
            if(!destroying){
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
        }else{
            //crta unistavanje broda, privremena zamena za https://www.geeksforgeeks.org/explosion-animation-in-canvas/ ili neku slicnu animaciju
            ctx.fillStyle = "black";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r*1.5, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "darkred";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r*1.2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "red";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r*0.9, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r*0.3, 0, Math.PI * 2, false);
            ctx.fill();
           // setTimeout(gameOver,100);
            gameOver();
         }
         //granice broda za koliziju
        if (SHOW_FRAME) {
            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.arc(ship.x, ship.y, ship.r, 0, Math.PI * 2, false);
            ctx.stroke();
        }      
        for(var i=0; i<asteroids.length;i++){
            if(distBetweenPoints(ship.x,ship.y,asteroids[i].x,asteroids[i].y)<ship.r + asteroids[i].r){
                destroyShip();
                destroyAsteroid();
                break;
            }
        }
        // tackica na sredini broda
        ctx.fillStyle = "red";
        ctx.fillRect(ship.x - 1, ship.y - 1, 2, 2);}
        // detektovanje hita lasera na asteroid
        var ax, ay, ar, lx, ly;
        for (var i = asteroids.length - 1; i >= 0; i--) {

            // vrednosti asteroida
            ax = asteroids[i].x;
            ay = asteroids[i].y;
            ar = asteroids[i].r;

            // loop za lasere
            for (var j = ship.lasers.length - 1; j >= 0; j--) {

                // vrednosti lasera
                lx = ship.lasers[j].x;
                ly = ship.lasers[j].y;

                // detekcija
                if (ship.lasers[j].explodeTime == 0 && distBetweenPoints(ax, ay, lx, ly) < ar) {

                    // unistavanje asteroida
                    destroyAsteroid(i);
                    ship.lasers[j].explodeTime = Math.ceil(LASER_EXPLODE_DUR * FPS);
                    break;
                }
            }
        }
        if(!destroying){
        // crtanje lasera
        for (var i = 0; i < ship.lasers.length; i++) {
            if(ship.lasers[i].explodeTime == 0){
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, SHIP_SIZE / 15, 0, Math.PI * 2, false);
                ctx.fill();
            } else{// crtamo eksploziju
                ctx.fillStyle = "orangered";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.75, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "salmon";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.5, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.fillStyle = "pink";
                ctx.beginPath();
                ctx.arc(ship.lasers[i].x, ship.lasers[i].y, ship.r * 0.25, 0, Math.PI * 2, false);
                ctx.fill();
            }
            
        }
        
            // okretanje broda
            ship.a += ship.rot;

            // pomeranje broda
            ship.x += ship.thrust.x;
            ship.y += ship.thrust.y;
        }
        

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

        //pomeranje lasera
        for (var i = ship.lasers.length - 1; i >= 0; i--){
            //provera distance lasera
            if (ship.lasers[i].dist > LASER_DIST * canvas.width){
                ship.lasers.splice(i, 1);
                continue;
            }
            // eksplozija lasera kad pogodi asteroid
            if (ship.lasers[i].explodeTime > 0) {
                ship.lasers[i].explodeTime--;

                // unistavanje / brisanje lasera
                if (ship.lasers[i].explodeTime == 0) {
                    ship.lasers.splice(i, 1);
                    continue;
                }}
            else{
                ship.lasers[i].x += ship.lasers[i].xv;
                ship.lasers[i].y += ship.lasers[i].yv;
            }

            //distanca koja je laser prosao
            ship.lasers[i].dist += Math.sqrt(Math.pow(ship.lasers[i].xv, 2) + Math.pow(ship.lasers[i].yv, 2));
            
            //kad ode van ekrana
            if (ship.lasers[i].x < 0){
                ship.lasers[i].x = canvas.width;
            }else if (ship.lasers[i].x > canvas.width){
                ship.lasers.x = 0
            }
            if (ship.lasers[i].y < 0){
                ship.lasers[i].y = canvas.height;
            }else if (ship.lasers[i].y > canvas.height){
                ship.lasers.y = 0
            }
        }
        
    // ----------------ASTEROIDI-------------------
    // crtanje asteroida
    var a, r, x, y, offs, vert;
    for (var i = 0; i < asteroids.length; i++) {
        ctx.strokeStyle = "slategrey";
        ctx.lineWidth = 1.5;
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
        //granice asteroida za koliziju
        if (SHOW_FRAME) {
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2, false);
            ctx.stroke();
        } 

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
function gameOver(){
    ship.ripship = true;
    endMenu();
}
function endMenu(){
    score=10;
    let gameOverMenu = document.getElementById("GameOver");
    let htmlScore = document.getElementById("score");
    htmlScore.innerHTML = score;
    gameOverMenu.style.display = "block";
    
}
function mainMenu(){
    let testman = document.getElementById("GameOver");
    let menu =document.getElementById("menu");
    
    testman.style.display = "none";
    menu.style.display = "block";
    help = 0;

}
function startGame() {
    document.getElementById("GameOver").style.display="none";
    let menu =document.getElementById("menu");
    menu.style.display= "none";
    help = 1;
    ship.ripship=false;
    newGame();    
}