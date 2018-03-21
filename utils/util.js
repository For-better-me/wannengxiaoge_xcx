function isPhone(num) {
  var reg = /^1[3|4|5|7|8|9]\d{9}$/;
  if (reg.test(num)) {
    return true;
  }
  else {
    return false;
  }
}

//加减公共方法；type==1表示加；type==0表示减
function count(_type, count) {
  var _count = count;
  if (_type == '1') {
    _count++;
  }
  else {
    if (_count != 1) {
      _count--;
    }
  }
  return _count;
}

// 格式个位数字
function format(num) {
  if (num < 10) {
    num = '0' + num;
  }
  return num;
}

//返回年
function returnYear(){
  const date = new Date();
  const years = [];
  for (let i = 1960; i <= date.getFullYear(); i++) {
    years.push(i)
  }
  return years
}

//返回月
function returnMonth(){
  const months = [];
  for (let i = 1; i <= 12; i++) {
    months.push(format(i))
  }
  return months;
}
const hourAll = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00', '15:30', '16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30', '20:00'];

//获取上门时间
function getComingTime() {
  var currentTime = new Date();
  var currentHour = currentTime.getHours();
  var currentMinute = currentTime.getMinutes();
  var timeCurrent = [];
  var timeAll = [
    {
      time: '08:00'
    },
    {
      time: '08:30'
    },
    {
      time: '09:00'
    },
    {
      time: '09:30'
    },
    {
      time: '10:00'
    },
    {
      time: '10:30'
    },
    {
      time: '11:00'
    },
    {
      time: '11:30'
    },
    {
      time: '12:00'
    },
    {
      time: '12:30'
    },
    {
      time: '13:00'
    },
    {
      time: '13:30'
    },
    {
      time: '14:00'
    },
    {
      time: '14:30'
    },
    {
      time: '15:00'
    },
    {
      time: '15:30'
    },
    {
      time: '16:00'
    },
    {
      time: '16:30'
    },
    {
      time: '17:00'
    },
    {
      time: '17:30'
    },
    {
      time: '18:00'
    },
    {
      time: '18:30'
    },
    {
      time: '19:00'
    },
    {
      time: '19:30'
    },
    {
      time: '20:00'
    }
  ]
  function GetDate(AddDayCount) {
    var currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + AddDayCount);//获取AddDayCount天后的日期 
    var y = currentTime.getFullYear();
    var m = currentTime.getMonth() + 1;//获取当前月份的日期 
    var d = currentTime.getDate();
    return y + "-" + format(m) + "-" + format(d);
  }

  // function format(num) {
  //   if (num < 10) {
  //     num = '0' + num;
  //   }
  //   return num;
  // }
  if (currentHour + 2 < 8) {
    timeCurrent = timeAll;
  }
  else if (currentHour + 2 < 20 && currentHour + 2 >= 8) {
    currentHour += 2;
    if (currentMinute < 30) {
      for (var i = 0; i < (20 - currentHour) * 2; i++) {
        if (i % 2 == 0) {
          timeCurrent.push( format((currentHour + i % 2 + Math.floor(i / 2))) + ':30')
        }
        else {
          timeCurrent.push( format(currentHour + i % 2 + Math.floor(i / 2)) + ':00');
        }
      }
    }
    else {
      for (var i = 1; i < (20 - currentHour) * 2; i++) {
        if (i % 2) {
          timeCurrent.push(format(currentHour + i % 2 + Math.floor(i / 2)) + ':00')
        }
        else {
          timeCurrent.push(format(currentHour + i % 2 + Math.floor(i / 2)) + ':30');
        }
      }
    }
  }

  var timeData = [[GetDate(0) + '（今天）', GetDate(1) + '（明天）', GetDate(2) + '（后天）', GetDate(3), GetDate(4), GetDate(5), GetDate(6)], timeCurrent]
  // if (!timeCurrent.length) {
  //   timeCurrent = [{
  //     'time': ''
  //   }];
  //   timeData.shift();
  // }
  return timeData;
}

// 合并对象
function merge(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {}
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop]
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }
  return target
}

// 查询字符串转对象
function queryStringToObject (queryString) {
  let a = queryString.split(/[&=]/g)
  let result = {}
  while (a.length) {
    result[a.shift()] = a.shift()
  }
  return result
}

module.exports = {
  isPhone,
  count,
  getComingTime,
  hourAll,
  returnYear,
  returnMonth,
  merge,
  queryStringToObject
}