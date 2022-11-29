const creatArr = (nb) => Array.from(Array(nb || 5).keys());

const grid = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
];

const localScore = localStorage.getItem('wordle-score');

const initState = {
    rowIndex: 0,
    colIndex: 0,
    attemps: 0,

    solution: '',
    userSolution: '',
    tempUserSOlution: '',

    grid,
    isSubmitted: false,
    isGameOver: false,

    nbCols: 5,
    nbRows: 6,

    score: localScore ? JSON.parse(localScore) : { fail: 0, success: 0, nbGames: 0 }
}

const wordList = ["women", "nikau", "swack", "feens", "fyles", "poled", "clags", "starn", "bindi", "woops",
    "fanos", "cabin", "souct", "trass"];

export { initState, creatArr, wordList };