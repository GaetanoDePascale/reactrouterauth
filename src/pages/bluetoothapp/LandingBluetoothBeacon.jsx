import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';


const LandingBluetoothBeacon = () => {
  const [devices, setDevices] = useState([]);
  const OPTIONAL_SERVICE = 'generic_access';

  const handleScan = async () => {
    // Utilizzare la Web API 'Web Bluetooth' per la scansione dei beacon BLE
    try {
      navigator.bluetooth.requestDevice({
        // acceptAllDevices: true,

        filters: [
          { services: [0xfeaa], }
        ]
        // , optionalServices: [OPTIONAL_SERVICE]
      })
        .then(device => {
          setDevices([...devices, device]);
          console.log("> Connected to this device-->");
          console.log("> Name:             " + device.name);
          console.log("> Id:               " + device.id);
          device.watchAdvertisements();
          return device.addEventListener('advertisementreceived', (event) => {
            console.log('Advertisement received.');
            console.log('  Device Name: ' + event.device.name);
            console.log('  Device ID: ' + event.device.id);
            console.log('  RSSI: ' + event.rssi);
            console.log('  TX Power: ' + event.txPower);
            console.log('  UUIDs: ' + event.uuids);
            event.manufacturerData.forEach((valueDataView, key) => {
              logDataView('Manufacturer', key, valueDataView);
            });
            event.serviceData.forEach((valueDataView, key) => {
              logDataView('Service', key, valueDataView);
            });
            device.forget();
          });
        })
      // .then(server => {
      // })
      // .then(service => {
      // })
    } catch (error) {
      console.log(error);
    }
  };

  /* Utils */



  const logDataView = (labelOfDataSource, key, valueDataView) => {
    const hexString = [...new Uint8Array(valueDataView.buffer)].map(b => {
      return b.toString(16).padStart(2, '0');
    }).join(' ');
    const textDecoder = new TextDecoder('ascii');
    const asciiString = textDecoder.decode(valueDataView.buffer);
    console.log(`  ${labelOfDataSource} Data: ` + key +
      '\n    (Hex) ' + hexString +
      '\n    (ASCII) ' + asciiString);
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