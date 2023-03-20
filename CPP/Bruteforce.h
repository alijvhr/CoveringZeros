#include "ZerosCover.h"

#ifndef COVERINGZEROS_BRUTEFORCE_H
#define COVERINGZEROS_BRUTEFORCE_H

class BruteForce : public ZerosCover {
private:

    void bruteforce(bVec lines, long line = 0, long minimum = 0) {
        if (checkAndStore(lines, minimum) || minimum >= this->minimum) return;
        for (; line < lines.size(); line++) {
            lines[line] = true;
            bruteforce(lines, line + 1, minimum + 1);
            lines[line] = false;
        }
    }

    bool checkAndStore(bVec lines, long minimum) {
        for (long row = 0; row < matrix.size(); row++) {
            for (long col = 0; col < matrix[0].size(); col++) {
                if (matrix[row][col] == 0 && !lines[row] && !lines[matrix.size() + col]) {
                    return false;
                }
            }
        }
        if (minimum <= this->minimum) {
            this->minimum = minimum;
            store(lines);
        }
        return true;
    }

    void store(bVec lines) {
        long rows = matrix.size();
        for (long row = 0; row < rows; row++) {
            this->lines[0][row] = lines[row];
        }
        for (long col = 0; col < matrix[0].size(); col++) {
            this->lines[1][col] = lines[rows + col];
        }
    }

public:

    BruteForce &run() {
        long len[2];
        len[0] = matrix.size();
        len[1] = matrix[0].size();

        lines[0] = bVec(len[0], false);
        lines[1] = bVec(len[1], false);

        minimum = len[1] > len[0] ? len[0] : len[1];

        bVec lines(len[1] + len[0], false);
        bruteforce(lines);
        return *this;
    }

};


#endif //COVERINGZEROS_BRUTEFORCE_H
