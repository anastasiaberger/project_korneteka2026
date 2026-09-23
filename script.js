/* ===================================================== ЭКРАН 2 ===================================================== */
const branchArea = document.querySelector(".branch-area"); 
const connectionSvg = document.querySelector(".connection-svg");
const points = [ 
    document.querySelector(".point-1"), 
    document.querySelector(".point-2"), 
    document.querySelector(".point-3"), 
    document.querySelector(".point-4"), 
    document.querySelector(".point-5"), 
    document.querySelector(".point-6") 
];

const words = [ 
    document.querySelector(".word-1"), 
    document.querySelector(".word-2"), 
    document.querySelector(".word-3"), 
    document.querySelector(".word-4"), 
    document.querySelector(".word-5"), 
    document.querySelector(".word-6") 
];

const lines = [];
for (let i = 0; i < points.length - 1; i++) {
const line = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
);
line.classList.add("connection-line");
connectionSvg.appendChild(line);
lines.push(line);
}

function getPointCenter(point) {
return {
    x: point.offsetLeft + point.offsetWidth / 2,
    y: point.offsetTop + point.offsetHeight / 2
};
}

function drawLines() {
for (let i = 0; i < lines.length; i++) {

    const start = getPointCenter(points[i]);
    const end = getPointCenter(points[i + 1]);

    lines[i].setAttribute("x1", start.x);
    lines[i].setAttribute("y1", start.y);

    lines[i].setAttribute("x2", end.x);
    lines[i].setAttribute("y2", end.y);
}
}

drawLines();

window.addEventListener("resize", drawLines);



let activePoint = null;
let currentConnection = 0;
points.forEach((point, index) => {
point.addEventListener("pointerdown", (event) => {

    if (index !== currentConnection) {
        return;
    }

    activePoint = point;
    point.setPointerCapture(event.pointerId);

});


point.addEventListener("pointermove", (event) => {

    if (!activePoint) {
        return;
    }

    const targetPoint = points[currentConnection + 1];

    if (!targetPoint) {
        return;
    }

    const rect = branchArea.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const targetX =
        targetPoint.offsetLeft +
        targetPoint.offsetWidth / 2;

    const targetY =
        targetPoint.offsetTop +
        targetPoint.offsetHeight / 2;

    const distance = Math.sqrt(
        Math.pow(mouseX - targetX, 2) +
        Math.pow(mouseY - targetY, 2)
    );

    if (distance < 35) {

        completeConnection();

    }

});


point.addEventListener("pointerup", () => {

    activePoint = null;

});
});

function completeConnection() {

if (currentConnection >= lines.length) {
    return;
}

lines[currentConnection].classList.add("completed");

words[currentConnection].classList.add("visible");

points[currentConnection].classList.add("completed");

currentConnection++;


if (currentConnection === lines.length) {

    points[points.length - 1].classList.add("completed");

    words[5].classList.add("visible");
}
}


