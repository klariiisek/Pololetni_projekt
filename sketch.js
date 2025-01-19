// Velikost mřížky
const velikostMrizky = 20;
const radky = 20;
const sloupce = 20;

// Hráč a had
let had;
let jidlo;
let skore = 0;
let konecHry = false;

// Zvuky
let zvukJablko;
let zvukKonecHry;
let pozadi;

function preload() {
    // Načti zvuky
    zvukJablko = loadSound('jablko.wav');
    zvukKonecHry = loadSound('konecHry.wav');

    // Načti obrázek pozadí
    pozadi = loadImage('pozadi.png');
}

function setup() {
    createCanvas(velikostMrizky * sloupce, velikostMrizky * radky);
    frameRate(7);  //Rychlost hada

    // Inicializace hada
    had = {
        telo: [{ x: 5, y: 5 }],
        smer: createVector(1, 0)
    };

    // Inicializace jídla
    vytvorJidlo();
}

function draw() {
    // Zobrazí pozadí
    background(pozadi);

    // Vykreslení hada
    fill(0, 255, 0); // Žlutá
    for (let segment of had.telo) {
        rect(segment.x * velikostMrizky, segment.y * velikostMrizky, velikostMrizky, velikostMrizky);
    }

    // Vykreslení jídla
    fill(255, 0, 0); // Červená
    rect(jidlo.x * velikostMrizky, jidlo.y * velikostMrizky, velikostMrizky, velikostMrizky);

    // Pohyb hada
    let hlava = had.telo[0];
    let novaHlava = createVector(hlava.x + had.smer.x, hlava.y + had.smer.y);

    // Zkontroluj kolizi s hranicí
    if (novaHlava.x < 0 || novaHlava.x >= sloupce || novaHlava.y < 0 || novaHlava.y >= radky || zkontrolujKolizi(novaHlava)) {
        konecHry = true;
        document.getElementById("konec-hry").style.display = "block"; // Zobrazí zprávu o konci hry
        zvukKonecHry.play(); // Přehrání zvuku pro konec hry
        document.getElementById("start-button").style.display = "block"; // Zobrazí tlačítko pro restart
        document.getElementById("restart-button").style.display = "block"; // Zobrazí tlačítko pro restart
        noLoop(); // Zastaví smyčku hry
        return;
    }

    had.telo.unshift(novaHlava); // Přidá novou hlavu
    if (novaHlava.x === jidlo.x && novaHlava.y === jidlo.y) {
        skore++;
        document.getElementById("skore").innerText = skore;
        zvukJablko.play(); // Přehrání zvuku při sežrání jablka
        vytvorJidlo(); // Když had sežere jídlo, vytvoří nové
    } else {
        had.telo.pop(); // Odstraň poslední segment
    }
}

// Funkce pro kontrolu kolize s hranicemi
function keyPressed() {
    if (keyCode === UP_ARROW && had.smer.y === 0) {
        had.smer.set(0, -1); // Nahoru
    } else if (keyCode === DOWN_ARROW && had.smer.y === 0) {
        had.smer.set(0, 1); // Dolu
    } else if (keyCode === LEFT_ARROW && had.smer.x === 0) {
        had.smer.set(-1, 0); // Doleva
    } else if (keyCode === RIGHT_ARROW && had.smer.x === 0) {
        had.smer.set(1, 0); // Doprava
    }
}

// Funkce pro vytvoření jídla na náhodné pozici
function vytvorJidlo() {
    let platnaPozice = false;
    while (!platnaPozice) {
        jidlo = {
            x: floor(random(sloupce)),
            y: floor(random(radky))
        };
        platnaPozice = !zkontrolujKolizi(jidlo); // Zajistí, že jídlo není uvnitř hada
    }
}

// Funkce pro kontrolu kolize s hadem
function zkontrolujKolizi(hlava) {
    for (let i = 1; i < had.telo.length; i++) {
        if (had.telo[i].x === hlava.x && had.telo[i].y === hlava.y) {
            return true;
        }
    }
    return false;
}

// Funkce pro začátek hry
function startGame() {
    skore = 0;
    document.getElementById("skore").innerText = skore;
    konecHry = false;
    document.getElementById("konec-hry").style.display = "none";  // Skrytí zprávy o konci hry
    document.getElementById("start-button").style.display = "none"; // Skrytí tlačítka pro start
    document.getElementById("restart-button").style.display = "none"; // Skrytí tlačítka pro restart
    had = { telo: [{ x: 5, y: 5 }], smer: createVector(1, 0) }; // Restartuj hada
    vytvorJidlo(); // Vytvoř nové jídlo
    loop(); // Znovu začne běžet herní smyčka
}

// Funkce pro restart hry po prohře
function restartGame() {
    startGame(); // Znovu spustí novou hru
    document.getElementById("restart-button").style.display = "none"; // Skryje tlačítko pro restart
}
