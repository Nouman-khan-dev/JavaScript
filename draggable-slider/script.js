const carousel = document.querySelector('.carousel');
const wrapper = document.querySelector('.wrapper');
const arrowBtns = document.querySelectorAll('.icon');
const fisrtCardWidth = carousel.querySelector('.card').offsetWidth;
const caroselChildrens = [...carousel.children];
let isDragging = false,
    startX,
    startScrollLeft,
    timeOutId;

let cardPreView = Math.round(carousel.offsetWidth / fisrtCardWidth);

caroselChildrens
    .slice(-cardPreView)
    .reverse()
    .forEach((card) => {
        carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
    });

caroselChildrens.slice(0, cardPreView).forEach((card) => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML);
});

arrowBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft +=
            btn.id === 'left' ? -fisrtCardWidth : fisrtCardWidth;
    });
});

const dragstart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
};

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
};

const autoPlay = () => {
    if (window.innerWidth < 800) return;
    timeOutId = setTimeout(
        () => (carousel.scrollLeft += fisrtCardWidth),
        2500
    );
};
autoPlay();

const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft =
            carousel.scollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
    ) {
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }
    clearTimeout(timeOutId);
    if (wrapper.matches(':hover')) autoPlay();
};

carousel.addEventListener('mousedown', dragstart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('scroll', infiniteScroll);
wrapper.addEventListener('mouseenter', () => clearTimeout(timeOutId));
wrapper.addEventListener('mouseleave', autoPlay());
