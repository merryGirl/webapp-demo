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
      //   },{
      //     id: 2,
      //     name: '中心',
      //     src: '../../../image/31.png',
      //   }]
      // }
    ], // 贴图数据
    sourceTabs: [], // 请求tab
    activeSource: 'logo', // 当前激活tab
    imgLocations: [
      // { 
      //   id: 0,
      //   left: 0,
      //   top: 0,
      //   width: 70,
      //   height: 70,
      //   rotate: 0, // 旋转角度
      //   url: '', //img链接
      //   zIndex: 0
      // } // 数据格式
    ], // 图片定位
    recordLocations: [
      // {
      //   w: 70,  //img宽度
      //   h: 70,   //img高度
      //   lastLeft: 0, //imgx轴的值
      //   lastTop: 0, //imgy轴的值
      //   rotate: 0,  //img旋转角度
      //   sx: 0, // 源x轴方向
      //   sy: 0, // 源y轴
      //   scx: 0,
      //   r: 0,
      //   rox: 0,
      //   per: 1,  //img宽高比
      // }
    ], // 图片移动位置记录
    activeImgId: null, // 当前激活图片id
  },
  onLoad() {
    this.getImgsReq()
  },
  selectImgType(e) {
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
  },

  selecedImg(e) {
    console.log('当前点击的切图', e.target.dataset)
    const dataset = e.target.dataset
    const loc = {
      id: dataset.img.id,
      left: 0,
      top: 0,
      width: dataset.item.width*2,
      height: dataset.item.height*2,
      rotate: 0, // 旋转角度
      url: dataset.img.src, //img链接
      zIndex: 0
    }
    this.setData({
      imgLocations: this.data.imgLocations.concat(loc)
    })
  },

  imgStart(e) {

  },

  imgMove(e) {

  },

  rotateStart(e) {

  },

  rotateMove(e) {

  },

  rotateEnd(e) {

  },

  scaleStart(e) {

  },

  scaleMove(e) {

  },
})