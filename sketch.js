let backgroundImages = [];
let backgroundSections = [];
let postavaImage;
let sirka = 600;
let vyska = 800;
let postavicka;
let scrollSpeed = 5; // Rychlost posouvání pozadí
let startBackground; // Obrázek startovacího pozadí
let gameStarted = false; // Příznak, zda hra začala

class Postavicka {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 80;
    this.speed = 3; // Rychlost pohybu
  }

  draw() {
    image(postavaImage, this.x, this.y, this.width, this.height);
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed; // Pohyb doleva
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed; // Pohyb doprava
    }

    // Zabránění pohybu postavičky mimo obrazovku
    this.x = constrain(this.x, 0, sirka - this.width);
  }

  moveVertically() {
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed; // Pohyb postavy nahoru
      if (gameStarted) scrollBackground(scrollSpeed); // Posun pozadí při pohybu nahoru
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed; // Pohyb postavy dolů
    }

    this.y = constrain(this.y, 0, vyska - this.height); // Omezíme pohyb vertikálně
  }
}

class BackgroundSection {
  constructor(image, yPosition) {
    this.image = image;
    this.y = yPosition;
    this.height = 300; // Výška každé sekce pozadí
  }

  draw() {
    image(this.image, 0, this.y, sirka, this.height);
  }
}

function scrollBackground(speed) {
  for (let section of backgroundSections) {
    section.y += speed;

    if (section.y >= vyska) { // Pokud sekce překročí obrazovku, přesuň ji zpět nahoru
      section.y = -section.height;
      section.image = random(backgroundImages); // Náhodně změň obrázek
    }
  }
}

function preload() {
  postavaImage = loadImage('holcicka.png'); // Načti obrázek postavy
  startBackground = loadImage('start.png'); // Načti startovací obrázek
  backgroundImages.push(loadImage('silnice.png')); // Silnice
  backgroundImages.push(loadImage('koleje.png')); // Koleje
  backgroundImages.push(loadImage('reka.png')); // Řeka
  backgroundImages.push(loadImage('lava.png')); // Láva
}

function setup() {
  createCanvas(sirka, vyska);
  postavicka = new Postavicka(sirka / 2, vyska - 200); // Postavička je trochu výš na startovací obrazovce

  // Inicializace náhodného pozadí
  for (let i = 0; i < 4; i++) {
    let randomBackground = random(backgroundImages);
    backgroundSections.push(new BackgroundSection(randomBackground, i * 300));
  }
}

function draw() {
  if (!gameStarted) {
    // Zobrazení startovací obrazovky
    image(startBackground, 0, 0, 600, 300);
    postavicka.draw();

    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text('Stiskni šipku nahoru pro start', sirka / 2, vyska - 100);

    // Spuštění hry, když hráč stiskne šipku nahoru
    if (keyIsDown(UP_ARROW)) {
      gameStarted = true;
    }
  } else {
    // Hlavní hra
    background(255); // Vyčistíme plátno

    for (let section of backgroundSections) {
      section.draw();
    }

    postavicka.moveVertically();
    postavicka.move();
    postavicka.draw();
  }
}
