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
    return /* html */ `
        <div class="game-grid grid-size-${size}">
            ${getGameCellsHTML(size)};
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

    if (rowCount == 0 && columnCount == 0) return `<div class="grid-cell grid-numbers-row"></div>`;

    if (rowCount == 0) {
        return /* html */ `
            <div class="grid-cell grid-numbers-row">${numbers.x[columnCount]}</div>
        `;
    }

    if (columnCount == 0) {
        return /* html */ `
            <div class="grid-cell grid-numbers-column">${numbers.y[rowCount - 1]}</div>
        `;
    }
}

function getCellHTML(rowCount, columnCount) {
    const cells = model.fields.cells;
    
    return /* html */ `
        <div class="grid-cell" row="${rowCount}" column="${columnCount}">${cells[rowCount - 1][columnCount - 1]}</div>
    `;
}