import { FC, useState, createContext } from 'react';

export type LoginContextType = {
  username: string;
  setUsername: (username: string) => void;
}

export const LoginContext = createContext<LoginContextType>({
  username: "",
  setUsername: (username: string) => {}
});

export const LoginContextProvider: FC<{ children: React.ReactNode }> = ( { children } ) => {
  const [username, setUsername] = useState<string>("");

  return (
    <LoginContext.Provider value={{username, setUsername}}>
      {children}
    </LoginContext.Provider>
  )
}