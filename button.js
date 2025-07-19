export default class Button {
  constructor(canvas, label = "Play") {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.label = label;

    this.radius = 40;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2 + 100;
    this.isHovered = false;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const dist = Math.hypot(mouseX - this.x, mouseY - this.y);
      this.isHovered = dist <= this.radius;
    });
  }

  setLabel(label) {
    this.label = label;
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.isHovered ? "#007bff" : "#333";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.isHovered ? "#0056b3" : "#111";
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.label, this.x, this.y);
    ctx.restore();
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
  }

  isClicked(mouseX, mouseY) {
    const dist = Math.hypot(mouseX - this.x, mouseY - this.y);
    return dist <= this.radius;
  }
}
