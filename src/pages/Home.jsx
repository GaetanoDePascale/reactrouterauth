import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const HomePage = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Home page');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};
