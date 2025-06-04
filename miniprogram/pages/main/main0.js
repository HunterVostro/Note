// pages/main/main0.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 0, // 默认显示第一页
    bgColor: "#ffffff", // 初始背景色（白色）
    colors: ["#ff9999", "#99ff99", "#9999ff", "#ffff99", "#ff99ff"], // 颜色数组
    currentIndex: 0,
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.startColorChange();
  },

  startColorChange() {
    setInterval(() => {
      const nextIndex = (this.data.currentIndex + 1) % this.data.colors.length;
      this.setData({
        bgColor: this.data.colors[nextIndex],
        currentIndex: nextIndex,
      });
    }, 2000); // 每2秒切换一次
  },

  onSwiperChange(e) {
    const { current } = e.detail;
    if (current === 1) { // 右滑到第二页
      wx.navigateTo({
        url: '/pages/main/main', // 跳转到目标页
      });
      this.setData({ currentPage: 0 });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    clearInterval(this.timer); // 页面卸载时清除定时器
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})