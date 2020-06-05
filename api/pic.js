import requestUtil from '../utils/request'
import fakeD from './fakeData'

export default {
  /**
   * 获取首页所有画好的图
   * @param {*} keyWord 搜索关键字
   * @returns
   */
  getPicList(keyWord) {
    return new Promise((res, rej) => {
      res(fakeD.getPicList)
    })
    return requestUtil.get(`/piclist?key=${keyWord}`)
  },
  
  getAllImgsOfSource() {
    return new Promise((res, rej) => {
      res(fakeD.getAllImgsOfSource)
    })
    return requestUtil.get('/source/img/all')
  }
}