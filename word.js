export default class Word {
  constructor(canvas, text = "", x = 0, y = 0, color = "black", rotation = 0, scale = 1) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.visible = false;
    this.scale = scale;
    this.rotation = rotation;
  }

  setWord(text, x, y, color, rotation = 0, scale = 1) {
    this.text = text;
    this.x = x;
    this.y = y;
    this.color = color;
    this.rotation = rotation;
    this.scale = scale;
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }

  render() {
    if (!this.visible) return;

    const ctx = this.ctx;
    ctx.save();

    // Move to position
    ctx.translate(this.x, this.y);

    // Apply rotation
    ctx.rotate(this.rotation);

    // Apply scale (if needed)
    ctx.scale(this.scale, this.scale);

    ctx.fillStyle = this.color;
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(this.text.toUpperCase(), 0, 0);

    ctx.restore();
  }
}
