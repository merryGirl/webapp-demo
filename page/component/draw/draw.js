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
    activeImgId: null, // 当前激活图片id
    windowWidth: null,
    windowHeight: null,
  },
  
  locImgLen: 0, // 本地加载的图片个数
  recordLocations: [], // 图片移动位置记录
  lastZIndex: 1, // 上一个图片Z-index值

  onLoad() {
    this.getImgsReq()

    // 获取屏幕尺寸
    const {windowWidth, windowHeight} = wx.getSystemInfoSync()
    this.setData({
      windowWidth,
      windowHeight
    })
  },

  // 切换贴纸类型
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
      }).catch(e => {
        console.log(e)
      })
  },

  // 选中贴图，位置数据初始化
  selecedImg(e, locPer, locWidth, locHeiht, locId, locSrc) {
    const {img, item} = e ? e.target.dataset : {img: null, item: null}
    const imgW = item && item.width || locWidth
    const imgH = item && item.height || locHeiht
    console.log('获取到数据',locPer, locWidth, locHeiht, locId, locSrc )
    const leftVal = (this.data.windowWidth-imgW)/2
    const topVal = (this.data.windowHeight-260-imgH)/2
    const loc = {
      id: img && img.id || locId,
      left: leftVal,
      top: topVal,
      width: imgW,
      height: imgH,
      rotate: 0, // 旋转角度
      url: img && img.src || locSrc, //img链接
      zIndex: 1
    }
    const recordLoc = {
      id: img && img.id || locId,
      w: imgW,  //img宽度
      h: imgH,   //img高度
      lastLeft: leftVal, //imgx轴的值
      lastTop: topVal, //imgy轴的值
      rotate: 0,  //img旋转角度
      sx: 0, // 源x轴方向
      sy: 0, // 源y轴
      scx: 0,
      r: 0,
      rox: 0,
      per: e ? 1 : locPer,  //img宽高比
    }

    this.setData({
      imgLocations: this.data.imgLocations.concat(loc),
    })
    this.recordLocations.push(recordLoc)
  },

  // 获取当前激活的数据下标
  getActiveIdx(originArr, activeId, isChangeIdx) {
    let activeIdx = null
    originArr.length && originArr.filter((item, idx) => {
      if (item.id === activeId) {
        activeIdx = idx
        
        if (isChangeIdx) {
          const imgIdx = 'imgLocations['+idx+'].zIndex'
          this.setData({
            [imgIdx]: this.lastZIndex++
          })
          this.lastZIndex++;
        }
      }
    })
    return activeIdx
  },

  // 触发img框，记录位置
  imgStart(e) {
    const touch = e.touches[0] || e.changedTouches[0]
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id, true)
    this.recordLocations[activeIdx].sx = touch.pageX
    this.recordLocations[activeIdx].sy = touch.pageY
    console.log('首次点击', touch.pageX, touch.pageY)
  },

  imgMove(e) {
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id )
    let touch = e.touches[0] || e.changedTouches[0]
    let pageX = touch.pageX
    let pageY = touch.pageY

    let left = pageX - this.recordLocations[activeIdx].sx + this.recordLocations[activeIdx].lastLeft
    if (left <= 0) {
      left = 0
    } else if (left >= this.data.windowWidth - this.recordLocations[activeIdx].w) {
      left = this.data.windowWidth - this.recordLocations[activeIdx].w
    }

    let top = pageY - this.recordLocations[activeIdx].sy + this.recordLocations[activeIdx].lastTop
    if (top <= 0) {
      top = 0
    } else if (top >= this.data.windowHeight - this.recordLocations[activeIdx].h) {
      top = this.data.windowHeight - this.recordLocations[activeIdx].h
    }

    this.recordLocations[activeIdx].sx = pageX
    this.recordLocations[activeIdx].sy = pageY
    this.recordLocations[activeIdx].lastLeft = left
    this.recordLocations[activeIdx].lastTop = top
   
    const imgL = 'imgLocations['+activeIdx+'].left'
    const imgR = 'imgLocations['+activeIdx+'].top'
    this.setData({
      [imgL]: left,
      [imgR]: top
    })
  },

  // 记录旋转初始位置 
  rotateStart(e) {
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id, true)
    const touch = e.touches[0] || e.changedTouches[0]
    this.recordLocations[activeIdx].rox = touch.pageX
  },

  rotateMove(e) {
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id )
    const touch = e.touches[0] || e.changedTouches[0]
    const pageX = touch.pageX
    const rotate = pageX - this.recordLocations[activeIdx].rox + this.recordLocations[activeIdx].r

    this.recordLocations[activeIdx].r = rotate
    this.recordLocations[activeIdx].rox = pageX
    const rotR = 'imgLocations['+activeIdx+'].rotate'
    this.setData({
      [rotR]: rotate
    })
  },

  // 缩放初始位置
  scaleStart(e) {
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id, true)
    const touch = e.touches[0] || e.changedTouches[0]
    this.recordLocations[activeIdx].scx = touch.pageX
    console.log('缩放开始', touch.pageX)
  },

  scaleMove(e) {
    const activeIdx = this.getActiveIdx( this.data.imgLocations, e.currentTarget.dataset.id )
    const touch = e.touches[0] || e.changedTouches[0]
    const pageX = touch.pageX
    const pageY = touch.pageY
    let width = pageX - this.recordLocations[activeIdx].scx + this.recordLocations[activeIdx].w

    if (width <= 25) {
      width = 25
    } else if (width >= 300) {
      width = 300
    }

    let height = width / this.recordLocations[activeIdx].per
    this.recordLocations[activeIdx].scx = pageX
    this.recordLocations[activeIdx].w = width
    this.recordLocations[activeIdx].h = height

    const imgW = 'imgLocations['+activeIdx+'].width'
    const imgH = 'imgLocations['+activeIdx+'].height'

    this.setData({
      [imgW]: width,
      [imgH]: height
    })
  },

  onPageScroll(e){
    if(e.scrollTop<0){
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
  },

  // 选择相册图片
  selectAblum() {
    const _that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success (res) {
        _that.getLocImg(res.tempFiles[0].path)
      }
    })
  },

  // 读取本地图片数据
  getLocImg(src) {
    wx.getImageInfo({
      src: src,
      success: res => {
        const locPer = res.width / res.height
        const locWidth = 50
        const locHeiht = locPer * locWidth
        this.locImgLen++

        this.selecedImg(null, locPer, locWidth, locHeiht, `locImg${this.locImgLen}`, src)
      }
    })
  },

  // 保存截图
  savaImg() {

  }
})