const mainPage = document.getElementById("pg1");
const gamePage = document.getElementById("pg2");
const statisticsPage = document.getElementById("pg3");
const toAllpage = document.getElementsByClassName("pg");

const gamepageTitle = document.getElementById("pg2Title");
const currentSelectedColorDisplay = document.getElementById("currentSelectedColor");
const feedbackElement = document.getElementById("feedback");

const colorNameArray = [
    "red",
    "green",
    "blue",
    "pink",
    "yellow",
    "black"
];

let currentSelectColor = 0; // 当前选中的颜色索引
let correctAnswer = []; // 正确答案数组
let currentCorrect = 0; // 当前答对的数量
let isColorSelected = false; // 标记用户是否已选择颜色
let isProcessingClick = false; // 防止快速连续点击

// 初始化页面
function init() {
    for(let i = 0; i < toAllpage.length; i++) {
        toAllpage[i].style.display = "none";
    }
    mainPage.style.display = "flex";
    console.log("INIT OKAY");
}

// 切换页面
function switchPageTo(pgid) {
    for(let i = 0; i < toAllpage.length; i++) {
        toAllpage[i].style.display = "none";
    }
    toAllpage[(pgid-1)].style.display = "flex";
}

// 开始游戏
function startGame(){
    switchPageTo(2);
    // 设置游戏页面，生成正确答案
    var range = 5;
    var length = 6;
    correctAnswer = [];
    
    for (var i = 0; i < length; i++) {
        var randomNum = Math.floor(Math.random() * (range + 1)) + 1;
        correctAnswer.push(randomNum);
    }
    
    // 设置游戏初始状态
    currentSelectColor = 0;
    currentSelectedColorDisplay.textContent = colorNameArray[0];
	currentSelectedColorDisplay.style.color = "#ff0000";
    currentCorrect = 0;
    isColorSelected = true; // 默认已选择第一个颜色
    isProcessingClick = false;
    gamepageTitle.textContent = "LET'S GO";
    gamepageTitle.className = "";
    // feedbackElement.textContent = "";
    feedbackElement.className = "";
    
    // 重置所有答案区域的图片
    for(let i = 1; i <= 6; i++) {
        document.getElementById(`as${i}`).innerHTML = `<img src="files/default.png" alt="答案">`;
    }
    
    // 重置所有颜色选项的选中状态
    const colorOptions = document.querySelectorAll('.colorOptions div');
    colorOptions.forEach(option => {
        option.classList.remove('selected');
    });
    // 默认选中第一个颜色
    document.getElementById('colorOption1').classList.add('selected');
    
    // console.log("正确答案: ", correctAnswer);
}

// 检查答案
function checkAnswer() {
    if (isProcessingClick) return;
    
    let userAnswer = [];
    
    // 获取用户答案
    for(let i = 1; i <= 6; i++) {
        const imgElement = document.getElementById(`as${i}`).querySelector('img');
        const imgSrc = imgElement.src;
        // 从图片路径中提取颜色索引
        const filename = imgSrc.split('/').pop();
        const colorIndex = parseInt(filename.split('.')[0]);
        userAnswer.push(isNaN(colorIndex) ? -1 : colorIndex);
    }
    
    // console.log("用户答案: ", userAnswer);
    // console.log("正确答案: ", correctAnswer);
    
    // 比较答案
    currentCorrect = 0;
    for(let i = 0; i < correctAnswer.length; i++) {
        if(userAnswer[i] === correctAnswer[i]) {
            currentCorrect++;
        }
    }
    
    // console.log("答对数量: ", currentCorrect);
    
    // 在标题上显示反馈
    if(currentCorrect === correctAnswer.length) {
        gamepageTitle.textContent = "you win it!";
        gamepageTitle.className = "correct";
        // 全部答对，切换到结果页面
        setTimeout(() => {
            switchPageTo(3);
        }, 1500);
    } else {
        gamepageTitle.textContent = `you got ${currentCorrect} correct`;
        // gamepageTitle.className = "incorrect";
        
        // 3秒后恢复原标题
        // setTimeout(() => {
        //     gamepageTitle.textContent = "颜色匹配挑战";
        //     gamepageTitle.className = "";
        // }, 3000);
    }
}

// 重新开始游戏
function restartGame() {
    startGame();
}

