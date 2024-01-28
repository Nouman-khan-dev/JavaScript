const tiles = document.querySelectorAll('.box');
const board = document.querySelector('.box-container');
const showWin = document.querySelector('.winContainer');
const plyerTurn = document.querySelector('.player span');
const restartBtn = document.querySelector('.restartBtn');
const showXScore = document.querySelector('.xScore');
const showOScore = document.querySelector('.oScore');
let currentStrike = 'x';
let isWin = false;
let xScore = 0;
let oScore = 0;

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

const increseScore = (strikeElem) => {
    strikeElem == 'x' ? xScore++ : oScore++;
    showOScore.innerText = oScore;
    showXScore.innerText = xScore;
};

const winFunc = (strike) => {
    showWin.innerHTML = `
    <h2>Player ${strike.innerText} wins</h2>
    <button class="restartBtn" onClick="restart">Restart</button>
    `;
    increseScore(strike.innerText);
};
const heighLightWins = (e1, e2, e3) => {
    e1.style.backgroundColor = '#94486269';
    e2.style.backgroundColor = '#94486269';
    e3.style.backgroundColor = '#94486269';
};

const checkForWin = () => {
    for (const i of winningPattern) {
        let [element1, element2, element3] = [
            tiles[i[0]],
            tiles[i[1]],
            tiles[i[2]],
        ];
        if (
            element1.innerText != '' &&
            element2.innerText != '' &&
            element3.innerText != ''
        ) {
            if (
                element1.innerText == element2.innerText &&
                element2.innerText == element3.innerText
            ) {
                winFunc(element1);
                heighLightWins(element1, element2, element3);
                isWin = true;
            } else {
            }
        }
    }
};

//  working on this
const checkForDraw = () => {
    // let emptyTiles = tiles.filter((e) => e.innerHTML != '');

    let empty = Array.from(tiles).filter((e) => e.innerText == '');
    console.log(empty);
    if (empty.length < 1) {
        !isWin &&
            (showWin.innerHTML = `
        <h2>Draw</h2>
        <button class="restartBtn" onClick="restart">Restart</button>
        `);
    }
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
            } else {
            }

            plyerTurn.innerText = currentStrike;
        });
    });
}
tilesEvent();

const restart = () => {
    isWin = false;
    tiles.forEach((e) => {
        e.innerHTML = '';
        e.style.backgroundColor = '';
    });
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
