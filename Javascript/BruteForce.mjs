import ZerosCover from "./ZerosCover.mjs";

export default class BruteForce extends ZerosCover {

    run() {
        let len = [this.matrix.length, this.matrix[0].length];
        this.lines = [Array(len[0]).fill(false), Array(len[1]).fill(false)];
        this.minimum = len[1] > len[0] ? len[0] : len[1];
        let lines = Array(len[1] + len[0]).fill(0);
        this.#bruteforce(lines);
        return this;
    }

    #bruteforce(lines, line = 0, minimum = 0) {
        if (this.#checkAndStore(lines, minimum) || minimum >= this.minimum) return;
        for (; line < lines.length; line++) {
            lines[line] = 1;
            this.#bruteforce(lines, line + 1, minimum + 1);
            lines[line] = 0;
        }
    }

    #checkAndStore(lines, minimum) {
        let input = this.matrix;
        for (let row = 0; row < input.length; row++) {
            for (let col = 0; col < input[0].length; col++) {
                if (input[row][col] === 0 && !lines[row] && !lines[input.length + col]) {
                    return false;
                }
            }
        }
        if (minimum <= this.minimum) {
            this.minimum = minimum;
            this.#store(lines);
        }
        return true;
    }

    #store(lines) {
        let rows = this.matrix.length;
        for (let row = 0; row < rows; row++) {
            this.lines[0][row] = lines[row];
        }
        for (let col = 0; col < this.matrix[0].length; col++) {
            this.lines[1][col] = lines[rows + col];
        }
    }

}
