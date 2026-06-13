const accodingItems = document.querySelectorAll(".according-item");

accodingItems.forEach(item => {
    const title = item.querySelector(".according-title");
    const content = item.querySelector(".according-content");
    title.addEventListener('click', () => {
        for (var i = 0; i < accodingItems.length; i++) {
            if (accodingItems[i] != item) {
                accodingItems[i].classList.remove('active');
            } else {
                item.classList.toggle('active');
            }
        }

    });
});