import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { MyEmployment } from '~/api/servicepro.generated'

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
  employment?: MyEmployment | null,
  setEmployment: Dispatch<SetStateAction<MyEmployment | null>>
}>({
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
  setEmployment: () => {},
})

export interface AuthProviderProps {}

export const AuthProvider = ({ children }: PropsWithChildren<AuthProviderProps>) => {
  const [auth, setAuth] = useState<AuthContextData>({})
  const [persist, setPersist] = useState<boolean>(JSON.parse(localStorage.getItem('persist') ?? 'true'))
  const [employment, setEmployment] = useState<MyEmployment | null>(null)

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        employment,
        setEmployment,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
