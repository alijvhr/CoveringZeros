import Bruteforce from "./BruteForce.mjs";
import Optimized from "./Optimized.mjs";
import Matrix from "./Matrix.mjs";

let rows = 10;
let cols = 10;

let tests = [];

let bruteforce = new Bruteforce();
let optimized = new Optimized();

let totalTimes = {bf: 0, op: 0};

let count = 1000;


for (let t = 0; t < count; t++) {
    tests[t] = Matrix.create(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tests[t][i][j] = Math.floor(Math.random() * 20) % 2;
        }
    }
    bruteforce.input(tests[t]);
    optimized.input(tests[t]);

    let bfTime = performance.now();
    bruteforce.run();
    totalTimes.bf += performance.now() - bfTime;

    let opTime = performance.now();
    optimized.run();
    totalTimes.op += performance.now() - opTime;
}


console.log('Total timings are (seconds):');
console.log('    ',{Bruteforce: totalTimes.bf / 1000, Optimized: totalTimes.op / 1000});
console.log('Average timings are (milliseconds):');
console.log('    ',{Bruteforce: totalTimes.bf / count, Optimized: totalTimes.op / count});
