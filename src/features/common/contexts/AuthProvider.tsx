import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

export type AuthContextData = {
  user?: {
    username: string,
    password: string
  },
  accessToken?: string
}

export const AuthContext = createContext<{ auth?: AuthContextData, setAuth: Dispatch<SetStateAction<AuthContextData>> }>({ setAuth: () => {} })

export interface AuthProviderProps {}

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const [auth, setAuth] = useState<AuthContextData>({})

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
