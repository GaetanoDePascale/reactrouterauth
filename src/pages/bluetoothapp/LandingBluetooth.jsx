import { Button, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const LandingBluetooth = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setPageTitle('Application');
        setPageSubtitle('Bluetooth Test');

        console.log('Searching for devices...');
        navigator.bluetooth.requestDevice({ acceptAllDevices: true })
            .then((device) => {
                console.log(`Found device: ${device.name}`);
                setDevices((prevDevices) => [...prevDevices, device]);
            })
            .catch((error) => {
                console.log(`Error finding devices: ${error}`);
            })
            .finally(() => {
                setLoading(false);
            });

    }, [setPageTitle, setPageSubtitle]);

    // const searchForDevices = () => {
    //     console.log('Searching for devices...');
    //     navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    //         .then((device) => {
    //             console.log(`Found device: ${device.name}`);
    //             setDevices((prevDevices) => [...prevDevices, device]);
    //         })
    //         .catch((error) => {
    //             console.log(`Error finding devices: ${error}`);
    //         });
    // };

    return (
        <Spin spinning={loading}>
            <ul>
                {devices.map((device) => (
                    <li key={device.id}>{device.name}</li>
                ))}
            </ul>
        </Spin>
    );
};

export default LandingBluetooth;


