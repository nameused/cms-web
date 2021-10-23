import request from '../utils/request'

export function getSyslogList (params) {
  return request({
    url: '/syslog/getLogList',
    method: 'get',
    params: params
  })
}
