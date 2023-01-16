import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

const LandingBluetoothBeacon = () => {
  const [devices, setDevices] = useState([]);


  const handleScan = async () => {
    // Utilizzare la Web API 'Web Bluetooth' per la scansione dei beacon BLE
    try {
      navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service'] // Required to access service later.
      })
        .then(device => {
          console.log("> Name:             " + device.name);
          console.log("> Id:               " + device.id);
          console.log("> Connected:        " + device.gatt.connected);
          setDevices([...devices, device]);
          device.gatt.connect();
        })
        .then(service => {
          // console.log(service.characteristic.uuid);
        })
        .then(characteristic => {
          // console.log(characteristic);
        })
        .then(descriptors => {
          // console.log(descriptors);
        })
        .then(value => {
          // console.log(value);
        })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleScan}>Scan Beacons</Button>
      <Table>
        <thead>
          <tr>
            <th>Device Name....................................|</th>
            <th>ID....................................|</th>
            <th>UUID....................................|</th>
            <th>Major....................................|</th>
            <th>Minor....................................|</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr>
              <td>{device.name}</td>
              <td>{device.id}</td>
              <td>{device.uuid}</td>
              <td>{device.major}</td>
              <td>{device.minor}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  );
};

export default LandingBluetoothBeacon;