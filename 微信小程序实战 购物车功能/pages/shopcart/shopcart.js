// pages/shopcart/shopcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'goodList': [
      {
        'name': '孤独是生命的礼物',
        'author': '余光中，林清玄，白先勇 等 著',
        'isbn': '9787535482051',
        'cover': '/images/cover_1.jpg',
        'desc': '缅怀乡愁诗人余光中。余光中、林清玄、白先勇联手巨献，重温经典，送别先生。总有一天，你会明白，孤独才是生命的常态。一部直击现代人孤独的精神献礼。中国散文协会推荐！',
        'press': '长江文艺出版社',
        'price': 25.9,
        'count': 1,
        'checked': false
      },
      {
        'name': '偷影子的人',
        'author': '[法] 马克·李维 著；段韵灵 译',
        'isbn': '9787540455958',
        'cover': '/images/cover_2.jpg',
        'desc': '数百万中文读者口口相传外国文学畅销经典',
        'press': ' 湖南文艺出版社',
        'price': 20.5,
        'count': 1,
        'checked': false
      },
      {
        'name': '无声告白',
        'author': '[美] 伍绮诗 著；孙璐 译',
        'isbn': '9787539982830',
        'cover': '/images/cover_3.jpg',
        'desc': '我们终此一生，就是要摆脱他人的期待，找到真正的自己。',
        'press': ' 江苏凤凰文艺出版社',
        'price': 24.1,
        'count': 1,
        'checked': false
      },
      {
        'name': '摆渡人',
        'author': '[英] 克莱儿·麦克福尔 著；付强 译',
        'isbn': '9787550013247',
        'cover': '/images/cover_4.jpg',
        'desc': '或许，命运就是一条孤独的河流，我们都会遇见灵魂的摆渡人。',
        'press': ' 百花洲文艺出版社',
        'price': 17.2,
        'count': 1,
        'checked': false
      },
      {
        'name': '追风筝的人',
        'author': '[美] 卡勒德·胡赛尼 著；李继宏 译',
        'isbn': '9787208061644',
        'cover': '/images/cover_5.jpg',
        'desc': '快乐大本营高圆圆感动推荐，奥巴马送给女儿的新年礼物。为你，千千万万遍！',
        'press': '上海人民出版社',
        'price': 17.7,
        'count': 1,
        'checked': false
      }
    ],
    'checkAll': false,
    'totalCount': 0,
    'totalPrice': 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.calculateTotal();
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

  /**
   * 计算商品总数
   */
  calculateTotal: function () {
    var goodList = this.data.goodList;
    var totalCount = 0;
    var totalPrice = 0;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      if (good.checked) {
        totalCount += good.count;
        totalPrice += good.count * good.price;
      }
    }
    totalPrice = totalPrice.toFixed(2);
    this.setData({
      'totalCount': totalCount,
      'totalPrice': totalPrice
    })
  },

  /**
   * 用户点击商品减1
   */
  subtracttap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    if (count <= 1) {
      return;
    } else {
      goodList[index].count--;
      this.setData({
        'goodList': goodList
      });
      this.calculateTotal();
    }
  },

  /**
   * 用户点击商品加1
   */
  addtap: function (e) {
    var index = e.target.dataset.index;
    var goodList = this.data.goodList;
    var count = goodList[index].count;
    goodList[index].count++;
    this.setData({
      'goodList': goodList
    });
    this.calculateTotal();
  },
  /**
   * 用户选择购物车商品
   */
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var checkboxItems = this.data.goodList;
    var values = e.detail.value;
    for (var i = 0; i < checkboxItems.length; ++i) {
      checkboxItems[i].checked = false;
      for (var j = 0; j < values.length; ++j) {
        if (checkboxItems[i].isbn == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }

    var checkAll = false;
    if (checkboxItems.length == values.length) {
      checkAll = true;
    }

    this.setData({
      'goodList': checkboxItems,
      'checkAll': checkAll
    });
    this.calculateTotal();
  },

  /**
   * 用户点击全选
   */
  selectalltap: function (e) {
    console.log('用户点击全选，携带value值为：', e.detail.value);
    var value = e.detail.value;
    var checkAll = false;
    if (value && value[0]) {
      checkAll = true;
    }

    var goodList = this.data.goodList;
    for (var i = 0; i < goodList.length; i++) {
      var good = goodList[i];
      good['checked'] = checkAll;
    }

    this.setData({
      'checkAll': checkAll,
      'goodList': goodList
    });
    this.calculateTotal();
  }


})