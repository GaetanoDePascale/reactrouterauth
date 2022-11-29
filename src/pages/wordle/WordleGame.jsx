import React, { useEffect } from "react";
import { useOutletContext } from 'react-router-dom';
import Board from "./Board";
import Keyboard from "./Keyboard";
import './WordleGame.css';
import { WordleStore } from "../../store/WordleStore";

const WordleGame = ({ wordList, solution, nbRows, nbCols }) => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    useEffect(() => {
        setPageSubtitle('A React Wordle Game');
    }, [setPageTitle, setPageSubtitle]);

    const onNewGame = () => {
        window.location.reload()
    }

    return <WordleStore wordList={wordList} solution={solution} nbRows={nbRows} nbCols={nbCols}>
        <h1 className="center">Wordle</h1>

        <Board />

        <div className="center">
            <Keyboard />
            <button onClick={onNewGame}>New Game</button>
        </div>
    </WordleStore>
}

export default WordleGame;