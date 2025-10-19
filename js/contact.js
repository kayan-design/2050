// JavaScript مخصص لصفحة التواصل

document.addEventListener('DOMContentLoaded', function() {
    // إدارة نموذج التواصل المتقدم
    const contactForm = document.getElementById('contact-form-detailed');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // عرض حالة التحميل
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            submitBtn.disabled = true;
            
            // محاكاة إرسال النموذج
            setTimeout(() => {
                // هنا يمكن إضافة كود إرسال النموذج الحقيقي
                
                // عرض رسالة النجاح
                showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك في أقرب وقت.', 'success');
                
                // إعادة تعيين النموذج
                this.reset();
                
                // إعادة زر الإرسال إلى حالته الأصلية
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // إدارة الأسئلة الشائعة
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // إغلاق جميع العناصر النشطة
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // تبديل العنصر الحالي
            item.classList.toggle('active');
        });
    });
    
    // وظيفة عرض الإشعارات
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // إضافة الأنماط
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            left: 20px;
            background: ${type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // عرض الإشعار
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // إغلاق الإشعار
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(-100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // إغلاق تلقائي بعد 5 ثوان
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.transform = 'translateX(-100%)';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // تحسين تجربة اختيار الخدمة
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.color = '#1e293b';
            } else {
                this.style.color = '#64748b';
            }
        });
    }
    
    // إضافة تأثيرات للعناصر عند التمرير
    const animatedElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});