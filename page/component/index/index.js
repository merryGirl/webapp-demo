import picApi from '../../../api/pic'
Page({
  data: {
    categories: {
      normal: '日常',
      scenery: '风景',
      cute: '萌宠',
      other: '其它'
    },
    isScroll: false,
    toView: 'normal', // 当前作品分类
    picData: [],
    keyWord: '' // 搜索热词
  },
  onLoad() {
    this.getPicListReq()
  },
  onReady() {
    
  },

  // 切换pic分类
  switchTab(e) {
    const beSelectedVal = e.target.dataset.name,
    _self = this
    console.log('当前被点击项目', beSelectedVal)
    this.setData({
      isScroll: true
    })
    setTimeout(function() {
      _self.setData({
        toView: beSelectedVal
      }, 0)
      setTimeout(function() {
        _self.setData({
          isScroll: false
        })
      })
    })
  },

  // 获取pic数据list
  getPicListReq() {
    picApi
      .getPicList(this.keyWord)
      .then(res => {
        this.setData({
          picData: res.result || []
        })
      }).catch(e => {
        console.log(e)
      })
  }
})