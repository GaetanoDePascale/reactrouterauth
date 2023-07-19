import { Button, Col, Modal, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { rowGutter } from '../utils';

import '../css/modal.css'

const ComponentTest = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [modal, setModal] = useState({ title: '', content: <></>, visible: false });

    useEffect(() => {
        // setPageTitle('Application');
        setPageSubtitle('Component Test');
    }, [setPageTitle, setPageSubtitle]);

    const fullScreenModal = {
        title: 'Test Full modal',
        content: <>Prova</>,
        visible: true,
    }

    return (<>
        <Row gutter={rowGutter}>
            <Col span={24}>
                <Button type="primary" onClick={() => setModal(fullScreenModal)}>
                    Display a full screen modal
                </Button>
                {console.log(window.innerWidth, window.innerHeight)}
                <Modal
                    title={modal.title}
                    open={modal.visible}
                    onOk={() => setModal({ title: '', content: <></>, visible: false })}
                    onCancel={() => setModal({ title: '', content: <></>, visible: false })}
                >
                    {modal.content}
                </Modal>
            </Col>
        </Row>
    </>);
};

export default ComponentTest;
