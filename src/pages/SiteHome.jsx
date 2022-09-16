import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const SiteHomePage = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('User Home page');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};

export default SiteHomePage;
