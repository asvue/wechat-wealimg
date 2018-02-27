// wealimg
// /wealimg/0 / 10
var api = getApp().globalData.api
var util = require("../../utils/util.js");


Page( {
  data: {
    start:0,
    count:10,
     result:[]

  },

  onLoad: function (options) {
    var apiname = api+'/wealimg';
      this.getMovieListData(apiname);


  },
  getMovieListData: function (url) {
    var that = this;
    wx.request({
      url: `${url}/${that.data.start}/${that.data.count}`,
      method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "Content-Type": "application/json"
      }, // 设置请求的 header
      success: function (res) {

        that.setData({
          'result': that.data.result.concat(res.data.param)
        })
        // wx.setStorageSync('datas', res.data.param);
        //  that.setData({
        //    result: wx.getStorageSync('datas')
        // })

      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  // 上拉触底
  onReachBottom:function(){
    var apiname = api + '/wealimg';
    this.setData({
    "start":this.data.start+10
    })
    this.getMovieListData(apiname);
  },
  onItemClick: function (event) {
    if (event.target.dataset.url != null)
    wx.navigateTo({
      url: `../image/image?url=${event.target.dataset.url}`
    });
  },
  imgerr:function(event){
    var result = this.data.result;
    console.log(this.data.result)
    result.splice(event.target.dataset.id,1)
    this.setData({
      'result': result
    })
  
  },
  time:function(data){
    console.log(util.formatTime(new Date))
    console.log(util.formatTime(data))

    return util.formatTime(data);
     
  }

});
