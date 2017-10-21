import fetch from '@/utils/fetch'

export function userStatic() {
  return fetch({
    url: '/user_static',
    method: 'get'
  })
}

export function memoryStatic() {
  return fetch({
    url: '/memory_static',
    method: 'get'
  })
}
