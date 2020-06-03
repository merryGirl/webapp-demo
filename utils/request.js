class Request {
  constructor (parms) {
    this.withBaseURL = parms.withBaseURL
    this.baseURL = parms.baseURL
    this.successCode = parms.successCode
  }
  get (url, data) {
    return this.request('GET', url, data)
  }
  post (url, data) {
    return this.request('POST', url, data)
  }
  put (url, data) {
    return this.request('PUT', url, data)
  }
  request (method, url, data) {
    const vm = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: vm.withBaseURL ? vm.baseURL + url : url,
        data,
        method,
        success (res) {
          if (vm.successCode.includes(res.data.code)) {
            resolve(res.data)
          }
        },
        fail () {
          reject({
            msg: '请求失败',
            url: vm.withBaseURL ? vm.baseURL + url : url,
            method,
            data
          })
        }
      })
    })
  }
}

const request = new Request({
  baseURL: 'https://www.fastmock.site/mock/198c7c6e1e9a42799ccc859dab720686/draw',
  withBaseURL: true,
  successCode: ['200', 200]
})

module.exports = request