import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { doAxiosGet, doAxiosPost } from "../../utils/AxiosCall";
import { Col, DatePicker, Drawer, Input, InputNumber, List, Row } from "antd";
import { EyeOutlined } from '@ant-design/icons';

const DynamicForm = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    const [pageState, setPageState] = useState({
            pageData: [],
            open: false,
            formData: [],
        });
    const [values, setValues] = useState({})

    const changeHandler = (currentItem, value) => {
        let currentValues = {...values};

        if(currentItem.validator!==null) {
            const postParams = {
                formData: pageState.formData,
                values: currentValues,
                currentItem
            }
            doAxiosPost('@currentItem', postParams).then((res) => {
                console.log(res);
                if(res.executionResult) {
                    setPageState({...pageState, formData: res.data.formData});
                    setValues(res.data.values);
                }
            });
        } else {
            setValues({...values, [currentItem.id]: value})
        }
    }

    useEffect(() => {
        setPageSubtitle('Form Builder');
    }, [setPageTitle, setPageSubtitle]);

    useEffect( () => {
        doAxiosGet('@dynamic-from').then((res) => {
            if(res.executionResult) {
                setPageState({...pageState, pageData: res.data});
            }
        });
    }, [])

    const rowStyle = {
        height: '50px'
    }

    const onClickDetail = (selectedItem) => {
        setPageState({...pageState, open: true, formData: selectedItem.items});
    }
    
    const onClose = () => {
        setPageState({...pageState, open: false});
    };
    
    const renderFormItems = (items) => {
        if(items && items.length>0) {
            return items.map(i => {
                return (
                    <Row key={`RowForm_${i.id}`} style={rowStyle}>
                        <Col key={`ColFormLabel_${i.id}`} span={4}>{i.label}</Col>
                        <Col key={`ColFormInput_${i.id}`} span={18}>{renderItem(i)}</Col>
                    </Row>
                );
            })
        }
    }

    const renderCalculatedItems = (items) => {

        if(items && items.length>0) {
            return items.map(i => {
                return (
                    <Row key={`RowCalculated_${i.id}`} style={rowStyle}>
                        <Col key={`ColCalculatedLabel_${i.id}`} span={4}>{i.label}</Col>
                        <Col key={`ColCalculatedValue_${i.id}`} span={18}>{values[i.id]}</Col>
                    </Row>
                );
            })
        }
    }


    const renderItem = (item) => {
        switch (item.type) {
            case 'TEXT':
                return <Input key={`Input_${item.id}`} id={item.id} onChange={(e) => changeHandler(item, e.target.value)} />;
            case 'NUMERIC':
                return <InputNumber key={`Input_${item.id}`} id={item.id} min={item.minValue} max={item.maxValue} onChange={(e) => changeHandler(item, e)} />;
            case 'DATETIME':
                return <DatePicker key={`Input_${item.id}`} id={item.id} onChange={(date, dateString) => changeHandler(item, dateString)} />;
                                
            default:
                return <></>;
        }
    }

    return (<>
        <List
            header={<div>Operazioni</div>}
            bordered
            dataSource={pageState.pageData}
            renderItem={(item) => (
                <List.Item actions={[<EyeOutlined key={'icon_' + item.id} onClick={() => onClickDetail(item)} />]}
                >
                    {item.name}
                </List.Item>
            )}
        />
        <Drawer title="Esegui Operazione" onClose={onClose} open={pageState.open} placement={'bottom'}>
            <Row>
                <Col span={12}>{renderFormItems(pageState.formData)}</Col>
                <Col span={12}>{renderCalculatedItems(pageState.formData)}</Col>
            </Row>
                
       </Drawer>
    </>);
}

export default DynamicForm;