import { allCountries as a, exceptedCountries, country_rename } from "./storage.js";

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const map = L.map('map', {
  center: [0, 0],
  zoom: 2,
  zoomControl: true,
  scrollWheelZoom: true,
  doubleClickZoom: false,  // 禁用双击缩放，避免与点击国家冲突
  boxZoom: false,          // 禁用框选缩放
  keyboard: false,         // 禁用键盘控制
  dragging: true,          // 允许拖动
  tap: false               // 禁用触摸拖动
});

const allCountries = a;

function pickRandomCountry() {
    const countriesArray = Array.from(allCountries);
    const result = countriesArray[Math.floor(Math.random() * countriesArray.length)];
    if (exceptedCountries.has(result)) {
        return pickRandomCountry();
    }
    return result;
}

class CountdownTimer {
    constructor() {
        this.totalSeconds = 0;          // 总秒数
        this.currentTimeRemain = 0;     // 剩余秒数
        this.currentTimePassed = 0;     // 已经过秒数

        this._startTimestamp = null;    // 记录开始时间戳
        this._paused = true;            // 是否暂停
        this._timerId = null;           // interval ID
        this.updateCallback = null;     // 回调函数，用于更新显示
    }

    start(seconds) {
        // 如果传入了新的秒数，则重新开始
        if (typeof seconds === "number") {
            this.totalSeconds = seconds;
            this.currentTimeRemain = seconds;
            this.currentTimePassed = 0;
        }

        if (this.currentTimeRemain <= 0) return;

        this._paused = false;
        this._startTimestamp = Date.now();

        this._run();
    }

    _run() {
        if (this._timerId) clearInterval(this._timerId);

        this._timerId = setInterval(() => {
            if (this._paused) return;

            const elapsed = Math.floor((Date.now() - this._startTimestamp) / 1000);
            this.currentTimePassed = elapsed;
            this.currentTimeRemain = Math.max(this.totalSeconds - elapsed, 0);

            if (this.updateCallback) this.updateCallback(this.currentTimeRemain);

            if (this.currentTimeRemain <= 0) {
                this.end();
            }
        }, 200); // 200ms 刷新一次，足够流畅
    }

    pause() {
        if (this._paused) return;

        this._paused = true;

        // 更新当前状态
        const elapsed = Math.floor((Date.now() - this._startTimestamp) / 1000);
        this.currentTimePassed += elapsed;
        this.currentTimeRemain = Math.max(this.totalSeconds - this.currentTimePassed, 0);

        clearInterval(this._timerId);
        this._timerId = null;
    }

    end() {
        this._paused = true;
        this.currentTimeRemain = 0;
        this.currentTimePassed = this.totalSeconds;

        if (this.updateCallback) this.updateCallback(0);

        clearInterval(this._timerId);
        this._timerId = null;
    }
}

const timer = new CountdownTimer();
window.timer = timer;

// 添加地图底图（开放街道地图）
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; OpenStreetMap contributors',
//     noWrap: true,  // 防止地图瓦片重复
//     bounds: [[-90, -180], [90, 180]]  // 限制地图边界
// }).addTo(map);

// ===== 全局变量 =====
const selectedCountries = new Set();    // 记录已选中的国家
const countryLayers = new Map();        // 存储所有国家的地图图层
const countryColors = new Map();        // 追踪每个国家当前应有的颜色
let isColoringEnabled = true;           // 着色功能开关
let isDragging = false;                 // 标记是否正在拖动地图
const timerDisplay = document.getElementById('timer-display'); // 计时器显示元素
const secondary_title = document.getElementById('secondary_title'); // 次要标题元素
let game = {
  mode: '',
  hearts: 0,
  correct_click: 0,
  total_questions: 0,
  answer_finished_count: 0,
  gameStarted: false,
  correct_answer: '',
  correct_answer_count: 0,


  update_secondary_title: function() {
    secondary_title.innerHTML = `Correct: ${this.answer_finished_count - 1} | Wrong: ${this.hearts} | Accuracy: ${solve_accuracy(cauculate_accuracy(this.answer_finished_count - 1, this.answer_finished_count - 1 + this.hearts))}`;
  },
  nextSetp: function() {
    // console.log('进入下一步: ', this);
    toggleColoringAbilityTo(true); // 启用着色功能，允许用户点击国家
    const mode = this.mode;
    const click_text = document.getElementById('click_text');

    removeAllColors();

    switch (mode) {
      case 'click':
        const randomCountry = pickRandomCountry();
        
        click_text.textContent = solve_display_countryname(randomCountry);
        this.answer_finished_count++;
        
        this.correct_answer = randomCountry;
        this.update_secondary_title();
        break;
      case 'typ':

        break;
      default:
        console.error('未知的游戏模式：', mode);
    }
  },
  checkAnswer: function(countryName) {
    if (countryName === this.correct_answer) {
      notice('correct!', 0);
      this.correct_answer_count++;
      // this.correct_click++;

      // setTimeout(() => {
      //   this.nextSetp();
      // }, 1000);  
      this.update_secondary_title();
      return true;
    } else {
      notice('wrong answer!', 2);
      this.hearts++;
      // if (this.hearts > 3 * this.correct_click) {
      //   notice('game over! your incorrect click is already 3 times of your correct click', 2);
      //   this.end();
      // }
      this.update_secondary_title();
      return false;
    }
  },

  start: function() {
    const mode = document.getElementById('mode');
    const isTimer = document.getElementById('timer');
    const timerSetting = document.getElementById('timer_setting');
    const total_question = document.getElementById('question_count');

    const timerSetV = parseInt(timerSetting.value);
    
    if (isTimer.value === '1') { // 目前先不使用计时器，这段代码以后再说，目前我已经注释掉了页面上选择计时器的部分，这段代码不会执行
      if (timerSetV < 1 || timerSetV > 10 || timerSetV === NaN) {
        notice('please enter a valid number', 2);
        return;
      }
      timer.start(timerSetV*60);
      
      timer.updateCallback = (remain) => {
        document.getElementById('timer-display').textContent = formatTime(remain);
      };

    }

    this.mode = mode.value;
    this.gameStarted = true;
    this.total_questions =  total_question.value;
    this.hearts = 0; //现在heart代表错误回答了

    changepage(this.mode);
    this.nextSetp();
  },
  end: function() {

  }
};

