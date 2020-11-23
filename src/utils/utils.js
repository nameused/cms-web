
export default {
  trimStr (str) {
    if (!str) {
      return ''
    }
    return str.replace(/(^\s*)|(\s*$)/g, '')
  }
}
