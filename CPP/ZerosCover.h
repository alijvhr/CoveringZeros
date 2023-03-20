#include <iostream>
#include <utility>
#include <vector>
#include <string>
#include "Matrix.h"


#ifndef COVERINGZEROS_ZEROSCOVER_H
#define COVERINGZEROS_ZEROSCOVER_H

class ZerosCover : public Matrix {
public:
    bVec lines[2];
    int minimum;

    ZerosCover() : minimum(0) {}

    ZerosCover &input(iMatrix input) {
        matrix = std::move(input);
        return *this;
    }

    virtual ZerosCover &run() {
        minimum = 0;
        return *this;
    }

    sMatrix output() {
        sMatrix map = Matrix::create(matrix.size(),matrix[0].size(), std::string());

        for (int row = 0; row < matrix.size(); row++) {
            for (int col = 0; col < matrix[0].size(); col++) {
                if (lines[0][row] && lines[1][col])
                    map[row][col] = "_|_";
                else if (lines[0][row])
                    map[row][col] = "___";
                else if (lines[1][col])
                    map[row][col] = " | ";
                else
                    map[row][col] = std::to_string(matrix[row][col]);
            }
        }

        return map;
    }

    std::string drawOutput() {
        return Matrix::drawTable(output());
    }
};

#endif