/**
 * 
 * @param {number} correct 
 * @param {number} total 
 * @returns percents
 */
function cauculate_accuracy(correct_1, total_1) {
  let correct = parseInt(correct_1);
  let total = parseInt(total_1);
  
  if(isNaN(correct / total)) {
    return 0;
  }
  return (100 * correct / total).toFixed(1)
}
window.cauculate_accuracy = cauculate_accuracy;

function solve_accuracy(accuracy) {
  if(accuracy > 80) {
    return `<span style="color: #348700; ">${accuracy}%</span>`
  } else if (accuracy > 50) {
    return `<span style="color: #ffd600; ">${accuracy}%</span>`
  } else if (accuracy > 25) {
    return `<span style="color: #ff6d00; ">${accuracy}%</span>`
  } else { 
    return `<span style="color: #d50000; ">${accuracy}%</span>`
  }
}

function solve_display_countryname(countryname) {
  return country_rename.get(countryname) || countryname;
}
window.solve_display_countryname = solve_display_countryname;

document.getElementById('start_game').addEventListener('click', () => {
  game.start();
});


document.getElementById('timer').addEventListener('change', (e) => {
  const value = e.target.value;
  console.log(`计时器设置：${value}`);
  document.getElementById('timer_setting').style.display = (value === '1') ? 'block' : 'none';
});

// ===== 地图事件处理 =====

// 监听地图拖动开始
map.on('dragstart', () => {
  isDragging = true;
});

// 监听地图拖动结束
map.on('dragend', () => {
  isDragging = false;
});

/**
 * 
 * @param {string} message - the message shows in notice
 * @param {number} [emergancyLevel] - 0=green, 1=blue, 2=red, default=blue
 */
function notice(message, emergancyLevel) {
  const emergencyLevelColor = ['#009118', '#509AF8', '#dc1e1e'];
  const noticeEl = document.getElementById('notice');
  const noticetext = document.getElementById('noticetext');
  // const close = document.getElementById('close_notice');

  noticetext.textContent = message;
  noticeEl.style.backgroundColor = (emergencyLevelColor[emergancyLevel]) === undefined ? '#509af8' : emergencyLevelColor[emergancyLevel];
  noticeEl.classList.add('show');

  const a = setTimeout(() => {
    noticeEl.classList.remove('show');
  }, 1000);

  // close.addEventListener('click', ()=> {
  //   noticeEl.classList.remove('show');

  // });
}
window.notice = notice;

// ===== 功能函数 =====

function changepage(pageid) {
  const pages = document.querySelectorAll('.barpage');
  pages.forEach(page => {
    if (page.id === pageid) {
      page.style.display = 'flex';
    } else {
      page.style.display = 'none';
    }
  }
  );
}

function init() {
  changepage('mode_select');
  removeAllColors();

  game.mode = '';
  game.hearts = 0;
  gameStarted = false;

  // addAllCountriesColor('#fdfdf1');
  toggleColoringAbilityTo(false);

  timerDisplay.textContent = '00:00';
}

