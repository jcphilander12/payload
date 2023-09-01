import { useModal } from '@faceless-ui/modal'
import jwtDecode from 'jwt-decode'
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'

import type { Permissions, User } from '../../../../auth/types'
import type { AuthContext } from './types'

import { requests } from '../../../api'
import useDebounce from '../../../hooks/useDebounce'
import { useConfig } from '../Config'

const Context = createContext({} as AuthContext)

const maxTimeoutTime = 2147483647

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()
  const [tokenInMemory, setTokenInMemory] = useState<string>()
  const { pathname } = useLocation()
  const { push } = useHistory()

  const config = useConfig()

  const {
    admin: { autoLogin, inactivityRoute: logoutInactivityRoute, user: userSlug },
    routes: { admin, api },
    serverURL,
  } = config

  const exp = user?.exp

  const [permissions, setPermissions] = useState<Permissions>()

  const { i18n } = useTranslation()
  const { closeAllModals, openModal } = useModal()
  const [lastLocationChange, setLastLocationChange] = useState(0)
  const debouncedLocationChange = useDebounce(lastLocationChange, 10000)

  const id = user?.id

  const redirectToInactivityRoute = useCallback(() => {
    if (window.location.pathname.startsWith(admin)) {
      const redirectParam = `?redirect=${encodeURIComponent(
        window.location.pathname.replace(admin, ''),
      )}`
      push(`${admin}${logoutInactivityRoute}${redirectParam}`)
    } else {
      push(`${admin}${logoutInactivityRoute}`)
    }
    closeAllModals()
  }, [push, admin, logoutInactivityRoute, closeAllModals])

  const refreshCookie = useCallback(
    (forceRefresh?: boolean) => {
      const now = Math.round(new Date().getTime() / 1000)
      const remainingTime = ((exp as number) || 0) - now

      if (forceRefresh || (exp && remainingTime < 120)) {
        setTimeout(async () => {
          try {
            const request = await requests.post(`${serverURL}${api}/${userSlug}/refresh-token`, {
              headers: {
                'Accept-Language': i18n.language,
              },
            })

            if (request.status === 200) {
              const json = await request.json()
              setUser(json.user)
            } else {
              setUser(null)
              redirectToInactivityRoute()
            }
          } catch (e) {
            toast.error(e.message)
          }
        }, 1000)
      }
    },
    [exp, serverURL, api, userSlug, i18n, redirectToInactivityRoute],
  )

  const refreshCookieAsync = useCallback(
    async (skipSetUser?: boolean): Promise<User> => {
      try {
        const request = await requests.post(`${serverURL}${api}/${userSlug}/refresh-token`, {
          headers: {
            'Accept-Language': i18n.language,
          },
        })

        if (request.status === 200) {
          const json = await request.json()
          if (!skipSetUser) setUser(json.user)
          return json.user
        }

        setUser(null)
        redirectToInactivityRoute()
        return null
      } catch (e) {
        toast.error(`Refreshing token failed: ${e.message}`)
        return null
      }
    },
    [serverURL, api, userSlug, i18n, redirectToInactivityRoute],
  )

  const setToken = useCallback((token: string) => {
    const decoded = jwtDecode<User>(token)
    setUser(decoded)
    setTokenInMemory(token)
  }, [])

  const logOut = useCallback(() => {
    setUser(null)
    setTokenInMemory(undefined)
    requests.post(`${serverURL}${api}/${userSlug}/logout`)
  }, [serverURL, api, userSlug])

  const refreshPermissions = useCallback(async () => {
    try {
      const request = await requests.get(`${serverURL}${api}/access`, {
        headers: {
          'Accept-Language': i18n.language,
        },
      })

      if (request.status === 200) {
        const json: Permissions = await request.json()
        setPermissions(json)
      } else {
        throw new Error(`Fetching permissions failed with status code ${request.status}`)
      }
    } catch (e) {
      toast.error(`Refreshing permissions failed: ${e.message}`)
    }
  }, [serverURL, api, i18n])

  // On mount, get user and set
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const request = await requests.get(`${serverURL}${api}/${userSlug}/me`, {
          headers: {
            'Accept-Language': i18n.language,
          },
        })

        if (request.status === 200) {
          const json = await request.json()

          if (json?.user) {
            setUser(json.user)
          } else if (json?.token) {
            setToken(json.token)
          } else if (autoLogin && autoLogin.prefillOnly !== true) {
            // auto log-in with the provided autoLogin credentials. This is used in dev mode
            // so you don't have to log in over and over again
            const autoLoginResult = await requests.post(`${serverURL}${api}/${userSlug}/login`, {
              body: JSON.stringify({
                email: autoLogin.email,
                password: autoLogin.password,
              }),
              headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json',
              },
            })
            if (autoLoginResult.status === 200) {
              const autoLoginJson = await autoLoginResult.json()
              setUser(autoLoginJson.user)
              if (autoLoginJson?.token) {
                setToken(autoLoginJson.token)
              }
            } else {
              setUser(null)
            }
          } else {
            setUser(null)
          }
        }
      } catch (e) {
        toast.error(`Fetching user failed: ${e.message}`)
      }
    }

    fetchMe()
  }, [i18n, setToken, api, serverURL, userSlug, autoLogin])

  // When location changes, refresh cookie
  useEffect(() => {
    if (id) {
      refreshCookie()
    }
  }, [debouncedLocationChange, refreshCookie, id])

  useEffect(() => {
    setLastLocationChange(Date.now())
  }, [pathname])

  // When user changes, get new access
  useEffect(() => {
    if (id) {
      refreshPermissions()
    }
  }, [i18n, id, api, serverURL, refreshPermissions])

  useEffect(() => {
    let reminder: ReturnType<typeof setTimeout>
    const now = Math.round(new Date().getTime() / 1000)
    const remainingTime = (exp as number) - now

    if (remainingTime > 0) {
      reminder = setTimeout(
        () => {
          openModal('stay-logged-in')
        },
        (Math.min((remainingTime - 60) * 1000), maxTimeoutTime),
      )
    }

    return () => {
      if (reminder) clearTimeout(reminder)
    }
  }, [exp, openModal])

  useEffect(() => {
    let forceLogOut: ReturnType<typeof setTimeout>
    const now = Math.round(new Date().getTime() / 1000)
    const remainingTime = (exp as number) - now

    if (remainingTime > 0) {
      forceLogOut = setTimeout(
        () => {
          setUser(null)
          redirectToInactivityRoute()
        },
        Math.min(remainingTime * 1000, maxTimeoutTime),
      )
    }

    return () => {
      if (forceLogOut) clearTimeout(forceLogOut)
    }
  }, [exp, closeAllModals, i18n, redirectToInactivityRoute])

  return (
    <Context.Provider
      value={{
        logOut,
        permissions,
        refreshCookie,
        refreshCookieAsync,
        refreshPermissions,
        setToken,
        setUser,
        token: tokenInMemory,
        user,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext<T>

export const useAuth: UseAuth = () => useContext(Context)
