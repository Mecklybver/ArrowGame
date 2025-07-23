// prepositions.js

const prepositionsList = [
  "above",
  "below",
  "across",
  "through",
  "under",
  "over",
  "behind",
  "between",
  "in front of",
  "next to",
  "near",
  "beside",
];

export default class Prepositions {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.text = "";
    this.visible = false;
    this.x = 0;
    this.y = 0;
  }

  showAboveArrow(arrow) {
    const randomIndex = Math.floor(Math.random() * prepositionsList.length);
    this.text = prepositionsList[randomIndex];
    this.visible = true;
    this.x = arrow.x;
    this.y = arrow.y - 50;
  }

  hide() {
    this.visible = false;
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
