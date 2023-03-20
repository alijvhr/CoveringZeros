//
// Created by Alijvhr on 3/20/2023.
//

#include <random>
#include <chrono>
#include <ctime>
#include <functional>
#include "Optimized.h"
#include "Bruteforce.h"

int main() {

    std::random_device rd;
    std::mt19937 mt(rd());
    std::uniform_real_distribution<double> rand(0.0, 100.0);

    long rows = 10, cols = 10;
    iMatrix test;

    BruteForce bruteforce;
    Optimized optimized;

    double totalTimes[2] = {0.0, 0.0};

    long count = 10;
    std::chrono::time_point<std::chrono::high_resolution_clock> start_point, end_point;

    double time;

    for (long t = 0; t < count; t++) {
        test = Matrix::create(rows, cols, 0);
        for (long i = 0; i < rows; i++) {
            for (long j = 0; j < cols; j++) {
                test[i][j] = (int) (rand(mt)) % 2;
            }
        }

        bruteforce.input(test);
        optimized.input(test);
        time = std::clock();
        bruteforce.run();
        time = std::clock() - time;
        totalTimes[0] += time / 1000;

        time = std::clock();
        optimized.run();
        time = std::clock() - time;
        totalTimes[1] += time / 1000;

    }


    std::cout << "Total timings are (seconds):\n";
    std::cout << "    " << "{Bruteforce: " << totalTimes[0] / 1000 << ", Optimized: " << totalTimes[1] / 1000 << "}\n";
    std::cout << "Average timings are (milliseconds):\n";
    std::cout << "    " << "{Bruteforce: " << totalTimes[0] / count << ", Optimized: " << totalTimes[1] / count << "}\n";

    return 0;
}