export default class Level {
  static mode = "easy";
  static numbersRange = "1-20"; // default range; only "1-20" or "1-100"

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.label = Level.mode.charAt(0).toUpperCase() + Level.mode.slice(1);
    this.width = 100;
    this.height = 40;
    this.x = canvas.width - this.width - 20;
    this.y = 20;
    this.isHovered = false;

    // extra button props for numbers mode
    this.extraWidth = 100;
    this.extraHeight = 40;
    this.extraX = this.x;
    this.extraY = this.y + this.height + 10;
    this.extraHovered = false;

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      this.isHovered =
        mouseX >= this.x &&
        mouseX <= this.x + this.width &&
        mouseY >= this.y &&
        mouseY <= this.y + this.height;

      if (Level.mode === "numbers") {
        this.extraHovered =
          mouseX >= this.extraX &&
          mouseX <= this.extraX + this.extraWidth &&
          mouseY >= this.extraY &&
          mouseY <= this.extraY + this.extraHeight;
      } else {
        this.extraHovered = false;
      }
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

      // toggle between 1-20 and 1-90
      if (
        Level.mode === "numbers" &&
        mouseX >= this.extraX &&
        mouseX <= this.extraX + this.extraWidth &&
        mouseY >= this.extraY &&
        mouseY <= this.extraY + this.extraHeight
      ) {
        Level.numbersRange = Level.numbersRange === "1-20" ? "1-100" : "1-20";
      }
    });
  }

  render() {
    const ctx = this.ctx;
    ctx.save();

    // main button
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

    // extra button only in numbers mode
    if (Level.mode === "numbers") {
      ctx.fillStyle = this.extraHovered ? "#007bff" : "#555";
      ctx.fillRect(this.extraX, this.extraY, this.extraWidth, this.extraHeight);

      ctx.strokeStyle = this.extraHovered ? "#0056b3" : "#333";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.extraX,
        this.extraY,
        this.extraWidth,
        this.extraHeight
      );

      ctx.fillStyle = "white";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        Level.numbersRange,
        this.extraX + this.extraWidth / 2,
        this.extraY + this.extraHeight / 2
      );
    }

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
    this.extraX = this.x;
    this.extraY = this.y + this.height + 10;
  }
}
