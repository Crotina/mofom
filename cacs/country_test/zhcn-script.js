const DATA = {
  "asia": [
    { "country": "中国", "capital": "北京", "countryCode": "cn" },
    { "country": "蒙古", "capital": "乌兰巴托", "countryCode": "mn" },
    { "country": "朝鲜", "capital": "平壤", "countryCode": "kp" },
    { "country": "韩国", "capital": "首尔", "countryCode": "kr" },
    { "country": "日本", "capital": "东京", "countryCode": "jp" },
    { "country": "菲律宾", "capital": "马尼拉", "countryCode": "ph" },
    { "country": "印度尼西亚", "capital": "雅加达", "countryCode": "id" },
    { "country": "文莱", "capital": "斯里巴加湾市", "countryCode": "bn" },
    { "country": "新加坡", "capital": "新加坡", "countryCode": "sg" },
    { "country": "泰国", "capital": "曼谷", "countryCode": "th" },
    { "country": "马来西亚", "capital": "吉隆坡", "countryCode": "my" },
    { "country": "越南", "capital": "河内", "countryCode": "vn" },
    { "country": "老挝", "capital": "万象", "countryCode": "la" },
    { "country": "柬埔寨", "capital": "金边", "countryCode": "kh" },
    { "country": "缅甸", "capital": "内比都", "countryCode": "mm" },
	{ "country": "台湾", "capital": "台北", "countryCode": "tw" },
    { "country": "不丹", "capital": "廷布", "countryCode": "bt" },
    { "country": "东帝汶", "capital": "帝力", "countryCode": "tl" },
    { "country": "尼泊尔", "capital": "加德满都", "countryCode": "np" },
    { "country": "印度", "capital": "新德里", "countryCode": "in" },
    { "country": "孟加拉国", "capital": "达卡", "countryCode": "bd" },
    { "country": "斯里兰卡", "capital": "科伦坡", "countryCode": "lk" },
    { "country": "马尔代夫", "capital": "马累", "countryCode": "mv" },
    { "country": "巴基斯坦", "capital": "伊斯兰堡", "countryCode": "pk" },
    { "country": "阿富汗", "capital": "喀布尔", "countryCode": "af" },
    { "country": "塔吉克斯坦", "capital": "杜尚别", "countryCode": "tj" },
    { "country": "吉尔吉斯斯坦", "capital": "比什凯克", "countryCode": "kg" },
    { "country": "哈萨克斯坦", "capital": "阿斯塔纳", "countryCode": "kz" },
    { "country": "乌兹别克斯坦", "capital": "塔什干", "countryCode": "uz" },
    { "country": "土库曼斯坦", "capital": "阿什哈巴德", "countryCode": "tm" },
    { "country": "伊朗", "capital": "德黑兰", "countryCode": "ir" },
    { "country": "伊拉克", "capital": "巴格达", "countryCode": "iq" },
    { "country": "科威特", "capital": "科威特城", "countryCode": "kw" },
    { "country": "卡塔尔", "capital": "多哈", "countryCode": "qa" },
    { "country": "阿拉伯联合酋长国", "capital": "阿布扎比", "countryCode": "ae" },
    { "country": "巴林", "capital": "麦纳麦", "countryCode": "bh" },
    { "country": "阿曼", "capital": "马斯喀特", "countryCode": "om" },
    { "country": "也门", "capital": "萨那", "countryCode": "ye" },
    { "country": "沙特阿拉伯", "capital": "利雅得", "countryCode": "sa" },
    { "country": "约旦", "capital": "安曼", "countryCode": "jo" },
    { "country": "巴勒斯坦", "capital": "耶路撒冷", "countryCode": "ps" },
    { "country": "以色列", "capital": "耶路撒冷", "countryCode": "il" },
    { "country": "叙利亚", "capital": "大马士革", "countryCode": "sy" },
    { "country": "黎巴嫩", "capital": "贝鲁特", "countryCode": "lb" },
    { "country": "塞浦路斯", "capital": "尼科西亚", "countryCode": "cy" },
    { "country": "土耳其", "capital": "安卡拉", "countryCode": "tr" },
    { "country": "阿塞拜疆", "capital": "巴库", "countryCode": "az" },
    { "country": "格鲁吉亚", "capital": "第比利斯", "countryCode": "ge" },
    { "country": "亚美尼亚", "capital": "埃里温", "countryCode": "am" }
  ],
  "europe": [
    { "country": "挪威", "capital": "奥斯陆", "countryCode": "no" },
    { "country": "冰岛", "capital": "雷克雅未克", "countryCode": "is" },
    { "country": "瑞典", "capital": "斯德哥尔摩", "countryCode": "se" },
    { "country": "芬兰", "capital": "赫尔辛基", "countryCode": "fi" },
    { "country": "爱沙尼亚", "capital": "塔林", "countryCode": "ee" },
    { "country": "拉脱维亚", "capital": "里加", "countryCode": "lv" },
    { "country": "立陶宛", "capital": "维尔纽斯", "countryCode": "lt" },
    { "country": "白俄罗斯", "capital": "明斯克", "countryCode": "by" },
    { "country": "俄罗斯", "capital": "莫斯科", "countryCode": "ru" },
    { "country": "乌克兰", "capital": "基辅", "countryCode": "ua" },
    { "country": "摩尔多瓦", "capital": "基希讷乌", "countryCode": "md" },
    { "country": "波兰", "capital": "华沙", "countryCode": "pl" },
    { "country": "捷克", "capital": "布拉格", "countryCode": "cz" },
    { "country": "斯洛伐克", "capital": "布拉迪斯拉发", "countryCode": "sk" },
    { "country": "匈牙利", "capital": "布达佩斯", "countryCode": "hu" },
    { "country": "德国", "capital": "柏林", "countryCode": "de" },
    { "country": "英国", "capital": "伦敦", "countryCode": "gb" },
    { "country": "爱尔兰", "capital": "都柏林", "countryCode": "ie" },
    { "country": "丹麦", "capital": "哥本哈根", "countryCode": "dk" },
    { "country": "荷兰", "capital": "阿姆斯特丹", "countryCode": "nl" },
    { "country": "摩纳哥", "capital": "摩纳哥", "countryCode": "mc" },
    { "country": "法国", "capital": "巴黎", "countryCode": "fr" },
    { "country": "比利时", "capital": "布鲁塞尔", "countryCode": "be" },
    { "country": "卢森堡", "capital": "卢森堡", "countryCode": "lu" },
    { "country": "奥地利", "capital": "维也纳", "countryCode": "at" },
    { "country": "瑞士", "capital": "伯尔尼", "countryCode": "ch" },
    { "country": "列支敦士登", "capital": "瓦杜兹", "countryCode": "li" },
    { "country": "西班牙", "capital": "马德里", "countryCode": "es" },
    { "country": "安道尔", "capital": "安道尔城", "countryCode": "ad" },
    { "country": "葡萄牙", "capital": "里斯本", "countryCode": "pt" },
    { "country": "意大利", "capital": "罗马", "countryCode": "it" },
    { "country": "马耳他", "capital": "瓦莱塔", "countryCode": "mt" },
    { "country": "圣马力诺", "capital": "圣马力诺", "countryCode": "sm" },
    { "country": "梵蒂冈", "capital": "梵蒂冈城", "countryCode": "va" },
    { "country": "斯洛文尼亚", "capital": "卢布尔雅那", "countryCode": "si" },
    { "country": "克罗地亚", "capital": "萨格勒布", "countryCode": "hr" },
    { "country": "波黑", "capital": "萨拉热窝", "countryCode": "ba" },
    { "country": "塞尔维亚", "capital": "贝尔格莱德", "countryCode": "rs" },
    { "country": "北马其顿", "capital": "斯科普里", "countryCode": "mk" },
    { "country": "阿尔巴尼亚", "capital": "地拉那", "countryCode": "al" },
    { "country": "科索沃", "capital": "普里什蒂纳", "countryCode": "xk" },
    { "country": "罗马尼亚", "capital": "布加勒斯特", "countryCode": "ro" },
    { "country": "保加利亚", "capital": "索非亚", "countryCode": "bg" },
    { "country": "希腊", "capital": "雅典", "countryCode": "gr" }
  ],
  "africa": [
    { "country": "埃及", "capital": "开罗", "countryCode": "eg" },
    { "country": "苏丹", "capital": "喀土穆", "countryCode": "sd" },
    { "country": "南苏丹", "capital": "朱巴", "countryCode": "ss" },
    { "country": "埃塞俄比亚", "capital": "亚的斯亚贝巴", "countryCode": "et" },
    { "country": "厄立特里亚", "capital": "阿斯马拉", "countryCode": "er" },
    { "country": "吉布提", "capital": "吉布提市", "countryCode": "dj" },
    { "country": "索马里", "capital": "摩加迪沙", "countryCode": "so" },
    { "country": "利比亚", "capital": "的黎波里", "countryCode": "ly" },
    { "country": "阿尔及利亚", "capital": "阿尔及尔", "countryCode": "dz" },
    { "country": "突尼斯", "capital": "突尼斯市", "countryCode": "tn" },
    { "country": "摩洛哥", "capital": "拉巴特", "countryCode": "ma" },
    { "country": "佛得角", "capital": "普拉亚", "countryCode": "cv" },
    { "country": "毛里塔尼亚", "capital": "努瓦克肖特", "countryCode": "mr" },
    { "country": "马里", "capital": "巴马科", "countryCode": "ml" },
    { "country": "塞内加尔", "capital": "达喀尔", "countryCode": "sn" },
    { "country": "冈比亚", "capital": "班珠尔", "countryCode": "gm" },
    { "country": "几内亚比绍", "capital": "比绍", "countryCode": "gw" },
    { "country": "几内亚", "capital": "科纳克里", "countryCode": "gn" },
    { "country": "塞拉利昂", "capital": "弗里敦", "countryCode": "sl" },
    { "country": "利比里亚", "capital": "蒙罗维亚", "countryCode": "lr" },
    { "country": "科特迪瓦", "capital": "亚穆苏克罗", "countryCode": "ci" },
    { "country": "布基纳法索", "capital": "瓦加杜古", "countryCode": "bf" },
    { "country": "尼日尔", "capital": "尼亚美", "countryCode": "ne" },
    { "country": "乍得", "capital": "恩贾梅纳", "countryCode": "td" },
    { "country": "尼日利亚", "capital": "阿布贾", "countryCode": "ng" },
    { "country": "加纳", "capital": "阿克拉", "countryCode": "gh" },
    { "country": "多哥", "capital": "洛美", "countryCode": "tg" },
    { "country": "贝宁", "capital": "波多诺伏", "countryCode": "bj" },
    { "country": "喀麦隆", "capital": "雅温得", "countryCode": "cm" },
    { "country": "加蓬", "capital": "利伯维尔", "countryCode": "ga" },
    { "country": "赤道几内亚", "capital": "马拉博", "countryCode": "gq" },
    { "country": "圣多美和普林西比", "capital": "圣多美", "countryCode": "st" },
    { "country": "中非", "capital": "班吉", "countryCode": "cf" },
    { "country": "刚果共和国", "capital": "布拉柴维尔", "countryCode": "cg" },
    { "country": "刚果民主共和国", "capital": "金沙萨", "countryCode": "cd" },
    { "country": "乌干达", "capital": "坎帕拉", "countryCode": "ug" },
    { "country": "卢旺达", "capital": "基加利", "countryCode": "rw" },
    { "country": "布隆迪", "capital": "布琼布拉", "countryCode": "bi" },
    { "country": "坦桑尼亚", "capital": "多多马", "countryCode": "tz" },
    { "country": "肯尼亚", "capital": "内罗毕", "countryCode": "ke" },
    { "country": "安哥拉", "capital": "罗安达", "countryCode": "ao" },
    { "country": "赞比亚", "capital": "卢萨卡", "countryCode": "zm" },
    { "country": "马拉维", "capital": "利隆圭", "countryCode": "mw" },
    { "country": "莫桑比克", "capital": "马普托", "countryCode": "mz" },
    { "country": "马达加斯加", "capital": "塔那那利佛", "countryCode": "mg" },
    { "country": "科摩罗", "capital": "莫罗尼", "countryCode": "km" },
    { "country": "塞舌尔", "capital": "维多利亚", "countryCode": "sc" },
    { "country": "毛里求斯", "capital": "路易港", "countryCode": "mu" },
    { "country": "津巴布韦", "capital": "哈拉雷", "countryCode": "zw" },
    { "country": "博茨瓦纳", "capital": "哈博罗内", "countryCode": "bw" },
    { "country": "纳米比亚", "capital": "温得和克", "countryCode": "na" },
    { "country": "斯威士兰", "capital": "姆巴巴内", "countryCode": "sz" },
    { "country": "莱索托", "capital": "马塞卢", "countryCode": "ls" },
    { "country": "南非", "capital": "比勒陀利亚", "countryCode": "za" }
  ],
  "america": [
    { "country": "加拿大", "capital": "渥太华", "countryCode": "ca" },
    { "country": "美国", "capital": "华盛顿哥伦比亚特区", "countryCode": "us" },
    { "country": "墨西哥", "capital": "墨西哥城", "countryCode": "mx" },
    { "country": "危地马拉", "capital": "危地马拉城", "countryCode": "gt" },
    { "country": "伯利兹", "capital": "贝尔莫潘", "countryCode": "bz" },
    { "country": "萨尔瓦多", "capital": "圣萨尔瓦多", "countryCode": "sv" },
    { "country": "洪都拉斯", "capital": "特古西加尔巴", "countryCode": "hn" },
    { "country": "尼加拉瓜", "capital": "马那瓜", "countryCode": "ni" },
    { "country": "哥斯达黎加", "capital": "圣何塞", "countryCode": "cr" },
    { "country": "巴拿马", "capital": "巴拿马城", "countryCode": "pa" },
    { "country": "古巴", "capital": "哈瓦那", "countryCode": "cu" },
    { "country": "巴哈马", "capital": "拿骚", "countryCode": "bs" },
    { "country": "海地", "capital": "太子港", "countryCode": "ht" },
    { "country": "多米尼加共和国", "capital": "圣多明各", "countryCode": "do" },
    { "country": "牙买加", "capital": "金斯敦", "countryCode": "jm" },
    { "country": "圣基茨和尼维斯", "capital": "巴斯特尔", "countryCode": "kn" },
    { "country": "安提瓜和巴布达", "capital": "圣约翰", "countryCode": "ag" },
    { "country": "多米尼克", "capital": "罗索", "countryCode": "dm" },
    { "country": "圣卢西亚", "capital": "卡斯特里", "countryCode": "lc" },
    { "country": "圣文森特和格林纳丁斯", "capital": "金斯敦", "countryCode": "vc" },
    { "country": "格林纳达", "capital": "圣乔治", "countryCode": "gd" },
    { "country": "巴巴多斯", "capital": "布里奇顿", "countryCode": "bb" },
    { "country": "特立尼达和多巴哥", "capital": "西班牙港", "countryCode": "tt" },
    { "country": "蒙特塞拉特", "capital": "普利茅斯", "countryCode": "ms" }
  ],
  "oceania": [
    { "country": "澳大利亚", "capital": "堪培拉", "countryCode": "au" },
    { "country": "巴布亚新几内亚", "capital": "莫尔兹比港", "countryCode": "pg" },
    { "country": "所罗门群岛", "capital": "霍尼亚拉", "countryCode": "sb" },
    { "country": "瓦努阿图", "capital": "维拉港", "countryCode": "vu" },
    { "country": "新西兰", "capital": "惠灵顿", "countryCode": "nz" },
    { "country": "斐济", "capital": "苏瓦", "countryCode": "fj" },
    { "country": "汤加", "capital": "努库阿洛法", "countryCode": "to" },
    { "country": "瑙鲁", "capital": "亚伦", "countryCode": "nr" },
    { "country": "基里巴斯", "capital": "塔拉瓦", "countryCode": "ki" },
    { "country": "图瓦卢", "capital": "富纳富提", "countryCode": "tv" },
    { "country": "萨摩亚", "capital": "阿皮亚", "countryCode": "ws" },
    { "country": "密克罗尼西亚联邦", "capital": "帕利基尔", "countryCode": "fm" },
    { "country": "马绍尔群岛", "capital": "马朱罗", "countryCode": "mh" },
    { "country": "帕劳", "capital": "恩吉鲁穆德", "countryCode": "pw" }
  ]
};
var currentScore = 0;

