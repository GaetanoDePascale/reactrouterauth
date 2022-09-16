import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const Menu3 = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('Menu 3');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};

export default Menu3;
