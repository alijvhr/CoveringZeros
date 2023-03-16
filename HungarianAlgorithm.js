class hungarianAlgorithm {

    #inputArray;

    #colLength;
    #rowLength;
    #matrixPower;
    #matrixLine;
    #minimum = 0;
    #maximum;

    input(inputArray) {
        this.#inputArray = inputArray;
        this.#colLength = inputArray.length;
        this.#rowLength = inputArray[0].length;
        this.#matrixPower = [Array(this.#rowLength).fill(0), Array(this.#colLength).fill(0)];
        this.#matrixLine = [Array(this.#rowLength).fill(0), Array(this.#colLength).fill(0)];
        this.#maximum = this.#colLength > this.#rowLength ? 0 : 1;
        return this;
    }


    #hvRemove(isCol) {
        if (this.#matrixLine[this.#maximum].length <= this.#minimum) return;
        let row, col, flag, power, axis = [0, 0];
        let iLength = isCol ? this.#colLength : this.#rowLength;
        let jLength = !isCol ? this.#colLength : this.#rowLength;
        for (axis[0] = 0; axis[0] < iLength; axis[0]++) {
            if (!this.#matrixLine[+isCol][axis[0]] || !this.#matrixPower[+isCol][axis[0]]) continue;
            flag = 0;
            power = [0, 0];
            for (axis[1] = 0; axis[1] < jLength; axis[1]++) {
                if (this.#inputArray[axis[+isCol]][axis[+!isCol]] == 0) {
                    if (!this.#matrixLine[+!isCol][axis[1]] || this.#matrixPower[+!isCol][axis[1]] < 2) {
                        flag = 1;
                        break;
                    }
                }
            }
            if (!flag) this.#matrixLine[+isCol][axis[0]] = 0;
            else {
                for (axis[1] = 0; axis[1] < jLength; axis[1]++) {
                    if (this.#inputArray[axis[+isCol]][axis[+!isCol]] == 0) {
                        this.#matrixPower[+!isCol][axis[1]]--;
                    }
                }
                this.#minimum++;
            }
        }
    }

    #hvCheck(row, col) {
        if (this.#matrixPower[0][row] > this.#matrixPower[1][col])
            return 1;
        else if (this.#matrixPower[0][row] < this.#matrixPower[1][col])
            return 2;
        else
            return 3;
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

        for (let row = 0; row < this.#rowLength; row++) {
            for (let col = 0; col < this.#colLength; col++) {
                if (this.#matrixLine[0][row] && this.#matrixLine[1][col]) continue;
                check = this.#hvCheck(row, col);
                if (!this.#matrixLine[0][row] && check & 1) {
                    this.#matrixLine[0][row] = 1;
                    count[0]++;
                }
                if (!this.#matrixLine[1][col] && check & 2) {
                    this.#matrixLine[1][col] = 1;
                    count[1]++;
                }
            }
        }
        this.#minimum = 0;
        if (count[0] > count[1]) {
            this.#hvRemove(0);
            this.#hvRemove(1);
        } else {
            this.#hvRemove(1);
            this.#hvRemove(0);
        }

        return this;
    }

    get() {
        return this.#minimum;
    }

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

let hungarian = new hungarianAlgorithm;
for (let i = 0; i < inputs.length; i++) {
    hungarian.input(inputs[i]).run();
    console.log("Test Number " + i + "----------------");
    console.log(hungarian.drawInput());
    console.log("the output is:" + hungarian.get());
    console.log(hungarian.drawOutput());
}