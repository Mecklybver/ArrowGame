export class Number {
  constructor() {
      this.audios = [new Audio("./audio/01.ogg"),
                     new Audio("./audio/02.ogg"),
                     new Audio("./audio/03.ogg"),
                     new Audio("./audio/04.ogg"),
                     new Audio("./audio/05.ogg"),
                     new Audio("./audio/06.ogg"),
                     new Audio("./audio/07.ogg"),
                     new Audio("./audio/08.ogg"),
                     new Audio("./audio/09.ogg"),
                     new Audio("./audio/10.ogg"),
                   
    ];
  }

    playSound() {
      const random = Math.floor(Math.random() * this.audios.length);
    this.audios[random].play().catch((e) => {
      console.warn("Audio playback failed:", e);
    });
  }
}
