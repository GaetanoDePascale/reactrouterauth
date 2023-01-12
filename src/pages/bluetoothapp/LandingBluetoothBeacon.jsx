import React, { useState, useEffect } from 'react';

const LandingBluetoothBeacon = () => {
    const [beaconData, setBeaconData] = useState(null);
    const [error, setError] = useState(undefined);
    const [solution, setSolution] = useState(undefined);

    const advertisementreceived = (event) => {
        console.log(event);
        setBeaconData(event.device);
    };

    useEffect(() => {
        console.log("starting...");
        // Verifica se il browser supporta l'API Web Bluetooth
        if (!navigator.bluetooth) {
            alert("Il tuo browser non supporta l'API Web Bluetooth");
            return;
        }

        navigator.bluetooth.onadvertisementreceived = advertisementreceived;

        console.log('navigator.bluetooth', navigator.bluetooth);

        try {
            console.log("...");
            // Inizia l'ascolto dei segnali dai beacon Bluetooth
            navigator.bluetooth.requestLEScan({ acceptAllAdvertisements: true })
                .then(() => {
                    console.log("Scanning for beacon signals...");
                    navigator.bluetooth.addEventListener('advertisementreceived', advertisementreceived);
                })
                .catch(requestLEScanError => {
                    console.log(`Scanning failed: ${requestLEScanError}`);
                });

            // navigator.bluetooth.addEventListener('advertisementreceived', event => {
            //     console.log(event.device);
            //     setBeaconData(event.device);
            // });

            // Rimuovi l'ascolto dei segnali quando il componente non è più montato
            return () => {
                console.log("closing...");
                navigator.bluetooth.removeEventListener('advertisementreceived', advertisementreceived);
            };
        } catch (ex) {
            setError(ex);
            if (error.message === 'navigator.bluetooth.requestLEScan is not a function') {
                const url = 'https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md#scanning-api';
                setSolution(
                    <>
                        <br /><br /><b>Soluzione:</b><br />
                        requestLEScan is behind a flag in Chrome (chrome://flags/#enable-experimental-web-platform-features).
                        <br />
                        See <a href={url} target={'_blank'}>{url}</a>.
                    </>
                )
            }
        };

    }, []);


    const notError = (data) => data ? (
        <div>
            <p>Beacon trovato: {data.name}</p>
            <p>Identificativo beacon: {data.id}</p>
        </div>
    ) : (
        <p>Cercando beacon...</p>
    );

    return (
        <div>
            {error === undefined ?
                notError(beaconData)
                :
                <p>
                    <b>Errore:</b> {error.message}
                    {solution !== undefined ?
                        solution
                        :
                        <></>
                    }
                </p>}
        </div>
    );
};

export default LandingBluetoothBeacon;


