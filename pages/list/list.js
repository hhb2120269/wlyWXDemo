//logs.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    tempFilePaths: '',
    text:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
   

    
    // wx.showNavigationBarLoading()
    // setTimeout(function () {
    //   wx.hideLoading()
      // wx.hideNavigationBarLoading()
    // }, 2000)
    this.setData({
      // list:(wx.get)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  chooseimage: function () {
    var _this = this;
    wx.chooseImage({
      count: 1, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          tempFilePaths: res.tempFilePaths
        })

        /** 上传方案1 **/
        // var image = _this.readImage(res.tempFilePaths);
        // _this.http_uploadImage_base64(util.image_base64(),function(res){
        //   console.log(res.data);
        //   // readImage()
        // })
        /** 上传方案2 **/
        _this.http_uploadImage(res.tempFilePaths[0],function(res){
          console.log(res.data)
        })
        /****test */
        // var tempFilePaths = res.tempFilePaths
        // wx.uploadFile({
        //   url: 'http://127.0.0.1:8081/', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     console.log(res)
        //     console.log(res.data)
        //     //do something
        //   }
        // })

      }
    })
  },
  /**
   * 官方方案1
   */
  http_uploadImage: function ( filePath){
    var that = this;
    wx.uploadFile({
      url: "http://127.0.0.1:8081/file-upload-image",
      filePath: filePath,
      name: 'uploadFile',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      formData: { 'shopId': wx.getStorageSync('shopId') }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        console.log(res)
        // wx.showToast({
        //   title: "图片修改成功",
        //   icon: 'success',
        //   duration: 700
        // })
      },
      fail: function (res) {
        // wx.showToast({
        //   title: "上传错误，请重试",
        //   icon: 'error',
        //   duration: 700
        // })
      }
    })
  },
  /**
   * 上传文件 image base64
   */
  http_uploadImage_base64:function(img_base64,callback){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://api.gzrailway.net/gtslweb' + '/web/upload',
      method: 'POST',
      data: {
        file1: img_base64,
        fileSuffix1: "jpg"
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.hideLoading()
        callback(res);
      }
    })
  },

/**
 * 这里要读取image文件，转译成base64，上传服务器
 */
  readImage:function(paht){
    var img_base64 = null;
    
    //todo:...

    return img_base64;
  }

})