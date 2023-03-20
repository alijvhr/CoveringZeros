import Bruteforce from "./Bruteforce.mjs";
import Optimized from "./Optimized.mjs";

let bruteforce = new Bruteforce();
let optimized = new Optimized();

let inputs = [
    [
        [0, 0, 1, 1],
        [0, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 1, 1, 1]
    ],
    [
        [0, 1, 0, 0, 5],
        [1, 0, 3, 4, 5],
        [7, 0, 0, 4, 5],
        [9, 0, 3, 4, 5],
        [3, 0, 3, 4, 5]
    ],
    [
        [0, 1, 0, 0, 5],
        [1, 0, 3, 4, 5],
        [7, 0, 0, 0, 5],
        [9, 0, 3, 4, 5],
        [3, 0, 3, 4, 5]
    ],
    [
        [5, 0, 0, 0, 5],
        [1, 0, 0, 4, 5],
        [7, 0, 0, 0, 5],
        [9, 0, 3, 4, 5],
        [3, 0, 3, 4, 5]
    ],
    [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ],
    [
        [1, 1, 1, 2, 1, 1, 0],
        [5, 8, 9, 0, 3, 5, 5],
        [0, 2, 0, 6, 9, 8, 1],
        [1, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1],
        [0, 0, 4, 0, 1, 1, 0],
        [1, 1, 0, 1, 1, 6, 1]
    ],
    [
        [1, 1, 1, 2, 1, 1, 5],
        [5, 8, 9, 0, 3, 5, 5],
        [0, 2, 0, 6, 9, 8, 1],
        [1, 1, 1, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1],
        [0, 0, 4, 0, 1, 1, 0],
        [1, 1, 0, 1, 1, 6, 1]
    ]
];


for (let i = 1; i < inputs.length; i++) {
    optimized.input(inputs[i]).run();
    bruteforce.input(inputs[i]).run();

    console.log("------------ Test Case " + i + " ------------");
    console.log("Min Output:" + bruteforce.minimum + ', ' + optimized.minimum);
    console.log("Input:");
    console.log(optimized.drawMatrix());
    console.log("Bruteforce Output:");
    console.log(bruteforce.drawOutput());
    console.log("Optimized Output:");
    console.log(optimized.drawOutput());
}