const prepositionsList = [
  "on",
  "in",
  "under",
  "next to",
  "in front of",
  "behind",
];

const sounds = [
  new Audio("./audio/on.ogg"),
  new Audio("./audio/in.ogg"),
  new Audio("./audio/under.ogg"),
  new Audio("./audio/next_to.ogg"),
  new Audio("./audio/in_front_of.ogg"),
  new Audio("./audio/behind.ogg"),
];

export default class Prepositions {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.text = null
    this.index = null; 
    this.visible = false;
    this.x = 0;
    this.y = 0;
  }

  showAboveArrow(arrow) {
    const randomIndex = Math.floor(Math.random() * prepositionsList.length);
    this.index = randomIndex; // ✅ Save the index
    this.text = prepositionsList[randomIndex];
    this.visible = true;
    this.x = arrow.x;
    this.y = arrow.y - 50;
  }

  hide() {
    this.visible = false;
  }

  playSound() {
    const sound = sounds[this.index]; 
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((e) => {
        console.warn("Audio playback failed:", e);
      });
    }
  }

  render() {
    if (!this.visible) return;

    const ctx = this.ctx;
    ctx.save();
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}
