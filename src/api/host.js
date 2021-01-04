/**
 *
 * @author zhangmingyang
 * @Date: 2020/11/24
 * @company Dingxuan
 */
import request from '../utils/request'

export function getDevList (params) {
  return request({
    url: '/host/getDevList',
    method: 'get',
    params: params
  })
}

export function getVmList (params) {
  return request({
    url: '/host/getVmList',
    method: 'get',
    params: params
  })
}
