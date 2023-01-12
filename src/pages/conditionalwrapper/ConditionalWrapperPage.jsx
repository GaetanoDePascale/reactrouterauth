import { List } from "antd";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ConditionalWrapper } from './ConditionalWrapper';

const ConditionalWrapperPage = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    useEffect(() => {
        setPageSubtitle('A React Conditional Wrapper');
    }, [setPageTitle, setPageSubtitle]);


    const data = [
        {
            text: 'Prova 1',
            link: 'www.google.it'
        },
        {
            text: 'Prova 2',
        },
        {
            text: 'Prova 3',
            link: 'www.nexsoft.it'
        }
    ]

    return (<List
        header={<div>Conditional Wrapper List</div>}
        bordered
        dataSource={data}
        renderItem={(item, index) => (
            <List.Item key={'ListItem_' + index}>
                <ConditionalWrapper
                    key={'ConditionalWrapper_' + index}
                    condition={item.link}
                    wrapper={children => <a key={'ConditionalWrapperLink_' + index} href={item.link}>{children}</a>}
                >
                    {item.text}
                </ConditionalWrapper>
            </List.Item>
        )}
    />);
}

export default ConditionalWrapperPage;