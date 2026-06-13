/**
 * @param {boolean} [use_cache=true] - use cache when locating
 * @param {boolean} [high_accuracy=false] - use high accuracy when locating
 * @returns 
 */
export async function get_location(use_cache = true, high_accuracy = false) {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(null)
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
           resolve(pos)
        }, (errinfo) => {
            console.log('err! ', errinfo.message)
            reject(errinfo.message)
        }, {
            maximumAge: use_cache ? 300000 : 0,
            timeout: 10000
        })
    })
}

/**
 * @param {Array} latlng 
 * @param {number} [items=12] - how many restroom info you wanna get
 * @returns {Array} the array of restrooms
 */
export async function load_restroom_info_by_location(latlng, items=12) {
    const lat = latlng[0]
    const lng = latlng[1]
    if (!lat || !lng) return
    const datas = await fetch(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=${items}&offset=0&lat=${lat}&lng=${lng}`)
                        .then(i => i.json())
                        .catch(err => {console.log(err);throw new Error(err)});

    console.log(datas)
    return datas
}

export class Navbar_notice {
    /**
     * 
     * @param {HTMLElement} el 
     */
    constructor(el) {
        this.element = el;
        this.info_card = this.element.querySelector('.info')
        this.warn_card = this.element.querySelector('.warn')
    }
    /**
     * @param {String} message 
     * @param {Number} emergency_level 
     */
    open(message, emergency_level = 1) {
        switch(emergency_level) {
            case 1:
                this.info_card.querySelector('p').textContent = message
                this.info_card.classList.add('show')
                break
            case 2:
                this.warn_card.querySelector('p').textContent = message
                this.warn_card.classList.add('show')
                break
        }
    }
    close(emergency_level) {
        switch(emergency_level) {
            case 1:
                this.info_card.classList.remove('show')
                break
            case 2:
                this.warn_card.classList.remove('show')
                break
            default:
                console.error(emergency_level)
        }
    }
}

export class Dialog_notice {
    /**
     * 
     * @param {HTMLElement} dialogSelector 
     */
    constructor(dialogSelector) {
        this.dialog = dialogSelector;
        if (!this.dialog) {
              throw new Error("Dialog element not found");
        }

        this.closeBtn = this.dialog.querySelector(".close");
        if (!this.closeBtn) {
          throw new Error("Close button not found");
        }

        // 绑定事件
        this.closeBtn.addEventListener("click", () => this.close());
    }

    open(message = "", show_as_html = false) {
        const content = this.dialog.querySelector(".content_content");
        if (content) {
            if (show_as_html) {
                content.innerHTML = message
            } else {
                content.textContent = message
            }
        }
        this.dialog.showModal();
    }

  close() {
    this.dialog.close();
  }
}


/**
 * 
 * @param {Function} fn - function
 * @param {Number} delay - rate
 * @returns {Function}
 */
export function throttle(fn, delay) {
    let lastTime = 0;
    
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            lastTime = now;
            fn.apply(this, args);
        }
    }

}

/**
 * 
 * @param {Function} fn - function
 * @param {Number} delay - delay
 * @returns {Function}
 */
export function debounce(fn, delay) {
    let timer = null;
    
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null;
        }, delay);
    }
}

/**
 * 
 * @param {String} keyword 
 * @param {Number} items 
 */
export async function search_restroom(keyword, items = 40) {
  try {
    const url = `https://www.refugerestrooms.org/api/v1/restrooms/search?page=1&per_page=${items}&offset=0&query=${encodeURIComponent(keyword.trim())}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    throw new Error(`Request failed: ${err.message}`);
  }
}