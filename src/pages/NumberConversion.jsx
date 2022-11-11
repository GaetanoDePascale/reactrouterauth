import { Button, Col, Input, InputNumber, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { formatNumber, rowGutter } from '../utils';

const NumberConversion = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  const [inputValue, setInputValue] = useState('');
  const [precision, setPrecision] = useState(0);
  const [resultValue, setResultValue] = useState('');

  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Number Conversion');
  }, [setPageTitle, setPageSubtitle]);

  return (
    <>
      <Row gutter={[...rowGutter]}>
        <Col span={8}>Insert value:</Col>
        <Col span={16}>
          <Input
            id="txtValue"
            placeholder={`Value to convert`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: 8, display: 'block' }}
          />
        </Col>
      </Row>
      <Row gutter={[...rowGutter]}>
        <Col span={8}>Precision:</Col>
        <Col span={16}>
          <InputNumber
            id="txtPrecision"
            value={precision}
            onChange={(e) => setPrecision(e)}
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
        <Col span={8}></Col>
        <Col span={16}>
          <Button onClick={() => setResultValue(formatNumber(inputValue, precision))} style={{ marginBottom: 8, display: 'block' }}>
            Convert
          </Button>
        </Col>
      </Row>
      <Row gutter={[...rowGutter]}>
        <Col span={8}>Result</Col>
        <Col span={16}>
          <Input id="txtResult" value={resultValue} readOnly={true} style={{ marginBottom: 8, display: 'block' }} />
        </Col>
      </Row>
    </>
  );
};

export default NumberConversion;
