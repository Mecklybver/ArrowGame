import Arrow from "./arrow.js";
import Button from "./button.js";
import { sharedAudioCtx } from "./arrow.js";
import Level from "./level.js";
import Word from "./word.js";
import { Number } from "./number.js";
import { Color } from "./color.js";
import Prepositions from "./prepositions.js";

const img = new Image();
img.src = "./Img/logo.jpeg";

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

let arrow = null;
const button = new Button(canvas);
const color = new Color();
const level = new Level(canvas);
const numberLevel = new Number();
const prepositions = new Prepositions(canvas);
const words = [
  new Word(canvas), // top
  new Word(canvas), // bottom
  new Word(canvas), // left
  new Word(canvas), // right
];

// Speaker toggle button parameters
const speakerSize = 40;
const speakerMargin = 20;
let soundEnabled = true;
let speakerX = speakerMargin;
let speakerY = speakerMargin;

let isAnimating = false;
let pendingStart = false;

function requestFullscreen() {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  } else if (canvas.msRequestFullscreen) {
    canvas.msRequestFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement && pendingStart) {
    pendingStart = false;
    startArrowAnimation();
  }
});

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (arrow) {
    arrow.x = canvas.width / 2;
    arrow.y = canvas.height / 2;
  }
  button.updatePosition(canvas.width / 2, canvas.height / 2 + 100);
  level.updatePosition(canvas.width - level.width - 20, 20);

  speakerX = speakerMargin;
  speakerY = speakerMargin;
}
window.addEventListener("resize", resize);
resize();

canvas.addEventListener("pointerdown", (e) => {
  const rect = canvas.getBoundingClientRect();
  const pointerX = e.clientX - rect.left;
  const pointerY = e.clientY - rect.top;

  // Check if speaker button clicked
  if (
    pointerX >= speakerX &&
    pointerX <= speakerX + speakerSize &&
    pointerY >= speakerY &&
    pointerY <= speakerY + speakerSize
  ) {
    soundEnabled = !soundEnabled;
    return;
  }

  // Check if main button clicked
  if (button.isClicked(pointerX, pointerY)) {
    if (button.label === "Play") {
      button.setLabel("Go");
      return;
    }

    if (button.label === "Go") {
      if (isAnimating) return;

      if (!document.fullscreenElement) {
        pendingStart = true;
        requestFullscreen();
      } else {
        startArrowAnimation();
      }
    }
  }
});

function startArrowAnimation(interval = 80, duration = 3000) {
  isAnimating = true;
  words.forEach((word) => word.hide());

  let elapsed = 0;

  const run = () => {
    arrow = new Arrow(canvas);

    // Make arrow black in prepositions mode
    if (Level.mode === "prepositions") {
      arrow.color = "black";
    }

    if (soundEnabled) {
      arrow.playTone();
      if (navigator.vibrate) navigator.vibrate(50);
    }
  };

  run();

  const animInterval = setInterval(() => {
    elapsed += interval;
    if (elapsed >= duration) {
      clearInterval(animInterval);
      arrow = new Arrow(canvas);

      if (Level.mode === "prepositions") {
        arrow.color = "black";
      }

      playFinalTone();
      isAnimating = false;

      if (Level.mode === "hard") {
        const options = [
          "black",
          "yellow",
          "green",
          "purple",
          "blue",
          "red",
          "pink",
        ];
        const text = options[Math.floor(Math.random() * options.length)];
        const color = arrow.color;

        words[0].setWord(text, canvas.width / 2, 40, color, 0);
        words[1].setWord(
          text,
          canvas.width / 2,
          canvas.height - 40,
          color,
          Math.PI
        );
        words[2].setWord(text, 40, canvas.height / 2, color, -Math.PI / 2);
        words[3].setWord(
          text,
          canvas.width - 40,
          canvas.height / 2,
          color,
          Math.PI / 2
        );
      }

      if (Level.mode === "numbers") {
        arrow.color = "black";
        if (soundEnabled) {
          numberLevel.playSound();
          if (navigator.vibrate) navigator.vibrate(100);
        }
      }

      if (Level.mode === "easy") {
        if (soundEnabled) {
          color.playAudio({ color: arrow.color, colors: arrow.colors });
          if (navigator.vibrate) navigator.vibrate(50);
        }
      }

      if (Level.mode === "prepositions") {
        arrow.color = "black";
        if (soundEnabled) {
          prepositions.playSound();
          if (navigator.vibrate) navigator.vibrate(50);
        }
      }
    } else {
      run();

      if (Level.mode === "prepositions") {
        prepositions.showAboveArrow(arrow);
        if (soundEnabled && navigator.vibrate) navigator.vibrate(50);
      } else {
        prepositions.hide();
      }
    }
  }, interval);
}

function playFinalTone() {
  if (!soundEnabled) return;

  const oscillator = sharedAudioCtx.createOscillator();
  const gainNode = sharedAudioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, sharedAudioCtx.currentTime);
  gainNode.gain.setValueAtTime(1, sharedAudioCtx.currentTime);

  oscillator.connect(gainNode);
  gainNode.connect(sharedAudioCtx.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    sharedAudioCtx.currentTime + 0.4
  );
  oscillator.stop(sharedAudioCtx.currentTime + 0.4);
}

function drawSpeakerIcon(ctx, x, y, size, enabled) {
  ctx.save();
  ctx.lineWidth = 2;
  ctx.strokeStyle = enabled ? "black" : "gray";
  ctx.fillStyle = enabled ? "black" : "gray";

  ctx.beginPath();
  ctx.moveTo(x + size * 0.2, y + size * 0.3);
  ctx.lineTo(x + size * 0.5, y + size * 0.3);
  ctx.lineTo(x + size * 0.7, y + size * 0.1);
  ctx.lineTo(x + size * 0.7, y + size * 0.9);
  ctx.lineTo(x + size * 0.5, y + size * 0.7);
  ctx.lineTo(x + size * 0.2, y + size * 0.7);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (enabled) {
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(
        x + size * 0.75,
        y + size * 0.5,
        size * 0.1 * i,
        -Math.PI / 4,
        Math.PI / 4
      );
      ctx.stroke();
    }
  } else {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(x + size * 0.15, y + size * 0.85);
    ctx.lineTo(x + size * 0.85, y + size * 0.15);
    ctx.stroke();
  }

  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (arrow) arrow.render(ctx);
  button.render();
  level.render();
  prepositions.render();
  words.forEach((word) => word.render());
  drawSpeakerIcon(ctx, speakerX, speakerY, speakerSize, soundEnabled);

  requestAnimationFrame(animate);
}

animate();
