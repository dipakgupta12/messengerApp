import { getLoginHeaders, setLoginHeaders, getHeaders, clearLoginSession } from "../utility";

const host = process.env.REACT_APP_BASE_URL

export const signup = async (data) => {
  const url = `${host}/auth`
  const result = await fetch(url, {
    method: 'POST',
    body: data
  });
  if (result.status === 200) {
    const accessToken = result.headers.get('access-token')
    const client = result.headers.get('client')
    const uid = result.headers.get('uid')
    if (accessToken && client && uid) {
      setLoginHeaders({ accessToken, uid, client })
    }
  }
  return await result.json();
}

export const login = async (data) => {
  const url = `${host}/auth/sign_in`
  const headers = getHeaders();
  const result = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
  if (result.status === 200) {
    const accessToken = result.headers.get('access-token')
    const client = result.headers.get('client')
    const uid = result.headers.get('uid')
    if (accessToken && client && uid) {
      setLoginHeaders({ accessToken, uid, client })
    }
  }
  return await result.json();
}

export const validateUser = async (data) => {
  const url = `${host}/auth/validate_token`
  const headers = getLoginHeaders()
  const result = await fetch(url, { headers });
  return await result.json();
}

export const logout = async () => {
  const url = `${host}/auth/sign_out`
  const headers = getLoginHeaders()
  const result = await fetch(url, { method: 'DELETE', headers });

  if (result.status === 200) {
    clearLoginSession();
  }
  return await result.json();
}

export const getUsers = async () => {
  const url = `${host}/users`
  const headers = getLoginHeaders()
  const result = await fetch(url, { headers })
  return await result.json();
}

export const createChatRoom = async (data) => {
  const url = `${host}/chat_rooms`
  const headers = getLoginHeaders()
  const result = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  return await result.json();
}

export const getChatRooms = async (data) => {
  const url = `${host}/chat_rooms`
  const headers = getLoginHeaders()
  const result = await fetch(url, { headers })

  return await result.json();
}

export const createMessage = async (data) => {
  const url = `${host}/messages`
  const headers = getLoginHeaders()
  const result = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  })

  return await result.json();
}

export const getMessages = async (chat_room_id) => {
  const url = `${host}/messages?chat_room_id=${chat_room_id}`
  const headers = getLoginHeaders()
  const result = await fetch(url, { headers })
  return await result.json();
}