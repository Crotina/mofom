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

const linkslist = document.getElementById("linkslist")

links.map((item) => {
    const li = document.createElement('li');
    const a = document.createElement('a')

    a.href = item.link
    a.target = '_blank'
    a.textContent = item.name
    a.title = item.name

    li.appendChild(a)
    linkslist.appendChild(li)
})