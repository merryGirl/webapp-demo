import requestUtil from '../utils/request'

export default {
  getPicList(keyWord) {
    return requestUtil.get(`/piclist?key=${keyWord}`)
  }
}