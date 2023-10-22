"use strict";

window.addEventListener("load", () => {
    updateView();
})

function initGame() {
    model.app.page = "activeGame";
    const nonogram = generateNonogramModel(model.fields.options.boardSize);
    model.nonogram = nonogram;
    model.fields.cells = generateEmptyNonogramFields(model.fields.options.boardSize);
    updateView();
}

function generateNonogramModel(size) {
    const grid = generateNonogramModelGrid(size);
    const numbers = getNonogramModelNumbers(grid);
    return {grid, numbers}
}

function generateNonogramModelGrid(size) {
    const rows = [];
    for (let i=0; i<size; i++) {
        rows.push(generateNonogramModelRow(size));
    }
    return rows;
}

function generateNonogramModelRow(size) {
    const row = [];
    for (let i=0; i<size; i++) {
        row.push(generateNonogramModelCell());
    }
    return row;
}

function generateNonogramModelCell() {
    const filledProbability = 0.6;
    const isFilled = (Math.random() < filledProbability) ? 2 : 1;
    return isFilled;
}

function getNonogramModelNumbers(grid) {
    const nonogramNumbers = {x: [], y: []};
    for (let i=0; i<grid.length; i++) {
        const rowNumbers = countNonogramArray(grid[i]);
        const columnNumbers = countNonogramArray(getColumn(grid, i));
        nonogramNumbers.x.push(columnNumbers);
        nonogramNumbers.y.push(rowNumbers);
    }
    return nonogramNumbers;
}

function countNonogramArray(row) {
    const rowNumbers = [];
    let lastCell = false;
    for (let cell of row) {
        if (cell === 2 && lastCell === 2) {
            rowNumbers[rowNumbers.length - 1]++;
        }
        else if (cell === 2) {
            rowNumbers.push(1);
        }
        lastCell = cell;
    }
    return rowNumbers;
}

function getColumn(grid, columnIndex) {
    const column = [];
    for (let i=0; i<grid.length; i++) {
        column.push(grid[i][columnIndex]);
    }
    return column;
}


function generateEmptyNonogramFields(size) {
    const grid = [];
    for (let i=0; i<size; i++) {
        const row = [];
        for (let i=0; i<size; i++) {
            row.push(0);
        }
        grid.push(row);
    }
    return grid;
}

function clickCell(coordinates) {
    let cell = model.fields.cells[coordinates.row][coordinates.column];
    const correctValue = model.nonogram.grid[coordinates.row][coordinates.column];
    const selectedValue = model.fields.selectedValue;
    console.log(coordinates);
    if (selectedValue === correctValue) {
        model.fields.cells[coordinates.row][coordinates.column] = selectedValue;
        console.log("Correct!")
    } else {
        model.fields.mistakes++;
        console.log("Wrong!")
    }
    updateView();
}

function toggleCrossOrSquare() {
    console.log(model.fields.selectedValue);
    model.fields.selectedValue = (model.fields.selectedValue == 1) ? 2 : 1;
    console.log(model.fields.selectedValue);
    console.log("Hey there!")
    updateView();
}

function solvePuzzle() {
    console.log("Auto solve");
    console.log(model.nonogram.grid);
    for(let row=0; row<model.nonogram.grid.length; row++) {
        for (let column=0; column<model.nonogram.grid.length; column++) {
            model.fields.cells[row][column] = model.nonogram.grid[row][column] ? 2 : 1;
        }
    }
    updateView();
}   