//主页面
var allGamepage = document.getElementsByClassName('gamePage');
const mainpage = document.getElementById('pg1');
const exampage = document.getElementById('examPage');
const resultpg = document.getElementById('resultPage');

const range = document.getElementById('range');
const questions = document.getElementById('questions');
const custom_qu_amount = document.getElementById('custom_qu_amount');
const options_amount = document.getElementById('options_amount');
const cqa = document.getElementsByClassName('c_q_a');

const examPageTitle = document.getElementById('examPageTitle');
const examPageImage = document.getElementById('examPageImage');
const selecta = document.getElementById('selection');
const questions_rma = document.getElementById('questions_rma');
const statistics_table = document.getElementById('statistics_table');
const statistics_title = document.getElementById('statistics_title');

let totalQuestion = 0;
let questionAnswered = 0;
let currentAnswer = "";
let statistics = [];
let gameType = "";
let public_game_set = {};
let currentquestionstr = "";

function init() {
	switchPageTo(mainpage);
	totalQuestion = 0;
	questionAnswered = 0;
	currentAnswer = "";
	statistics = [];
	gameType = "";
	document.getElementById('forOverview').style.display = 'none';
	statistics_table.style.display = 'block';
	statistics_title.style.display = 'block';
	examPageImage.style.display = 'block';
}

