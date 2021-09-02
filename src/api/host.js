/**
 *
 * @author zhangmingyang
 * @Date: 2020/11/24
 */
import request from '../utils/request'

export function getDevList (params) {
  return request({
    url: '/host/getDevList',
    method: 'get',
    params: params
  })
}

export function deleteDev (params) {
  return request({
    url: '/host/deleteDevice',
    method: 'post',
    data: params
  })
}

export function getVmList (params) {
  return request({
    url: '/host/getVmList',
    method: 'get',
    params: params
  })
}

export function addVm (params) {
  return request({
    url: '/host/addVm',
    method: 'post',
    data: params
  })
}

export function importDeviceExcel (params) {
  return request({
    url: '/host/importDeviceExcel',
    headers: {
      'Content-Type': 'multipart/form-data boundary= ' + new Date().getTime()
    },
    changeOrigin: true,
    method: 'post',
    data: params
  })
}