// 初始化事件监听
document.addEventListener("DOMContentLoaded", function(){
    init();
    
    // 为颜色选项添加点击事件
   //  for(let i = 1; i <= 6; i++) {
   //      document.getElementById(`colorOption${i}`).addEventListener('click', function(e) {
   //          if (isProcessingClick) return;
   //          isProcessingClick = true;
            
   //          currentSelectColor = i - 1;
   //          currentSelectedColorDisplay.textContent = colorNameArray[currentSelectColor];
			
   //          isColorSelected = true;
            
   //          // 更新选中状态
   //          const colorOptions = document.querySelectorAll('.colorOptions div');
   //          colorOptions.forEach(option => {
   //              option.classList.remove('selected');
   //          });
   //          this.classList.add('selected');
            
   //          // 重置点击处理状态
   //          setTimeout(() => {
   //              isProcessingClick = false;
   //          }, 100);
   //      });
   //  }
   // 为颜色选项添加点击事件
   for(let i = 1; i <= 6; i++) {
       document.getElementById(`colorOption${i}`).addEventListener('click', function(e) {
           if (isProcessingClick) return;
           isProcessingClick = true;
           
           currentSelectColor = i - 1;
           currentSelectedColorDisplay.textContent = colorNameArray[currentSelectColor];
           isColorSelected = true;
           
           // 根据选择的颜色设置span的颜色
           const colorValue = colorNameArray[currentSelectColor];
           switch(colorValue) {
               case "red":
                   currentSelectedColorDisplay.style.color = "#d90303";
                   break;
               case "green":
                   currentSelectedColorDisplay.style.color = "#22b14c";
                   break;
               case "blue":
                   currentSelectedColorDisplay.style.color = "#00a2e8";
                   break;
               case "pink":
                   currentSelectedColorDisplay.style.color = "#ffaec9";
                   break;
               case "yellow":
                   currentSelectedColorDisplay.style.color = "#f3f500";
                   break;
               case "black":
                   currentSelectedColorDisplay.style.color = "#000000";
                   break;
               default:
                   currentSelectedColorDisplay.style.color = "#333333";
           }
           
           // 更新选中状态
           const colorOptions = document.querySelectorAll('.colorOptions div');
           colorOptions.forEach(option => {
               option.classList.remove('selected');
           });
           this.classList.add('selected');
           
           // 重置点击处理状态
           setTimeout(() => {
               isProcessingClick = false;
           }, 100);
       });

   }
    
    // 为答案区域添加点击事件
    for(let i = 1; i <= 6; i++) {
        document.getElementById(`as${i}`).addEventListener('click', function(e) {
            if (isProcessingClick) return;
            isProcessingClick = true;
            
            // 只有当用户已经选择了颜色时才更新
            if(isColorSelected) {
                this.innerHTML = `<img src="files/${currentSelectColor+1}.png" alt="${colorNameArray[currentSelectColor]}">`;
            } else {
                // 在标题上提示用户先选择颜色
                gamepageTitle.textContent = "请先选择一个颜色！";
                gamepageTitle.className = "incorrect";
                
                setTimeout(() => {
                    gamepageTitle.textContent = "颜色匹配挑战";
                    gamepageTitle.className = "";
                }, 1500);
            }
            
            // 重置点击处理状态
            setTimeout(() => {
                isProcessingClick = false;
            }, 100);
        });
    }
    
    // 为检查答案按钮添加防快速点击处理
    const checkButton = document.querySelector('button[onclick="checkAnswer()"]');
    if (checkButton) {
        checkButton.addEventListener('click', function(e) {
            if (isProcessingClick) return;
            isProcessingClick = true;
            
            checkAnswer();
            
            // 重置点击处理状态
            setTimeout(() => {
                isProcessingClick = false;
            }, 500);
        });
    }
    
    // 为页面添加点击事件，处理空白处点击
    document.addEventListener('click', function(e) {
        // 检查点击的是否是颜色选项、答案区域或按钮
        const isColorOption = e.target.closest('.colorOptions div');
        const isAnswerArea = e.target.closest('.answerArea div');
        const isButton = e.target.tagName === 'BUTTON' || e.target.closest('button');
        
        // 如果点击的是空白处（不是颜色选项、答案区域或按钮）
        if(!isColorOption && !isAnswerArea && !isButton) {
            // 只是阻止默认行为，不执行其他操作
            e.preventDefault();
        }
    });
});

function triggerHiddenLink(url) {
  // 创建 a 标签
  const a = document.createElement('a');
  
  // 设置属性
  a.href = url;
  a.style.display = 'none';
  a.target = '_blank'; // 可选：在新标签页打开

  // 添加到文档
  document.body.appendChild(a);

  // 模拟点击
  a.click();

  // 移除 a 标签
  document.body.removeChild(a);
}