function switchPageTo(page) {
	Array.from(allGamepage).forEach(function(e) {
		e.style.display = 'none';
	});
	page.style.display = 'flex';
}

function getSettings() {
	var setData = {
		range: range.value,
		questions: "",
		options_amount: +options_amount.value
	}	
	
	if(questions.value === "custom") {
		setData.questions = custom_qu_amount.value;
	} else {
		setData.questions = questions.value;
	}
	setData.questions = +setData.questions;
	return setData;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    // 随机生成一个 0 到 i 之间的索引
    const j = Math.floor(Math.random() * (i + 1));
    
    // 交换元素位置
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled;
}

function startCountryExam() {
	public_game_set = getSettings();
	totalQuestion = public_game_set.questions;
	gameType = "country";
	console.log(public_game_set);
	switchPageTo(exampage);
	setNewCountryTest(public_game_set);
}

function setNewCountryTest(gameSet) {
	questionAnswered++;
	let questionCountry = selectRandomCountry(gameSet.range);
	let answersCountry = [questionCountry];
	let answersHtmlElements = "";
	let temp = [];
	
	let hasDuplicates;
	do {
		hasDuplicates = false;
		temp = [];
		for(let i = 0; i < gameSet.options_amount - 1; i++) {
			temp.push(selectRandomCountry(gameSet.range));
		}
		
		// 检查temp内部是否有重复，或与questionCountry重复
		let allCapitals = [questionCountry.capital];
			for(let country of temp) {
				if(allCapitals.includes(country.capital)) {
					hasDuplicates = true;
					break;
				}
				allCapitals.push(country.capital);
			}
	} while(hasDuplicates);
	
	answersCountry = answersCountry.concat(temp);
	answersCountry = shuffleArray(answersCountry);
	
	currentAnswer = questionCountry.country;
	let char = 'A';
	
	examPageTitle.textContent = `${questionCountry.capital} 属于哪个国家？`;
	questions_rma.textContent = `${questionAnswered}/${totalQuestion}`;
	examPageImage.style.display = 'none';
	for(let j = 0; j < answersCountry.length; j++) {
		answersHtmlElements += `
			<button onclick="submit('${answersCountry[j].country}')">${String.fromCharCode(char.charCodeAt(0) + j)}. ${answersCountry[j].country}</button>
		`;
	}
	currentquestionstr = examPageTitle.textContent;
	selecta.innerHTML = answersHtmlElements;
}


