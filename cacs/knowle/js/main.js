import {
    get_new_knowledge,
    TextAnimation
} from "./tools.js"

const animation_time = 1500;

const update_btn = document.getElementById('update');

const txt = new TextAnimation(document.getElementById('test_texts'), animation_time)

function update_new_knowledge() {
    if (txt.is_doing) {
        console.log('doing operation, thats end')
        return
    }

    update_btn.classList.add('disabled')
    update_btn.textContent = 'LOADING...'

    Promise.all([
        txt.deleteTexts(),
        get_new_knowledge()
    ]).then(async ([_, data]) => {
        if (data === null) {
            console.error('ERROR! ', data);
            data = {text: 'Failed to load knowledge, please try again'}
        }
        console.log('done: ', data);
        await txt.addText(data.text)

        setTimeout(() => {
            update_btn.classList.remove('disabled')
            update_btn.textContent = 'Learn more'
        }, 1000);
    })
    
}

update_btn.addEventListener('click', () => update_new_knowledge())

document.getElementById('textbtn').addEventListener('click', () => {
    txt.deleteTexts()
})

document.getElementById('textbtn_add').addEventListener('click', () => {
    txt.addText('hello this is the text test text, text over')
})

window.update = update_new_knowledge;