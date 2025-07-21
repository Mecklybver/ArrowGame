export class Color {
  constructor() {
    this.audios = [
      new Audio("./audio/cor01.ogg"), // black
      new Audio("./audio/cor02.ogg"), // yellow
      new Audio("./audio/cor03.ogg"), // green
      new Audio("./audio/cor04.ogg"), // purple
      new Audio("./audio/cor05.ogg"), // blue
      new Audio("./audio/cor06.ogg"), // red
      new Audio("./audio/cor07.ogg"), // pink
    ];

    // Optional: preload to reduce delay
    this.audios.forEach((audio) => {
      audio.load();
    });
  }

  playAudio({ color, colors }) {
    const index = colors.indexOf(color);
    const audio = this.audios[index];

    if (audio) {
      try {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      } catch (e) {
        console.warn("Audio playback failed:", e);
      }
    } else {
      console.warn("No audio found for color:", color);
    }
  }
}
