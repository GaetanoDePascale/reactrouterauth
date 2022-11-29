
import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { wordList } from './pages/wordle';
import WordleGame from './WordleGame';

const WordleGameLoading = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    useEffect(() => {
        setPageSubtitle('A React Wordle Game');
    }, [setPageTitle, setPageSubtitle]);

    const WordleGameProps = { wordList, solution: wordList[Math.floor(Math.random() * wordList.length)], nbRows: 5, nbCols: 5 };
    return <WordleGame {...WordleGameProps} />
}

export default WordleGameLoading;