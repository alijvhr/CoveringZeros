class hungarianAlgorithm {

    #inputArray;

    #colLength;
    #rowLength;
    #matrixPower;
    #matrixLine;
    #minimum = 0;
    #shortAxis;
    #longAxis;

    input(inputArray) {
        this.#inputArray = inputArray;
        this.#colLength = inputArray.length;
        this.#rowLength = inputArray[0].length;
        this.#matrixPower = [Array(this.#rowLength).fill(0), Array(this.#colLength).fill(0)];
        this.#matrixLine = [Array(this.#rowLength).fill(0), Array(this.#colLength).fill(0)];
        this.#shortAxis = this.#colLength > this.#rowLength ? this.#rowLength : this.#colLength;
        this.#longAxis = this.#colLength > this.#rowLength ? this.#colLength : this.#rowLength;
        return this;
    }


    #hvRemove() {
        let cross, axis = [0, 0], len = [this.#matrixPower[0].length, this.#matrixPower[1].length], crosses;
        for (let main = 0; main < 2; main++) {
            cross = +!main;
            for (axis[main] = 0; axis[main] < len[main]; axis[main]++) {
                if (this.#matrixPower[main][axis[main]] > 0) {
                    crosses = [];
                    for (axis[cross] = 0; axis[cross] < len[cross]; axis[cross]++) {
                        if (this.#inputArray[axis[0]][axis[1]] == 0) {
                            if (this.#matrixPower[cross][axis[cross]] < 2) {
                                this.#matrixLine[main][axis[main]] = 1;
                                this.#minimum++;
                                break;
                            }
                        }
                    }
                    if (this.#matrixLine[main][axis[main]])
                        for (axis[cross] = 0; axis[cross] < this.#matrixPower[cross].length; axis[cross]++) {
                            if (this.#inputArray[axis[0]][axis[1]] == 0)
                                this.#matrixPower[cross][axis[cross]]--;
                        }
                    else this.#matrixPower[main][axis[main]] = 0;
                }
            }
        }
    }

    run() {

        let check = 0, count = [0, 0];
        for (let row = 0; row < this.#rowLength; row++) {
            for (let col = 0; col < this.#colLength; col++) {
                if (this.#inputArray[row][col] == 0) {
                    this.#matrixPower[0][row]++;
                    this.#matrixPower[1][col]++;
                }
            }
        }
        this.#minimum = 0;
        this.#hvRemove();

        return this;
    }

    get() {
        return this.#minimum;
    }

    output() {
        let outputMatrix = [];
        for (let row = 0; row < this.#rowLength; row++) {
            outputMatrix[row] = [];
            for (let col = 0; col < this.#colLength; col++) {
                if (this.#matrixLine[0][row] && this.#matrixLine[1][col]) outputMatrix[row][col] = "_|_";
                else if (this.#matrixLine[0][row]) outputMatrix[row][col] = "___";
                else if (this.#matrixLine[1][col]) outputMatrix[row][col] = " | ";
                else outputMatrix[row][col] = this.#inputArray[row][col].toString().padStart(2, ' ') + " ";
            }
        }

        return outputMatrix;
    }

    drawOutput() {
        return this.#drawTable(this.output());
    }

    //----------------------------

    #linesBruteforce;
    #checkedMin;
    #lineMap;

    #checkForZeros() {
        for (let row = 0; row < this.#rowLength; row++) {
            for (let col = 0; col < this.#colLength; col++) {
                if (this.#inputArray[row][col] == 0 && !this.#linesBruteforce[row] && !this.#linesBruteforce[this.#rowLength + col]) {
                    return false;
                }
            }
        }
        return true;
    }

    #recursive(line = 0, i = 0) {
        if (this.#checkForZeros(this.#linesBruteforce) || i >= this.#checkedMin) {
            if (this.#checkedMin > i) {
                this.#lineMap = [...this.#linesBruteforce];
                this.#checkedMin = i;
            }
            return;
        }
        for (; line < this.#rowLength + this.#colLength; line++) {
            this.#linesBruteforce[line] = 1;
            this.#recursive(line + 1, i + 1);
            this.#linesBruteforce[line] = 0;
        }
    }

    drawBruteForce() {
        let outputMatrix = [];
        for (let row = 0; row < this.#rowLength; row++) {
            outputMatrix[row] = [];
            for (let col = 0; col < this.#colLength; col++) {
                if (this.#lineMap[row] && this.#lineMap[this.#rowLength + col]) outputMatrix[row][col] = "_|_";
                else if (this.#lineMap[row]) outputMatrix[row][col] = "___";
                else if (this.#lineMap[this.#rowLength + col]) outputMatrix[row][col] = " | ";
                else outputMatrix[row][col] = this.#inputArray[row][col].toString().padStart(2, ' ') + " ";
            }
        }
        return this.#drawTable(outputMatrix);
    }

    bruteForceCheck() {
        let opTime = performance.now();
        this.run();
        opTime = performance.now() - opTime;
        let bfTime = performance.now();
        this.#checkedMin = this.#shortAxis;
        this.#linesBruteforce = Array(this.#colLength + this.#rowLength).fill(0);
        this.#lineMap = Array(this.#colLength + this.#rowLength).fill(0);
        this.#recursive();
        bfTime = performance.now() - bfTime;
        let rtVal = {value: this.#checkedMin == this.#minimum, optimize: opTime < bfTime};
        if (!rtVal.value) console.log({bf: this.#checkedMin, op: this.#minimum});
        if (!rtVal.optimize) console.log({bf: bfTime, op: opTime});
        return rtVal;
    }


    //----------------------------

    drawInput() {
        return this.#drawTable(this.#inputArray);
    }

    #drawTable(matrix) {
        let output = "";
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                output += matrix[row][col].toString().padStart(2, ' ').padEnd(3, ' ');
            }
            output += "\n";
        }
        return output;
    }

}


let inputs = [
    [
        [0, 0, 1, 1],
        [1, 0, 0, 1],
        [1, 0, 1, 0],
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


let rows = 8;
let cols = 7;

let test = Array(rows).fill(Array(cols).fill(1));

let hungarian = new hungarianAlgorithm;
let recurse = (i = 1) => {
    hungarian.input(test);
    let res = hungarian.bruteForceCheck();
    if (i%20 == 0) console.log("OK!")
    if (!res.value) {
        console.log(hungarian.drawInput());
        console.log(hungarian.drawOutput());
        console.log(hungarian.drawBruteForce());
    }
    for (let j = i; j < rows * cols; j++) {
        test[Math.floor(j / cols)][j % cols] = 0;
        recurse(i + 1);
        test[Math.floor(j / cols)][j % cols] = 1;
    }
};
recurse();


// for (let i = 0; i < inputs.length; i++) {
//     hungarian.input(inputs[i]);
//     console.log("Test Number " + i + "----------------");
//     // console.log(hungarian.drawInput());
//     console.log(res);
//     if (!res.value) {
//         console.log(hungarian.drawInput());
//         console.log(hungarian.drawOutput());
//         console.log(hungarian.drawBruteForce());
//     }
// }