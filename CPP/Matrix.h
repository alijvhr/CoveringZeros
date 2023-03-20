#include <iostream>
#include <vector>
#include <string>
#include <iomanip>

#ifndef COVERINGZEROS_MATRIX_H
#define COVERINGZEROS_MATRIX_H

typedef std::vector<int> iVec;
typedef std::vector<bool> bVec;
typedef std::vector<std::string> sVec;

typedef std::vector<iVec> iMatrix;
typedef std::vector<bVec> bMatrix;
typedef std::vector<sVec> sMatrix;

class Matrix {
public:
    iMatrix matrix;

//    std::string drawMatrix() {
//        return Matrix::drawTable(this->matrix);
//    }

    static iMatrix create(long rows, long cols, int val) {
        iMatrix matrix(rows, iVec(cols, val));
        return matrix;
    }

    static sMatrix create(long rows, long cols, std::string val) {
        sMatrix matrix(rows, sVec(cols, val));
        return matrix;
    }

    static bMatrix create(long rows, long cols, bool val) {
        bMatrix matrix(rows, bVec(cols, val));
        return matrix;
    }

    static std::string drawTable(const iMatrix& matrix) {
        std::string output;
        for (auto &row: matrix) {
            for (auto &col: row) {
                output += std::to_string(col).insert(0, 1, ' ').append(2, ' ');
            }
            output += "\n";
        }
        return output;
    }

    static std::string drawTable(sMatrix matrix) {
        std::string output;
        for (auto &row: matrix) {
            for (auto &col: row) {
                output += col.insert(0, 1, ' ').append(2, ' ');
            }
            output += "\n";
        }
        return output;
    }
};

#endif