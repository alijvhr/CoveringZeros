export default class Matrix {

    matrix;

    drawMatrix() {
        return Matrix.drawTable(this.matrix);
    }

    static create(rows, cols, val = 0) {
        let matrix = Array(rows);
        for (let row = 0; row < rows; row++) {
            matrix[row] = Array(cols);
            for (let col = 0; col < cols; col++) {
                matrix[row][col] = val;
            }
        }
        return matrix;
    }

    static drawTable(matrix) {
        let output = "";
        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[row].length; col++) {
                output += matrix[row][col].toString().padStart(2, ' ').padEnd(3, ' ');
            }
            output += "\n";
        }
        return output;
    }

}