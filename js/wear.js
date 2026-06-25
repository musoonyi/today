// 성별 선택 아이콘
document.querySelectorAll('.uni-item').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.uni-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
    });
});

// 아이콘들
document.querySelectorAll('.cate-item').forEach(el => {
    el.addEventListener('click', () => {
        document.querySelectorAll('.cate-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
    });
});

// 스와이퍼 / 반응형
const swiper = new Swiper('.fashion_1', {
    slidesPerView: 5,
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,

    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },

    breakpoints: {
        0: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 3,
            spaceBetween: 12,
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 14,
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 14,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1200: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    }
});

// 좋아요 기능
document.querySelectorAll('.heart').forEach(heart => {
    heart.addEventListener('mouseout', () => {
        if (!heart.classList.contains('liked')) {
            heart.textContent = '🤍';
        }
    });

    heart.addEventListener('click', () => {
        heart.classList.toggle('liked');
        heart.textContent = heart.classList.contains('liked') ? '❤️' : '🤍';
    });
});

// 좋아요 숫자 증감
document.querySelectorAll('.talk_stats .heart').forEach(heart => {
    const likeCount = heart.nextElementSibling;
    const originalCount = parseInt(likeCount.textContent);

    heart.addEventListener('click', () => {
        if (heart.classList.contains('liked')) {
            likeCount.textContent = originalCount + 1;
        } else {
            likeCount.textContent = originalCount;
        }
    });
});

// =============================================
// 패션_2 스와이퍼
// 순서 중요: 외부 DOM 구조 먼저 → 내부 스와이퍼 나중에
// =============================================

let outerSwiper = null;

function buildOuterDOM() {
    // 이미 swiper-wrapper가 있으면 건너뜀
    const wrap = document.querySelector('.m_wrap');
    if (!wrap || wrap.querySelector(':scope > .swiper-wrapper')) return;

    wrap.classList.add('swiper');

    const wrapper = document.createElement('div');
    wrapper.classList.add('swiper-wrapper');

    // .m_card를 swiper-wrapper 안으로 이동
    [...wrap.querySelectorAll(':scope > .m_card')].forEach(card => {
        card.classList.add('swiper-slide');
        wrapper.appendChild(card);
    });

    wrap.appendChild(wrapper);
}

function destroyOuterDOM() {
    const wrap = document.querySelector('.m_wrap');
    if (!wrap) return;

    if (outerSwiper) {
        outerSwiper.destroy(true, true);
        outerSwiper = null;
    }

    const swiperWrapper = wrap.querySelector(':scope > .swiper-wrapper');
    if (swiperWrapper) {
        [...swiperWrapper.querySelectorAll('.m_card')].forEach(card => {
            card.classList.remove('swiper-slide');
            wrap.appendChild(card);
        });
        swiperWrapper.remove();
    }

    wrap.classList.remove('swiper');
}

function initInnerSwipers() {
    // 내부 카드 스와이퍼 (이미 초기화된 것은 건너뜀)
    document.querySelectorAll('.m_card .m_img.swiper').forEach(el => {
        // Swiper가 이미 초기화됐으면 el.swiper 인스턴스가 존재
        if (el.swiper) return;
        new Swiper(el, {
            loop: true,
            pagination: {
                el: el.querySelector('.swiper-pagination'),
                clickable: true,
                dynamicBullets: true,
            },
        });
    });
}

function initOuterSwiper() {
    const wrap = document.querySelector('.m_wrap');
    if (!wrap) return;

    const isMobile = window.innerWidth <= 900;

    if (isMobile && !outerSwiper) {
        // 1) 외부 DOM 구조 먼저 잡기
        buildOuterDOM();

        // 2) 외부 Swiper 초기화
outerSwiper = new Swiper(wrap, {
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0:   { slidesPerView: 2, spaceBetween: 12 },
        480: { slidesPerView: 2, spaceBetween: 14 },
        540: { slidesPerView: 2, spaceBetween: 14 },
        640: { slidesPerView: 3, spaceBetween: 16 },
        769: { slidesPerView: 3, spaceBetween: 20 },
    }
});
        // 3) 내부 스와이퍼 초기화 (DOM 완성 후)
        initInnerSwipers();

    } else if (!isMobile && outerSwiper) {
        destroyOuterDOM();
        // 내부 스와이퍼는 el 자체가 유지되므로 별도 재초기화 불필요
    }
}

// 초기 실행
initOuterSwiper();

// 768px 초과(데스크탑)일 때는 내부 스와이퍼만 초기화
if (window.innerWidth > 900) {
    initInnerSwipers();
}

// 리사이즈 시 재실행 (디바운스 적용)
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(initOuterSwiper, 150);
});

// 배너 영역
const adTxt = document.querySelector('.ad_1_txt');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

observer.observe(adTxt);

// 탑버튼
document.getElementById("topBtn").addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// 다크모드
const lightBtn = document.querySelector(".Light");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

lightBtn.addEventListener("click", function (e) {
    e.preventDefault();
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// 댓글
const modal = document.querySelector('.comment_modal');
const closeBtn = document.querySelector('.modal_close');

const commentBtns = document.querySelectorAll('.talk_emoji');

commentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.add('active');
    });
});

closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});