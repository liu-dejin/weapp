function formatTime(time) {
  var min = Math.floor(time / 60) % 60;
  var sec = Math.floor(time) % 60;
  //补0
  return (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
}

Page({
  data: {
    item: 0,
    tab: 0,
    playlist: [{
      id: 1,
      title: '祝你生日快乐',
      singer: '小丽',
      src: 'http://127.0.0.1:3000/1.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 2,
      title: '劳动最光荣',
      singer: '小朋',
      src: 'http://127.0.0.1:3000/2.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 3,
      title: '龙的传人',
      singer: '小华',
      src: 'http://127.0.0.1:3000/3.mp3',
      coverImgUrl: '/images/cover.jpg'
    }, {
      id: 4,
      title: '小星星',
      singer: '小红',
      src: 'http://127.0.0.1:3000/4.mp3',
      coverImgUrl: '/images/cover.jpg'
    }],
    state: 'running',
    playIndex: 0,
    play: {
      currentTime: '00:00',
      duration: '00:00',
      percent: 0,
      title: '',
      singer: '',
      coverImgUrl: '/images/cover.jpg',
    }
  },
  audioBam: null,
  sliderChangeLock: false,
  onReady: function () {
    this.audioBam = wx.getBackgroundAudioManager();
    this.setMusic(0);
    this.audioBam.onError(() => {
      console.log('播放失败：' + this.audioBam.src);
    });
    this.audioBam.onEnded(() => {
      this.next();
    });
    var updateTime = 0;
    this.audioBam.onTimeUpdate(() => {
      var currentTime = parseInt(this.audioBam.currentTime);
      if (!this.sliderChangeLock && currentTime !== updateTime) {
        updateTime = currentTime;
        this.setData({
          'play.duration': formatTime(this.audioBam.duration || 0),
          'play.currentTime': formatTime(currentTime),
          'play.percent': currentTime / this.audioBam.duration * 100
        });
      }
    });
  },
  sliderChange: function (e) {
    var second = e.detail.value * this.audioBam.duration / 100;
    this.audioBam.seek(second);
    setTimeout(() => {
      this.sliderChangeLock = false;
    }, 1000);
  },
  sliderChanging: function (e) {
    var second = e.detail.value * this.audioBam.duration / 100;
    this.sliderChangeLock = true;
    this.setData({
      'play.currentTime': formatTime(second),
    });
  },
  setMusic: function (index) {
    var music = this.data.playlist[index];
    this.audioBam.src = music.src;
    this.audioBam.title = music.title;
    this.setData({
      playIndex: index,
      'play.title': music.title,
      'play.singer': music.singer,
      'play.coverImgUrl': music.coverImgUrl,
      'play.currentTime': '00:00',
      'play.duration': '00:00',
      'play.percent': 0,
      state: 'running'
    });
  },
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    });
  },
  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    });
  },
  play: function () {
    this.audioBam.play();
    this.setData({
      state: 'running'
    });
    console.log(this.data.state); // running
  },
  pause: function () {
    this.audioBam.pause();
    this.setData({
      state: 'paused'
    });
    console.log(this.data.state); // paused
  },
  next: function () {
    var index = this.data.playIndex >= this.data.playlist.length - 1 ? 0 : this.data.playIndex + 1;
    this.setMusic(index);
    console.log(this.data.state);
  },
  change: function (e) {
    this.setMusic(e.currentTarget.dataset.index);
  }
});