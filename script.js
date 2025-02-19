document.addEventListener("DOMContentLoaded", function () {
    const hamburgerMenu = document.querySelector(".hamburger-menu");
    const mobileNav = document.querySelector(".mobile-nav");
    const headerTitle = document.querySelector(".header-left h1"); // 헤더 제목 선택

    // 📌 햄버거 메뉴 클릭 이벤트
    hamburgerMenu.addEventListener("click", function () {
        // 메뉴 토글
        mobileNav.style.display = (mobileNav.style.display === "flex") ? "none" : "flex";

        // 클릭하면 hover 색상 유지
        hamburgerMenu.classList.toggle("active");
    });

    // 📌 모바일 메뉴에서 항목 클릭 시 자동으로 닫힘
    document.querySelectorAll(".mobile-nav a").forEach(link => {
        link.addEventListener("click", function () {
            mobileNav.style.display = "none";
            hamburgerMenu.classList.remove("active"); // 메뉴 닫힐 때 hover 색 제거
        });
    });

    // 📌 헤더 왼쪽 제목 클릭 시 최상단으로 스크롤 이동
    headerTitle.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" }); // 부드럽게 맨 위로 이동
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const pages = document.querySelectorAll(".page"); // 모든 페이지 섹션 가져오기
    let currentPageIndex = 0; // 현재 페이지 인덱스
    let isScrolling = false; // 중복 실행 방지

    // 📌 스크롤 이벤트 감지 (휠 마우스 or 트랙패드)
    document.addEventListener("wheel", (event) => {
        if (isScrolling) return; // 스크롤 중이면 실행 안 함
        isScrolling = true;

        // 🔼 위로 스크롤 (이전 페이지)
        if (event.deltaY < 0 && currentPageIndex > 0) {
            currentPageIndex--;
        }
        // 🔽 아래로 스크롤 (다음 페이지)
        else if (event.deltaY > 0 && currentPageIndex < pages.length - 1) {
            currentPageIndex++;
        }

        // 페이지 이동 실행
        moveToPage(currentPageIndex);

        // 1초 동안 추가 스크롤 방지
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });

    // 📌 터치 스크롤 감지 (모바일 대응)
    let touchStartY = 0;
    document.addEventListener("touchstart", (event) => {
        touchStartY = event.touches[0].clientY; // 터치 시작 위치 저장
    });

    document.addEventListener("touchend", (event) => {
        let touchEndY = event.changedTouches[0].clientY;
        let touchDiff = touchStartY - touchEndY;

        if (isScrolling) return; // 중복 실행 방지
        isScrolling = true;

        // 🔼 위로 스크롤 (이전 페이지)
        if (touchDiff < -50 && currentPageIndex > 0) {
            currentPageIndex--;
        }
        // 🔽 아래로 스크롤 (다음 페이지)
        else if (touchDiff > 50 && currentPageIndex < pages.length - 1) {
            currentPageIndex++;
        }

        // 페이지 이동 실행
        moveToPage(currentPageIndex);

        // 1초 동안 추가 스크롤 방지
        setTimeout(() => {
            isScrolling = false;
        }, 1000);
    });

    // 📌 페이지 이동 함수
    function moveToPage(index) {
        const targetPosition = pages[index].offsetTop;
        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });
    }

    // 📌 네비게이션 메뉴 클릭 시 해당 페이지로 이동 (부드러운 스크롤)
    document.querySelectorAll(".header-right a, .mobile-nav a").forEach((link) => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // 기본 링크 동작 방지
            const targetId = this.getAttribute("href").substring(1); // href의 ID 값 가져오기
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // 해당 섹션의 인덱스 찾기
                currentPageIndex = Array.from(pages).indexOf(targetElement);
                moveToPage(currentPageIndex);
            }
        });
    });
})
