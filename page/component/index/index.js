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
      pics: [{
        name: '图片1',
        id: '1',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片3',
        id: '2',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      }]
    },{
      id: 'scenery',
      pics: [{
        name: '图片3',
        id: '3',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片4',
        id: '4',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      }]
    },{
      id: 'cute',
      pics: [{
        name: '图片5',
        id: '5',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片6',
        id: '6',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      }]
    },{
      id: 'other',
      pics: [{
        name: '图片7',
        id: '7',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片8',
        id: '8',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片9',
        id: '9',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      },{
        name: '图片10',
        id: '10',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591079429674&di=5efb5d9b549a255d5a1ad917f30f0cb1&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D3487593103%2C392217105%26fm%3D214%26gp%3D0.jpg'
      }]
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