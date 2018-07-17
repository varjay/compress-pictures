/*!
 * time-format v0.0.1
 * (c) 2018-2018 virjay
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.BScroll = factory());
}(this, (function () { 'use strict';

var en = {
  m1: 'jan',
  m2: 'feb',
  m3: 'mar',
  m4: 'apr',
  m5: 'may',
  m6: 'jun',
  m7: 'jul',
  m8: 'aug',
  m9: 'sept',
  m10: 'oct',
  m11: 'nov',
  m12: 'dec',
  w0: 'Sunday',
  w1: 'Monday',
  w2: 'Tuesday',
  w3: 'Wednesday',
  w4: 'Thursday',
  w5: 'Friday',
  w6: 'Saturday',
  yesterday: 'Yesterday'
};

var zhcn = {
  w0: '星期日',
  w1: '星期一',
  w2: '星期二',
  w3: '星期三',
  w4: '星期四',
  w5: '星期五',
  w6: '星期六',
  yesterday: '昨天'
};

var Languages = {
  en: en,
  zhcn: zhcn
};

function getwhen(timestamp) {
  var now = new Date().getTime();
  var diff = now - timestamp;
  /*
   * 小于分钟、小于小时、小于一天、小于两天、小于7天
   * 60000    3600000 86400000 172800000 604800000
   **/
  if (diff < 6000) {
    return 'seconds';
  } else if (diff < 3600000) {
    return 'minutes';
  } else if (diff < 86400000) {
    return 'today';
  } else if (diff < 172800000) {
    return 'yesterday';
  } else if (diff < 604800000) {
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
  console.log(year, month, day, week, hours, minutes, seconds);

  var lang = navigator.language.replace(/-/g, '').toLowerCase();
  var t;
  var template;
  var type = getwhen(timestamp);

  switch (lang) {
    case 'zhcn':
      t = Languages.zhcn;
      template = {
        full: 'yyyy年MM月dd日 HH:mm',
        week: t['w' + week] + ' HH:mm',
        yesterday: t['yesterday'] + ' HH:mm',
        today: 'HH:mm',
        minutes: 'HH:mm',
        seconds: 'HH:mm'
      };
      template = template[type];
      break;

    default:
      t = Languages.en;
      template = {
        full: 'dd ' + t['m' + month] + ' yyyy HH:mm',
        week: t['w' + week] + ' HH:mm',
        yesterday: t['yesterday'] + ' HH:mm',
        today: 'HH:mm',
        minutes: 'HH:mm',
        seconds: 'HH:mm'
      };
      template = template[type];
  }

  if (format === 'default') {
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

return TimeFormat;

})));
