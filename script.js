document.addEventListener('DOMContentLoaded', () => {
    
    // --- FAQ ACCORDION ---
    const faqHeads = document.querySelectorAll('.faq-head');
    
    faqHeads.forEach(head => {
        head.addEventListener('click', () => {
            const item = head.parentElement;
            
            // Cerrar otros (Opcional, para comportamiento de acordeón estricto)
            document.querySelectorAll('.faq-item').forEach(other => {
                if(other !== item) {
                    other.classList.remove('active');
                    other.querySelector('.faq-body').style.maxHeight = null;
                }
            });

            // Toggle actual
            item.classList.toggle('active');
            const body = item.querySelector('.faq-body');
            
            if(item.classList.contains('active')){
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = null;
            }
        });
    });

    // --- COUNTDOWN ---
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 15); // 15 días

    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;
        
        if(diff <= 0) return;

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = d < 10 ? '0'+d : d;
        document.getElementById('hours').innerText = h < 10 ? '0'+h : h;
        document.getElementById('minutes').innerText = m < 10 ? '0'+m : m;
        document.getElementById('seconds').innerText = s < 10 ? '0'+s : s;
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
});