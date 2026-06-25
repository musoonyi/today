//--------------------------------------------------------->팝업창
        const raffleBtn = document.querySelector('.raffleBtn');
        const rafflePopup = document.getElementById('rafflePopup');
        const closePopup = document.getElementById('closePopup');
        const spinBtn = document.getElementById('spinBtn');
        const rouletteWheel = document.getElementById('rouletteWheel');

        let currentRotation = 0;
        let isSpinning = false;

        /* 팝업 열기 */
        raffleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            rafflePopup.style.display = 'block';
        });

        /* 팝업 닫기 */
        closePopup.addEventListener('click', () => {
            rafflePopup.style.display = 'none';

        /* 룰렛 초기화 */
        currentRotation = 0;
        isSpinning = false;

        rouletteWheel.style.transition = 'none';
        rouletteWheel.style.transform =
            'translate(-50%, -50%) rotate(0deg)';
        });

        /* 룰렛 돌리기 */
        spinBtn.addEventListener('click', () => {

            if(isSpinning) return;

            isSpinning = true;

            const randomDeg = Math.floor(Math.random() * 360);
            currentRotation += 3600 + randomDeg;

            rouletteWheel.style.transition =
                'transform 5s cubic-bezier(.17,.67,.18,.99)';

            rouletteWheel.style.transform =
                `translate(-50%, -50%) rotate(${currentRotation}deg)`;

            rouletteWheel.addEventListener('transitionend', () => {

                isSpinning = false;

                const finalDeg = currentRotation % 360;

                console.log('멈춘 각도:', finalDeg);

                // 여기서 당첨 결과 계산

            }, { once:true });

        });

        //--------------------------------------------------------->탭메뉴
        document.addEventListener("DOMContentLoaded", () => {

            // 1. tabcon0에 12개 합치기 (Swiper용)
            const all = document.querySelector(".tabcon0");
            const tabs = document.querySelectorAll(".cont_all:not(.tabcon0)");

            //모든 탭 콘텐츠를 Swiper용 컨테이너로 합치기
            let html = "";
                tabs.forEach(tab => {
                    html += tab.innerHTML;
            });
            all.innerHTML = html;

            // swiper-slide 클래스 추가
            document.querySelectorAll(".tabcon0 li").forEach(li => {
                li.classList.add("swiper-slide");
            });
            
            // 2. Swiper 초기화
            window.mySwiper = new Swiper(".mySwiper", {
                slidesPerView: 1,
                spaceBetween: 5,
                loop: true,
                speed: 1000,

                observer: true,
                observeParents: true,

                breakpoints: {
                    1240: { slidesPerView: 3 },
                    1024: { slidesPerView: 2.5 },
                    768: { slidesPerView: 1.5},
                    480: { slidesPerView: 1},
                }
            });


            // 3. 초기 화면 상태 (핵심)

            // 제이쿼리 이름 정의
            const tabBtn = $(".act_tabBtn>ul>li");
            const tabCont = $(".cont_all").not(".tabcon0");

            $(".tabcon0").show(); // 전체 먼저
            $(".cont_all").not(".tabcon0").hide(); // 나머지 숨김

            // 4. 탭메뉴
            tabBtn.on("click", function (e) {
                e.preventDefault();

                let index = $(this).index();

                tabBtn.removeClass("active");
                $(this).addClass("active");

                tabCont.hide();


                if (index === 0) {
                    // 전체
                    $(".tabcon0").show();
                    mySwiper.update(); // Swiper야 지금 화면 다시 계산해

                    // row1 첫 카드로 리셋
                    const firstCard = $(".act_tabCont li").first(); //첫번째 li선택
                    $(".act_tabCont li").removeClass("active");
                    firstCard.addClass("active");

                    const firstId = firstCard.data("id"); //첫 번째 li의 data-id 값을 변수에 저장해라

                    // row2 첫 상세로 리셋
                    $(".act_view > ul > li").removeClass("active");
                    $(`.act_view > ul > li[data-id="${firstId}"]`).addClass("active");
                    //  `변수` ES6 문법 : 템플릿 리터럴 즉, data-id가 act1인 li를 찾는 선택자

                    // Swiper위치
                    mySwiper.slideTo(0); //Swiper를 0번째 슬라이드(첫 번째)로 이동시켜라

                } else {
                    $(".tabcon0").hide();
                    tabCont.eq(index - 1).stop(true, true).fadeIn(); 
                }
            });


            // 5. row1 클릭 → row2 변경
            const listItems = $(".act_tabCont li");      // row1
            const details = $(".act_view > ul > li");    // row2 

            listItems.on("click", function (e) {
                e.preventDefault();

                const id = $(this).data("id");

                // row1 active 표시
                listItems.removeClass("active");
                $(this).addClass("active");

                // row2 전부 off
                details.removeClass("active");

                // 해당 id만 active
                $(`.act_view > ul > li[data-id="${id}"]`).addClass("active");
            });

        });


        
        //--------------------------------------------------->클릭이벤트


        // 랭크 버튼 (댓글창)
        $('.rank_comentBtn').on('click', function () {
            $(this).addClass('hide');
            $(this).siblings('.rank_comments').addClass('active');
        });

        $('.rank_comments > em').on('click', function () {
            $(this)
                .parent()
                .removeClass('active')
                .siblings('.rank_comentBtn')
                .removeClass('hide');
        });


        // 푸터 TOP버튼
        document.getElementById("topBtn").addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });


        // 이벤트 전체보기
        const eventBtn = document.querySelector(".eventBtn");
        eventBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            eventBtn.classList.add("on");
            setTimeout(()=>{
                eventBtn.classList.remove("on");
            }, 1500);
        })


        // 랭킹 전체보기
        const allBtn = document.querySelector(".allBtn");
        allBtn.addEventListener("click",(e)=>{
            e.preventDefault();
            allBtn.classList.add("on");
            setTimeout(()=>{
                allBtn.classList.remove("on");
            }, 1500);
        })

        // 더 많은 활동 보기 클릭
        const actBtn = document.querySelector(".act_more");
        actBtn.addEventListener("click",()=>{
            actBtn.classList.toggle("on");
        })

        // 내 주변 보기 클릭
        const nearBtn = document.querySelector(".map_nearby");
        nearBtn.addEventListener("click", ()=>{
            nearBtn.classList.add("on");
            setTimeout(()=>{
                nearBtn.classList.remove("on");
            }, 1500); // 1초 후 원래 상태
        })

        //필터 더보기 클릭
        const fillBtn = document.querySelector(".filter_more");
        const panel = document.querySelector(".filter_panel");
        const checks = document.querySelectorAll(".filter_panel input[type='checkbox']");

        fillBtn.addEventListener("click", ()=>{
            panel.classList.toggle("on");
            fillBtn.classList.toggle("on");
            
            // 패널 닫힐 때 체크 해제
            if (panel.classList.contains("on")){
                checks.forEach(chbox => chbox.checked = false);
            }
            // chbox : 체크박스하나 변수이름
            // .contains() : 포함하고있냐?
            // chbox.checked = false; : 체크상태해제
        });


        //--------------------------------------------------------->검색창

        function enterSearch(e){
            if(e.key === "Enter"){
                search();
            }
        }
        //e.key : 키보드 이벤트에서 사용자가 어떤 키를 눌렀는지 알려주는 속성
        function search(){
            let sch = document.getElementById("text").value;
            // console.log("sch",sch)
            window.location.href="https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=" +sch;
        }


        //--------------------------------------------------------->맵지도

        const map = new maplibregl.Map({
            container: "map",
                style: {
                    version: 8,
                    sources: {
                        osm: {
                            type: "raster",
                            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
                            tileSize: 256
                        }
                    },
                    layers: [
                        {
                            id: "osm",
                            type: "raster",
                            source: "osm"
                        }
                    ]
                },
            attributionControl: false,
            center: [126.8500, 37.5320],
            zoom: 16
        });


        // 마커
        new maplibregl.Marker({ color: "#2d7ff9" })
            .setLngLat([126.8500, 37.5320])
            .addTo(map);

        map.on("load", () => {
            map.resize();
            map.setCenter([126.8500, 37.5320]);
        });

        new maplibregl.Marker({ anchor: "center" })
            .setLngLat([126.8500, 37.5320])
            .setPopup(new maplibregl.Popup().setText("화곡동"))
            .addTo(map);


        map.getCanvas().style.filter =
            " saturate(0.8) contrast(1.05)";

        map.getCanvas().style.backgroundColor =
            getComputedStyle(document.documentElement)
                .getPropertyValue("--icon-color");        



        // 검색창 입력시 지도에서 위치이동
        async function msearch() {
            const keyword = document.getElementById("mtext").value;

            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(keyword)}`
            );

            const result = await response.json();

            if (result.length === 0) {
                alert("검색 결과가 없습니다.");
                return;
            }

            const lat = parseFloat(result[0].lat);
            const lon = parseFloat(result[0].lon);

            map.flyTo({
                center: [lon, lat],
                zoom: 15
            });

            new maplibregl.Marker()
                .setLngLat([lon, lat])
                .addTo(map);
        }        

        // 엔터
        function entermSearch(event) {
            if (event.key === "Enter") {
                msearch();
            }
        }

        // 내 주변 보기
        document.querySelector(".map_nearby").addEventListener("click", ()=>{

            if (!navigator.geolocation) {
                alert("위치 정보를 사용할 수 없습니다.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {

                    const lng = position.coords.longitude;
                    const lat = position.coords.latitude;

                    map.flyTo({
                        center: [lng, lat],
                        zoom: 16
                    });

                    new maplibregl.Marker({
                        color: "#ff0000"
                    })
                    .setLngLat([lng, lat])
                    .addTo(map);

                },
                (error) => {
                    alert("위치 정보를 가져올 수 없습니다.");
                    console.error(error);
                }
            );
        });

        //줌인아웃
        document.querySelector(".zoomin").addEventListener("click", () => {
            map.easeTo({
                zoom: map.getZoom() + 1
            });
        });

        document.querySelector(".zoomout").addEventListener("click", () => {
            map.easeTo({
                zoom: map.getZoom() - 1
            });
        });
        
        
        //----------------------------------------------------------->랭킹

        var swiper = new Swiper(".mySwiper2", {
            direction: "vertical",
            slidesPerView: 3,
            freeMode: true,
            scrollbar: {
                el: ".swiper-scrollbar",
            },
            mousewheel: true,
        });


        //---------------------------------------------------------->이벤트
       
        var swiper = new Swiper('.mySwiper3', {
            slidesPerView: 1,
            spaceBetween: 18,
            speed: 1000,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                1024: { slidesPerView: 4 },
                900: { slidesPerView: 3 },
                768: { slidesPerView: 2 },
                480: { slidesPerView: 1 }
            }
        })


        //-------------------------------------------------------->다크모드

        const lightBtn = document.querySelector(".Light");

        if(localStorage.getItem("theme") === "dark"){
            document.body.classList.add("dark");
        }

        lightBtn.addEventListener("click", function(e){
            e.preventDefault();

            document.body.classList.toggle("dark");

            if(document.body.classList.contains("dark")){
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });