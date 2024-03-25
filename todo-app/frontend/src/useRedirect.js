import { useState } from 'react';

export const useRedirect = () => {
  const [redirectPath, setRedirectPath] = useState(null);

  const redirectTo = (path) => {
    setRedirectPath(path);
  };

  return {
    redirectPath,
    redirectTo,
  };
};
