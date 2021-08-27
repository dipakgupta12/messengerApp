import { validateUser } from "./api";

export const getLoggedInUser = async() => {
  const headers = getLoginHeaders()
  if (headers['access-token'] && headers['client'] && headers['uid']){
    return await validateUser()
  }
  else {
    return null
  }
}

export const getHeaders = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}

export const getDateString = (date) => {
  date = new Date(date)
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  const minutes = date.getMinutes()
  const meridian = date.getHours() > 11 ? "PM" : "AM"
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day}/${month}/${year} ${hours}:${minutes} ${meridian}`
}

export const getLoginHeaders = () => {
  const accessToken = sessionStorage.getItem("access-token");
  const client = sessionStorage.getItem("client");
  const uid = sessionStorage.getItem("uid");
  return { "access-token": accessToken, client, uid, ...getHeaders() }
}

export const setLoginHeaders = (data) => {
  const { accessToken, uid, client } = data
  sessionStorage.setItem("access-token", accessToken);
  sessionStorage.setItem("client", client);
  sessionStorage.setItem("uid", uid);
}

export const clearLoginSession = () => {
  sessionStorage.setItem("access-token", '');
  sessionStorage.setItem("client", '');
  sessionStorage.setItem("uid", '');
}