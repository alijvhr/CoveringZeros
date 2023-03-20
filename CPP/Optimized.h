#include "ZerosCover.h"

#ifndef COVERINGZEROS_OPTIMIZED_H
#define COVERINGZEROS_OPTIMIZED_H

class Optimized : public ZerosCover {

private:
    iVec powers[2];
    iMatrix crosses[2];

    int sides[2];

    bool crossLines(int axis, int id) {
        iVec lc = crosses[axis][id];
        bool rt = true;
        for (int j = 0; j < lc.size() && rt; j++) {
            rt &= line(!axis, lc[j]);
        }
        return rt;
    }

    bool line(int axis, int id) {
        if (lines[axis][id]) return true;
        bool rt = true;
        lines[axis][id] = true;
        minimum++;
        if (--sides[axis] == 0) return false;
        iVec lc = crosses[axis][id];
        powers[axis][id] = 0;
        int cross = !axis;
        int op;
        for (int i = 0; i < lc.size() && rt; i++) {
            if (powers[cross][lc[i]] > 0) {
                op = --powers[cross][lc[i]];
                switch (op) {
                    case 1:
                        rt &= crossLines(cross, lc[i]);
                        break;
                    case 0:
                        if (--sides[cross] == 0) return false;
                        break;
                }
            }
        }
        return rt;
    }

public:
    Optimized &run() override {
        long len[2];
        len[0] = matrix.size();
        len[1] = matrix[0].size();
        powers[0] = iVec(matrix.size(), 0);
        powers[1] = iVec(matrix.size(), 1);

        crosses[0] = Matrix::create(len[0], 0, 0);
        crosses[1] = Matrix::create(len[1], 0, 0);

        crosses[0] = Matrix::create(len[0], 0, 0);
        crosses[1] = Matrix::create(len[1], 0, 0);

        lines[0] = bVec(len[0], false);
        lines[1] = bVec(len[1], false);

        minimum = 0;

        auto lastRow = len[0] - 1;
        sides[0] = 0;
        sides[1] = 1;

        // Step 1
        for (auto row = 0; row < len[0]; row++) {
            for (auto col = 0; col < len[1]; col++) {
                if (matrix[row][col] == 0) {
                    powers[0][row]++;
                    powers[1][col]++;
                    crosses[0][row].push_back(col);
                    crosses[1][col].push_back(row);
                }
                if (row == lastRow) {
                    if (powers[1][col])
                        sides[1]++;
                }
            }
            if (powers[0][row])
                sides[0]++;
        }
        // LongSide
        int ls = (sides[1] > sides[0]);
        // ShortSide
        int ss = !ls;
        // Maximum Output
        int maximum = sides[ss];
        // OppositeMinimum: a pair of minimum cross powers in a line
        int om[2];
        // OppositePower: Sum of opposite power
        int op;
        // LineCrosses: crosses in a line
        iVec &lc = crosses[0][0];
        // Cross axis ID
        int cross;
        // CrossPower: power of the current cross
        int cp;
        // MainPower: power of the current cross
        int mp;
        // Determines if more zeros available
        bool more = true;
        for (int main = 0; main < 2 && more; main++) {
            cross = !main;
            for (int i = 0; i < len[main] && more; i++) {
                mp = powers[main][i];
                if (mp == 0) continue;
                lc = crosses[main][i];
                om[0] = maximum;
                om[1] = maximum;
                op = 0;
                if (mp > 1) {
                    for (int j = 0; j < lc.size(); j++) {
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
                if (om[0] == 1 || (om[0] + om[1]) <= mp) {
                    more = line(main, i);
                } else if (mp == 1) {
                    more = crossLines(main, i);
                } else if (main == 1) {
                    if (sides[main] < sides[cross]) {
                        more = line(main, i);
                    } else {
                        more = crossLines(main, i);
                    }
                }
                if (minimum >= maximum) {
                    minimum = maximum;
                    more = false;
                }
            }
        }
        if (minimum == 0) minimum = maximum;
        return *this;
    }
};

#endif