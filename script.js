import Arrow from "./arrow.js";
import Button from "./button.js";
import { sharedAudioCtx } from "./arrow.js";
import Level from "./level.js";
import Word from "./word.js";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let arrow = null;
const button = new Button(canvas);
const level = new Level(canvas);
const words = [
  new Word(canvas), // top
  new Word(canvas), // bottom
  new Word(canvas), // left
  new Word(canvas), // right
];

let isAnimating = false;
let pendingStart = false;

function requestFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen(); // Safari
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen(); // IE11
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement && pendingStart) {
    pendingStart = false;
    startArrowAnimation();
  }
});

const resize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (arrow) {
    arrow.x = canvas.width / 2;
    arrow.y = canvas.height / 2;
  }
  button.updatePosition(canvas.width / 2, canvas.height / 2 + 100);
  level.updatePosition(canvas.width - level.width - 20, 20);
};
window.addEventListener("resize", resize);
resize();

canvas.addEventListener("pointerdown", (e) => {
  
  const rect = canvas.getBoundingClientRect();
  const pointerX = e.clientX - rect.left;
  const pointerY = e.clientY - rect.top;

  if (button.isClicked(pointerX, pointerY)) {
    if (button.label === "Play") {
  button.setLabel("Go");
}

    if (isAnimating) return;

    if (!document.fullscreenElement) {
      pendingStart = true;
      requestFullscreen();
    } else {
      startArrowAnimation();
    }
  }
});

function startArrowAnimation() {
  isAnimating = true;
  words.forEach(word => word.hide());

  let elapsed = 0;
  const duration = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
  const interval = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

  const run = () => {
    arrow = new Arrow(canvas);
    arrow.playTone();
  };

  run();

  const animInterval = setInterval(() => {
    elapsed += interval;
    if (elapsed >= duration) {
      clearInterval(animInterval);
      arrow = new Arrow(canvas);
      playFinalTone();
      isAnimating = false;

      if (Level.mode === "hard") {
        const options = ["😔   😔😔   😔", "😊yellow😊", "😊green😊", "😊purple😊", "😊blue😊", "😊red😊", "pink"];
        const text = options[Math.floor(Math.random() * options.length)];
        const color = arrow.color;

        // Top
        words[0].setWord(text, canvas.width / 2, 40, color, 0);
        // Bottom
        words[1].setWord(text, canvas.width / 2, canvas.height - 40, color, Math.PI);
        // Left
        words[2].setWord(text, 40, canvas.height / 2, color, -Math.PI / 2);
        // Right
        words[3].setWord(text, canvas.width - 40, canvas.height / 2, color, Math.PI / 2);
      }
    } else {
      run();
    }
  }, interval);
}

function playFinalTone() {
  const oscillator = sharedAudioCtx.createOscillator();
  const gainNode = sharedAudioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, sharedAudioCtx.currentTime);
  gainNode.gain.setValueAtTime(1, sharedAudioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(sharedAudioCtx.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.001, sharedAudioCtx.currentTime + 0.4);
  oscillator.stop(sharedAudioCtx.currentTime + 0.4);
}

// Main animation loop
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (arrow) arrow.render(ctx);
  button.render();
  level.render();
  words.forEach(word => word.render());
  requestAnimationFrame(animate);
};

animate();