function startFlagExam() {
	public_game_set = getSettings();
	totalQuestion = public_game_set.questions;
	gameType = "flag";
	console.log(public_game_set);
	switchPageTo(exampage);
	SetNewFlagExamQuestion(public_game_set);
}
function SetNewFlagExamQuestion(gameSet) {
	console.log(gameSet);
	questionAnswered++;
	console.log(questionAnswered);
	let questionCountry = selectRandomCountry(gameSet.range);
	let answersCountry = [questionCountry];
	let answersHtmlElements = "";
	let temp = [];
	
	let hasDuplicates;
	do {
		hasDuplicates = false;
		temp = [];
		for(let i = 0; i < gameSet.options_amount - 1; i++) {
			temp.push(selectRandomCountry(gameSet.range));
		}
		
		// 检查temp内部是否有重复，或与questionCountry重复
		let allCapitals = [questionCountry.capital];
			for(let country of temp) {
				if(allCapitals.includes(country.capital)) {
					hasDuplicates = true;
					break;
				}
				allCapitals.push(country.capital);
			}
	} while(hasDuplicates);
	
	answersCountry = answersCountry.concat(temp);
	answersCountry = shuffleArray(answersCountry);
	// console.log(answersCountry.length);
	
	currentAnswer = questionCountry.country;
	let char = 'A';
	
	// console.log(answersCountry);
	// console.log(questionCountry);
	// console.log(currentAnswer);
	// console.log(typeof(currentAnswer));
	
	examPageTitle.textContent = "这个国家是什么？";
	questions_rma.textContent = `${questionAnswered}/${totalQuestion}`;
	examPageImage.src = `https://flagcdn.com/w640/${questionCountry.countryCode}.png`;
	for(let j = 0; j < answersCountry.length; j++) {
		answersHtmlElements += `
			<button onclick="submit('${answersCountry[j].country}')">${String.fromCharCode(char.charCodeAt(0) + j)}. ${answersCountry[j].country}</button>
		`;
	}
	currentquestionstr = examPageTitle.textContent;
	selecta.innerHTML = answersHtmlElements;
}

