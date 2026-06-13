import {
    get_location,
    Navbar_notice,
    load_restroom_info_by_location,
    throttle,
    Dialog_notice,
    debounce,
    search_restroom
} from "./toolkit.js";

const focus_on_my_location_btn = document.getElementById('focus_on_my_location_btn')
const reload_restroom_info_around_me_btn = document.getElementById('reload_restroom_info_around_me_btn')
const test_btn = document.getElementById('test_btn');
const welcome_screen = document.getElementById('welcome_screen');
const detail_card = document.getElementById('details_card');
const search_input = document.getElementById('search_input')
const search_result_card = document.getElementById('search_result')
const search_form = document.getElementById('search_form')
const copy_btn = document.getElementById('copy_btn')

const searchbar_smallicons = {
    search: document.getElementById('searchbar_search'),
    xmark: document.getElementById('searchbar_xmark'),

    /**
     * 
     * @param {String} target 
     */
    set_to(target) {
        searchbar_smallicons.search.classList.remove('active')
        searchbar_smallicons.xmark.classList.remove('active')
        switch(target) {
            case 'search':
                searchbar_smallicons.search.classList.add('active')
                break;
            case 'xmark':
                searchbar_smallicons.xmark.classList.add('active')
                break;
            default:
                throw new Error("unexpected target: " + target);
                
        }
    }
}

const ada = document.getElementById('ada');
const unisex = document.getElementById('unisex');
const chargingtable = document.getElementById('chargingtable');

const welcomescr = {
    show() {
        welcome_screen.style.display = 'flex'
    },
    hide() {
        welcome_screen.style.display = 'none'
    },
    subtitle(subtitle_string) {
        welcome_screen.querySelector('.welcome_subtitle').textContent = subtitle_string
    }
}

const devmode = false

const notice_info = document.getElementById('notice_info')

let pos = {
        latlon_arr: [null, null],
        accuracy: null,
        timestamp: null
    }
let position = null;
let restroom_data = []
let internet_restroom_data = []

var user_location_pin = null;
var user_location_ratio = null;
let done = false

const user_click_delay = 1000;
const navbar = new Navbar_notice(notice_info);
const dialog_notice = new Dialog_notice(document.getElementById('dialog_notice'))
const restroom_markers = []

const def_rst_set = {
    shadowUrl: '../assets/icon/shadow.png',

    iconSize:     [78, 54], // size of the icon
    shadowSize:   [84, 60], // size of the shadow
    iconAnchor:   [10, 54], // point of the icon which will correspond to marker's location
    shadowAnchor: [10, 58],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
}

function debug() {
    if (devmode) {
        L.marker([38.6548763, -121.3835029], {
            icon: L.icon({
                    iconUrl: `../assets/icon/100.png`,
                    ...def_rst_set
                })
        }).addTo(map)
        map.setView([38.6548763, -121.3835029],18)
    }

    console.log('restroom_data: ', restroom_data)
    console.log('restroom_markers: ', restroom_markers)
    console.log('done: ', done)
    console.log('internet_restroom_data: ', internet_restroom_data)
    console.log('showing_restroom_not_on_map: ', showing_restroom_not_on_map)
    console.log('map object: ', map)
}
window.debug = debug

function focus_on_my_location() {
    map.setView(pos.latlon_arr);
}

function map_on_click(event) {
    console.log(event.latlng)
}

async function load_restroom_then_render() {
    console.log('load restroom ha')
    let restroom_arr = null
    try{
        restroom_arr = await load_restroom_info_by_location(pos.latlon_arr, 40)
    } catch (err) {
        dialog_notice.open(err.message)
        console.log(err)
    }
    
    restroom_data = restroom_arr
    console.log('restroom data: ', restroom_data)
    show_filtered_restroom(restroom_arr)

}


