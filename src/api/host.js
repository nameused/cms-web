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
    url: '/host/deleteDevice/' + params,
    method: 'post'
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

export function deleteVm (params) {
  return request({
    url: '/host/deleteVm/' + params,
    method: 'post'
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



export function importVmExcel (params) {
  return request({
    url: '/host/importVmExcel',
    headers: {
      'Content-Type': 'multipart/form-data boundary= ' + new Date().getTime()
    },
    changeOrigin: true,
    method: 'post',
    data: params
  })
}

export function downloadDeviceFile () {
  return request({
    url: '/host/downloadDeviceFile',
    method: 'post',
    headers: {
      'Cache-Control': 'no-cache',
      'content-type': 'application/octet-stream'
    },
    responseType: 'blob'
  })
}

export function downloadVmFile () {
  return request({
    url: '/host/downloadVmFile',
    method: 'post',
    headers: {
      'Cache-Control': 'no-cache',
      'content-type': 'application/octet-stream'
    },
    responseType: 'blob'
  })
}
