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

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".page"); // 모든 섹션
    const navLinks = document.querySelectorAll(".header-right a, .mobile-nav a"); // 네비게이션 링크들

    const observerOptions = {
        root: null, // 뷰포트 기준
        rootMargin: "0px",
        threshold: 0.5 // 50% 이상 보이면 감지
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute("id"); // 현재 보이는 섹션 ID
            const correspondingLink = document.querySelector(`.header-right a[href="#${id}"], .mobile-nav a[href="#${id}"]`);

            if (entry.isIntersecting) {
                navLinks.forEach(link => link.style.color = "white"); // 기본 색상
                if (correspondingLink) {
                    correspondingLink.style.color = "#F1C40F"; // 현재 섹션의 네비게이션 버튼을 노란색으로 변경
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", function () {
    let gifImg = document.querySelector(".skill-img img"); // GIF 이미지 선택
    let gifSrc = gifImg.src; // 원본 GIF 경로 저장

    setTimeout(() => {
        let parent = gifImg.parentNode;
        gifImg.remove(); // GIF 요소 제거
        let staticImg = document.createElement("img");
        staticImg.src = gifSrc.replace(".gif", ".png"); // GIF의 첫 프레임을 PNG로 교체
        staticImg.alt = "skill";
        parent.appendChild(staticImg); // PNG 추가 (GIF 대체)
    }, 5000); // 5초 후 GIF 제거 후 정지 이미지로 대체
});

document.addEventListener("DOMContentLoaded", function () {
    let gifImg = document.querySelector(".skill-img img"); // GIF 이미지 선택
    let gifSrc = gifImg.dataset.src; // 원본 GIF 경로 (data-src 속성 사용)
    let staticImgSrc = gifSrc.replace(".gif", ".png"); // 정지 이미지 (첫 프레임 PNG)
    let isPlaying = false; // GIF가 실행 중인지 확인하는 변수

    // 스킬 섹션 감지
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isPlaying) {
                isPlaying = true; // GIF 실행 중 표시
                playGif();
            }
        });
    }, { threshold: 0.6 }); // 60% 이상 보일 때 감지

    observer.observe(document.querySelector("#page5")); // page5 감지

    function playGif() {
        let gifImgElement = document.querySelector(".skill-img img");
        gifImgElement.src = gifSrc; // GIF 실행

        setTimeout(() => {
            gifImgElement.src = staticImgSrc; // GIF를 PNG로 변경하여 정지
            isPlaying = false; // 다시 실행 가능하도록 변경
        }, 5000); // 5초 후 GIF 멈춤
    }
});

