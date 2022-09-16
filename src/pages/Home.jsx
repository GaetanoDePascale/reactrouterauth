import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const HomePage = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Home page');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};

export default HomePage;
