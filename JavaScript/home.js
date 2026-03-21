let wordIndex = 0;
let words = [];

const svgList = [
  { texture: "/css/ProductVectors/Akua.svg", w: 270, h: 100, scale: 1.25 },
  { texture: "/css/ProductVectors/Albert.svg", w: 340, h: 220, scale: 1.5 },
  { texture: "/css/ProductVectors/Duban.svg", w: 270, h: 170, scale: 1.5 },
  { texture: "/css/ProductVectors/StonePond.svg", w: 190, h: 90, scale: 1.5 },
  { texture: "/css/ProductVectors/FinalTransmission.svg", w:210, h:160, scale: 1.5}
];
let svgIndex = 0;
const referenceWidth = 600;


function updateWords() {
  if (window.innerWidth < 425) {
    words = ["playful", "reliable", "rational"];
  } else {
    words = ["playful", "reliable", "resourceful", "rational"];
  }
}

updateWords(); // run once on load
window.addEventListener("resize", updateWords);


function changeText() {
  const paragraphElement = document.getElementById("swapText");

  paragraphElement.classList.remove('animate-swap');
  void paragraphElement.offsetWidth;
  paragraphElement.classList.add('animate-swap');

  const animationDuration = 500;

  setTimeout(() => {
    wordIndex = (wordIndex + 1) % words.length;
    paragraphElement.textContent = words[wordIndex];
  }, animationDuration / 2);
}

setInterval(changeText, 1500);

function updateTime() {
  const timeElement = document.querySelector('.time');
  const options = {
    timeZone: 'America/Vancouver',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  const formatter = new Intl.DateTimeFormat('en-CA', options);
  const currentTime = formatter.format(new Date());

  timeElement.textContent = currentTime;
}
updateTime();
setInterval(updateTime, 1000);

let engine, render, runner;
let container;

window.addEventListener("DOMContentLoaded", () => {

  container = document.getElementById("gravity-container");

  if (!container) {
    console.error("gravity-container not found");
    return;
  }

  setupMatter();

});

function setupMatter() {

  const width = container.clientWidth;
  const height = container.clientHeight;

  engine = Matter.Engine.create();
  runner = Matter.Runner.create();

  render = Matter.Render.create({
  element: container,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: "transparent",
    pixelRatio: window.devicePixelRatio
  }
});
render.canvas.width = width * window.devicePixelRatio;
render.canvas.height = height * window.devicePixelRatio;
render.canvas.style.width = width + "px";
render.canvas.style.height = height + "px";
  // invisible walls
  const floor = Matter.Bodies.rectangle(width / 2 , height + 21, width, 40, { isStatic: true });
  const leftWall = Matter.Bodies.rectangle(-21, height / 2, 40, height*2, { isStatic: true });
  const rightWall = Matter.Bodies.rectangle(width + 21, height / 2, 40, height*2, { isStatic: true });

  Matter.World.add(engine.world, [floor, leftWall, rightWall]);

  dropSVG(width);

  const mouse = Matter.Mouse.create(render.canvas);
mouse.pixelRatio = window.devicePixelRatio;

  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false
      }
    }
  });

  Matter.World.add(engine.world, mouseConstraint);

  render.mouse = mouse;

  Matter.Render.run(render);
  Matter.Runner.run(runner, engine);
}

function dropSVG(width) {

  const referenceWidth = 600;
  const scaleFactor = Math.min(width / referenceWidth, 1);

  const svg = svgList[svgIndex];
  svgIndex = (svgIndex + 1) % svgList.length;

  const body = Matter.Bodies.rectangle(
    Math.random() * width,
    -200,
    svg.w * scaleFactor,
    svg.h * scaleFactor,
    {
      restitution: 0.6,
      friction: 0.3,
      render: {
        sprite: {
          texture: svg.texture,
          xScale: svg.scale * scaleFactor,
          yScale: svg.scale * scaleFactor
        }
      }
    }
  );

  Matter.World.add(engine.world, body);
}

for (let i = 0; i < 4; i++) {
  setTimeout(() => dropSVG(container.clientWidth), i * 600);
}

window.addEventListener("resize", () => {

  Matter.Render.stop(render);
  Matter.Runner.stop(runner);
  Matter.World.clear(engine.world);
  Matter.Engine.clear(engine);

  container.innerHTML = "";

  setupMatter();

});