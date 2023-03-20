#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

#ifndef COVERINGZEROS_MATRIX_H
#define COVERINGZEROS_MATRIX_H

class Matrix {
public:
    std::vector<std::vector<int>> matrix;

    std::string drawMatrix() {
        return Matrix::drawTable(this->matrix);
    }

    static std::vector<std::vector<int>> create(int rows, int cols, int val = 0) {
        std::vector<std::vector<int>> matrix(rows, std::vector<int>(cols, val));
        return matrix;
    }

    static std::string drawTable(std::vector<std::vector<int>> matrix) {
        std::string output = "";
        for (int row = 0; row < matrix.size(); row++) {
            for (int col = 0; col < matrix[row].size(); col++) {
                output += std::to_string(matrix[row][col]).insert(0, 1, ' ').append(2, ' ');
            }
            output += "\n";
        }
        return output;
    }
};

#endif