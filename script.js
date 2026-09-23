// ========================= // ЭКРАН 1// =========================
const leaves = document.querySelectorAll(".leaf");
leaves.forEach((leaf) => { const image = leaf.querySelector("img");
const frontSrc = image.src;
const backSrc = frontSrc.replace(".png", "-back.png");
let isBack = false;
leaf.addEventListener("click", () => {
    if (isBack) {
        image.src = frontSrc;
        isBack = false;
    } else {
        image.src = backSrc;
        isBack = true;
    }
});
});
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

// ========================= // ЭКРАН 3 // =========================

const ringsFrame = document.querySelector(".rings-frame"); const letters = document.querySelectorAll(".letter");
const letterTargets = [
    { left: 167, top: 226 }, // Г 
    { left: 256, top: 226 }, // О 
    { left: 355, top: 266 }, // Л 
    { left: 460, top: 226 }, // О 
    { left: 565, top: 226 }, // С 
    { left: 664, top: 226 }  // А 
    ];
let draggedLetter = null;
let startX = 0; let startY = 0;
let startLeft = 0; let startTop = 0;
let scaleX = 1; let scaleY = 1;
letters.forEach((letter, index) => {
letter.addEventListener("pointerdown", (event) => {
    if (letter.classList.contains("placed")) {
        return;
    }
    draggedLetter = letter;
    const frameRect = ringsFrame.getBoundingClientRect();
    scaleX = frameRect.width / ringsFrame.offsetWidth;
    scaleY = frameRect.height / ringsFrame.offsetHeight;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = letter.offsetLeft;
    startTop = letter.offsetTop;
    letter.setPointerCapture(event.pointerId);
    letter.style.cursor = "grabbing";
    letter.style.zIndex = "20";
    letter.classList.add("dragging");
});


letter.addEventListener("pointermove", (event) => {
    if (draggedLetter !== letter) {
        return;
    }
    const deltaX =
        (event.clientX - startX) / scaleX;
    const deltaY =
        (event.clientY - startY) / scaleY;
    const newLeft = startLeft + deltaX;
    const newTop = startTop + deltaY;
    letter.style.left = `${newLeft}px`;
    letter.style.top = `${newTop}px`;
});

letter.addEventListener("pointerup", (event) => {
    if (draggedLetter !== letter) {
        return;
    }
    draggedLetter = null;
    letter.style.cursor = "pointer";
    letter.style.zIndex = "5";
    letter.classList.remove("dragging");
    checkLetterPosition(index);
});

letter.addEventListener("pointercancel", () => {
    draggedLetter = null;
    letter.style.cursor = "pointer";
    letter.style.zIndex = "5";
    letter.classList.remove("dragging");
});

});

function checkLetterPosition(index) {
    const letter = letters[index];
    const target = letterTargets[index];
    const distance = Math.sqrt(
        Math.pow(letter.offsetLeft - target.left, 2) +
        Math.pow(letter.offsetTop - target.top, 2)
    );
    if (distance < 45) {
        letter.style.left = `${target.left}px`;
        letter.style.top = `${target.top}px`;

        letter.classList.add("placed");

        checkWordComplete();
    }
}

function checkWordComplete() {
const allPlaced = [...letters].every(letter =>
    letter.classList.contains("placed")
);

if (allPlaced) {
    ringsFrame.classList.add("word-complete");
    console.log("ГОЛОСА");
}
}

// =============================== // ЭКРАН 4  // ===========================

const screen4 = document.querySelector(".screen-4");
const grasses = document.querySelectorAll(".screen-4 .grass");

if (screen4 && grasses.length) {

    const radius = 180;
    const maxMove = 28;
    const maxRotate = 16;

    screen4.addEventListener("mousemove", (event) => {

        grasses.forEach((grass) => {

            const rect = grass.getBoundingClientRect();

            const baseX = rect.left + rect.width / 2;
            const baseY = rect.bottom;

            const dx = event.clientX - baseX;
            const dy = event.clientY - baseY;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            if (distance > radius) {
                grass.style.setProperty("--grass-x", "0px");
                grass.style.setProperty("--grass-rotate", "0deg");
                return;
            }

            const strength = 1 - distance / radius;

            const direction = dx > 0 ? -1 : 1;

            const move = direction * maxMove * strength;
            const rotate = direction * maxRotate * strength;

            grass.style.setProperty(
                "--grass-x",
                `${move}px`
            );

            grass.style.setProperty(
                "--grass-rotate",
                `${rotate}deg`
            );
        });

    });

    screen4.addEventListener("mouseleave", () => {

        grasses.forEach((grass) => {

            grass.style.setProperty(
                "--grass-x",
                "0px"
            );

            grass.style.setProperty(
                "--grass-rotate",
                "0deg"
            );

        });

    });

}
// ======================================== // ЭКРАН 5 // ========================================
const roots = document.querySelectorAll(".screen-5 .root"); const rootWords = document.querySelectorAll(".screen-5 .root-word");
roots.forEach((root, index) => {
root.addEventListener("click", () => {

    rootWords[index].classList.toggle("visible");

});
});