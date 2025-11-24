document.addEventListener('DOMContentLoaded', () => {
    
    // --- HAMBURGER MENU ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
            // Toggle body scroll to prevent scrolling when menu is open
            document.body.classList.toggle('no-scroll');
        });
        
        // Close menu when a link is clicked
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll'); 
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }
    
    // --- FAQ ACCORDION ---
    const faqHeads = document.querySelectorAll('.faq-head');
    
    faqHeads.forEach(head => {
        head.addEventListener('click', () => {
            const item = head.parentElement;
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const body = item.querySelector('.faq-body');
            
            if(item.classList.contains('active')){
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // --- COUNTDOWN TIMER ---
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15); 

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if(diff <= 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        // Check existence before assigning to avoid errors
        if(document.getElementById('days')) document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        if(document.getElementById('hours')) document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        if(document.getElementById('minutes')) document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        if(document.getElementById('seconds')) document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();

    // --- SCROLL ANIMATION (INTERSECTION OBSERVER) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
});