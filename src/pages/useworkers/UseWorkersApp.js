import React from "react";

import SortingArray from "./Sorting";
import logo from "./react.png";
import "./UseWorkersApp.css";

let turn = 0;
function infiniteLoop() {
    const lgoo = document.querySelector(".App-logo");
    turn += 8;
    lgoo.style.transform = `rotate(${turn % 360}deg)`;
}

export default function UseWorkersApp() {
    React.useEffect(() => {
        const loopInterval = setInterval(infiniteLoop, 100);
        return () => clearInterval(loopInterval);
    }, []);

    return (<>
        <div className="App">
            <h1 className="App-Title">useWorker</h1>
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <ul>
                    <li>Sorting Demo</li>
                </ul>
            </header>
            <hr />
        </div>
        <div>
            <SortingArray />
        </div>
    </>
    );
}