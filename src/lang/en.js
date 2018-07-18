class lang {
  constructor (month, week) {
    this.m1 = 'jan'
    this.m2 = 'feb'
    this.m3 = 'mar'
    this.m4 = 'apr'
    this.m5 = 'may'
    this.m6 = 'jun'
    this.m7 = 'jul'
    this.m8 = 'aug'
    this.m9 = 'sept'
    this.m10 = 'oct'
    this.m11 = 'nov'
    this.m12 = 'dec'
    this.w0 = 'Sunday'
    this.w1 = 'Monday'
    this.w2 = 'Tuesday'
    this.w3 = 'Wednesday'
    this.w4 = 'Thursday'
    this.w5 = 'Friday'
    this.w6 = 'Saturday'
    this.yesterday = 'Yesterday'

    this.detail = {
      full: `dd ${this['m' + month]} yyyy HH:mm`,
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