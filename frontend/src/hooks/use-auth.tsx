import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './use-flash-message'

interface User {
   name?: string;
   email: string;
   senha: string;
}

interface AuthResponse {
   token: string;
}

export default function useAuth() {
   const [authenticated, setAuthenticated] = useState<boolean>(false)
   const { setFlashMessage } = useFlashMessage()
   const navigate = useNavigate()

   useEffect(() => {
      const token = localStorage.getItem('token')

      if (token) {
         api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
         setAuthenticated(true)
      } else {
         setFlashMessage('Por favor, realize primeiro o login!', 'error')
         navigate('/login')
      }
   }, [navigate])

   async function register(user: User) {
      let msgText = 'Cadastro realizado com sucesso!'
      let msgType: 'success' | 'error' = 'success'

      try {
         const data = await api.post<AuthResponse>('/users/register', user).then((response) => {
            return response.data
         })
         await authUser(data)
      } catch (error: any) {
         msgText = error.response.data.message
         msgType = 'error'
      }

      setFlashMessage(msgText, msgType)
   }

   async function authUser(data: AuthResponse) {
      setAuthenticated(true)
      localStorage.setItem('token', JSON.stringify(data.token))
      navigate('/')
   }

   function logout() {
      const msgText = 'Usuário deslogado com sucesso!'
      const msgType: 'success' = 'success'

      setAuthenticated(false)
      localStorage.removeItem('token')
      delete api.defaults.headers.Authorization
      navigate('/login')

      setFlashMessage(msgText, msgType)
   }

   async function login(user: User) {
      let msgText = 'Login realizado com sucesso!'
      let msgType: 'success' | 'error' = 'success'

      try {
         const data = await api.post<AuthResponse>('/api/login', user).then((response) => {
            return response.data
         })

         setFlashMessage(msgText, msgType)

         await authUser(data)
      } catch (error: any) {
         msgText = error.response.data.message
         msgType = 'error'
      }

      setFlashMessage(msgText, msgType)
   }

   return { authenticated, register, logout, login }
}