"use strict";

function updateView() {
    let html = '';
    if (model.app.page == "options") {
        html = getOptionsHTML();
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