// تهيئة AOS للأنيميشن عند التمرير
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
  });
  
  // إدارة القائمة المتنقلة
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  // إغلاق القائمة عند النقر على رابط
  const navLinksItems = document.querySelectorAll('.nav-link');
  navLinksItems.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    });
  });
  
  // إضافة تأثير التمرير الناعم لروابط التنقل
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // تغيير لون شريط التنقل عند التمرير
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // إدارة نموذج التواصل
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // هنا يمكن إضافة كود إرسال النموذج إلى الخادم
      const formData = new FormData(this);
      
      // محاكاة إرسال النموذج
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'جاري الإرسال...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('شكراً لك! تم استلام رسالتك وسنتواصل معك قريباً.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
  
  // تبديل اللغة (محاكاة)
  const langSwitcher = document.querySelector('.lang-switcher');
  if (langSwitcher) {
    langSwitcher.addEventListener('click', function() {
      const currentLang = this.textContent;
      this.textContent = currentLang === 'EN' ? 'AR' : 'EN';
      
      // هنا يمكن إضافة كود لتبديل اللغة الفعلي
      alert('سيتم تبديل اللغة إلى ' + (currentLang === 'EN' ? 'العربية' : 'الإنجليزية'));
    });
  }
  
  // إضافة تأثير التمرير للعناصر عند الظهور
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);
  
  // مراقبة العناصر التي نريد إضافة تأثير لها
  const elementsToAnimate = document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .testimonial-card');
  elementsToAnimate.forEach(el => {
    observer.observe(el);
  });
  
  // إضافة تأثير التمرير للعدادات (إذا كانت موجودة)
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const step = target / (duration / 16); // 60fps
          let current = 0;
          
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 16);
          
          counterObserver.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
});

// وظيفة للتحميل الديناميكي للمحتوى
function loadContent(url, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '<div class="loading-spinner"></div>';
  
  fetch(url)
    .then(response => response.text())
    .then(html => {
      container.innerHTML = html;
      // إعادة تهيئة أي سكريبتات ضرورية للمحتوى الجديد
      AOS.refresh();
    })
    .catch(error => {
      console.error('Error loading content:', error);
      container.innerHTML = '<p>عذراً، حدث خطأ في تحميل المحتوى.</p>';
    });
}