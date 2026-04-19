import {
    get_new_knowledge
} from '../js/tools.js'

const preload_count = 3;

let current_fact_index = 0;

const urlpa = new URLSearchParams(window.location.search);
let lang = 'eng-us';
const lang_setting = urlpa.get('lang');

const available_lang = [
    'eng-us',
    'ces-cz','cze-cz',
    'ger-de',
    'ben-in',
    'esp-es',
    'esp-mx',
    'rus-ru',
    'por-br',
    'tl-fil',
    'ukr-ua',
    'urd-ur',
    'ita-it',
    'zho-tw',
    'kor-ko'
]

if (lang_setting != null && available_lang.includes(lang_setting)) {
    lang = lang_setting;
}

const url = `https://meowfacts.herokuapp.com/?count=${preload_count}&lang=${lang}`;

async function test_1() {
    const data = await get_new_knowledge(url);
    console.log(data)
}
window.get_new_info = test_1;