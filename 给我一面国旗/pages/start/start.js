//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    year: 2017,
    userInfo: {}
  },
  
  onGotUserInfo:function(e){
    var that = this;
    var userinfo = wx.getStorageSync('userinfo'); //登录过后，用户信息会缓存 
    if(!userinfo){ 
      wx.login({ 
        success: function (res) { 
          var code = res.code; 
          if (e.detail.userInfo) {
            console.log("asbhbda")
            that.getLoginApi( code, 
                              e.detail.userInfo.avatarUrl, 
                              e.detail.userInfo.nickName, 
                              e.detail.userInfo.country, 
                              e.detail.userInfo.province, 
                              e.detail.userInfo.city, 
                              e.detail.userInfo.gender, 
                              function (res) {//调用服务器端登录，获得详细用户资料，比如openid(支付用)，保存用户数据到服务器 
                                      wx.setStorageSync("userinfo",res)//本地缓存user数据 下次打开不需要登录 
                                      var app = getApp() 
                                      app.globalData.userinfo = res//在当前的app对象中缓存user数据      
                              })           
            wx.switchTab({
              url: '/pages/index/index',
            });
          }else{
            wx.switchTab({
              url: '/pages/start/start',
            });
          }         
        }, 
        fail: function (res) { 
         /* console.log("asbhbda")
          wx.switchTab({
            url: '/pages/start/start',
          });*/
        }, 
      }) 
    }else{//如果缓存中已经存在user 那就是已经登录过 
      app.globalData.userinfo = userinfo ;
    }
  },
  getLoginApi: function(code,avatar,nickname,country,province,city,gender,callback_success){
    wx.request({ 
      url: 'https://www.geekxz.com/huaquapi/member/login', 
      data: { 
        "code" : code,
        "avatar": avatar,
        "nickname": nickname,
        "country": country,
        "province": province,
        "city": city,
        "gender": gender,
        }, 
        method: 'GET', 
        success: function(info){ 
          callback_success(info); 
        },
        fail: function () {

        },
    }) 
  },
  goTeam:function(){
    wx.navigateTo({
      url: '/pages/team/team',
    })
  },
  onLoad:function(){
    var that = this;
    var userinfo = wx.getStorageSync('userinfo'); //登录过后，用户信息会缓存 
    if (userinfo) {
      wx.switchTab({
        url: '/pages/index/index',
      });   
    }
    that.setData({
      year: new Date().getFullYear()
    });
  },
  onShow:function(){
    var that = this
    // app.getUserInfo(function (userInfo_ext) {
    //   that.setData({
    //     userInfo: userInfo_ext
    //   })
    // })
  },
  onReady: function(){
    var _this = this;
    setTimeout(function(){
      _this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(_this.data.angle !== angle){
        _this.setData({
          angle: angle
        });
      }
    });
  },
});