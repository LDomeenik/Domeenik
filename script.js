// 네비게이션 클릭 시 해당 섹션으로 부드럽게 스크롤 이동 + 약간 위로 조정
document.querySelectorAll(".header-right a").forEach(anchor => {
anchor.addEventListener("click", function(event) {
    event.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);
    const offset = 60; // 추가적으로 위로 이동할 거리 (픽셀 단위)
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
});
});

// 헤더 왼쪽 상단 LEE JONGYOON 클릭 시 맨 위로 스크롤 이동
document.querySelector(".header-left h1").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 각 섹션을 접었다 펼치는 기능 추가
document.querySelectorAll(".collapsible .section-header").forEach(header => {
    header.addEventListener("click", function() {
        const content = this.nextElementSibling;
        content.style.display = content.style.display === "none" ? "block" : "none";
    });
});

// 스크롤 시 섹션 등장 효과
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section-content");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// 각 섹션을 접었다 펼치는 기능 추가 + 삼각형 방향 변경
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".collapsible .section-header").forEach(header => {
        header.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".toggle-icon");

            // 'active' 클래스를 토글하여 접었다 펼쳤다 함
            content.classList.toggle("active");

            // 삼각형 방향 변경
            if (content.classList.contains("active")) {
                icon.textContent = "▲"; // 펼쳐졌을 때 위 방향
            } else {
                icon.textContent = "▼"; // 접혔을 때 아래 방향
            }
        });

        // 기본적으로 섹션이 접힌 상태로 설정
        const content = header.nextElementSibling;
        content.classList.remove("active"); // active 클래스 제거
    });
});
