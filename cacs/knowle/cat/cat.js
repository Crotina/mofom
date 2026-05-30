import {
    get_new_knowledge,
    TextAnimation
} from '../js/tools.js'

const preload_count = 3;
const text_animation_time = 1000;
const datas = {
    i: 0,
    d: []
}
const update_btn = document.getElementById('update');
update_btn.addEventListener('click', () => load_new_cat_facts())
function disable_the_btn() {
    update_btn.textContent = 'LOADING...'
    update_btn.classList.add('disabled');
};
function enable_the_btn() {
    update_btn.textContent = 'Learn more'
    update_btn.classList.remove('disabled');
}

const urlpa = new URLSearchParams(window.location.search);
let lang = 'eng-us';
const lang_setting = urlpa.get('lang');

const txt = new TextAnimation(document.getElementById('test_texts'), text_animation_time)

const available_lang_list = [
    ['English', 'eng-us'],
    ['Español (México)', 'esp-mx'],
    ['Español (España)', 'esp-es'],
    ['中文', 'zho-tw'],
    ['Українська', 'ukr-ua'],
    ['Русский', 'rus-ru'],
    ['Čeština', 'ces-cz'],
    ['Deutsch', 'ger-de'],
    ['বাংলা', 'ben-in'],
    ['Português (Brasil)', 'por-br'],
    ['Tagalog', 'fil-tl'],
    ['اردو', 'urd-ud'],
    ['Italiano', 'ita-it'],
    ['한국어', 'kor-ko']
];
const display_current_lang = document.getElementById('display_current_language')
const lang_option = document.querySelector('.language_option');
const lang_list = document.getElementById('language_list');
available_lang_list.map(i => {
    document.getElementById('langlist').insertAdjacentHTML('beforeend', `<li><a href="${window.location.pathname}?lang=${i[1]}">${i[0]}</a></li>`)
})
const available_lang = available_lang_list.map(i => i[1])

if (lang_setting != null && available_lang.includes(lang_setting)) {
    console.log('available lang detacted: ', available_lang)
    lang = lang_setting;
}
const langcurrent = available_lang_list.find(i => i[1] == lang)[0]
display_current_lang.textContent = `Language (current: ${langcurrent})`

const url = `https://meowfacts.herokuapp.com/?count=${preload_count}&lang=${lang}`;

async function test_1() {
    const data = await get_new_knowledge(url);
    console.log(data)
}
async function set_new_content() {
    const ct = await get_new_knowledge(url);
    console.log(ct)
    if (ct === null) ct = {data: ['FAILED TO GET DATA!']}
    datas.d = ct.data;
    datas.i = 0;
    console.log(datas)
}
async function load_new_cat_facts() {
    let current_fact = datas.d[datas.i];

    let fc = () => {return current_fact};
    disable_the_btn()
    if (current_fact == undefined) {
        fc = async () => {
            console.log('请求新数据喵')
            await set_new_content();
            current_fact = datas.d[datas.i];
            return current_fact
        }
    }

    Promise.all([
        txt.deleteTexts(),
        fc(),
    ]).then(([_, fact]) => {
        console.log(current_fact);
        txt.addText(current_fact);
        datas.i++;
        setTimeout(() => {
            enable_the_btn()
        }, 2000);
    })
}

lang_option.addEventListener('click', () => {
    // alert('it is not done yet')
    console.log(lang_list.style.display)
    lang_list.style.display = lang_list.style.display == 'block' ? 'none' : 'block'
})
window.get_new_info = test_1;
window.set_new_content = set_new_content;
window.load_new_cat_facts = load_new_cat_facts;