const calc = require('../../utils/calc.js')

Page({
  data: {
    sub: '',
    num: '0'
  },
  numChangeFlag: false,
  execFlag: false,
  resultFlag: false,
  numBtn: function (e) {
    var num = e.target.dataset.val
    if (this.resultFlag) {
      this.resetBtn()
    }
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      this.execFlag = true
      this.data.num = '0'
      calc.changeNum2()
    }
    calc.setNum(this.data.num === '0' ? num : this.data.num + num)
    this.setData({
      num: calc.getNum()
    })
  },
  opBtn: function (e) {
    calc.op = e.target.dataset.val
    this.numChangeFlag = true
    if (this.execFlag) {
      this.execFlag = false
      if (this.resultFlag) {
        this.resultFlag = false
      } else {
        calc.num1 = calc.getResult()
      }
    }
    this.setData({
      sub: calc.num1 + ' ' + calc.op + ' ',
      num: calc.num1
    })
  },
  execBtn: function () {
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      this.execFlag = true
      calc.num2 = this.data.num
    }
    if (this.execFlag) {
      this.resultFlag = true
      var result = calc.getResult()
      this.setData({
        sub: calc.num1 + ' ' + calc.op + ' ' + calc.num2 + ' = ',
        num: result
      })
      calc.num1 = result
    }
  },
  resetBtn: function () {
    calc.reset()
    this.execFlag = false
    this.numChangeFlag = false
    this.resultFlag = false
    this.setData({
      sub: '',
      num: '0'
    })
  },
  dotBtn: function () {
    if (this.resultFlag) {
      this.resetBtn()
    }
    if (this.numChangeFlag) {
      this.numChangeFlag = false
      calc.setNum('0.')
    } else if (this.data.num.indexOf('.') < 0) {
      calc.setNum(this.data.num + '.')
    }
    this.setData({
      num: calc.getNum()
    })
  },
  delBtn: function () {
    if (this.resultFlag) {
      return this.resetBtn()
    }
    var num = this.data.num.substr(0, this.data.num.length - 1)
    calc.setNum(num === '' || num === '-' || num === '-0.' ? '0' : num)
    this.setData({
      num: calc.getNum()
    })
  },
  negBtn: function () {
    if (this.data.num === '0' || this.data.num === '0.') {
      return
    }
    if (this.resultFlag) {
      this.resetBtn()
    } else if (this.data.num.indexOf('-') < 0) {
      calc.setNum('-' + this.data.num)
    } else {
      calc.setNum(this.data.num.substr(1))
    }
    this.setData({
      num: calc.getNum()
    })
  }
})
