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
    picData: [{
      id: 'normal',
      pics: ['图片1', '图片2']
    },{
      id: 'scenery',
      pics: ['scenery', '图片scenery']
    },{
      id: 'cute',
      pics: ['cute', '图片cute']
    },{
      id: 'other',
      pics: ['other', 'other图片']
    }]
  },
  onReady() {
    
  },

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
  }
})