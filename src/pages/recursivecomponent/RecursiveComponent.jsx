import { Col, Row } from 'antd';
import { rowGutter } from '../../utils';
import { EyeOutlined } from '@ant-design/icons';
import React from 'react';

const RecursiveComponent = ({ item, children, onClickDetail, margin }) => {
    console.log(item, children, margin);
    const hasChildren = children && children.length;

    return (
        <React.Fragment key={'fragment_' + item.id}>
            <Row key={'row_' + item.id} gutter={[...rowGutter]}>
                <Col key={'col1_' + item.id} span={20}>
                    <li key={'li_' + item.id} style={{ marginLeft: margin }}>
                        {item.name}
                    </li>
                </Col>
                <Col key={'col2_' + item.id} span={4}>
                    <EyeOutlined key={'icon_' + item.id} onClick={() => onClickDetail(item)} />
                </Col>
            </Row>

            {hasChildren &&
                children.map((c) => (
                    <RecursiveComponent
                        key={c.id}
                        item={{ id: c.id, name: c.name, description: c.description }}
                        children={c.items}
                        onClickDetail={onClickDetail}
                        margin={margin + 10}
                    />
                ))}
        </React.Fragment>
    );
};

export default RecursiveComponent;
