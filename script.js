document.addEventListener('DOMContentLoaded', () => {
    
    // --- MENU HAMBURGUESA ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }
    
    // --- FAQ ACCORDION ---
    const faqHeads = document.querySelectorAll('.faq-head');
    
    faqHeads.forEach(head => {
        head.addEventListener('click', () => {
            const item = head.parentElement;
            
            document.querySelectorAll('.faq-item').forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            item.classList.toggle('active');
            const body = item.querySelector('.faq-body');
            
            if(item.classList.contains('active')){
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });


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

        // Verificar que los elementos existan antes de asignar
        if(document.getElementById('days')) document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        if(document.getElementById('hours')) document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        if(document.getElementById('minutes')) document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        if(document.getElementById('seconds')) document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
});