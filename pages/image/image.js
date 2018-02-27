Page({
    data: {
        url: "",
        hidden: false,
        toastHidden: true,
        modalHidden: true,
        toastText: "数据异常",
        loadingText: "加载中..."
    },

    onLoad: function (options) {
        that = this;
        if (options == null || options.url == null) {
            this.setData({ hidden: true, toastHidden: false });
            return;
        }

        this.setData({
            hidden: true,
            toastHidden: true,
            url: options.url
        })
    },
    //Toast信息改变
    onToastChanged: function (event) {
        this.setData({ toastHidden: true });
    },
    // 长按
    onlongclick: function () {
        this.setData({ modalHidden: false });
    },
    // 保存
    onSaveClick: function (event) {
        var mUrl = "";
        if (event.currentTarget.dataset.url != null)
            mUrl = event.currentTarget.dataset.url;
        console.log("download：" + mUrl);
        saveImage(mUrl);
    },
    // 取消
    onCancelClick: function (event) {
        this.setData({ modalHidden: true });
    },
});

var that;
/**
 * 保存图片
 */

//此处有坑,wx.downloadFile只是下载网络文件保存到临时目录根本找不到,只有用wx.saveImageToPhotosAlbum才能保存到相册
function saveImage(mUrl) {
    that.setData({
        hidden: false,
        toastHidden: true,
        modalHidden: true,
        loadingText: "下载中..."
    });
    wx.downloadFile({
        url: mUrl,
        type: 'image',
        success: function (res) {
            console.log("download success");
            that.setData({
                hidden: true,
                toastHidden: false,
                toastText: "恭喜你，图片保存成功"
            });

            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function (res) {
                console.log(res)
              },
              fail: function (res) {
                console.log(res)
                console.log('fail')
              }
            })  


        },
        fail: function (res) {
            console.log("download fail");
            that.setData({
                hidden: true,
                toastHidden: false,
                toastText: "保存失败，请稍后再试"
            });
        },
        complete: function (res) {
            console.log("download complete");
        }
    })
}