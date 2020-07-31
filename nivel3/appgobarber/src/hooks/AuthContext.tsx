import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface IAuthState {
  token: string;
  user: IUser;
}

interface ICredentials {
  email: string;
  password: string;
}
interface IUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface IAuthContext {
  user: IUser;
  signIn(credentials: ICredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IAuthState>({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }
    loadStoragedData();
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post<IAuthState>('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    user.avatar_url = !!user.avatar_url
      ? user.avatar_url
      : `https://api.adorable.io/avatars/180/${user.name}`;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const updateUser = useCallback(
    async (user: IUser) => {
      user.avatar_url = !!user.avatar_url
        ? user.avatar_url
        : `https://api.adorable.io/avatars/180/${user.name}`;

      await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    setData({} as IAuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  if (!context) throw new Error('userAuth must be used within an AuthProvider');

  return context;
}
