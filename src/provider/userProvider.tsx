import { SetStateAction, createContext, useEffect, useState } from 'react';

import { IUser, defUser } from 'models/user/user';
import { profileService } from 'services/user/profile';

type UserContextType = {
  user: IUser;
  setUser: (value: SetStateAction<IUser>) => void;
};

export const UserContext = createContext<UserContextType>({
  user: defUser,
  setUser: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser>(defUser);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      profileService().then((res) => {
        setUser(res.data);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
