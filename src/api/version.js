import fetch from '@/utils/fetch'
import Qs from 'qs'

export function getVersion(page, page_size) {
  return fetch({
    url: '/version_list',
    method: 'get',
    params: {
      page,
      page_size
    }
  })
}

export function createVersion(params) {
  return fetch({
    url: '/create_version',
    method: 'post',
    data: Qs.stringify(params)
  })
}

export function deleteVersion(version_id) {
  return fetch({
    url: '/delete_version',
    method: 'post',
    data: Qs.stringify({
      version_id: version_id
    })
  })
}
