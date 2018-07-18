// pages/check.js
const app = getApp();
const api = require('../../utils/api.js');
var picker = require('../../utils/picker_datetime.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    sexType: [
      { name: '男', value: 0, checked: 'true' },
      { name: '女', value: 1 },
    ],
    pictures: [],
    showPictures: false,
    showAddPicture: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.setData({
    //   openId: app.globalData.userInfo.openId,
    //   pid: app.globalData.userInfo.pid,
    // })
    this.datetimePicker = new picker.pickerDatetime({
      page: this,
      animation: 'slide',
      duration: 500
    });
    this.reader = new FileReader();
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

  //比赛一时间
  clickTime(event) {
    this.datetimePicker.setPicker('clickTime');
  },

  //添加图片
  addpicture(event) {
    const that = this;
    let count = 4 - that.data.pictures.length;
    wx.chooseImage({
      count: count, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        console.log(res);
        let temps = that.data.pictures.concat(res.tempFilePaths);
        let showAddPicture = true;
        if (temps.length >= 4) {
          showAddPicture = false;
        };
        that.setData({
          pictures: temps,
          showAddPicture: showAddPicture,
        })
      },

    })
  },//删除图片
  deletePicture(event) {
    const that = this;
    const id = event.currentTarget.dataset.id;
    let temps = that.data.pictures;
    temps.splice(id, 1);
    let showAddPicture = true;
    if (temps.length >= 4) {
      showAddPicture = false;
    };
    that.setData({
      pictures: temps,
      showAddPicture: showAddPicture
    })
  },

  /**
   *                      String imgStr = Util.getInstance().Bitmap2StrByBase64(selectBitmap);
                          Map<String, Object> dataMap = new HashMap<String, Object>();
                          dataMap.put("file1", imgStr);
                          dataMap.put("fileSuffix1", "jpg");
                          dataMap.put("type1", "驾驶证");
                          dataMap.put("createBy", MaStation.getInstance().getUser().getId());
                          String dataStr = JSON.toJSONString(dataMap);
                          ResponseObject result = MyHttpUtils.postRequest(HttpRequest.URL_INTRANET + "web/upload", dataStr);
  
   */
  uploadPic(pictures) {
    
    this.reader.onload = function (e) {
      var arrayBuffer = reader.result;
      var base64 = wx.arrayBufferToBase64(arrayBuffer);
    };
    reader.readAsArrayBuffer(new Blob(this.data.imageList));
    api.upload({
      filePath: pictures[index],
      name: 'picture',
      success(res) {

        if (index < (pictures.length - 1)) {
          datas.picture += res + ',';
          that.uploadPic(datas, pictures, ++index);
        } else {
          datas.picture += res;
          that.addArt(datas);
        }
      },
      fail() {
        that.addArt(datas);
      },
    })
  },

  submit: function (even) {
    wx.showToast({
      title: '上传数据...',
      icon: 'loading',
      duration: 6000,
    })
    if (that.data.pictures.length == 0) {
      that.addArt(datas);
    } else {
      that.uploadPic(that.data.pictures);
    }
  }

})