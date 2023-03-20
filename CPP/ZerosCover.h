#include <iostream>
#include <vector>
#include <string>
#include "Matrix.h"


#ifndef COVERINGZEROS_ZEROSCOVER_H
#define COVERINGZEROS_ZEROSCOVER_H

class ZerosCover : public Matrix {
public:
    std::vector<std::vector<bool>> lines;
    int minimum;

    ZerosCover() : minimum(0) {}

    ZerosCover& input(std::vector<std::vector<int>> input) {
        this->matrix = input;
        return *this;
    }

    ZerosCover& run() {
        this->minimum = 0;
        return *this;
    }

    std::vector<std::vector<std::string>> output() {
        std::vector<std::vector<int>> input = this->matrix;
        std::vector<std::vector<bool>> lines = this->lines;
        std::vector<std::vector<std::string>> output(input.size(), std::vector<std::string>(input[0].size()));

        for (int row = 0; row < input.size(); row++) {
            for (int col = 0; col < input[0].size(); col++) {
                if (lines[0][row] && lines[1][col])
                    output[row][col] = "_|_";
                else if (lines[0][row])
                    output[row][col] = "___";
                else if (lines[1][col])
                    output[row][col] = " | ";
                else
                    output[row][col] = std::to_string(input[row][col]);
            }
        }

        return output;
    }

    std::string drawOutput() {
        return Matrix::drawTable(this->output());
    }
};

#endif