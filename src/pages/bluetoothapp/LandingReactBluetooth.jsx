import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// import * as Bluetooth from 'react-bluetooth';

// async function example_GetAnyDeviceAsync() {
//     const isAvailable = await Bluetooth.getAvailabilityAsync();
//     if (!isAvailable) {
//         return;
//     }


//     try {
//         const device = await Bluetooth.requestDeviceAsync();
//         console.log('Success: Got any device: ', device);
//     } catch (error) {
//         console.log(`Error: Couldn't get any device`, error);
//         console.error(`Error: Couldn't get any device`, error);
//     }
// }

// async function example_GetBatteryLevelAsync() {
//     const isAvailable = await Bluetooth.getAvailabilityAsync();
//     if (!isAvailable) {
//         return;
//     }

//     const options = {
//         filters: [{ services: ['battery_service'] }],
//     };

//     try {
//         const result = await Bluetooth.requestDeviceAsync(options);
//         if (result.type === 'cancel') {
//             return;
//         }
//         const { device } = result;

//         console.log(`Bluetooth: Got device:`, device);
//         if (device.gatt) {
//             const server = await device.gatt.connect();
//             console.log(`Bluetooth: Got server:`, server);
//             const service = await server.getPrimaryService('battery_service');
//             console.log(`Bluetooth: Got service:`, service);
//             const characteristic = await service.getCharacteristic('battery_level');
//             console.log(`Bluetooth: Got characteristic:`, characteristic);
//             const value = await characteristic.readValue();
//             console.log(`Bluetooth: Got value:`, value);
//             const battery = value.getUint8(0);
//             console.log(`Success: Got battery:`, battery);
//         } else {
//             // TODO: Bacon: Can we connect to the GATT or is that a no-op?
//             console.error(`Error: connected device did not have a GATT`);
//         }
//     } catch ({ message }) {
//         console.error(`Error: Couldn't get battery level: ${message}`);
//     }
// }

const LandingReactBluetooth = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setPageTitle('Application');
        setPageSubtitle('Bluetooth Test');

        //example_GetAnyDeviceAsync();

    }, [setPageTitle, setPageSubtitle]);


    return (
        'test'
    );
};

export default LandingReactBluetooth;


