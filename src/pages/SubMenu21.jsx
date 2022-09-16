import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const SubMenu21 = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    //setPageTitle('Application');
    setPageSubtitle('Sub Menu 2.1');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};

export default SubMenu21;
