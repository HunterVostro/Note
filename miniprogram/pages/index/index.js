// index.js
Page({
  data: {
    showTip: false,
    powerList: [

    ],
    haveCreateCollection: false,
    title: "",
    content: ""
  },
  onClickPowerInfo(e) {
    const app = getApp()
    if(!app.globalData.env) {
      wx.showModal({
        title: '提示',
        content: '请在 `miniprogram/app.js` 中正确配置 `env` 参数'
      })
      return 
    }
    console.log("click e", e)
    const index = e.currentTarget.dataset.index;
    const powerList = this.data.powerList;
    const selectedItem = powerList[index];
    console.log("selectedItem", selectedItem)
    if (selectedItem.link) {
      wx.navigateTo({
        url: `../web/index?url=${selectedItem.link}&title=${selectedItem.title}`,
      });
    } else if (selectedItem.type) {
      console.log("selectedItem", selectedItem)
      wx.navigateTo({
        url: `/pages/example/index?envId=${this.data.selectedEnv?.envId}&type=${selectedItem.type}`,
      });
    } else if (selectedItem.page) {
      wx.navigateTo({
        url: `/pages/${selectedItem.page}/index`,
      });
    } else if (
      selectedItem.title === '数据库' &&
      !this.data.haveCreateCollection
    ) {
      this.onClickDatabase(powerList,selectedItem);
    } else {
      selectedItem.showItem = !selectedItem.showItem;
      this.setData({
        powerList,
      });
    }
  },

  jumpPage(e) {
    const { type, page } = e.currentTarget.dataset;
    console.log("jump page", type, page)
    if (type) {
      wx.navigateTo({
        url: `/pages/example/index?envId=${this.data.selectedEnv?.envId}&type=${type}`,
      });
    } else {
      wx.navigateTo({
        url: `/pages/${page}/index?envId=${this.data.selectedEnv?.envId}`,
      });
    }
  },

  onClickDatabase(powerList,selectedItem) {
    wx.showLoading({
      title: '',
    });
    wx.cloud
      .callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'createCollection',
        },
      })
      .then((resp) => {
        if (resp.result.success) {
          this.setData({
            haveCreateCollection: true,
          });
        }
        selectedItem.showItem = !selectedItem.showItem;
        this.setData({
          powerList,
        });
        wx.hideLoading();
      })
      .catch((e) => {
        wx.hideLoading();
        const { errCode, errMsg } = e
        if (errMsg.includes('Environment not found')) {
          this.setData({
            showTip: true,
            title: "云开发环境未找到",
            content: "如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。"
          });
          return
        }
        if (errMsg.includes('FunctionName parameter could not be found')) {
          this.setData({
            showTip: true,
            title: "请上传云函数",
            content: "在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。"
          });
          return
        }
      });
  },
});
