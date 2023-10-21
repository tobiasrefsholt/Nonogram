"use strict";

const model = {
    app: {
        page: "options",
    },
    fields: {
        options: {
            boardSize: 3,
            mistakesAllowed: 3,
        },
        mistakes: 0,
        selectedValue: 2,
        cells: [
            // 0 = blank, 1 = x, 2 = filled
            /* 
                [0,1,2],
                [1,2,0],
                [1,2,3]
            */
        ],
    },
    nonogram: {
        grid: [
            /* 
                [false, false, true],
                [false, true, true],
                [false, true, false]
            */
        ],
        numbers: {
            /*
                x: [
                    [1],[2],[1]
                ],
                y: [
                    [], [2], [2]
                ]
            */
        }
    }
}