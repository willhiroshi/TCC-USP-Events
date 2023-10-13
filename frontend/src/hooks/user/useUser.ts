import { useMutation } from '@tanstack/react-query';
import { getAPIBaseUrl } from '../../utils/utils';
import { Authentication } from '../../types/authentication';
import { LoginRequest, RegisterRequest } from './types';
import { User } from '../../types/user';
import useUserStore, { AUTH_TOKENS_KEY } from '../../store/userStore';
import jwtDecode from 'jwt-decode';
import useUserRequester from './useUserRequester';

const useUser = () => {
  const userRequester = useUserRequester(getAPIBaseUrl());

  const setAuthTokens = useUserStore((state) => state.setAuthTokens);
  const setUser = useUserStore((state) => state.setUser);

  const postLogin = useMutation<Authentication, unknown, { loginRequest: LoginRequest }>({
    mutationFn: (request) =>
      userRequester.postLogin(request.loginRequest.username, request.loginRequest.password),
    onSuccess: (data) => {
      setAuthTokens(data);
      setUser(jwtDecode<User>(data.access));
      localStorage.setItem(AUTH_TOKENS_KEY, JSON.stringify(data));
      alert('You have successfully logged in!');
    },
    onError: (error) => {
      console.log(error);
      alert('Something went wrong. Please try again.');
    }
  });

  const postRegister = useMutation<User, unknown, { registerRequest: RegisterRequest }>({
    mutationFn: (request) =>
      userRequester.postRegister(
        request.registerRequest.username,
        request.registerRequest.email,
        request.registerRequest.password,
        request.registerRequest.name
      ),
    onSuccess: async (data) => {
      console.log(data);
      alert("You've successfully registered! Please log in to continue.");
    },
    onError: (error) => {
      console.log(error);
      alert('Something went wrong. Please try again.');
    }
  });

  return {
    postLogin,
    postRegister
  };
};

export default useUser;
