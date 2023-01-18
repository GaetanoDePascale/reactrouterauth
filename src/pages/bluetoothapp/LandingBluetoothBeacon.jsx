import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';


const LandingBluetoothBeacon = () => {
  const [devices, setDevices] = useState([]);
  const pw_service_uuid = '0000feaa-0000-1000-8000-00805f9b34fb'
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
          let beacon = {};
          beacon.name= device.name;
          beacon.id= device.id;
          console.log("> Connected to this device-->");
          console.log("> Name:             " + device.name);
          console.log("> Id:               " + device.id);
          device.watchAdvertisements();
          device.addEventListener('advertisementreceived', event => {

            let eddystone = event.serviceData.get(pw_service_uuid)

            if (!eddystone) { return }

            let type = eddystone.getUint8(0)
            if (type !== 0x10) { return }

            let tx = eddystone.getUint8(1)
            let scheme = eddystone.getUint8(2)

            let url = ''

            switch (scheme) {
              case 0x00: url += 'http://www.'; break
              case 0x01: url += 'https://www.'; break
              case 0x02: url += 'http://'; break
              case 0x03: url += 'https://'; break
              default: console.log('Malformed beacon'); return
            }

            for (let i = 3; i < eddystone.byteLength; i++) {
              let value = eddystone.getUint8(i)

              // Reserved.
              if ((value > 0x0e && value < 0x20) || value > 0x7F) { continue }

              switch (value) {
                case 0x00: url += '.com/'; break
                case 0x01: url += '.org/'; break
                case 0x02: url += '.edu/'; break
                case 0x03: url += '.net/'; break
                case 0x04: url += '.info/'; break
                case 0x05: url += '.biz/'; break
                case 0x06: url += '.gov/'; break
                case 0x07: url += '.com'; break
                case 0x08: url += '.org'; break
                case 0x09: url += '.edu'; break
                case 0x0a: url += '.net'; break
                case 0x0b: url += '.info'; break
                case 0x0c: url += '.biz'; break
                case 0x0d: url += '.gov'; break
                default: url += String.fromCharCode(value)
              }
            }

            console.log('Found a Physical Web beacon: ', tx, url)
            beacon.tx= tx;
            beacon.url= url;
            device.forget();
            setDevices([...devices, beacon]);
          })


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

  return (
    <div>
      <Button onClick={handleScan}>Scan Beacons</Button>
      <Table>
        <thead>
          <tr>
            <th>Device Name....................................|</th>
            <th>ID....................................|</th>
            <th>TX Power....................................|</th>
            <th>URL Frame....................................|</th>
          </tr>
        </thead>
        <tbody>
          {devices.map(device => (
            <tr>
              <td>{device.name}</td>
              <td>{device.id}</td>
              <td>{device.tx}</td>
              <td>{device.url}</td>
            </tr>
          ))}
        </tbody>

      </Table>
    </div>
  );
};

export default LandingBluetoothBeacon;