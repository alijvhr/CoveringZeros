import Bruteforce from "./Bruteforce.mjs";
import Optimized from "./Optimized.mjs";
import Matrix from "./Matrix.mjs";

let rows = 10;
let cols = 10;

let test;

let bruteforce = new Bruteforce();
let optimized = new Optimized();

let totalTimes = {bf: 0, op: 0};

let count = 100;


for (let t = 0; t < count; t++) {
    test = Matrix.create(rows, cols);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            test[i][j] = Math.floor(Math.random() * 20) % 2;
        }
    }
    bruteforce.input(test);
    optimized.input(test);

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
