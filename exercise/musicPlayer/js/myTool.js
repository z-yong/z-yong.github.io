// 兼容可知窗口方法
function getVieport() {
  if (window.innerHeight) {
    return {
      x: window.innerWidth,
      y: window.innerHeight
    }
  } else {
    if (document.compatMode == "BackCompat") {
      return {
        x: document.body.clientWidth,
        y: document.body.clientHeight
      }
    } else {
      return {
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientHeight
      }
    }
  }
}

// 兼容查询计算样式的方法
function getStyle(element, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null)[prop];
  } else {
    return element.currenStyle[prop];
  }
}

// 封装一个函数 实现调用时，返回元素距离最近的dom或者是距离body的实际坐标
function getElementPosition(elem) {
  var body = document.getElementsByTagName("body")[0];
  var coord = {
    x: elem.offsetLeft,
    y: elem.offsetTop
  }
  if (elem.offsetParent == body) {
    coord.x = elem.offsetLeft,
      coord.y = elem.offsetTop

  } else {
    coord.x += getElementPosition(elem.offsetParent).x;
    coord.y += getElementPosition(elem.offsetParent).y;

  }
  return coord;
}

// 返回一个计算样式的元素属性绝对值（单位统一px）
function getStyle(elem, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(elem, null)[prop];
  } else {
    return elem.currentStyle[prop];
  }
}

// 让浏览器停留n秒
function stop(n) {
  var nowTime = Date.now();
  var endTime = nowTime + n;
  while (nowTime < endTime) {
    nowTime = Date.now(); //每次循环对nowTime重新赋值 直到nowTime等于endTime 
  }
}
// 封装一个与inserBefore相反 将子元素插入到指定元素的后面
Element.prototype.inserAfter = function (target, assign) {
  var afterNode = assign.nextElementSibling; //获取指定标签的下一个兄弟标签
  if (afterNode == null) {
    this.appendChild(target); //如果没有下一个兄弟标签 则直接添加 此方法会将标签自动添加到最后一位
  } else {
    this.insertBefore(target, afterNode)
  }
  return target;
}

// 自定义获取全数据类型
function type(target) {
  var ret = typeof (target);
  var str = Object.prototype.toString;

  if (target === null) {
    return "null";
  }
  if (ret == "object") {
    if (str.call(target) == "[object Object]") { //当引用类型为自定义时
      return "[Object" + target.constructor.name + "]"; //返回自身的构造函数
    }
    return str.call(target); //直接return也可
  }
  return ret; //当实参是原始类型时
}
// 浮点数减法精度丢失问题
function accSub(num1, num2) {
  var r1, r2, m;
  try {
    r1 = num1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = num2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return (Math.round(num1 * m - num2 * m) / m).toFixed(n);
}