/*!
 * time-format v0.0.1
 * (c) 2018-2018 virjay
 * Released under the MIT License.
 */
var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var lang = function () {
  function lang(month, week) {
    classCallCheck(this, lang);

    this.m1 = 'jan';
    this.m2 = 'feb';
    this.m3 = 'mar';
    this.m4 = 'apr';
    this.m5 = 'may';
    this.m6 = 'jun';
    this.m7 = 'jul';
    this.m8 = 'aug';
    this.m9 = 'sept';
    this.m10 = 'oct';
    this.m11 = 'nov';
    this.m12 = 'dec';
    this.w0 = 'Sunday';
    this.w1 = 'Monday';
    this.w2 = 'Tuesday';
    this.w3 = 'Wednesday';
    this.w4 = 'Thursday';
    this.w5 = 'Friday';
    this.w6 = 'Saturday';
    this.yesterday = 'Yesterday';

    this.detail = {
      full: 'dd ' + this['m' + month] + ' yyyy HH:mm',
      week: this['w' + week] + ' HH:mm',
      yesterday: this.yesterday + ' HH:mm',
      today: 'HH:mm'
    };
    this.short = {
      full: 'yyyy/MM/dd',
      week: this['w' + week],
      yesterday: this.yesterday,
      today: 'HH:mm'
    };
  }

  createClass(lang, [{
    key: 'getFormat',
    value: function getFormat(mode, type) {
      return this[mode][type];
    }
  }]);
  return lang;
}();

var lang$1 = function () {
  function lang(month, week) {
    classCallCheck(this, lang);

    this.week = week;
    this.w0 = '星期日';
    this.w1 = '星期一';
    this.w2 = '星期二';
    this.w3 = '星期三';
    this.w4 = '星期四';
    this.w5 = '星期五';
    this.w6 = '星期六';
    this.yesterday = '昨天';

    this.detail = {
      full: 'yyyy年MM月dd日 HH:mm',
      week: this['w' + week] + ' HH:mm',
      yesterday: this.yesterday + ' HH:mm',
      today: 'HH:mm'
    };
    this.short = {
      full: 'yyyy/MM/dd',
      week: this['w' + week],
      yesterday: this.yesterday,
      today: 'HH:mm'
    };
  }

  createClass(lang, [{
    key: 'getFormat',
    value: function getFormat(mode, type) {
      return this[mode][type];
    }
  }]);
  return lang;
}();

var Languages = {
  en: lang,
  zhcn: lang$1
};

function getwhen(timestamp) {
  var dd = new Date();
  var now = dd.getTime();
  var todayStart = dd.getFullYear() + '/' + (dd.getMonth() + 1) + '/' + dd.getDate() + ' 00:00:00';
  todayStart = new Date(todayStart).getTime();
  var diff = now - timestamp;
  console.log(now);
  /*
   * 小于分钟、小于小时、小于一天、小于两天、小于7天
   * 60000    3600000 86400000 172800000 604800000
   **/
  if (diff < 6000) {
    return 'seconds';
  } else if (diff < 3600000) {
    return 'minutes';
  } else if (timestamp >= todayStart) {
    return 'today';
  } else if (timestamp > todayStart - 86400000) {
    return 'yesterday';
  } else if (timestamp > todayStart - 604800000) {
    return 'week';
  } else {
    return 'full';
  }
}

function TimeFormat(format, time, options) {
  var timestamp = time;
  var date;
  if (typeof time === 'string' && time.length !== 13) {
    // 日期转为时间戳
    time = time.replace(/-/g, '/');
    timestamp = new Date(time).getTime();
  }
  date = new Date(timestamp * 1);

  var year = date.getFullYear(); // 获取完整的年份(4位,1970-????)
  var month = date.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
  var day = date.getDate(); // 获取当前日(1-31)
  var week = date.getDay(); // 获取当前星期X(0-6,0代表星期天)
  var hours = date.getHours(); // 获取当前小时数(0-23)
  var minutes = date.getMinutes(); // 获取当前分钟数(0-59)
  var seconds = date.getSeconds(); // 获取当前秒数(0-59)

  var localLang = navigator.language.replace(/-/g, '').toLowerCase();
  var Lang;
  var template;
  var type = getwhen(timestamp);
  console.log(type);
  switch (localLang) {
    case 'zhcn':
      Lang = Languages.zhcn;break;
    default:
      Lang = Languages.en;
  }

  if (format === 'detail' || format === 'short' || format === 'ago') {
    var _type = void 0;
    if (type === 'seconds' || type === 'minutes') {
      _type = 'today';
    } else {
      _type = type;
    }
    var local = new Lang(month, week);
    template = local.getFormat(format, _type);
    format = template;
  }
  format = format.replace('yyyy', year);
  format = format.replace('MM', month < 10 ? '0' + month : month);
  format = format.replace('dd', day < 10 ? '0' + day : day);
  format = format.replace('HH', hours < 10 ? '0' + hours : hours);
  format = format.replace('mm', minutes < 10 ? '0' + minutes : minutes);

  format = format.replace('ss', seconds < 10 ? '0' + seconds : seconds);
  return format;
}

TimeFormat.Version = '0.0.1';

export default TimeFormat;
