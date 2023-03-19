import Matrix from "./Matrix.mjs";
export default class ZerosCover extends Matrix {
    lines;
    minimum;

    input(input) {
        this.matrix = input;
        return this;
    }

    run() {
        this.minimum = 0;
        return this;
    }

    output() {
        let input = this.matrix;
        let lines = this.lines;
        let output = [];
        for (let row = 0; row < input.length; row++) {
            output[row] = [];
            for (let col = 0; col < input[0].length; col++) {
                if (lines[0][row] && lines[1][col]) output[row][col] = "_|_";
                else if (lines[0][row]) output[row][col] = "___";
                else if (lines[1][col]) output[row][col] = " | ";
                else output[row][col] = input[row][col].toString();
            }
        }

        return output;
    }

    drawOutput() {
        return Matrix.drawTable(this.output());
    }

}