import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const FakeApi = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();
    useEffect(() => {
        //setPageTitle('Application');
        setPageSubtitle('Fake API test');

        // fetch('https://swapi.dev/api//people/1')
        //     .then(res => res.json())
        //     .then(console.log);
    }, [setPageTitle, setPageSubtitle]);

    return <></>;
};

export default FakeApi;
