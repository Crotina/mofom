// 导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 关闭移动端菜单当点击菜单项时
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA按钮点击事件
// const ctaButton = document.querySelector('.cta-button');
// if (ctaButton) {
//     ctaButton.addEventListener('click', () => {
//         alert('等待添加功能中');
//     });
// }

// 滚动时添加导航栏阴影
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// 页面加载动画
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});

function spc() {
	alert("KAWAIITECH");
}

function redirectTo(url) {
  if (typeof url === 'string' && url.startsWith('http')) {
    const a = document.createElement('a');
    a.href = url;
    a.style.display = 'none';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a); // 清理 DOM
  } else {
    console.error('无效的 URL' + url);
  }
}