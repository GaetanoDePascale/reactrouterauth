import React, { useState, memo } from "react";
import { creatArr, initState } from "../pages/wordle/";
import WordleContext from "../context/WordleContext";

export const WordleStore = memo(({ children, wordList, solution, nbRows, nbCols }) => {

    const [state, setState] = useState({
        ...initState,
        wordList,
        solution,
        nbCols: nbCols || 5,
        nbRows: nbRows || 6,
        grid: creatArr(nbRows || 6).map(v => creatArr(nbCols || 5))
    });

    return <WordleContext.Provider value={{ state, setState }}>
        {children}
    </WordleContext.Provider>
})