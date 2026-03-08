import { allCountries as a, exceptedCountries } from "./storage.js";

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

let timer = {
    times: 0,
    interval: null,
    start: function() {
        this.times = 0;
        this.interval = setInterval(() => {
            this.times++;
            console.log(`Timer: ${this.times} seconds`);
        }, 1000);
    },
    stop: function() {        
        clearInterval(this.interval);
        console.log(`Timer stopped at ${this.times} seconds`);
    }
}

// 添加地图底图（开放街道地图）
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; OpenStreetMap contributors',
//     noWrap: true,  // 防止地图瓦片重复
//     bounds: [[-90, -180], [90, 180]]  // 限制地图边界
// }).addTo(map);

// ===== 全局变量 =====
const selectedCountries = new Set();    // 记录已选中的国家
const countryLayers = new Map();        // 存储所有国家的地图图层
let isColoringEnabled = true;           // 着色功能开关
let userLatesetCountry = null;              // 记录用户上次点击的国家
let isDragging = false;                 // 标记是否正在拖动地图
let gameStarted = false;                // 标记游戏是否开始
let game = {
  mode: '',
  hearts: 0,
  gameStarted: false,
  nextSetp: function() {
    
  },
  start: function() {

  }
}


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
  
}

// 给国家上色
function colorCountry(countryName, codeHex = "#FFA500", addToSelected = true) {
  const layer = countryLayers.get(countryName);
  if (layer) {
    layer.setStyle({
      fillColor: codeHex,
      fillOpacity: 1
    });
    if (addToSelected) selectedCountries.add(countryName);
  }
}

window.toggleColoringAbilityTo = toggleColoringAbilityTo;
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
    selectedCountries.delete(countryName);
  }
}

// 切换着色功能（禁用/启用）
function toggleColoringAbilityTo(boolv) {
  isColoringEnabled = boolv;
  console.log('coloringMode = ', isColoringEnabled);
}

function removeAllColors() {
  selectedCountries.forEach(countryName => {
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
        color: "#555",        // 边界线颜色
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
            console.log("正在拖动地图，忽略点击事件");
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
          console.log("点击国家：", countryName);

          // 切换国家的着色状态
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
          if (isColoringEnabled) {
            layer.setStyle({
              weight: 2,
              color: "#000"
            });
          }
        });

        layer.on("mouseout", () => {
          if (isColoringEnabled) {
            layer.setStyle({
              weight: 1,
              color: "#555"
            });
          }
        });
      }
    }).addTo(map);
    init();

  });

  // 备用：如果 fetch 失败，确保 init 也会被调用
  // document.addEventListener('DOMContentLoaded', () => {
  //   init();
  // });
