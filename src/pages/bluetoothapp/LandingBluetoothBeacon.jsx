import React, { useState, useEffect } from 'react';

const LandingBluetoothBeacon = () => {
    const [beaconData, setBeaconData] = useState(null);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        // Verifica se il browser supporta l'API Web Bluetooth
        if (!navigator.bluetooth) {
            alert("Il tuo browser non supporta l'API Web Bluetooth");
            return;
        }

        try {
            // Inizia l'ascolto dei segnali dai beacon Bluetooth
            navigator.bluetooth.requestLEScan({ acceptAllAdvertisements: true }).then(() => {
                console.log("Scanning for beacon signals...");
            }).catch(error => {
                console.log(`Scanning failed: ${error}`);
            });

            navigator.bluetooth.addEventListener('advertisementreceived', event => {
                console.log(event.device);
                setBeaconData(event.device);
            });

            // Rimuovi l'ascolto dei segnali quando il componente non è più montato
            return () => {
                navigator.bluetooth.removeEventListener('advertisementreceived');
            };
        } catch (error) {
            setError(error);
        };

    }, []);

    return (
        <div>
            {error === undefined ?
                beaconData ? (
                    <div>
                        <p>Beacon trovato: {beaconData.name}</p>
                        <p>Identificativo beacon: {beaconData.id}</p>
                    </div>
                ) : (
                    <p>Cercando beacon...</p>
                )
                : <p><b>Errore:</b> {error.message}</p>}
        </div>
    );
};

export default LandingBluetoothBeacon;