function start_capital_test() {
	public_game_set = getSettings();
	totalQuestion = public_game_set.questions;
	gameType = "capital";
	console.log(public_game_set);
	switchPageTo(exampage);
	setNewCapitalTest(public_game_set);
}
function setNewCapitalTest(gameSet) {
	questionAnswered++;
	let questionCountry = selectRandomCountry(gameSet.range);
	let answersCountry = [questionCountry];
	let answersHtmlElements = "";
	let temp = [];
	
	let hasDuplicates;
	do {
		hasDuplicates = false;
		temp = [];
		for(let i = 0; i < gameSet.options_amount - 1; i++) {
			temp.push(selectRandomCountry(gameSet.range));
		}
		
		// 检查temp内部是否有重复，或与questionCountry重复
		let allCapitals = [questionCountry.capital];
			for(let country of temp) {
				if(allCapitals.includes(country.capital)) {
					hasDuplicates = true;
					break;
				}
				allCapitals.push(country.capital);
			}
	} while(hasDuplicates);
	
	answersCountry = answersCountry.concat(temp);
	answersCountry = shuffleArray(answersCountry);
	// console.log(answersCountry);
	
	currentAnswer = questionCountry.capital;
	let char = 'A';
	
	examPageTitle.textContent = `${questionCountry.country} 的首都是哪里?`;
	questions_rma.textContent = `${questionAnswered}/${totalQuestion}`;
	examPageImage.style.display = 'none';
	for(let j = 0; j < answersCountry.length; j++) {
		answersHtmlElements += `
			<button onclick="submit('${answersCountry[j].capital}')">${String.fromCharCode(char.charCodeAt(0) + j)}. ${answersCountry[j].capital}</button>
		`;
	}
	currentquestionstr = examPageTitle.textContent;
	selecta.innerHTML = answersHtmlElements;
}

