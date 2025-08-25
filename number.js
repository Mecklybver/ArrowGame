import Level from "./level.js"; // to check Level.numbersRange

export class Number {
  constructor() {
    // Set 1: 1–20
    this.audios1to20 = [
      new Audio("./audio/01.ogg"),
      new Audio("./audio/02.ogg"),
      new Audio("./audio/03.ogg"),
      new Audio("./audio/04.ogg"),
      new Audio("./audio/05.ogg"),
      new Audio("./audio/06.ogg"),
      new Audio("./audio/07.ogg"),
      new Audio("./audio/08.ogg"),
      new Audio("./audio/09.ogg"),
      new Audio("./audio/10.ogg"),
      new Audio("./audio/11.ogg"),
      new Audio("./audio/12.ogg"),
      new Audio("./audio/13.ogg"),
      new Audio("./audio/14.ogg"),
      new Audio("./audio/15.ogg"),
      new Audio("./audio/16.ogg"),
      new Audio("./audio/17.ogg"),
      new Audio("./audio/18.ogg"),
      new Audio("./audio/19.ogg"),
      new Audio("./audio/20.ogg"),
    ];

    // Set 2: tens 30–90
    this.audiosTens = [
      new Audio("./audio/30.ogg"),
      new Audio("./audio/40.ogg"),
      new Audio("./audio/50.ogg"),
      new Audio("./audio/60.ogg"),
      new Audio("./audio/70.ogg"),
      new Audio("./audio/80.ogg"),
      new Audio("./audio/90.ogg"),
    ];
  }

  get audios() {
    if (Level.numbersRange === "1-20") {
      return this.audios1to20;
    } else if (Level.numbersRange === "1-90") {
      // include both sets
      return [...this.audios1to20, ...this.audiosTens];
    }
    return this.audios1to20; 
  }

  playSound() {
    const pool = this.audios;
    const random = Math.floor(Math.random() * pool.length);
    pool[random].play().catch((e) => {
      console.warn("Audio playback failed:", e);
    });
  }
}
