import picApi from '../../../api/pic'
Page({
  data: {
    sourceImgs: [
      // 数据结构
      // {
      //   name: 'logo',
      //   text: '图标', 
      //   id: 1,
      //   width: 42,
      //   height: 42,
      //   imgs: [{
      //     id: 1,
      //     name: '绘画',
      //     src: '../../../image/21.png',
      //     zIndex: 0
      //   },{
      //     id: 2,
      //     name: '中心',
      //     src: '../../../image/31.png',
      //     zIndex: 0
      //   }]
      // }
    ],
    sourceTabs: [], // 请求tab
    activeSource: 'logo'
  },
  onLoad() {
    this.getImgsReq()
  },
  selectImgType(e) {
    console.log('切换active',  e.target.dataset.name)
    this.setData({
      activeSource: e.target.dataset.name
    })
  },

  // 获取所有贴图数据
  getImgsReq() {
    picApi
      .getAllImgsOfSource()
      .then(res => {
        let tabs = {}
        res.result.forEach(item=> tabs[item.name]= item.text)
      
        this.setData({
          sourceImgs: res.result || [],
          sourceTabs: tabs || []
        })
        console.log('怎么么恶恶么', tabs)
      }).catch(e => {
        console.log(e)
      })
  }
})