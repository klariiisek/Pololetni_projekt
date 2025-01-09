let backgroundImage;
let postavaImage;
let sirka = 600;
let vyska = 800;
let postavicka;

class Postavicka {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 80;
    this.speed = 5; // Rychlost pohybu
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
    // Zabránění pohybu mimo obrazovku
    this.x = constrain(this.x, 0, vyska - this.width);
  }
}

function preload() {
  postavaImage = loadImage('postava.png'); // Načti obrázek postavy
  backgroundImage = loadImage('cesta.jpg'); // Načti pozadí
}

function setup() {
  createCanvas(vyska, sirka);
  postavicka = new Postavicka(vyska / 2, sirka - 100); // Vytvoř postavu ve středu dole
}

function draw() {
  if (backgroundImage) {
    imageMode(CORNER);
    image(backgroundImage, 0, 0, vyska, sirka); // Vykresli pozadí
  } else {
    background(240); // Náhradní pozadí, pokud obrázek není načten
  }

  postavicka.move(); // Zpracování pohybu postavy
  postavicka.draw(); // Vykreslení postavy
}
