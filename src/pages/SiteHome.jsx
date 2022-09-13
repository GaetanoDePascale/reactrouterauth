import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const SiteHomePage = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('User Home page');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};
