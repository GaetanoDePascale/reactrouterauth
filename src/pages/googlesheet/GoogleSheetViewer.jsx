import { Col, Collapse, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import getData from '.';

const { Panel } = Collapse;

function GoogleSheetViewer() {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [content, setContent] = useState(null);
    const [json, updJson] = useState(null);

    useEffect(() => {
        setPageSubtitle('Google Sheet Viewer');
    }, [setPageTitle, setPageSubtitle]);

    useEffect(() => {
        try {
            getData().then(result => updJson(result));

        } catch (e) {
            updJson(null);
            setContent('Error on data loading...');
        }

    }, []);

    useEffect(() => {
        if (json?.length) {
            console.log(json)
            const p = json.filter(x => x.ruolo === 'P');
            const d = json.filter(x => x.ruolo === 'D');
            const c = json.filter(x => x.ruolo === 'C');
            const a = json.filter(x => x.ruolo === 'A');
            setContent(
                <Collapse accordion>
                    <Panel header="Portieri" key="1">
                        {p.map((x, index) => (
                            <Row key={'RowP_' + index}>
                                <Col span={12} key={'Col0P_' + index}>{x.calciatore}</Col>
                                <Col span={8} key={'Col1P_' + index}>{x.squadra}</Col>
                                <Col span={4} key={'Col2P_' + index}>{x.costo} FM.</Col>
                            </Row>))}
                    </Panel>
                    <Panel header="Difensori" key="2">
                        {d.map((x, index) => (
                            <Row key={'RowD_' + index}>
                                <Col span={12} key={'Col0D_' + index}>{x.calciatore}</Col>
                                <Col span={8} key={'Col1D_' + index}>{x.squadra}</Col>
                                <Col span={4} key={'Col2D_' + index}>{x.costo} FM.</Col>
                            </Row>))}
                    </Panel>
                    <Panel header="Centrocampisti" key="3">
                        {c.map((x, index) => (
                            <Row key={'RowC_' + index}>
                                <Col span={12} key={'Col0C_' + index}>{x.calciatore}</Col>
                                <Col span={8} key={'Col1C_' + index}>{x.squadra}</Col>
                                <Col span={4} key={'Col2C_' + index}>{x.costo} FM.</Col>
                            </Row>))}
                    </Panel>
                    <Panel header="Attaccanti" key="4">
                        {a.map((x, index) => (
                            <Row key={'RowA_' + index}>
                                <Col span={12} key={'Col0A_' + index}>{x.calciatore}</Col>
                                <Col span={8} key={'Col1A_' + index}>{x.squadra}</Col>
                                <Col span={4} key={'Col2A_' + index}>{x.costo} FM.</Col>
                            </Row>))}
                    </Panel>
                </Collapse>
            );
        }
    }, [json]);

    return (<>
        {content !== null ? content : <p className='big'>Loading...</p>}
    </>);
}

export default GoogleSheetViewer;