import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const Menu3 = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Menu 3');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};
