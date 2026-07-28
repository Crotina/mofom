const links = [
    {
        name: "2000+ free fonts",
        link: "https://www.mediafire.com/folder/iqwqcm7d6xzi0/FREE_FONTS_(2100%2B_fonts)"
    },
    {
        name: "Restroom Finder",
        link: "https://mofom.net/cacs/restroomfinder"
    },
    {
        name: "Fun Fact Center",
        link: 'https://mofom.net/cacs/knowle'
    },
    {
        name: "Fun Fact Center (cat version)",
        link: 'https://mofom.net/cacs/knowle/cat'
    },
    {
        name: "countries test",
        link: 'https://mofom.net/cacs/country_test'
    }
]

const links_array = [
    ['2000+ free fonts', 'https://www.mediafire.com/folder/iqwqcm7d6xzi0/FREE_FONTS_(2100%2B_fonts)'],
    ["Restroom Finder", "https://mofom.net/cacs/restroomfinder"],
    ['Fun Fact Center', 'https://mofom.net/cacs/knowle'],
    ["Fun Fact Center (cat version)", 'https://mofom.net/cacs/knowle/cat'],
    ["countries test", 'https://mofom.net/cacs/country_test'],
    ['Base defense Game', 'https://mofom.net/cacs/basedefence']
]

const linkslist = document.getElementById("linkslist")

links_array.map((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a')

    a.href = item[1]
    a.target = '_blank'
    a.textContent = item[0]
    a.title = item[0]

    li.appendChild(a)
    linkslist.appendChild(li)
})