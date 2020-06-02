Page({
  data: {
    picId: null, //当前图片id
  },
  onLoad (query) {
    // query = {id: 11}
    this.setData({
      picId: query.id
    });
  }
})