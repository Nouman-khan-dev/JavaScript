const tiles = document.querySelectorAll('.box');
const board = document.querySelector('.box-container');
const showWin = document.querySelector('.winContainer');
const plyerTurn = document.querySelector('.player span');
const restartBtn = document.querySelector('.restartBtn');
let currentStrike = 'x';
let isWin = false;

let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const winFunc = (strike) => {
    showWin.innerHTML = `
    <h2>Player ${strike} wins</h2>
    <button class="restartBtn" onClick="restart">Restart</button>
    `;
};

const checkForWin = () => {
    for (const i of winningPattern) {
        let [element1, element2, element3] = [
            tiles[i[0]].innerText,
            tiles[i[1]].innerText,
            tiles[i[2]].innerText,
        ];
        if (element1 != '' && element2 != '' && element3 != '') {
            if (element1 == element2 && element2 == element3) {
                winFunc(element1);
                isWin = true;
            } else {
            }
        }
    }
};

//  working on this
const checkForDraw = () => {
    // let emptyTiles = tiles.filter((e) => e.innerHTML != '');

    let empty = tiles.filter((e) => {
        return e.target != '';
    });
};

function tilesEvent() {
    tiles.forEach((elem) => {
        elem.addEventListener('click', (e) => {
            if (!isWin) {
                if (elem.innerHTML == '') {
                    e.target.innerText =
                        currentStrike != 'x' ? 'o' : 'x';
                    currentStrike === 'o'
                        ? (currentStrike = 'x')
                        : (currentStrike = 'o');
                    checkForWin();
                    checkForDraw();
                }
            }

            plyerTurn.innerText = currentStrike;
        });
    });
}
tilesEvent();

const restart = () => {
    isWin = false;
    tiles.forEach((e) => (e.innerHTML = ''));
    showWin.innerHTML = '';
    currentStrike = 'x';
    plyerTurn.innerText = currentStrike;

    tilesEvent();
};
document.addEventListener('click', function (e) {
    const target = e.target.classList.contains('restartBtn');
    if (target) {
        restart();
    }
});
