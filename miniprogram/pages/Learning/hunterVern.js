// pages/Learning/hunterVern.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
            longitude: 116.397428,  // 初始经度 - 天安门
            latitude: 39.90923,     // 初始纬度 - 天安门
            myLongitude: 0,         // 我的位置经度
            myLatitude: 0,          // 我的位置纬度
            centerLongitude: 0,     // 中心点经度
            centerLatitude: 0,      // 中心点纬度
            markers: [{
                    id: 1,
                    longitude: 116.397428,
                    latitude: 39.90923,
                    iconPath: '/images/marker.png',
                    width: 30,
                    height: 30,
                    title: '天安门广场'
            }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
    onLoad(options) {
        // 页面加载时获取当前位置
        this.getMyLocation();
  },

    // 获取我的当前位置
    getMyLocation() {
        wx.getLocation({
          type: 'wgs84',
          altitude: true,
          success: (res) => {
            this.setData({
              myLongitude: res.longitude,
              myLatitude: res.latitude
            });
          },
          fail: (err) => {
            console.error('获取位置失败:', err);
            wx.showToast({
              title: '获取位置失败',
              icon: 'none'
            });
          }
        });
    },

    // 移动到我的位置
    moveToMyLocation() {
        if (!this.data.myLongitude || !this.data.myLatitude) {
        wx.showToast({
            title: '请先获取位置',
            icon: 'none'
        });
        return;
        }

        // 创建地图上下文
        const mapCtx = wx.createMapContext('myMap');
    
        // 移动地图到当前位置
        mapCtx.moveToLocation({
        longitude: this.data.myLongitude,
        latitude: this.data.myLatitude,
        success: () => {
            console.log('移动成功');
            this.setData({
            longitude: this.data.myLongitude,
            latitude: this.data.myLatitude
            });
        },
        fail: (err) => {
            console.error('移动失败:', err);
        }
    });
  },

    // 获取地图中心点坐标
    getCenterLocation() {
        const mapCtx = wx.createMapContext('myMap');
        
        mapCtx.getCenterLocation({
          success: (res) => {
            console.log('中心点坐标:', res.longitude, res.latitude);
            this.setData({
              centerLongitude: res.longitude.toFixed(6),
              centerLatitude: res.latitude.toFixed(6)
            });
          },
          fail: (err) => {
            console.error('获取中心点失败:', err);
          }
        });
    },

    // 地图区域变化事件
    onRegionChange(e) {
        console.log('地图区域变化:', e);
    },

    // 地图点击事件
    onMapTap(e) {
        console.log('地图点击坐标:', e.detail.longitude, e.detail.latitude);
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