"use strict";

const model = {
    app: {
        page: "options",
        boardSize: null,
    },
    fields: {
        options: {
            boardSize: 3,
        },
        numbers: {
            x: [
                '',
                [1],
                [3],
                [2],
            ],
            y: [
                [0],
                [3],
                [2],
            ],
        },
        cells: [
            // 0 = blank, 1 = x, 2 = filled
            [
                0,1,2,
            ],
            [
                1,2,0,
            ],
            [
                1,2,3
            ],
        ]
    },
}