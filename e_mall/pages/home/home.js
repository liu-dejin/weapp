// index.js

Page({
  data: {
    indicatorDots: true,  // 是否显示面板指示点
    autoplay: true,      // 是否自动切换
    interval: 5000,      // 自动切换时间间隔
    duration: 1000,      // 滑动动画时长
    imageUrls: [
      '/home-images/banner.jpg',
      '/home-images/banner.jpg',
      '/home-images/banner.jpg',
    ],
    recommendItems: [
      { image: '/home-images/item1.webp', name: '商品1', price: '￥1999' },
      { image: '/home-images/item1.webp', name: '商品2', price: '￥1999' },
      { image: '/home-images/item1.webp', name: '商品3', price: '￥1999' },
      // 添加更多商品
    ],
  },
  goodsDetail(){
    wx.navigateTo({
      url: '/pages/goodsDetail/goodsDetail',
    });
  }
});
