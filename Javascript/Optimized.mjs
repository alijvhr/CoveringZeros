import ZerosCover from "./ZerosCover.mjs";
import Matrix from "./Matrix.mjs";

export default class Optimized extends ZerosCover {

    #powers;
    #crosses;

    #sides;

    run() {
        let input = this.matrix;
        let len = [input.length, input[0].length];
        let powers = this.#powers = [Array(len[0]).fill(0), Array(len[1]).fill(0)];
        let crosses = this.#crosses = [Matrix.create(len[0], 0), Matrix.create(len[1], 0)];
        let lines = this.lines = [Array(len[0]).fill(false), Array(len[1]).fill(false)];
        this.minimum = 0;
        let lastRow = len[0] - 1;
        let sides = this.#sides = [0, 0];

        // Step 1
        for (let row = 0; row < len[0]; row++) {
            for (let col = 0; col < len[1]; col++) {
                if (input[row][col] === 0) {
                    powers[0][row]++;
                    powers[1][col]++;
                    crosses[0][row].push(col);
                    crosses[1][col].push(row);
                }
                if (row === lastRow) {
                    if (powers[1][col])
                        sides[1]++;
                }
            }
            if (powers[0][row])
                sides[0]++;
        }

        // Step 2

        // LongSide
        let ls = +(sides[1] > sides[0]);
        // ShortSide
        let ss = +!ls;
        // Maximum Output
        let maximum = sides[ss];
        // OppositeMinimum: a pair of minimum cross powers in a line
        let om;
        // OppositePower: Sum of opposite power
        let op;
        // LineCrosses: crosses in a line
        let lc;
        // Cross axis ID
        let cross;
        // CrossPower: power of the current cross
        let cp;
        // MainPower: power of the current cross
        let mp;
        // Determines if more zeros available
        let more = true;
        for (let main = 0; main < 2 && more; main++) {
            cross = +!main;
            for (let i = 0; i < len[main] && more; i++) {
                mp = powers[main][i];
                if (mp === 0) continue;
                lc = crosses[main][i];
                om = [maximum, maximum];
                op = 0;
                if (mp > 1) {
                    for (let j = 0; j < lc.length; j++) {
                        if (!lines[cross][lc[j]]) {
                            cp = powers[cross][lc[j]];
                            op += cp;
                            if (om[0] >= cp) {
                                om[1] = om[0];
                                om[0] = cp;
                            } else if (om[1] >= cp) {
                                om[1] = cp;
                            }
                        }
                    }
                }
                if (om[0] === 1 || (om[0] + om[1]) <= mp) {
                    more = this.#line(main, i);
                } else if (mp === 1) {
                    more = this.#crossLines(main, i);
                } else if (main === 1) {
                    if (sides[main] < sides[cross]) {
                        more = this.#line(main, i);
                    } else {
                        more = this.#crossLines(main, i);
                    }
                }
                if (this.minimum >= maximum) {
                    this.minimum = maximum;
                    more = false;
                }
            }
        }
        if (this.minimum === 0) this.minimum = maximum;
        return this;
    }

    #crossLines(axis, id) {
        let lc = this.#crosses[axis][id];
        let rt = true;
        for (let j = 0; j < lc.length && rt; j++) {
            rt &= this.#line(+!axis, lc[j]);
        }
        return rt;
    }

    #line(axis, id) {
        if (this.lines[axis][id]) return true;
        let rt = true;
        this.lines[axis][id] = true;
        this.minimum++;
        if (--this.#sides[axis] === 0) return false;
        let lc = this.#crosses[axis][id];
        this.#powers[axis][id] = 0;
        let cross = +!axis;
        let op;
        for (let i = 0; i < lc.length && rt; i++) {
            if (this.#powers[cross][lc[i]] > 0) {
                op = --this.#powers[cross][lc[i]];
                switch (op) {
                    case 1:
                        rt &= this.#crossLines(cross, lc[i]);
                        break;
                    case 0:
                        if (--this.#sides[cross] === 0) return false;
                        break;
                }
            }
        }
        return rt;
    }
}
