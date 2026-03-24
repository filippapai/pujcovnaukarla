document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    // Language switcher logic
    function setLanguage(lang) {
        // Update buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;
        
        // Save preference
        localStorage.setItem('preferred_lang', lang);
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.dataset.lang);
        });
    });

    // Mobile menu logic
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Header background change on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Initialize language from local storage or browser setting
    const savedLang = localStorage.getItem('preferred_lang');
    const browserLang = navigator.language.split('-')[0];
    const initialLang = savedLang || (translations[browserLang] ? browserLang : 'cs');
    
    setLanguage(initialLang);
});