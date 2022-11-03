import axios from 'axios';
import { createContext, useState } from 'react'
import { toastErrorNotify, toastSuccessNotify } from '../helper/ToastNotify';

export const AuthContext = createContext();

const url = "https://stocks.pythonanywhere.com/"

const AuthContextProvider = (props) => {

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem("currentuser")) || false)
  let keys = sessionStorage.getItem('token')
  const [myKey, setMyKey] = useState(keys && window.atob(keys))

  const createUser = async (email, password, firstName, lastName, username, profile_pic, biography, password1, navigate) => {

    const userInfo = {
      "username": username,
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "profile_pic": profile_pic,
      "biography": biography,
      "password": password,
      "password1": password1
    }


    try {
      const res = await axios.post(`${url}auth/register/`, userInfo)

      if (res.data.token) {

        setMyKey(res.data.token)
        setCurrentUser({ ...res.data, 'token': '' })

        const userData = { ...res.data, token: '' }
        sessionStorage.setItem("currentuser", JSON.stringify(userData))
        const myToken = window.btoa(res.data.token)
        sessionStorage.setItem('token', myToken)
        toastSuccessNotify('User registered successfully.')
        navigate("/")
      }

    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const signIn = async (email, password, userName, navigate) => {

    try {
      const res = await axios.post(`${url}auth/login/`, {
        "email": email,
        "username": userName,
        "password": password
      })
      if (res.data.key) {
        setMyKey(res.data.key)
        setCurrentUser(res.data.user)
        sessionStorage.setItem('currentuser', JSON.stringify(res.data.user))
        const myToken = window.btoa(res.data.key)
        sessionStorage.setItem('token', myToken)

        toastSuccessNotify('User login successfully.')
        navigate("/")
      }


    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const logOut = async (navigate) => {
    try {
      var config = {
        method: 'post',
        url: `${url}auth/logout/`,
        headers: {
          'Authorization': `Token ${myKey}`,
        }
      };
      const res = await axios(config)
      if (res.status === 200) {
        setCurrentUser(false)
        setMyKey(false)
        sessionStorage.clear()
        toastSuccessNotify('User logged out successfully.')
        navigate("/")
      }
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  const updateProfile = async (data) => {
    try {
      var config = {
        method: 'patch',
        url: `${url}auth/update-profile/${currentUser.id}`,
        headers: {
          'Authorization': `Token ${myKey}`,
        },
        data: data
      };
      const res = await axios(config)
      if (res.status === 200) {
        setCurrentUser(res.data)
        sessionStorage.setItem('currentuser', JSON.stringify(res.data))
        toastSuccessNotify('User updated successfully.')
      }
    } catch (error) {
      toastErrorNotify(error.message)
    }
  }

  let value = {
    createUser,
    currentUser,
    myKey,
    signIn,
    logOut,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider;