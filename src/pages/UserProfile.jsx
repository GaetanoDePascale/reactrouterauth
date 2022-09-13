import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

export const UserProfile = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('User Profile');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};