// 给国家上色
function colorCountry(countryName, codeHex = "#FFA500", addToSelected = true) {
  const layer = countryLayers.get(countryName);
  if (layer) {
    layer.setStyle({
      fillColor: codeHex,
      fillOpacity: 1
    });
    countryColors.set(countryName, codeHex); // 记录当前颜色
    if (addToSelected) selectedCountries.add(countryName);
  }
}

window.color = toggleColoringAbilityTo;
function addAllCountriesColor(colorCodeHex) {
  allCountries.forEach((countryName) => {
    colorCountry(countryName, colorCodeHex);
  });
}

// 移除国家颜色
function removeCountryColor(countryName) {
  const layer = countryLayers.get(countryName);
  if (layer) {
    layer.setStyle({
      fillColor: '#fdfdf1',
      fillOpacity: 1
    });
    countryColors.delete(countryName); // 清除颜色记录
    selectedCountries.delete(countryName);
  }
}

// 切换着色功能（禁用/启用）
function toggleColoringAbilityTo(boolv) {
  isColoringEnabled = boolv;
  // console.log('coloringMode = ', isColoringEnabled);
}

function removeAllColors() {
  Array.from(allCountries).forEach(countryName => {
    removeCountryColor(countryName);
  });
}

// ===== 加载地图数据 =====

// 从网络获取世界各国的边界数据
fetch("https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json")
  .then(res => res.json())
  .then(data => {
    // 在地图上绘制所有国家
    L.geoJSON(data, {
      style: {
        color: "#000",        // 边界线颜色
        weight: 1,            // 边界线宽度
        fillColor: '#fdfdf1', // 默认填充颜色
        fillOpacity: 1
      },
      onEachFeature: (feature, layer) => {
        const countryName = feature.properties.name;

        // 保存这个国家的图层，便于后续操作
        countryLayers.set(countryName, layer);

        // 为国家添加点击事件
        layer.on("click", (e) => {
          // 如果正在拖动地图，忽略点击事件
          if (isDragging) {
            // console.log("正在拖动地图，忽略点击事件");
            return;
          }

          // 阻止事件冒泡，避免与地图拖动冲突
          L.DomEvent.stopPropagation(e);

          // 检查着色功能是否被禁用
          if (!isColoringEnabled) {
            // console.log("着色功能已禁用，无法操作");
            return;
          }

          const latlng = e.latlng;

          // 输出点击信息
          console.log("点击坐标：", latlng);
          // console.log("点击国家：", countryName);

          if (game.gameStarted) {
            toggleColoringAbilityTo(false); // 禁用着色功能，避免用户在等待下一题时点击其他国家
            if (game.checkAnswer(countryName)) {
              // 答对了，给国家上色（不加入 selectedCountries，以免 mouseout 恢复为橙色）
              colorCountry(countryName, '#009118', false);
              setTimeout(() => {
                game.nextSetp();
                // toggleColoringAbilityTo(true); // 重新启用着色功能，允许用户点击国家
              }, 1500);
            } else {
              // 答错了，给国家上红色（同样不加入 selectedCountries）
              colorCountry(countryName, '#dc1e1e', false);
              setTimeout(()=>{
                removeAllColors();
                toggleColoringAbilityTo(true); // 重新启用着色功能，允许用户点击国家
              }, 1000);
            }
            
            // 已处理游戏答案，跳过默认的着色切换逻辑
            return;
          }

          // 普通点击交互（非游戏模式）
          if (selectedCountries.has(countryName)) {
            // 已选中
            removeCountryColor(countryName);
          } else {
            // 未选中
            colorCountry(countryName, '#ffa500');
            userLatesetCountry = countryName; // 更新用户上次点击的国家
            if (allCountries.has(countryName)) {
                console.log(`用户点击了 ${countryName}，这是一个有效的国家`);
            } else {
                console.warn(`用户点击了 ${countryName}，但它不在预定义的国家列表中`);
            }
          }
        });

        // 添加鼠标悬停效果，提升用户体验
        layer.on("mouseover", () => {
          // 只有没有特殊颜色（绿/红/橙）的国家才显示hover效果
          if (!countryColors.has(countryName)) {
            layer.setStyle({
              fillColor: '#e1e3dd',
              fillOpacity: 1,
              weight: 1,
              color: "#000"
            });
          }
        });

        layer.on("mouseout", () => {
          // 恢复到该国家当前应有的颜色，没有记录则恢复默认色
          const restoreColor = countryColors.get(countryName) ?? '#fdfdf1';
          layer.setStyle({
            fillColor: restoreColor,
            fillOpacity: 1,
            weight: 1,
            color: "#000"
          });
        });
      }
    }).addTo(map);
    init();

  });

  // 备用：如果 fetch 失败，确保 init 也会被调用
  // document.addEventListener('DOMContentLoaded', () => {
  //   init();
  // });