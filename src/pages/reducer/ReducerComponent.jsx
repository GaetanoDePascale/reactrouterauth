import { Button, Card, Col, Form, Input, notification, Row } from "antd";
import { useReducer, useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { rowGutter } from "../../utils";

const ReducerComponent = ({ initPageObject }) => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    const [isSaving, setIsSaving] = useState(false);
    const [pageObject, updatePageObject] = useReducer((prev, next) => {
        return { ...prev, ...next };
        // const newObject = { ...prev, ...next };

        // if (newObject.name.length > 20) {
        //     newObject.name = newObject.name.substring(0, 20);
        //     notification.warning({
        //         message: 'Attenzione',
        //         description: 'Il nome non può superare i 20 caratteri!',
        //         placement: 'topRight',
        //     });
        // }

        // return newObject;
    }, {
        name: initPageObject?.name ?? '',
        description: initPageObject?.description ?? '',
    });

    useEffect(() => {
        setPageSubtitle('A React ReducerTest');
        if (initPageObject !== undefined) {
            updatePageObject(initPageObject);
        }
    }, [setPageTitle, setPageSubtitle, updatePageObject]);

    const onSaveData = () => {
        setIsSaving(true);
        setTimeout(() => {
            alert('I will save data');
            setIsSaving(false);
        }, 5000);
    };

    const formItemLayout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 },
    };

    return (
        <div>
            <Form
                onFinish={() => {
                    onSaveData();
                }}
                autoComplete="on"
                initialValues={{
                    name: pageObject.name,
                    description: pageObject.description,
                }}
            >
                <Card>
                    <Row gutter={[...rowGutter]}>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label={'Nome'} name="name" rules={[{ required: true, message: 'Campo obbligatorio' }]}>
                                <Input
                                    maxLength={50}
                                    value={pageObject.name}
                                    onChange={(event) => updatePageObject({ name: event.target.value })}
                                    disabled={isSaving}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[...rowGutter]}>
                        <Col span={24}>
                            <Form.Item {...formItemLayout} label={'Descrizione'} name="description" rules={[{ required: false }]}>
                                <Input.TextArea
                                    maxLength={250}
                                    rows={4}
                                    value={pageObject.description}
                                    onChange={(event) => updatePageObject({ description: event.target.value })}
                                    disabled={isSaving}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[...rowGutter]}>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit" loading={isSaving} >
                                {isSaving ? 'Loading...' : 'Salva'}
                            </Button>
                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>);
}

export default ReducerComponent;