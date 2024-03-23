const precision = require('./precision.js');

module.exports = {
  target: 'num1',
  num1: '0',
  num2: '0',
  op: '',

  setNum(num) {
    this[this.target] = num;
  },

  getNum() {
    return this[this.target];
  },

  changeNum2() {
    this.target = 'num2';
  },

  reset() {
    this.num1 = this.num2 = '0';
    this.target = 'num1';
    this.op = '';
  },

  getResult() {
    const { op, num1, num2 } = this;

    switch (op) {
      case '＋':
        return precision.add(num1, num2) + '';
      case '－':
        return precision.sub(num1, num2) + '';
      case '×':
        return precision.mul(num1, num2) + '';
      case '÷':
        return precision.div(num1, num2) + '';
      default:
        return '';
    }
  }
};
