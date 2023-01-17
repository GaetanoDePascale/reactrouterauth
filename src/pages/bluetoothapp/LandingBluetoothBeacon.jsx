import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';


const LandingBluetoothBeacon = () => {
  const [devices, setDevices] = useState([]);
  const [services, setServices] = useState([]);
  const [characteristics, setCharacteristics] = useState([]);
  const OPTIONAL_SERVICE = 'generic_access';

  const handleScan = async () => {
    // Utilizzare la Web API 'Web Bluetooth' per la scansione dei beacon BLE
    try {
      navigator.bluetooth.requestDevice({
        // acceptAllDevices: true,

        filters: [
          { services: [0xfeaa], }
        ]

        , optionalServices: [OPTIONAL_SERVICE]
      })
        .then(device => {
          console.log("> Name:             " + device.name);
          console.log("> Id:               " + device.id);
          console.log("> Connecting to GATT Server...");
          setDevices([...devices, device]);
          return device.gatt.connect();
        })
        .then(server => {
          console.log("Getting Service of kind: " + OPTIONAL_SERVICE);
          setServices([...services, server]);
          return server.getPrimaryServices();
        })
        .then(service => {
          console.log("Getting Characteristic...");
          let queue = Promise.resolve();
          service.forEach(service => {
            queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
              console.log('> Service: ' + service.uuid);
              characteristics.forEach(characteristic => {
                console.log('>> Characteristic: ' + characteristic.uuid + ' ' + getSupportedProperties(characteristic));
              });
            }));
          });
          return queue;
        })
    } catch (error) {
      console.log(error);
    }
  };

  /* Utils */

  function getSupportedProperties(characteristic) {
    let supportedProperties = [];
    for (const p in characteristic.properties) {
      if (characteristic.properties[p] === true) {
        supportedProperties.push(p.toUpperCase());
      }
    }
    return '[' + supportedProperties.join(', ') + ']';
  }




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