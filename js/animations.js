// أنيميشن متقدمة لموقع كيان

// أنيميشن الكتابة (Typewriter)
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // بدء الكتابة عندما يظهر العنصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(element);
    });
}

// أنيميشن العدادات (للقسم الإحصائي)
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // بدء العد عندما يظهر العنصر
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// أنيميشن التمرير السلس للروابط
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // تعويض لشريط التنقل
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// أنيميشن ظهور العناصر بالتتابع
function initStaggeredAnimation() {
    const staggeredElements = document.querySelectorAll('.stagger-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 150); // تأخير 150ms بين كل عنصر
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    staggeredElements.forEach(element => {
        observer.observe(element);
    });
}

// أنيميشن البارالاكس (Parallax)
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed') || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// أنيميشن الشريط التقدمي (Progress Bar)
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                }, 300);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// أنيميشن تحميل الصفحة
function initPageLoader() {
    window.addEventListener('load', () => {
        const loader = document.querySelector('.page-loader');
        if (loader) {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });
}

// أنيميشن القائمة المتنقلة
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // أنيميشن للأشرطة
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transform = mobileMenuToggle.classList.contains('active') 
                    ? `rotate(${index === 1 ? '0' : '45'}deg) translate(${index === 1 ? '0, 0' : '0, 8px'})`
                    : 'none';
            });
        });
    }
}

// تهيئة جميع الأنيميشنات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initTypewriter();
    initSmoothScroll();
    initStaggeredAnimation();
    initParallax();
    initProgressBars();
    initPageLoader();
    initMobileMenu();
    
    // تهيئة العدادات عندما تظهر في الشاشة
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
});

// أنيميشن للزر العائم للواتساب
function initFloatingButton() {
    const whatsappBtn = document.querySelector('.whatsapp-float');
    
    if (whatsappBtn) {
        // إضافة تأثير النبض
        setInterval(() => {
            whatsappBtn.classList.toggle('pulse');
        }, 2000);
        
        // تأثير عند التمرير
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                whatsappBtn.style.transform = 'scale(1.1)';
            } else {
                whatsappBtn.style.transform = 'scale(1)';
            }
        });
    }
}

// استدعاء الدالة
initFloatingButton();