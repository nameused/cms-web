/**
 *
 * @author zhangmingyang
 * @Date: 2020/11/24
 * @company Dingxuan
 */
import request from '../utils/request'

export function getAllHost () {
  return request({
    url: '/dev/host/getAllHost',
    method: 'get'
  })
}
