import { Button, Col, InputNumber, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { rowGutter } from '../utils';

const RandomNumber = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    useEffect(() => {
        // setPageTitle('Application');
        setPageSubtitle('Random number');
    }, [setPageTitle, setPageSubtitle]);

    const [num, setNum] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(10);

    function randomNumberInRange(min, max) {
        // 👇️ get number between min (inclusive) and max (inclusive)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const handleClick = () => {
        setNum(randomNumberInRange(min, max));
    };

    return (
        <>
            <Row gutter={[...rowGutter]}>
                <Col span={4} style={{ alignSelf: 'center', paddingBottom: '10px' }}>Min: </Col>
                <Col span={8} style={{ alignSelf: 'center' }}>
                    <InputNumber
                        id="txtMin"
                        value={min}
                        onChange={(e) => setMin(e)}
                        style={{ marginBottom: 8, display: 'block' }}
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Col>
            </Row>
            <Row gutter={[...rowGutter]}>
                <Col span={4} style={{ alignSelf: 'center', paddingBottom: '10px' }}>Max: </Col>
                <Col span={8} style={{ alignSelf: 'center' }}>
                    <InputNumber
                        id="txtMax"
                        value={max}
                        onChange={(e) => setMax(e)}
                        style={{ marginBottom: 8, display: 'block' }}
                        onKeyPress={(event) => {
                            if (!/[0-9.]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                    />
                </Col>
            </Row>
            <Row gutter={[...rowGutter]}>
                <Col span={12} style={{ textAlign: 'center' }}><b>{num}</b></Col>
            </Row>
            <Row gutter={[...rowGutter]}>
                <Col span={12} style={{ textAlign: 'center' }}><Button onClick={handleClick}>Generate random number</Button></Col>
            </Row>
        </>
    );
};

export default RandomNumber;