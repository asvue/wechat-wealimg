// pages/moviecp/movie.js
var api = getApp().globalData.api

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    typenem:{
      type:String,
      value:""
    }


  },

  /**
   * 组件的初始数据
   */
  data: {
    start:0,
    count:10,
    result:[],


  },

  /**
   * 组件的方法列表
   */
  methods: {
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
            result: that.data.result.concat(res.data.subjects) 
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
    clickdetail:function(e){
      if (e.currentTarget.dataset.id != null)
        wx.navigateTo({
          url: `../moviedetail/moviedetail?id=${e.currentTarget.dataset.id}`
        });
    },

    clickload: function (url) {
      var apiname = api + this.properties.typenem;
      var start = this.data.start+10;
      this.setData({
        'start': start
      })
      this.getMovieListData(apiname);
  
    }
  
  },

  // 组件生命周期函数，在组件实例进入页面节点树时执行

  attached:function(){
    var apiname = api + this.properties.typenem;
    // console.log(apiname)
    // // var in_theatersUrl = api + "/movie/in_theaters/" + wx.getStorageSync("ip") + "/0/10";
    // // var coming_soonUrl = api + "/movie/coming_soon/0/10";
    // // var top250Url = api + "/movie/top250/0/10";
    this.getMovieListData(apiname);
   
  },


 
})
