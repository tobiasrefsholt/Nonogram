"use strict";

window.addEventListener("load", () => {
    updateView();
})

function initGame() {
    model.app.page = "activeGame";
    updateView();
}

function generateNonogramModel(size) {
    const grid = generateNonogramModelGrid(size);
    const numbers = getNonogramModelNumbers(grid);
    return [grid, numbers]
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
    const isFilled = Math.random() < filledProbability;
    return isFilled;
}

function getNonogramModelNumbers(grid) {
    const nonogramNumbers = {x: [], y: []};
    for (let i=0; i<grid.length; i++) {
        const rowNumbers = countNonogramArray(grid[i]);
        const columnNumbers = countNonogramArray(getColumn(grid, i));
        nonogramNumbers.x.push(rowNumbers);
        nonogramNumbers.y.push(columnNumbers);
    }
    return nonogramNumbers;
}

function countNonogramArray(row) {
    const rowNumbers = [];
    let lastCell = false;
    for (let cell of row) {
        if (cell == true && lastCell == true) {
            rowNumbers[rowNumbers.length - 1]++;
        }
        else if (cell === true) {
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