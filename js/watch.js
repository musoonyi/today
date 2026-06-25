// 검색 함수
function search() {
    const keyword = document.getElementById("text").value.trim();
    if (keyword) {
        alert(`"${keyword}" 검색 결과입니다.`);
    } else {
        alert("검색어를 입력해주세요.");
    }
}
function enterSearch(e) {
    if (e.key === "Enter") search();
}

// 메인배너
const bannerSwiper = new Swiper(".bannerSwiper", {
    loop: true,
    scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
    },
    pagination: {
        el: ".banner-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 2500,
    },
    breakpoints: {
        320: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 }
    }
});

// 리뷰 - 화면 크기에 따라 다르게 초기화
function initReviewSwiper() {
    if (reviewSwiper) reviewSwiper.destroy(true, true);

    const isMobile = window.innerWidth < 1025;

    reviewSwiper = new Swiper(".reviewSwiper", {
        loop: true,
        slidesPerView: 1,
        spaceBetween: isMobile ? 10 : 30,
        autoHeight: true,
        observer: true,
        observeParents: true,
        direction: isMobile ? "horizontal" : "vertical",
        mousewheel: isMobile ? false : true,
        pagination: {
            el: ".review-pagination",
            clickable: true,
        },
    });
}

let reviewSwiper;
initReviewSwiper();

// 화면 크기 바뀔 때 다시 초기화
window.addEventListener("resize", () => {
    initReviewSwiper();
});

createCardSwiper(".top10Swiper", ".top10-pagination", 20);
createCardSwiper(".comedySwiper", ".comedy-pagination");
createCardSwiper(".nightSwiper", ".night-pagination");
createCardSwiper(".dramaSwiper", ".drama-pagination");
createCardSwiper(".animeSwiper", ".anime-pagination");
createCardSwiper(".newSwiper", ".new-pagination");

function createCardSwiper(name, pagination, gap = 15) {
    return new Swiper(name, {
        slidesPerView: 7,
        spaceBetween: gap,
        freeMode: true,
        grabCursor: true,
        pagination: {
            el: pagination,
            clickable: true
        },
        breakpoints: {
            310: { slidesPerView: 2.5, spaceBetween: 8 },
            460: { slidesPerView: 2.8, spaceBetween: 10 },
            650: { slidesPerView: 4.5, spaceBetween: 12 },
            1024: { slidesPerView: 6, spaceBetween: 14 },
            1200: { slidesPerView: 6, spaceBetween: gap },
            1440: { slidesPerView: 7, spaceBetween: gap }
        }
    });
}

// 푸터 TOP버튼
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


// 코드 정리
// 변수 선언
// const — 재할당 안 되는 변수 선언. 값이 바뀌지 않을 때 씀
// let — 재할당 가능한 변수 선언. 값이 바뀔 수 있을 때 씀

// DOM 선택
// document.getElementById("id명") — id로 요소 하나 선택
// document.querySelector(".클래스명") — CSS 선택자로 요소 하나 선택. 첫 번째 것만 가져옴

// 검색 함수
// .value — input 태그에 입력된 값 가져옴
// .trim() — 앞뒤 공백 제거. 스페이스만 입력해도 빈 값으로 처리하려고 씀
// alert() — 팝업 메시지 띄움
// `"${변수}"` — 템플릿 리터럴. 백틱 안에서 ${} 로 변수를 문자열에 끼워 넣음
// e.key === "Enter" — 누른 키가 엔터인지 확인

// Swiper
// new Swiper("선택자", {옵션}) — Swiper 라이브러리로 슬라이더 만듦. 선택자에 해당하는 요소를 슬라이더로 초기화
// loop: true — 마지막 슬라이드에서 첫 슬라이드로 무한 반복
// autoplay: { delay: 2500 } — 2.5초마다 자동으로 넘어감
// slidesPerView — 한 화면에 보이는 슬라이드 개수
// spaceBetween — 슬라이드 사이 간격 (px)
// direction: "vertical" — 슬라이드 방향을 세로로
// direction: "horizontal" — 슬라이드 방향을 가로로
// mousewheel: true — 마우스 휠로 슬라이드 넘길 수 있게
// freeMode: true — 슬라이드가 딱딱 멈추지 않고 자유롭게 드래그됨
// autoHeight: true — 슬라이드 내용 높이에 맞게 자동으로 높이 조절
// observer: true — Swiper가 DOM 변화를 감지해서 자동으로 업데이트
// observeParents: true — 부모 요소의 변화도 감지
// scrollbar: { el, draggable } — 스크롤바 표시. draggable이면 드래그 가능
// pagination: { el, clickable } — 페이지네이션(점) 표시. clickable이면 클릭으로 이동 가능
// breakpoints: { 숫자: {옵션} } — 화면 너비별로 다른 옵션 적용. 반응형 처리할 때 씀

// 함수
// function 함수명() {} — 함수 선언. 나중에 이름으로 호출해서 씀
// function 함수명(매개변수 = 기본값) — 매개변수에 기본값 설정. 값을 안 넘기면 기본값 사용. gap = 15 가 그 예시
// return — 함수 실행 결과를 반환

// 이벤트
// .addEventListener("click", function() {}) — 요소 클릭했을 때 함수 실행
// e.preventDefault() — 기본 동작 막음. 링크 클릭시 페이지 이동 같은 거 방지
// window.scrollTo({ top: 0, behavior: "smooth" }) — 페이지 맨 위로 부드럽게 스크롤

// 다크모드
// localStorage.getItem("키") — 브라우저에 저장된 값 가져옴. 페이지 새로고침해도 유지됨
// localStorage.setItem("키", "값") — 브라우저에 값 저장
// classList.add("클래스명") — 요소에 클래스 추가
// classList.toggle("클래스명") — 클래스 있으면 제거, 없으면 추가
// classList.contains("클래스명") — 해당 클래스 가지고 있는지 확인. true/false 반환