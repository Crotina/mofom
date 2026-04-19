/**
 * @returns {Object}
 */
export async function get_new_knowledge() {
    const url = 'https://uselessfacts.jsph.pl//api/v2/facts/random?language=en';
    try {
        let response = await fetch(url)
        if (!response.ok) {
            throw new Error(response)
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
        return null
    }
}

export class TextAnimation {
    /**
     * 它可以使一个元素内的内容以打字机动画消失或出现
     * @param {HTMLElement} el - the element that contain text
     * @param {number} animation_time - the time in ms, means the entire animation time
     */
    constructor(el, animation_time = 1500) {
        this.text_container = el;
        this.animation_time = animation_time;
        this.is_doing = false
    }

    async _delay(time_ms) {
        return new Promise((resolve, reject) => {
            if (typeof(time_ms) !== 'number') {
                reject('type error');
                return
            }
            setTimeout(() => {
                resolve('delay end!')
            }, time_ms);
        })
    }

    async deleteTexts() {
        if (this.is_doing) return

        this.is_doing = true;
        let original_texts = (this.text_container.textContent).split("");
        let original_texts_len = original_texts.length;
        let delay_per_text = Math.round(this.animation_time / original_texts_len);
        if (delay_per_text === 0) delay_per_text = 1

        for (let i = 0; i < original_texts_len; i++) {
            original_texts.pop()
            const current_text = original_texts.join('');

            // console.log(current_text)
            this.text_container.textContent = current_text

            await this._delay(delay_per_text)
            // console.log('this loop over')
        }
        this.is_doing = false
    }

    async addText(text) {
        if(this.is_doing) return

        this.is_doing = true
        let current_text = '';
        let delay = Math.round(this.animation_time / text.length);
        if(delay === 0) delay = 1

        for(let i = 0; i < text.length; i++) {
            current_text += text[i];
            // console.log(current_text);
            this.text_container.textContent = current_text;
            await this._delay(delay);
        }
        this.is_doing = false
    }
}