const DATA = {
  "asia": [
    { "country": "China", "capital": "Beijing", "countryCode": "cn" },
    { "country": "Mongolia", "capital": "Ulaanbaatar", "countryCode": "mn" },
    { "country": "North Korea", "capital": "Pyongyang", "countryCode": "kp" },
    { "country": "South Korea", "capital": "Seoul", "countryCode": "kr" },
    { "country": "Japan", "capital": "Tokyo", "countryCode": "jp" },
    { "country": "Philippines", "capital": "Manila", "countryCode": "ph" },
    { "country": "Indonesia", "capital": "Jakarta", "countryCode": "id" },
    { "country": "Brunei", "capital": "Bandar Seri Begawan", "countryCode": "bn" },
    { "country": "Singapore", "capital": "Singapore", "countryCode": "sg" },
    { "country": "Thailand", "capital": "Bangkok", "countryCode": "th" },
    { "country": "Malaysia", "capital": "Kuala Lumpur", "countryCode": "my" },
	{ "country": "Taiwan", "capital": "Taipei", "countryCode": "tw" },
    { "country": "Vietnam", "capital": "Hanoi", "countryCode": "vn" },
    { "country": "Laos", "capital": "Vientiane", "countryCode": "la" },
    { "country": "Cambodia", "capital": "Phnom Penh", "countryCode": "kh" },
    { "country": "Myanmar", "capital": "Naypyidaw", "countryCode": "mm" },
    { "country": "Bhutan", "capital": "Thimphu", "countryCode": "bt" },
    { "country": "East Timor", "capital": "Dili", "countryCode": "tl" },
    { "country": "Nepal", "capital": "Kathmandu", "countryCode": "np" },
    { "country": "India", "capital": "New Delhi", "countryCode": "in" },
    { "country": "Bangladesh", "capital": "Dhaka", "countryCode": "bd" },
    { "country": "Sri Lanka", "capital": "Colombo", "countryCode": "lk" },
    { "country": "Maldives", "capital": "Male", "countryCode": "mv" },
    { "country": "Pakistan", "capital": "Islamabad", "countryCode": "pk" },
    { "country": "Afghanistan", "capital": "Kabul", "countryCode": "af" },
    { "country": "Tajikistan", "capital": "Dushanbe", "countryCode": "tj" },
    { "country": "Kyrgyzstan", "capital": "Bishkek", "countryCode": "kg" },
    { "country": "Kazakhstan", "capital": "Nur-Sultan", "countryCode": "kz" },
    { "country": "Uzbekistan", "capital": "Tashkent", "countryCode": "uz" },
    { "country": "Turkmenistan", "capital": "Ashgabat", "countryCode": "tm" },
    { "country": "Iran", "capital": "Tehran", "countryCode": "ir" },
    { "country": "Iraq", "capital": "Baghdad", "countryCode": "iq" },
    { "country": "Kuwait", "capital": "Kuwait City", "countryCode": "kw" },
    { "country": "Qatar", "capital": "Doha", "countryCode": "qa" },
    { "country": "United Arab Emirates", "capital": "Abu Dhabi", "countryCode": "ae" },
    { "country": "Bahrain", "capital": "Manama", "countryCode": "bh" },
    { "country": "Oman", "capital": "Muscat", "countryCode": "om" },
    { "country": "Yemen", "capital": "Sana'a", "countryCode": "ye" },
    { "country": "Saudi Arabia", "capital": "Riyadh", "countryCode": "sa" },
    { "country": "Jordan", "capital": "Amman", "countryCode": "jo" },
    { "country": "Palestine", "capital": "Jerusalem", "countryCode": "ps" },
    { "country": "Israel", "capital": "Jerusalem", "countryCode": "il" },
    { "country": "Syria", "capital": "Damascus", "countryCode": "sy" },
    { "country": "Lebanon", "capital": "Beirut", "countryCode": "lb" },
    { "country": "Cyprus", "capital": "Nicosia", "countryCode": "cy" },
    { "country": "Turkey", "capital": "Ankara", "countryCode": "tr" },
    { "country": "Azerbaijan", "capital": "Baku", "countryCode": "az" },
    { "country": "Georgia", "capital": "Tbilisi", "countryCode": "ge" },
    { "country": "Armenia", "capital": "Yerevan", "countryCode": "am" }
  ],
  "europe": [
    { "country": "Norway", "capital": "Oslo", "countryCode": "no" },
    { "country": "Iceland", "capital": "Reykjavik", "countryCode": "is" },
    { "country": "Sweden", "capital": "Stockholm", "countryCode": "se" },
    { "country": "Finland", "capital": "Helsinki", "countryCode": "fi" },
    { "country": "Estonia", "capital": "Tallinn", "countryCode": "ee" },
    { "country": "Latvia", "capital": "Riga", "countryCode": "lv" },
    { "country": "Lithuania", "capital": "Vilnius", "countryCode": "lt" },
    { "country": "Belarus", "capital": "Minsk", "countryCode": "by" },
    { "country": "Russia", "capital": "Moscow", "countryCode": "ru" },
    { "country": "Ukraine", "capital": "Kyiv", "countryCode": "ua" },
    { "country": "Moldova", "capital": "Chisinau", "countryCode": "md" },
    { "country": "Poland", "capital": "Warsaw", "countryCode": "pl" },
    { "country": "Czech Republic", "capital": "Prague", "countryCode": "cz" },
    { "country": "Slovakia", "capital": "Bratislava", "countryCode": "sk" },
    { "country": "Hungary", "capital": "Budapest", "countryCode": "hu" },
    { "country": "Germany", "capital": "Berlin", "countryCode": "de" },
    { "country": "United Kingdom", "capital": "London", "countryCode": "gb" },
    { "country": "Ireland", "capital": "Dublin", "countryCode": "ie" },
    { "country": "Denmark", "capital": "Copenhagen", "countryCode": "dk" },
    { "country": "Netherlands", "capital": "Amsterdam", "countryCode": "nl" },
    { "country": "Monaco", "capital": "Monaco", "countryCode": "mc" },
    { "country": "France", "capital": "Paris", "countryCode": "fr" },
    { "country": "Belgium", "capital": "Brussels", "countryCode": "be" },
    { "country": "Luxembourg", "capital": "Luxembourg", "countryCode": "lu" },
    { "country": "Austria", "capital": "Vienna", "countryCode": "at" },
    { "country": "Switzerland", "capital": "Bern", "countryCode": "ch" },
    { "country": "Liechtenstein", "capital": "Vaduz", "countryCode": "li" },
    { "country": "Spain", "capital": "Madrid", "countryCode": "es" },
    { "country": "Andorra", "capital": "Andorra la Vella", "countryCode": "ad" },
    { "country": "Portugal", "capital": "Lisbon", "countryCode": "pt" },
    { "country": "Italy", "capital": "Rome", "countryCode": "it" },
    { "country": "Malta", "capital": "Valletta", "countryCode": "mt" },
    { "country": "San Marino", "capital": "San Marino", "countryCode": "sm" },
    { "country": "Vatican City", "capital": "Vatican City", "countryCode": "va" },
    { "country": "Slovenia", "capital": "Ljubljana", "countryCode": "si" },
    { "country": "Croatia", "capital": "Zagreb", "countryCode": "hr" },
    { "country": "Bosnia and Herzegovina", "capital": "Sarajevo", "countryCode": "ba" },
    { "country": "Serbia", "capital": "Belgrade", "countryCode": "rs" },
    { "country": "North Macedonia", "capital": "Skopje", "countryCode": "mk" },
    { "country": "Albania", "capital": "Tirana", "countryCode": "al" },
    { "country": "Romania", "capital": "Bucharest", "countryCode": "ro" },
    { "country": "Bulgaria", "capital": "Sofia", "countryCode": "bg" },
    { "country": "Greece", "capital": "Athens", "countryCode": "gr" }
  ],
  "africa": [
    { "country": "Egypt", "capital": "Cairo", "countryCode": "eg" },
    { "country": "Sudan", "capital": "Khartoum", "countryCode": "sd" },
    { "country": "South Sudan", "capital": "Juba", "countryCode": "ss" },
    { "country": "Ethiopia", "capital": "Addis Ababa", "countryCode": "et" },
    { "country": "Eritrea", "capital": "Asmara", "countryCode": "er" },
    { "country": "Djibouti", "capital": "Djibouti", "countryCode": "dj" },
    { "country": "Somalia", "capital": "Mogadishu", "countryCode": "so" },
    { "country": "Libya", "capital": "Tripoli", "countryCode": "ly" },
    { "country": "Algeria", "capital": "Algiers", "countryCode": "dz" },
    { "country": "Tunisia", "capital": "Tunis", "countryCode": "tn" },
    { "country": "Morocco", "capital": "Rabat", "countryCode": "ma" },
    { "country": "Cape Verde", "capital": "Praia", "countryCode": "cv" },
    { "country": "Mauritania", "capital": "Nouakchott", "countryCode": "mr" },
    { "country": "Mali", "capital": "Bamako", "countryCode": "ml" },
    { "country": "Senegal", "capital": "Dakar", "countryCode": "sn" },
    { "country": "Gambia", "capital": "Banjul", "countryCode": "gm" },
    { "country": "Guinea-Bissau", "capital": "Bissau", "countryCode": "gw" },
    { "country": "Guinea", "capital": "Conakry", "countryCode": "gn" },
    { "country": "Sierra Leone", "capital": "Freetown", "countryCode": "sl" },
    { "country": "Liberia", "capital": "Monrovia", "countryCode": "lr" },
    { "country": "Ivory Coast", "capital": "Yamoussoukro", "countryCode": "ci" },
    { "country": "Burkina Faso", "capital": "Ouagadougou", "countryCode": "bf" },
    { "country": "Niger", "capital": "Niamey", "countryCode": "ne" },
    { "country": "Chad", "capital": "N'Djamena", "countryCode": "td" },
    { "country": "Nigeria", "capital": "Abuja", "countryCode": "ng" },
    { "country": "Ghana", "capital": "Accra", "countryCode": "gh" },
    { "country": "Togo", "capital": "Lome", "countryCode": "tg" },
    { "country": "Benin", "capital": "Porto-Novo", "countryCode": "bj" },
    { "country": "Cameroon", "capital": "Yaounde", "countryCode": "cm" },
    { "country": "Gabon", "capital": "Libreville", "countryCode": "ga" },
    { "country": "Equatorial Guinea", "capital": "Malabo", "countryCode": "gq" },
    { "country": "Sao Tome and Principe", "capital": "Sao Tome", "countryCode": "st" },
    { "country": "Central African Republic", "capital": "Bangui", "countryCode": "cf" },
    { "country": "Republic of the Congo", "capital": "Brazzaville", "countryCode": "cg" },
    { "country": "Democratic Republic of the Congo", "capital": "Kinshasa", "countryCode": "cd" },
    { "country": "Uganda", "capital": "Kampala", "countryCode": "ug" },
    { "country": "Rwanda", "capital": "Kigali", "countryCode": "rw" },
    { "country": "Burundi", "capital": "Bujumbura", "countryCode": "bi" },
    { "country": "Tanzania", "capital": "Dodoma", "countryCode": "tz" },
    { "country": "Kenya", "capital": "Nairobi", "countryCode": "ke" },
    { "country": "Angola", "capital": "Luanda", "countryCode": "ao" },
    { "country": "Zambia", "capital": "Lusaka", "countryCode": "zm" },
    { "country": "Malawi", "capital": "Lilongwe", "countryCode": "mw" },
    { "country": "Mozambique", "capital": "Maputo", "countryCode": "mz" },
    { "country": "Madagascar", "capital": "Antananarivo", "countryCode": "mg" },
    { "country": "Comoros", "capital": "Moroni", "countryCode": "km" },
    { "country": "Seychelles", "capital": "Victoria", "countryCode": "sc" },
    { "country": "Mauritius", "capital": "Port Louis", "countryCode": "mu" },
    { "country": "Zimbabwe", "capital": "Harare", "countryCode": "zw" },
    { "country": "Botswana", "capital": "Gaborone", "countryCode": "bw" },
    { "country": "Namibia", "capital": "Windhoek", "countryCode": "na" },
    { "country": "Eswatini", "capital": "Mbabane", "countryCode": "sz" },
    { "country": "Lesotho", "capital": "Maseru", "countryCode": "ls" },
    { "country": "South Africa", "capital": "Pretoria", "countryCode": "za" }
  ],
  "america": [
    { "country": "Canada", "capital": "Ottawa", "countryCode": "ca" },
    { "country": "United States", "capital": "Washington, D.C.", "countryCode": "us" },
    { "country": "Mexico", "capital": "Mexico City", "countryCode": "mx" },
    { "country": "Guatemala", "capital": "Guatemala City", "countryCode": "gt" },
    { "country": "Belize", "capital": "Belmopan", "countryCode": "bz" },
    { "country": "El Salvador", "capital": "San Salvador", "countryCode": "sv" },
    { "country": "Honduras", "capital": "Tegucigalpa", "countryCode": "hn" },
    { "country": "Nicaragua", "capital": "Managua", "countryCode": "ni" },
    { "country": "Costa Rica", "capital": "San Jose", "countryCode": "cr" },
    { "country": "Panama", "capital": "Panama City", "countryCode": "pa" },
    { "country": "Cuba", "capital": "Havana", "countryCode": "cu" },
    { "country": "Bahamas", "capital": "Nassau", "countryCode": "bs" },
    { "country": "Haiti", "capital": "Port-au-Prince", "countryCode": "ht" },
    { "country": "Dominican Republic", "capital": "Santo Domingo", "countryCode": "do" },
    { "country": "Jamaica", "capital": "Kingston", "countryCode": "jm" },
    { "country": "Saint Kitts and Nevis", "capital": "Basseterre", "countryCode": "kn" },
    { "country": "Antigua and Barbuda", "capital": "Saint John's", "countryCode": "ag" },
    { "country": "Dominica", "capital": "Roseau", "countryCode": "dm" },
    { "country": "Saint Lucia", "capital": "Castries", "countryCode": "lc" },
    { "country": "Saint Vincent and the Grenadines", "capital": "Kingstown", "countryCode": "vc" },
    { "country": "Grenada", "capital": "St. George's", "countryCode": "gd" },
    { "country": "Barbados", "capital": "Bridgetown", "countryCode": "bb" },
    { "country": "Trinidad and Tobago", "capital": "Port of Spain", "countryCode": "tt" },
    { "country": "Montserrat", "capital": "Plymouth", "countryCode": "ms" }
  ],
  "oceania": [
    { "country": "Australia", "capital": "Canberra", "countryCode": "au" },
    { "country": "Papua New Guinea", "capital": "Port Moresby", "countryCode": "pg" },
    { "country": "Solomon Islands", "capital": "Honiara", "countryCode": "sb" },
    { "country": "Vanuatu", "capital": "Port Vila", "countryCode": "vu" },
    { "country": "New Zealand", "capital": "Wellington", "countryCode": "nz" },
    { "country": "Fiji", "capital": "Suva", "countryCode": "fj" },
    { "country": "Tonga", "capital": "Nuku'alofa", "countryCode": "to" },
    { "country": "Nauru", "capital": "Yaren", "countryCode": "nr" },
    { "country": "Kiribati", "capital": "Tarawa", "countryCode": "ki" },
    { "country": "Tuvalu", "capital": "Funafuti", "countryCode": "tv" },
    { "country": "Samoa", "capital": "Apia", "countryCode": "ws" },
    { "country": "Federated States of Micronesia", "capital": "Palikir", "countryCode": "fm" },
    { "country": "Marshall Islands", "capital": "Majuro", "countryCode": "mh" },
    { "country": "Palau", "capital": "Ngerulmud", "countryCode": "pw" }
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

let totalQuestion = 0;
let questionAnswered = 0;
let currentAnswer = "";
let statistics = [];
let gameType = "";
let public_game_set = {};

function init() {
	switchPageTo(mainpage);
	totalQuestion = 0;
	questionAnswered = 0;
	currentAnswer = "";
	statistics = [];
	gameType = "";
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
	for(let i = 0; i < gameSet.options_amount - 1; i++) {
		answersCountry.push(selectRandomCountry(gameSet.range));
		answersCountry = shuffleArray(answersCountry);
	}
	currentAnswer = questionCountry.country;
	let char = 'A';
	
	// console.log(answersCountry);
	// console.log(questionCountry);
	// console.log(currentAnswer);
	// console.log(typeof(currentAnswer));
	
	examPageTitle.textContent = "which country is this?";
	questions_rma.textContent = `${questionAnswered}/${totalQuestion}`;
	examPageImage.src = `https://flagcdn.com/w640/${questionCountry.countryCode}.png`;
	for(let j = 0; j < answersCountry.length; j++) {
		answersHtmlElements += `
			<button onclick="submit('${answersCountry[j].country}')">${String.fromCharCode(char.charCodeAt(0) + j)}. ${answersCountry[j].country}</button>
		`;
	}
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
	for(let i = 0; i < gameSet.options_amount - 1; i++) {
		answersCountry.push(selectRandomCountry(gameSet.range));
		answersCountry = shuffleArray(answersCountry);
	}
	currentAnswer = questionCountry.capital;
	let char = 'A';
	examPageTitle.textContent = `which city is the capital of ${questionCountry.country}?`;
	questions_rma.textContent = `${questionAnswered}/${totalQuestion}`;
	examPageImage.style.display = 'none';
	for(let j = 0; j < answersCountry.length; j++) {
		answersHtmlElements += `
			<button onclick="submit('${answersCountry[j].capital}')">${String.fromCharCode(char.charCodeAt(0) + j)}. ${answersCountry[j].capital}</button>
		`;
	}
	selecta.innerHTML = answersHtmlElements;
}

function submit(answer) {
	let statistics_item = {
		your_answer: answer,
		correct_answer: currentAnswer
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
	statistics_contents += `<tr><th>question</th><th>correct answer</th><th>your answer</th></tr>`;
	for(let i = 0; i < statistics.length; i++){
		let qwq = statistics[i];
		(qwq.correct_answer == qwq.your_answer) ? '#08ad00' : '#ec1212';
		statistics_contents += `<tr style="background-color: ${(qwq.correct_answer == qwq.your_answer) ? '#08ad00' : '#ec1212'}; color: #fff;"><td>${i + 1}</td><td>${qwq.correct_answer}</td><td>${qwq.your_answer}</td></tr>`;
	}
	statistics_table.innerHTML = statistics_contents;
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