async function locate_and_focus(use_cache = true, called_by_user = false, is_the_second_times = false) {
    if (called_by_user) console.log('user refreshed location')

    try {
        position = await get_location(use_cache)
    } catch (err) {
        dialog_notice.open(err)
    }

    try {
        pos = {
            latlon_arr: [position.coords.latitude, position.coords.longitude],
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp
        }
    } catch (err) {
        dialog_notice.open(err.message)
        console.error(err.message)
    }
    console.log('set pos: ', pos)

    map.setView(pos.latlon_arr, 16);

    if (user_location_pin) {user_location_pin.remove();}
    if (user_location_ratio) {user_location_ratio.remove()}

    user_location_pin = L.marker(pos.latlon_arr).bindPopup('here is your location, not a restroom').addTo(map)
    user_location_ratio = L.circle(pos.latlon_arr, {
        color: '#1344a0',
        radius: (pos.accuracy / 2) + 10
    }).addTo(map)

    if(pos.accuracy > 10000) {
        navbar.open(`Positioning error is too large! ${(pos.accuracy/2)/1000}km`, 2)
        if (!is_the_second_times) {
            console.log('TRY AGAIN')
            welcomescr.subtitle('Retrieving your location...')
            locate_and_focus(false, false, true)
            return
        }
    } else {
        console.log('COMPLETELY LOCATED!!!')
        navbar.close(2)
    }
    done = true
    welcomescr.hide()
    console.log('done')
    load_restroom_then_render()
    console.log(user_location_pin)
}

let showing_restroom_not_on_map = {
    is_it: false,
    marker: null
}
let showing_detail = false
function show_restroom_detail(restroom_id, not_on_map = false) {
    if (!done) return
    console.log('not on map?: ', not_on_map)
    if (showing_restroom_not_on_map.is_it && !not_on_map) {
        console.log(showing_restroom_not_on_map.is_it, !not_on_map)
        showing_restroom_not_on_map.is_it = false
        showing_restroom_not_on_map.marker.remove()
        showing_restroom_not_on_map.marker = null
    }

    let restroom_obj = false
    if (not_on_map) {
        restroom_obj = internet_restroom_data.find(i => i.id == restroom_id)
    } else {
        restroom_obj = restroom_data.find(i => i.id == restroom_id)
    }

    console.log(restroom_obj)

    if (!restroom_obj) throw new Error('restroom obj not found!: ', restroom_obj)
    
    const yes_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`
    const not_icon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`

    const display_name = detail_card.querySelector('#detail_name')
    const display_address = detail_card.querySelector('#detail_address_content')
    const detail_discance = detail_card.querySelector('#detail_discance')
    const direction = detail_card.querySelector('#direction')

    const feature_ada = detail_card.querySelector('#detail_ada')
    const feature_unisex = detail_card.querySelector('#detail_unisex')
    const feature_changing_table = detail_card.querySelector('#detail_changingatble')
    const comment = detail_card.querySelector('#comment')

    const detail_created_date = detail_card.querySelector('#detail_created_date')
    const detail_latest_update_date = detail_card.querySelector('#detail_latest_update_date')
    const detail_viewat = detail_card.querySelector('#detail_viewat')

    search_input.value = `${restroom_obj.name}, ${restroom_obj.street}`
    display_name.textContent = restroom_obj.name;
    display_address.textContent = `${restroom_obj.street}, ${restroom_obj.city}, ${restroom_obj.state}`
    if(restroom_obj.distance) detail_discance.textContent = `${restroom_obj.distance.toFixed(2)} Miles away`
    direction.textContent = restroom_obj.directions

    // reset style
    feature_ada.classList.remove('ok')
    feature_unisex.classList.remove('ok')
    feature_changing_table.classList.remove('ok')

    if (restroom_obj.accessible) {
        feature_ada.classList.add('ok')
        feature_ada.innerHTML = `${yes_icon} ADA Accessible`
    } else {
        feature_ada.innerHTML = `${not_icon} No ADA accessible`
    }

    if (restroom_obj.unisex) {
        feature_unisex.classList.add('ok')
        feature_unisex.innerHTML = `${yes_icon} Unisex`
    } else {
        feature_unisex.innerHTML = `${not_icon} No unisex`
    }

    if (restroom_obj.changing_table) {
        feature_changing_table.classList.add('ok')
        feature_changing_table.innerHTML = `${yes_icon} Changing Table`
    } else {
        feature_changing_table.innerHTML = `${not_icon} No Changing Table`
    }

    comment.textContent = restroom_obj.comment ? `"${restroom_obj.comment}"` : ''

    detail_created_date.textContent = `Created at: ${new Date(restroom_obj.created_at).toLocaleDateString()}`
    detail_latest_update_date.textContent = `Update at: ${new Date(restroom_obj.updated_at).toLocaleDateString()}`
    const link_restroomname = encodeURIComponent(restroom_obj.name).replace(/%20/g, '+')
    detail_viewat.href = `https://www.refugerestrooms.org/restrooms/new?edit_id=47252&id=${restroom_obj.id}&restroom_name=${link_restroomname}`

    detail_card.classList.add('show')
    showing_detail = true
    searchbar_smallicons.set_to('xmark')

    if (not_on_map) {
        showing_restroom_not_on_map.is_it = true
        let mk = L.marker([restroom_obj.latitude, restroom_obj.longitude], {
            icon: L.icon({
                    iconUrl: `../assets/icon/${restroom_obj.accessible?1:0}${restroom_obj.unisex?1:0}${restroom_obj.changing_table?1:0}.png`,
                    ...def_rst_set
                })
        }).addTo(map)
        showing_restroom_not_on_map.marker = mk
    }

    if (map._zoom > 13) {
        map.setView([restroom_obj.latitude, restroom_obj.longitude])
    } else {
        map.setView([restroom_obj.latitude, restroom_obj.longitude], 16)
    }
}
function clear_detail_show(save_input = false, clear_not_on_map_point = true) {
    if (
        showing_restroom_not_on_map.is_it &&
        clear_not_on_map_point
    ) {
        console.log('clear a not-on-map point!')
        showing_restroom_not_on_map.marker.remove()
        showing_restroom_not_on_map.is_it = false
    }
    detail_card.classList.remove('show')
    search_result_card.classList.remove('show')
    searchbar_smallicons.set_to('search')
    if (!save_input) search_input.value = ""
    showing_detail = false
}

