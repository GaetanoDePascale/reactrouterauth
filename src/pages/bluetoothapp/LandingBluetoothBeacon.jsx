import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const LandingBluetoothBeacon = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [beaconData, setBeaconData] = useState([]);
    const [error, setError] = useState(undefined);
    const [solution, setSolution] = useState(undefined);

    const [beacons, setBeacons] = useState(<p>Cercando beacon...</p>);

    const advertisementreceived = (event) => {
        if (beaconData.findIndex(i => i.id === event.device.id) < 0) {
            const beaconDataTemp = beaconData;
            beaconDataTemp.push(event.device);
            setBeaconData(beaconDataTemp);
        }
    };

    useEffect(() => {
        setPageSubtitle('Beacon Bluetooth Test');
        console.log("starting...");
        // Verifica se il browser supporta l'API Web Bluetooth
        if (!navigator.bluetooth) {
            alert("Il tuo browser non supporta l'API Web Bluetooth");
            return;
        }

        //navigator.bluetooth.onadvertisementreceived = advertisementreceived;

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
            if (ex.message === 'navigator.bluetooth.requestLEScan is not a function') {
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

    }, [setPageTitle, setPageSubtitle]);

    // const notError = (beacons) => beacons ? (
    //     beacons && beacons.length > 0 && beacons.map((data) => {
    //         return (<div>
    //             <p>Beacon trovato: {data.name}</p>
    //             <p>Identificativo beacon: {data.id}</p>
    //         </div>)
    //     })
    // ) : (
    //     <p>Cercando beacon...</p>
    // );

    return (
        <>
            {error === undefined ?
                <ul>
                    {
                        beaconData.map((data, index) => {
                            return (<li key={'li_' + index}>
                                Id: {data.id}
                                <br />
                                Name: {data.name}
                            </li>)
                        })}
                </ul>
                :
                <p>
                    <b>Errore:</b> {error.message}
                    {solution !== undefined ?
                        solution
                        :
                        <></>
                    }
                </p>}
        </>
    );
};

export default LandingBluetoothBeacon;


