import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const UserProfile = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();
  useEffect(() => {
    // setPageTitle('Application');
    setPageSubtitle('User Profile');
  }, [setPageTitle, setPageSubtitle]);

  return <></>;
};

export default UserProfile;