function on_restroom_filter() {
    console.log('filter')
    show_filtered_restroom(restroom_data, false)
}

async function on_search() {
    if (!done) return
    const keyword = search_input.value
    if (!keyword) return

    console.log('search for: ', keyword)

    clear_detail_show(true)
    detail_card.classList.remove('show')

    search_result_card.querySelector('ul').innerHTML = `<div class="loader"></div>`
    searchbar_smallicons.set_to('xmark')
    search_result_card.classList.add('show')

    let info = []
    try {
        info = await search_restroom(keyword)
    } catch (err) {
        dialog_notice.open(err.message)
        return
    }

    internet_restroom_data = info

    const solve_arr = i => ({
        keywd: `${i.name}, ${i.street}, ${i.city}, ${i.state}`,
        display_kwd: `${i.name}, ${i.street}`,
        id: i.id,
        street: i.street,
        city: i.city,
        state: i.state
    })

    const local_restroom_kwd = restroom_data.map(solve_arr)
    const local_restroom_found = local_restroom_kwd.filter(i => i.keywd.toLowerCase().includes(keyword.toLowerCase()))
    const internet_restroom_found = info.map(solve_arr)

    const final_restroom_found_array = [
        ...new Map(
            local_restroom_found
            .concat(internet_restroom_found)
            .map(item => [item.id, item])
        ).values()
    ];

    const list_at = search_result_card.querySelector('ul')

    list_at.innerHTML = ''

    final_restroom_found_array.forEach(item => {
        const li = document.createElement('li')

        const h3 = document.createElement('h3')
        h3.textContent = item.display_kwd
        
        const p = document.createElement('p')
        p.textContent = `${item.street}, ${item.city}, ${item.state}`

        li.onclick = () => focus_on_searched_result_restroom(item.id)
        li.appendChild(h3)
        li.appendChild(p)
        list_at.appendChild(li)
    }) 
}

