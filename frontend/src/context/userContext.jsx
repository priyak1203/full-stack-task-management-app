import { useContext, useState } from 'react';
import { createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState('temp user');

  const setUserInfo = (userInfo) => {
    const { username, token } = userInfo;
    const user = { username, token };
    setUser(user);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
