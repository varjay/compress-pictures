class lang {
  constructor (month, week) {
    this.week = week
    this.w0 = '星期日'
    this.w1 = '星期一'
    this.w2 = '星期二'
    this.w3 = '星期三'
    this.w4 = '星期四'
    this.w5 = '星期五'
    this.w6 = '星期六'
    this.yesterday = '昨天'

    this.detail = {
      full: 'yyyy年MM月dd日 HH:mm',
      week: `${this['w' + week]} HH:mm`,
      yesterday: `${this.yesterday} HH:mm`,
      today: 'HH:mm'
    }
    this.short = {
      full: 'yyyy/MM/dd',
      week: this['w' + week],
      yesterday: this.yesterday,
      today: 'HH:mm'
    }
  }
  getFormat (mode, type) {
    return this[mode][type]
  }
}
export default lang