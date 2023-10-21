"use strict";

function updateView() {
    let html = '';
    if (model.app.page == "options") {
        html = getOptionsHTML();
    }
    if (model.app.page == "activeGame") {
        html = getGameHTML();
    }
    document.getElementById('app').innerHTML = html;
}

function getOptionsHTML() {
    return /* html */`
        <h2>Velg størrelse</h2>
        <div class="choose-board-size">
            <label for="board-size-3x3">
                <input type="radio" name="board-size" id="board-size-3x3" onfocus="model.fields.options.boardSize = 3" checked="true">
                3x3
            </label>
            <label for="board-size-5x5">
                <input type="radio" name="board-size" id="board-size-5x5" onfocus="model.fields.options.boardSize = 5">
                5x5
            </label>
            <label for="board-size-10x10">
                <input type="radio" name="board-size" id="board-size-10x10" onfocus="model.fields.options.boardSize = 10">
                10x10
            </label>
            <label for="board-size-15x15">
                <input type="radio" name="board-size" id="board-size-15x15" onfocus="model.fields.options.boardSize = 15">    
                15x15
            </label>
            <button onclick="initGame()">Start spill</button>
        </div>
    `;
}

function getGameHTML() {
    const size = model.fields.options.boardSize;
    const mistakesLeft = model.fields.options.mistakesAllowed - model.fields.mistakes;
    return /* html */ `
        <h2>Remaining mistakes: ${mistakesLeft}</h2>
        <div class="game-grid grid-size-${size}">
            ${getGameCellsHTML(size)}
        </div>
    `;
}

function getGameCellsHTML(size) {
    let cellsHTML = '';
    for (let rowCount = 0; rowCount <= size; rowCount++) {
        for (let columnCount = 0; columnCount <= size; columnCount++) {
            if (rowCount == 0 || columnCount == 0) {
                cellsHTML += getNumberCellsHTML(rowCount, columnCount);
            } else {
                cellsHTML += getCellHTML(rowCount, columnCount);
            }
        }
    }
    return cellsHTML;
}

function getNumberCellsHTML(rowCount, columnCount) {
    const numbers = model.nonogram.numbers;
    let cellNumbers;
    let cellNumbersHTML = '';
    let cellClass;

    if (rowCount == 0 && columnCount == 0) return `<div class="grid-cell grid-numbers-row"></div>`;

    if (rowCount == 0) {
        cellNumbers = numbers.x[columnCount - 1];
        cellClass = 'grid-numbers-row';
    } else if (columnCount == 0) {
        cellNumbers = numbers.y[rowCount - 1];
        cellClass = 'grid-numbers-column';
    } else {
        return;
    }

    if (!cellNumbers) cellNumbers = [0];

    for (let number of cellNumbers) {
        cellNumbersHTML += /* html */ `
            <span>${number}</span>
        `;
    }

    return /* html */ `
        <div class="grid-cell ${cellClass}">${cellNumbersHTML}</div>
    `;
}

function getCellHTML(rowCount, columnCount) {
    const cells = model.fields.cells;
    const cellFieldValue = cells[rowCount - 1][columnCount - 1];
    let cellClass;
    let cellOnClick = '';

    switch (cellFieldValue) {
        case 1:
            cellClass = 'cell-x';
            break;
        case 2:
            cellClass = 'cell-filled';
            break;
        default:
            cellClass = 'cell-empty';
            cellOnClick = `clickCell({row: ${rowCount - 1}, column: ${columnCount - 1}})`;
    };
    
    return /* html */ `
        <div class="grid-cell ${cellClass}" row="${rowCount - 1}" column="${columnCount - 1}" onclick="${cellOnClick}"></div>
    `;
}