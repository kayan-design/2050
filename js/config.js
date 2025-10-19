// ملف التكوين - يمكنك تعديل جميع المعلومات من هنا
const SITE_CONFIG = {
    // معلومات الموقع
    siteName: "كيان",
    siteDescription: "تصميم وبرمجة بإبداع",
    
    // معلومات التواصل
    contact: {
        phone: " 779516077 967+",
        email: "info@kayan.com",
        address: "الرياض، المملكة العربية السعودية",
        whatsapp: "96779516077"
    },
    
    // وسائل التواصل الاجتماعي
    socialMedia: {
        instagram: "https://instagram.com/kayan",
        tiktok: "https://tiktok.com/@kayan",
        twitter: "https://twitter.com/kayan",
        linkedin: "https://linkedin.com/company/kayan"
    },
    
    // الخدمات والأسعار
    services: {
        branding: {
            name: "تصميم الهوية البصرية",
            price: "1,500"
        },
        web: {
            name: "تصميم وبرمجة المواقع",
            price: "3,000"
        },
        // ... باقي الخدمات
    },
    
    // الإحصائيات
    stats: {
        projects: 150,
        clients: 95,
        years: 3,
        awards: 24
    }
};

// دالة لتحديث جميع المعلومات في الموقع
function updateSiteInfo() {
    // تحديث معلومات التواصل
    document.querySelectorAll('[data-contact="phone"]').forEach(el => {
        el.textContent = SITE_CONFIG.contact.phone;
    });
    
    document.querySelectorAll('[data-contact="email"]').forEach(el => {
        el.textContent = SITE_CONFIG.contact.email;
    });
    
    // تحديث روابط وسائل التواصل
    document.querySelectorAll('[data-social="instagram"]').forEach(el => {
        el.href = SITE_CONFIG.socialMedia.instagram;
    });
    
    // تحديث زر الواتساب
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/${SITE_CONFIG.contact.whatsapp}`;
    }
    
    // تحديث الإحصائيات
    document.querySelectorAll('[data-stat="projects"]').forEach(el => {
        el.setAttribute('data-count', SITE_CONFIG.stats.projects);
    });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateSiteInfo);