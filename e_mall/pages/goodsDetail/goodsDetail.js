// pages/goodsDetail/goodsDetail.js
// goodsDetail.js
Page({
  data: {
    goodsImage: '/home-images/item1.webp',
    goodsName: 'Redmi k70系列',
    goodsPrice: '￥2499',
    // 其他商品详细信息
  },
  buyNow() {
    // 处理立即购买逻辑，可以跳转到订单确认页面等
    wx.navigateTo({
      url: '/pages/orderConfirm/orderConfirm',
    });
  },
});
