import { create } from 'zustand';
import { Authentication } from '../types/authentication';
import { User } from '../types/user';
import jwtDecode from 'jwt-decode';

export const AUTH_TOKENS_KEY = 'authTokens';

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;

  authTokens: Authentication | null;
  setAuthTokens: (authTokens: Authentication | null) => void;
}

const getAuthTokensFromLocalStorage = (): Authentication | null => {
  const rawAuthTokens = localStorage.getItem(AUTH_TOKENS_KEY);

  if (rawAuthTokens) {
    const authTokens = JSON.parse(rawAuthTokens);
    return authTokens;
  }

  return null;
};

const authTokens = getAuthTokensFromLocalStorage();

const useUserStore = create<UserStore>((set) => ({
  user: authTokens ? jwtDecode<User>(authTokens.access) : null,
  setUser: (user: User | null) => set({ user: user }),

  authTokens: authTokens,
  setAuthTokens: (authTokens: Authentication | null) => set({ authTokens: authTokens })
}));

export default useUserStore;
