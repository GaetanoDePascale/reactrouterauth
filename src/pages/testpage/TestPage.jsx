import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const TestPage = () => {
    const [setPageTitle, setPageSubtitle] = useOutletContext();

    useEffect(() => {
        setPageSubtitle('A React Test Page');
    }, [setPageTitle, setPageSubtitle]);

    return <>Test Page</>
}

export default TestPage;