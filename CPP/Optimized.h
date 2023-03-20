#include "ZerosCover.h"

#ifndef COVERINGZEROS_OPTIMIZED_H
#define COVERINGZEROS_OPTIMIZED_H

class Optimized : public ZerosCover {

private:
    std::vector <std::vector<int>> powers;
    std::vector <std::vector<int>> crosses;

    std::vector<int, 2> sides;

    bool crossLines(int axis, int id) {
        std::vector<int> lc = crosses[axis][id];
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
        std::vector<int> lc = crosses[axis][id];
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
    Optimized(int n, int m) : ZerosCover(n, m) {
        powers.resize(2, std::vector<int>(n + m));
        crosses.resize(2, std::vector<int>(n + m));
        sides[0] = n;
        sides[1] = m;

        for (int i = 0; i < n + m; i++) {
            powers[0][i] = powers[1][i] = 0;
            crosses[0][i].clear();
            crosses[1][i].clear();
        }

        for (int i = 0; i < n; i++) {
            for (int j = 0; j < m; j++) {
                crosses[0][i + j].push_back(j);
                crosses[1][i + j].push_back(i);
            }
        }
    }

    void run() {
        auto input = matrix;
        auto len = std::array < int,
        2 > {static_cast<int>(input.size()), static_cast<int>(input[0].size())};
        auto* powers = &this.powers = std::array < std::std::vector < int >,
        2 > {std::std::vector<int>(len[0], 0), std::std::vector<int>(len[1], 0)};
        auto* crosses = &this.crosses = std::array < matrix_t,
        2 > {Matrix::create(len[0], 0), Matrix::create(len[1], 0)};
        auto* lines = &this.lines = std::array < std::std::vector < bool >,
        2 > {std::std::vector<bool>(len[0], false), std::std::vector<bool>(len[1], false)};
        minimum = 0;
        auto lastRow = len[0] - 1;
        auto sides = std::array < int,
        2 > {0, 0};

        // Step 1
        for (auto row = 0; row < len[0]; row++) {
            for (auto col = 0; col < len[1]; col++) {
                if (input[row][col] == 0) {
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
        std::vector<int>* lc;
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
                lc = &crosses[main][i];
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
                    more = this->line(main, i);
                } else if (mp == 1) {
                    more = this->crossLines(main, i);
                } else if (main == 1) {
                    if (sides[main] < sides[cross]) {
                        more = this->line(main, i);
                    } else {
                        more = this->crossLines(main, i);
                    }
                }
                if (this->minimum >= maximum) {
                    this->minimum = maximum;
                    more = false;
                }
            }
        }
        if (this->minimum == 0) this->minimum = maximum;
        return *this;
    }
};

#endif