const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");


const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

const gridToggle = document.querySelector("#grid-toggle");

let squaresPerSide = 16;
let gridVisible = false;

let isDrawing = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridSquares();
    createGridSquares();
}

function setBackgroundColor(e) {
    if (e.type === "mousedown") {
        isDrawing = true;
        e.target.style.backgroundColor = "black";
    }
    else if (e.type === "mouseover" && isDrawing) {
        e.target.style.backgroundColor = "black";
    }
    else isDrawing = false;
}

function createGridSquares() {
    const numberOfSquares = (squaresPerSide * squaresPerSide);

    for (let i = 0; i < numberOfSquares; i++ ) {
        const gridCell = document.createElement("div");


        let widthOrHeight = 0;

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide) - 2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else if (!gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight; 

        gridCell.addEventListener("mousedown", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseover", (e) => setBackgroundColor(e));
        gridCell.addEventListener("mouseup", (e) => setBackgroundColor(e));
        gridCell.addEventListener("dragstart", (e) => e.preventDefault());

        sketchArea.appendChild(gridCell);

    } 
}

function removeGridSquares() {
    while (sketchArea.firstChild) {
        sketchArea.removeChild(sketchArea.firstChild);
    }
}

slider.oninput = function () {
    squaresPerSide = this.value;

    sliderValue.textContent = `${this.value} x ${this.value} (Resolution)`;
    removeGridSquares();
    createGridSquares();
}

gridToggle.addEventListener("click", toggleGrid);

createGridSquares();