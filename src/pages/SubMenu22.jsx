import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const SubMenu22 = (props) => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Sub Menu 2.2');
  }, [setPageTitle, setPageSubtitle]);

  return <>aaaaa</>;
};
