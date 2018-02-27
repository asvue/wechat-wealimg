const { Tab, extend } = require('../dist/index');


Page(extend({}, Tab, {
  data: {
    tab1: {
      list: [ {
          id: 'in_theaters',
        title: '正在热映'
      }, {
        id: 'top',
        title: 'Top250'
      }, {
          id: 'coming_soon',
        title: '即将热映'
      }],
      selectedId: 'in_theaters'
    },
    ip: wx.getStorageSync("ip")
   
  },

  onLoad: function (options) {
    
 

  }, 
  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: `${url}/${that.data.start}/${that.data.count}`,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/xml"
      }, // 设置请求的 header
      success: function (res) {
        that.setData({
          result: res.data.subjects
        })
        wx.setStorageSync('result', res.data.subjects)

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
    // var data = wx.getStorageSync('result')
    // that.setData({
    //   result: data
    // })
  },



  handleZanTabChange(e) {
    var componentId = e.componentId;
    var selectedId = e.selectedId;
    console.log(e);
    this.setData({
      [`${componentId}.selectedId`]: selectedId
    });
  },

  // 上拉触动刷新
  onReachBottom: function () {
    var myEventDetail = {} // detail对象，提供给事件监听函数
    var myEventOption = {} // 触发事件的选项
    this.triggerEvent('getMovieListData', myEventDetail, myEventOption)
  }

}));
