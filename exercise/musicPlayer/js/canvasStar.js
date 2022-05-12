class StarrySky {
  constructor() {
    this.star = document.getElementById('starCanvas')
    this.star.width = document.documentElement.clientWidth
    this.star.height = document.documentElement.clientHeight
    this.starNum = 800 // 星星数
    this.star.style.display = 'block' // 显示canva画布
    this.ctx = this.star.getContext('2d')
    this.intervalList = [] // 计时器list
    for (let i = 0; i < this.starNum; i++) {
      this.createStar(this.initStar(i), i) // 生成星星
    }
  }
  createStar(params, i) {
    this.ctx.fillStyle = 'rgb(' + params.r + ',' + params.g + ',' + params.b + ',' + params.o + ')' // 星星颜色
    this.ctx.beginPath() // 重置当前的路径
    this.ctx.arc(params.startX, params.startY, params.size, 0, 2 * Math.PI) // 画一个圆
    this.ctx.fill() // 画实心圆
    this.ctx.closePath() // 结束当前路径
    this.intervalList[i] = requestAnimationFrame(() => {
      let x = numSub(params.startX, params.size) - 1
      let y = numSub(params.startY, params.size) - 1
      this.ctx.clearRect(x, y, params.size * 2 + 2, params.size * 2 + 2) // 清除上一次星星(2px误差)
      params.startY = numAdd(params.startY, params.speedY)
      params.x = numAdd(params.x, params.speedX)
      params.startX = numAdd(params.startX, params.x)
      if (params.x > params.rangeX) params.speedX = -Math.abs(params.speedX)
      if (params.x < -params.rangeX) params.speedX = Math.abs(params.speedX)
      if (params.startY > this.star.height) {
        params = this.initStar(i, false) // 到底部重新初始化
      }
      this.createStar(params, i) // 再次画星星
    })
  }
  initStar(i, isInit = true) {
    let startX = Math.floor(Math.random() * document.documentElement.clientWidth)
    let startY = isInit ? Math.floor(Math.random() * document.documentElement.clientHeight) : 0
    const r = Math.random() * 256
    const g = Math.random() * 256
    const b = Math.random() * 256
    const o = 0.7 + Math.random() * 3
    const size = Math.floor(Math.random() * 3)
    const rangeX = Math.floor(Math.random() * 5)
    const speedX = Math.floor(Math.random() * 2)
    return {
      startX, // 初始横坐标
      startY, // 初始纵坐标
      x: 0, // 横向移动距离
      r, // 颜色r
      g, // 颜色g
      b, // 颜色b
      o, // 透明度
      size, // 星星半径
      rangeX: i % 13 == 0 ? 0 : rangeX, // 星星横向移动区间
      speedX, // 星星横向移动速度
      speedY: i % 27 == 0 ? 8 : 1 + Math.floor(Math.random() * 2) // 星星纵向移动区间
    }
  }
  // 清除画布并清除定时器
  closeStarrySky() {
    this.star.style.display = 'none'
    this.intervalList.forEach(item => window.cancelAnimationFrame(item))
  }
}

// 浮点数加法精度丢失问题
function numAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 浮点数减法精度丢失问题
function numSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2
  return ((arg1 * m - arg2 * m) / m) // .toFixed(n);
}

// 浮点数除法精度丢失问题 
function accMul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {}
  try {
    m += s2.split(".")[1].length
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

// 浮点数除法精度丢失问题
function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1, r2;
  try {
    t1 = arg1.toString().split(".")[1].length
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length
  } catch (e) {}
  with(Math) {
    r1 = Number(arg1.toString().replace(".", ""))
    r2 = Number(arg2.toString().replace(".", ""))
    return accMul((r1 / r2), pow(10, t2 - t1));
  }
}