/**
 * @param {Array} restroom_arr 
 */
function show_filtered_restroom(restroom_arr, resetView = true) {
    if (!done) return
    const adav = ada.checked;
    const unisexv = unisex.checked;
    const chargingtablev = chargingtable.checked

    if (resetView) map.setView(pos.latlon_arr, 15)

    const rst = restroom_arr.filter(i => 
        (i.accessible || !adav) &&
        (i.unisex || !unisexv) && 
        (i.changing_table || !chargingtablev)
    );

    if (restroom_markers.length > 0) {
        console.log('available restroom found, clear them!')
        restroom_markers.forEach(element => {
            element.remove()
        });
    }

    rst.forEach(element => {
        const marker = L.marker([element.latitude, element.longitude], {
            icon: L.icon({
                iconUrl: `../assets/icon/${element.accessible? '1':'0'}${element.unisex?'1':'0'}${element.changing_table?'1':'0'}.png`,
                ...def_rst_set
            })
        }).addTo(map)
        
        marker.restroom_id = element.id

        marker.on("click", () => {
            show_restroom_detail(marker.restroom_id)
        });
        restroom_markers.push(marker)
    });
}
function focus_on_searched_result_restroom(rstrm_id){
    clear_detail_show(false, false)
    show_restroom_detail(rstrm_id, !Boolean(restroom_data.find(i => i.id === rstrm_id)))
}

focus_on_my_location_btn.addEventListener('click', throttle(() => {
    if (!done) return
    // locate_and_focus(false, true, true)
    map.setView(pos.latlon_arr, 16);
}, user_click_delay))

reload_restroom_info_around_me_btn.addEventListener('click', throttle(() => {
    if (!done) return
    load_restroom_then_render()
}, user_click_delay))

test_btn.addEventListener('click', throttle((e) => {
    dialog_notice.open(`App Made By Meloki. Any questions: <a href="./any_questions.html" target="_blank">Document</a>`, true)
}, user_click_delay))

search_input.addEventListener('focus', () => {
    if (showing_detail) {
        clear_detail_show(true, true)
    }
})

search_input.addEventListener('focusout', (e) => {
    if (e.relatedTarget != null) {
        search_input.value = ""
    }
    console.log(e)
})

search_form.addEventListener('submit', (e)=>{
    e.preventDefault()

    console.log('submit: ', e)
    on_search()
})

copy_btn.addEventListener('click', () => {
    if (!navigator.clipboard) return

    navigator.clipboard.writeText(
        document.getElementById('detail_address_content').textContent
    )
    copy_btn.textContent = 'Copied!'
    setTimeout(() => {
      copy_btn.textContent = 'Copy'  
    }, 1000);
})

ada.addEventListener('change', debounce(on_restroom_filter, 300))
unisex.addEventListener('change', debounce(on_restroom_filter, 300))
chargingtable.addEventListener('change', debounce(on_restroom_filter, 300))
searchbar_smallicons.xmark.addEventListener('click', () => clear_detail_show(false, true))
searchbar_smallicons.search.addEventListener('click', () => on_search())

var map = L.map('map', {
    zoomControl: false,
    maxZoom: 18
}).setView([39.446, -100.686], 4)// zoom on the U.S

L.control.zoom({ position: 'bottomleft' }).addTo(map)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
}).addTo(map);

if (!devmode) {
    try{
        locate_and_focus()
    } catch (err) {
        dialog_notice.open(err.message)
        console.error(err)
    }
} else { 
    debug()
}
searchbar_smallicons.set_to('search')