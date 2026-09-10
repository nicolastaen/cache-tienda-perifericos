const slider = document.querySelector('.slider');
const banners = document.querySelectorAll('.banner');

let index = 0;

function siguienteBanner(){
    index++

    if (index >= banners.length) {
        index = 0
    }

    slider.style.transform = `translateX(-${index * 100}%)`
}

setInterval(siguienteBanner, 5000)