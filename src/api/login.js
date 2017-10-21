import fetch from '@/utils/fetch'
import Qs from 'qs'

export function login(phone, password) {
  return fetch({
    url: '/login',
    method: 'post',
    data: Qs.stringify({
      phone: phone,
      password: password
    })
  })
}

export function getInfo(token) {
  return fetch({
    url: '/admin_user_info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return fetch({
    url: '/logout',
    method: 'post'
  })
}
