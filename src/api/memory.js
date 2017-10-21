import fetch from '@/utils/fetch'
import Qs from 'qs'

export function getMemory(page, page_size) {
  return fetch({
    url: '/memory',
    method: 'get',
    params: {
      page,
      page_size
    }
  })
}

export function checkMemory(memory_id, check_type) {
  return fetch({
    url: '/check_memory',
    method: 'get',
    params: {
      memory_id,
      check_type
    }
  })
}
