import fetch from '@/utils/fetch'

export function getUser(page, page_size) {
  return fetch({
    url: '/user',
    method: 'get',
    params: {
      page,
      page_size
    }
  })
}

export function getUserBank(user_id) {
  return fetch({
    url: '/get_user_bank',
    method: 'get',
    params: {
      user_id
    }
  })
}
