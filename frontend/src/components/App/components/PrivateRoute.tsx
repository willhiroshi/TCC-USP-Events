import React from 'react';
import useUserStore from '../../../store/userStore';
import { Navigate } from 'react-router-dom';

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
