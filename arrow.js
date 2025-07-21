export const sharedAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
import Level from "./level.js";

export default class Arrow {
  constructor(canvas) {
    this.direction = Math.random() < 0.5 ? 'left' : 'right';
    this.colors = ['black', 'yellow', 'green', 'purple', 'blue', 'red', 'pink'];
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
     if (Level.mode === "numbers") {
       this.color = "black";
     } else {
       this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
     }

    this.size = 100;
    this.tailLength = 70;
    this.tailThickness = this.size / 4;
    this.graySize = this.size * 1.3;
    this.grayTailLength = this.tailLength * 1.3;
    this.grayTailThickness = this.graySize / 4;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.gap = 10;
  }

  playTone() {
    const oscillator = sharedAudioCtx.createOscillator();
    const gainNode = sharedAudioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(110, sharedAudioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.9, sharedAudioCtx.currentTime); // slightly quieter

    oscillator.connect(gainNode);
    gainNode.connect(sharedAudioCtx.destination);

    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + 0.2);
    oscillator.stop(sharedAudioCtx.currentTime + 0.2);
  }

  drawArrow(ctx, x, y, size, tailLength, tailThickness, color, roundCaps = false) {
    ctx.save();
    ctx.translate(x, y);

    if (this.direction === "left") {
      ctx.scale(-1, 1);
    }

    ctx.fillStyle = color;

    if (roundCaps) {
      ctx.lineCap = "round";
      ctx.lineWidth = tailThickness;
      ctx.beginPath();
      ctx.moveTo(-tailLength, 0);
      ctx.lineTo(0, 0);
      ctx.strokeStyle = color;
      ctx.stroke();
    } else {
      ctx.fillRect(-tailLength, -tailThickness / 2, tailLength, tailThickness);
    }

    ctx.beginPath();
    ctx.moveTo(0, -size / 2);
    ctx.lineTo(size, 0);
    ctx.lineTo(0, size / 2);
    ctx.lineTo(size / 4, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  render(ctx) {
    this.drawArrow(
      ctx,
      this.x,
      this.y + this.tailThickness / 2 + this.gap,
      this.graySize,
      this.grayTailLength,
      this.grayTailThickness,
      "gray",
      true
    );

    this.drawArrow(
      ctx,
      this.x,
      this.y,
      this.size,
      this.tailLength,
      this.tailThickness,
      this.color,
      false
    );
  }
}
