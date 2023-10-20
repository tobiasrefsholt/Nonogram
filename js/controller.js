"use strict";

window.addEventListener("load", () => {
    updateView();
})

function initGame() {
    model.app.boardSize = model.fields.options.boardSize;
    model.app.page = "activeGame";
    updateView();
}