function submit(answer) {
	let statistics_item = {
		your_answer: answer,
		correct_answer: currentAnswer,
		questionStr: currentquestionstr
	};
	statistics.push(statistics_item);
	if(questionAnswered < totalQuestion) {
		switch(gameType) {
			case 'flag':
			console.log("submit: " + public_game_set.range);
				SetNewFlagExamQuestion(public_game_set);
				break;
			case 'capital': 
				setNewCapitalTest(public_game_set);
				break;
			case 'country':
				setNewCountryTest(public_game_set);
				break;
			default:
				console.error("what did u do?" + gameType);
		}
	} else {
		setResultPage();
	}
}

function setResultPage() {
	switchPageTo(resultpg);
	let statistics_contents = "";
	let correctaa = 0;
	statistics_contents += `<tr><th>题目</th><th>正确答案</th><th>你的答案</th></tr>`;
	for(let i = 0; i < statistics.length; i++){
		let qwq = statistics[i];
		
		if(qwq.correct_answer == qwq.your_answer) {
			correctaa++;
		}
		statistics_contents += `<tr style="background-color: ${(qwq.correct_answer == qwq.your_answer) ? '#08ad00' : '#ec1212'}; color: #fff;"><td>${qwq.questionStr}</td><td>${qwq.correct_answer}</td><td>${qwq.your_answer}</td></tr>`;
	}
	statistics_table.innerHTML = statistics_contents;
	statistics_title.textContent = `${correctaa}/${statistics.length} 正确, (正确率 ${100*(correctaa/(statistics.length))}%)`;
}

