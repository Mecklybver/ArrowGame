export default class Level {
  static mode = "easy";

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.label = Level.mode.charAt(0).toUpperCase() + Level.mode.slice(1);
    this.width = 100;
    this.height = 40;
    this.x = canvas.width - this.width - 20;
    this.y = 20;
    this.isHovered = false;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.isHovered =
        mouseX >= this.x &&
        mouseX <= this.x + this.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.height;
    });

    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (this.isClicked(mouseX, mouseY)) {
        const modes = ["easy", "hard", "numbers", "prepositions"];
        let currentIndex = modes.indexOf(Level.mode);
        currentIndex = (currentIndex + 1) % modes.length;
        Level.mode = modes[currentIndex];
        this.label = Level.mode.charAt(0).toUpperCase() + Level.mode.slice(1);
      }

    });
  }

  render() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.isHovered ? "#28a745" : "#444";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.strokeStyle = this.isHovered ? "#1c7a35" : "#222";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 18px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
    ctx.restore();
  }

  isClicked(mouseX, mouseY) {
    return (
      mouseX >= this.x &&
      mouseX <= this.x + this.width &&
      mouseY >= this.y &&
      mouseY <= this.y + this.height
    );
  }

    updatePosition(x, y) {
  this.x = x;
  this.y = y;
}

}
