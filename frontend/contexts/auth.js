import { createContext, useReducer, useEffect } from 'react'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
})

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, { user: null })

  useEffect(() => {
    if (globalThis && globalThis.localStorage.getItem('jwtToken')) {
      const decodedToken = jwtDecode(globalThis.localStorage.getItem('jwtToken'))
    
      if (decodedToken.exp * 1000 < Date.now()) {
        globalThis.localStorage.removeItem('jwtToken')
      } else {
        dispatch({
          type: 'SET_USER',
          payload: decodedToken
        })
      }
    }
  }, [])

  const login = (userData) => {
    localStorage.setItem('jwtToken', userData.token)
    dispatch({
      type: 'LOGIN',
      payload: userData,
    })
  }

  const logout = () => {
    localStorage.removeItem('jwtToken')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }