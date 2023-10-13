import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserStore from '../../../store/userStore';

interface PrivateRouteProps {
  Component: React.ElementType;
}

const PrivateRoute = ({ Component }: PrivateRouteProps) => {
  const authTokens = useUserStore((state) => state.authTokens);

  if (!authTokens) {
    return <Navigate to="/" />;
  }

  return <Component />;
};

export default PrivateRoute;
