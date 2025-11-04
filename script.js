// 다크모드 토글
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// 초기 테마 적용
if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// 탭 전환 기능
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // 모든 탭 버튼과 콘텐츠에서 active 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // 클릭한 탭 버튼과 해당 콘텐츠에 active 클래스 추가
        button.classList.add('active');
        const targetElement = document.getElementById(targetTab);
        
        if (targetElement) {
            targetElement.classList.add('active');
        } else {
            console.error(`탭 요소를 찾을 수 없습니다: ${targetTab}`);
        }
        
        // 부드러운 스크롤
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// 코드 복사 기능
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const codeId = button.getAttribute('data-code');
        const codeElement = document.getElementById(codeId);
        
        if (codeElement) {
            const codeText = codeElement.textContent;
            
            try {
                await navigator.clipboard.writeText(codeText);
                
                // 복사 성공 피드백
                const originalText = button.textContent;
                button.textContent = '✓ 복사됨!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                // 클립보드 API가 작동하지 않는 경우 대체 방법
                const textArea = document.createElement('textarea');
                textArea.value = codeText;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    document.execCommand('copy');
                    button.textContent = '✓ 복사됨!';
                    button.classList.add('copied');
                    
                    setTimeout(() => {
                        button.textContent = '복사';
                        button.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    alert('복사에 실패했습니다. 코드를 직접 선택해서 복사해주세요.');
                }
                
                document.body.removeChild(textArea);
            }
        }
    });
});

// 페이지 로드 시 부드러운 애니메이션
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 스크롤 시 헤더 그림자 효과
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// 키보드 단축키 지원
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K로 다크모드 토글
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        themeToggle.click();
    }
});

// 외부 링크에 자동으로 새 탭 열기 아이콘 추가 (선택사항)
const externalLinks = document.querySelectorAll('a[target="_blank"]');
externalLinks.forEach(link => {
    link.setAttribute('rel', 'noopener noreferrer');
});