function overview() {
	switchPageTo(resultpg);
	const ovv = document.getElementById('forOverview');
	ovv.style.display = 'block';
	statistics_table.style.display = 'none';
	statistics_title.style.display = 'none';
	let content = "";
	const load = [
		{ name: '亚洲', data: DATA.asia },
		{ name: '非洲', data: DATA.africa },
		{ name: '美洲', data: DATA.america },
		{ name: '欧洲', data: DATA.europe },
		{ name: '大洋洲', data: DATA.oceania }
	];
	for(let x = 0; x < load.length; x++){
		content += `
	<div class="according-item">
	    <div class="according-title">
	        ${load[x].name}
	    </div>
	    <div class="according-content">
			<table border="" cellspacing="0" cellpadding="3px" id="statistics_table">
				<tr><td>country</td><td>flag</td><td>capital</td></tr>
	`;
		for(let a = 0; a < load[x].data.length; a++) {
			content += `<tr><td>${load[x].data[a].country}</td><td><img class="overview-image" src="https://flagcdn.com/w640/${load[x].data[a].countryCode}.png" alt="" /></td><td>${load[x].data[a].capital}</td></tr>`;
		}
		content += `
					</table>
				</div>
			</div>
		`;
	}
	ovv.innerHTML = content;
}

function selectRandomCountry(range) {
  // 定义范围映射
  const rangeMap = {
    "wr": ["asia", "europe", "africa", "america", "oceania"],
    "as": ["asia"],
    "af": ["africa"],
    "am": ["america"],
    "oc": ["oceania"],
	"eu": ["europe"]
  };

  // 获取对应的洲数组
  const continents = rangeMap[range];
  if (!continents) {
    throw new Error(`Invalid range: ${range}. Must be one of: worldwide, asia, africa, america, oceania`);
  }

  // 收集所有符合条件的国家
  let allCountries = [];
  
  continents.forEach(continent => {
    if (DATA[continent]) {
      allCountries = allCountries.concat(DATA[continent]);
    }
  });

  if (allCountries.length === 0) {
    throw new Error(`No countries found for range: ${range}`);
  }

  // 随机选择一个国家
  const randomIndex = Math.floor(Math.random() * allCountries.length);
  return allCountries[randomIndex];
}
questions.addEventListener('change', () => {
	if(questions.value == "custom") {
		
		Array.from(cqa).forEach(function(e) {
			e.style.display = 'block';
		});
	} else {
		Array.from(cqa).forEach(function(e) {
			e.style.display = 'none';
		});
	}
});

init();