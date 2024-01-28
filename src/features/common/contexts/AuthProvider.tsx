import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'

export type AuthContextData = {
  user?: {
    username: string,
    password: string
  },
  accessToken?: string
}

export const AuthContext = createContext<{
  auth?: AuthContextData,
  setAuth: Dispatch<SetStateAction<AuthContextData>>,
  persist: boolean,
  setPersist: Dispatch<SetStateAction<boolean>>
}>({
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
})

export interface AuthProviderProps {}

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const [auth, setAuth] = useState<AuthContextData>({})
  const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem('persist') ?? 'true'))

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
