import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { doAxiosGet } from "../../utils/AxiosCall";
import { DatePicker, Drawer, Form, Input, InputNumber, List } from "antd";
import { EyeOutlined } from '@ant-design/icons';

const DynamicForm = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    const [pageState, setPageState] = useState({
            pageData: [],
            open: false,
            formData: []
        });
    const [values, setValues] = useState({})

    const changeHandler = e => {
        console.log(values);

        setValues({...values, [e.target.name]: e.target.value})
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
                    <Form.Item
                        key={i.id}
                        label={i.label}
                        name={i.id}
                        rules={[{ required: i.required, message: `Please input ${i.label}!` }]}
                    >
                        {renderItem(i)}
                    </Form.Item>
                );
            })
        }
    }

    const renderItem = (item) => {
        switch (item.type) {
            case 'TEXT':
                return <Input defaultValue={item.defaultValue} onChange={changeHandler} />;
            case 'NUMERIC':
                return <InputNumber min={item.minValue} max={item.maxValue} defaultValue={item.defaultValue} onChange={changeHandler} />;
            case 'DATETIME':
                return <DatePicker onChange={changeHandler} />;
                                
            default:
                return <></>;
        }
    }

    const onFinish = (values) => {
        console.log('Success:', values);
    };
      
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
        <Drawer title="Esegui Operazione" onClose={onClose} open={pageState.open}>
            <Form
                name="dynamicForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                {renderFormItems(pageState.formData)}
            </Form>
       </Drawer>
    </>);
}

export default DynamicForm;