"use strict";

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
    gameContainerEl: document.getElementById('game'),
    figures: [
        {name: 'p', color: 'w', pos: 'A2'},
        {name: 'p', color: 'w', pos: 'B2'},
        {name: 'p', color: 'w', pos: 'C2'},
        {name: 'p', color: 'w', pos: 'D2'},
        {name: 'p', color: 'w', pos: 'E2'},
        {name: 'p', color: 'w', pos: 'F2'},
        {name: 'p', color: 'w', pos: 'G2'},
        {name: 'p', color: 'w', pos: 'H2'},
        {name: 'R', color: 'w', pos: 'A1'},
        {name: 'N', color: 'w', pos: 'B1'},
        {name: 'B', color: 'w', pos: 'C1'},
        {name: 'Q', color: 'w', pos: 'D1'},
        {name: 'K', color: 'w', pos: 'E1'},
        {name: 'B', color: 'w', pos: 'F1'},
        {name: 'N', color: 'w', pos: 'G1'},
        {name: 'R', color: 'w', pos: 'H1'},

        {name: 'p', color: 'b', pos: 'A7'},
        {name: 'p', color: 'b', pos: 'B7'},
        {name: 'p', color: 'b', pos: 'C7'},
        {name: 'p', color: 'b', pos: 'D7'},
        {name: 'p', color: 'b', pos: 'E7'},
        {name: 'p', color: 'b', pos: 'F7'},
        {name: 'p', color: 'b', pos: 'G7'},
        {name: 'p', color: 'b', pos: 'H7'},
        {name: 'R', color: 'b', pos: 'A8'},
        {name: 'N', color: 'b', pos: 'B8'},
        {name: 'B', color: 'b', pos: 'C8'},
        {name: 'Q', color: 'b', pos: 'D8'},
        {name: 'K', color: 'b', pos: 'E8'},
        {name: 'B', color: 'b', pos: 'F8'},
        {name: 'N', color: 'b', pos: 'G8'},
        {name: 'R', color: 'b', pos: 'H8'},
    ],
    //Фигуры взяты из Википедии (шахматы в Юникоде)
    figureHtml: {
        pw: '&#9817;',
        Bw: '&#9815;',
        Nw: '&#9816;',
        Rw: '&#9814;',
        Qw: '&#9813;',
        Kw: '&#9812;',

        pb: '&#9823;',
        Bb: '&#9821;',
        Nb: '&#9822;',
        Rb: '&#9820;',
        Qb: '&#9819;',
        Kb: '&#9818;',
    },

    /**
     * Метод отображения карты (игрового поля).
     */
    renderMap() {
        const rows = [0, 8, 7, 6, 5, 4, 3, 2, 1, 0];
        const cols = [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 0];

        for (let row = 0; row < rows.length; row++) {
            const tr = document.createElement('tr');
            this.gameContainerEl.appendChild(tr);

            for (let col = 0; col < cols.length; col++) {
                const td = document.createElement('td');
                tr.appendChild(td);

                td.dataset.row = rows[row];
                td.dataset.col = cols[col];

                if (rows[row] === 0 && cols[col] !== 0) {
                    td.innerHTML = cols[col];
                } else if (cols[col] === 0 && rows[row] !== 0) {
                    td.innerHTML = rows[row];
                }

                if (this.isCellIsBlack(row, col)) {
                    td.style.backgroundColor = 'grey';
                }
            }
        }
    },

    /**
     * Определяет является ли ячейка черной.
     * @param {int} rowNum Номер в строке.
     * @param {int} colNum Номер в колонке.
     * @returns {boolean} true, если ячейка должна быть черной, иначе false.
     */
    isCellIsBlack(rowNum, colNum) {
        if (rowNum === 0 || rowNum === 9 || colNum === 0 || colNum === 9) {
            return false;
        }
        return (rowNum % 2 + colNum % 2) === 1;
    },

    /**
     * Отображаем фигуры на поле.
     */
    renderFigures() {
        for (const figure of this.figures) {
            const col = figure.pos.charAt(0);
            const row = figure.pos.charAt(1);

            document.querySelector(`[data-col='${col}'][data-row='${row}']`).innerHTML =
                this.figureHtml[figure.name + figure.color];
        }
    }
};

// Запускаем метод отображения карты.
chess.renderMap();
chess.renderFigures();