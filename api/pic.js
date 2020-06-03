import requestUtil from '../utils/request'

export default {
  /**
   * 获取首页所有画好的图
   * @param {*} keyWord 搜索关键字
   * @returns
   */
  getPicList(keyWord) {
    return requestUtil.get(`/piclist?key=${keyWord}`)
  },
  
  getAllImgsOfSource() {
    return requestUtil.get('/source/img/all')
  }
}