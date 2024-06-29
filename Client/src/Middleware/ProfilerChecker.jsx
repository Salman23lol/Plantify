import React, { useEffect } from 'react';

const ProfileChecker = (WrappedComponent) => {
  const ComponentWithProfileCheck = () => {

    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('userData'));

      // Check if userData exists and if isProfileCreated is true
      if (!userData || !userData.isProfileCreated) {
        window.location.href = '/profile-completion'
      }
    }, [history]);

    return <WrappedComponent />;
  };

  return ComponentWithProfileCheck;
};

export default ProfileChecker;
