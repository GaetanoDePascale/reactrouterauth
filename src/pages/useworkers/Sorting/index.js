/* eslint-disable no-alert */
/* eslint-disable no-console */
import React from "react";
import { useWorker, WORKER_STATUS } from "@koale/useworker";

import bubleSort from "./algorithms/bublesort";
import { notification } from "antd";

const numbers = [...Array(50000)].map(() =>
    Math.floor(Math.random() * 1000000)
);

function SortingArray() {

    const [sortStatus, setSortStatus] = React.useState(false);
    const [sortWorker, { status: sortWorkerStatus }] = useWorker(bubleSort);

    console.log("WORKER:", sortWorkerStatus);

    const onSortClick = () => {
        setSortStatus(true);
        const result = bubleSort(numbers);
        setSortStatus(false);
        notification.success({
            message: 'Finish',
            description: 'Sort ',
            placement: 'topRight',
        });
        console.log("Normal Sort", result);
    };

    const onWorkerSortClick = () => {
        sortWorker(numbers).then((result) => {
            console.log("Sort using useWorker()", result);
            notification.success({
                message: 'Finish',
                description: 'Sort using useWorker',
                placement: 'topRight',
            });
        });
    };

    return (
        <div>
            <section className="App-section">
                <button
                    type="button"
                    disabled={sortStatus}
                    className="App-button"
                    onClick={() => onSortClick()}
                >
                    {sortStatus ? `Loading...` : `Normal Sort`}
                </button>
                <button
                    type="button"
                    disabled={sortWorkerStatus === WORKER_STATUS.RUNNING}
                    className="App-button"
                    onClick={() => onWorkerSortClick()}
                >
                    {sortWorkerStatus === WORKER_STATUS.RUNNING
                        ? `Loading...`
                        : `Sort using useWorker()`}
                </button>
            </section>
            <section className="App-section">
                <span style={{ color: "white" }}>
                    Open DevTools console to see the results.
                </span>
            </section>
        </div>
    );
}

export default SortingArray;
