document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Floating Circles
    const hero = document.querySelector('.hero');
    const colors = ['#fce4ec', '#f8bbd0', '#f48fb1'];
    
    for (let i = 0; i < 6; i++) {
        const circle = document.createElement('div');
        circle.classList.add('floating-circle');
        
        const size = Math.random() * 50 + 20;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        circle.style.top = `${Math.random() * 80 + 10}%`;
        circle.style.left = `${Math.random() * 80 + 10}%`;
        
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        circle.style.animation = `drift ${duration}s infinite ease-in-out ${delay}s`;
        
        hero.appendChild(circle);
    }

    // 2. Service Accordion
    const categoryHeaders = document.querySelectorAll('.category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle active state
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            icon.style.transform = content.style.display === 'block' ? 'rotate(180deg)' : 'rotate(0deg)';
            icon.style.transition = '0.3s';
        });
        
        // Open all by default initially or first one? Let's open all for card-grid style feel as per prompt "Elegant accordion-style or card-grid"
        header.nextElementSibling.style.display = 'block';
    });

    // 3. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 400);
                }
            });
        });
    });

    // 4. Reveal on Scroll (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.15
    });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Sticky Nav Background Logic
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            nav.style.boxShadow = 'none';
        }
    });
});
