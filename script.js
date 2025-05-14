document.addEventListener('DOMContentLoaded', function() {
    const collapsibles = document.querySelectorAll('.collapsible');
    
    collapsibles.forEach(function(collapsible) {
        collapsible.addEventListener('click', function() {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
            } else {
                content.style.display = 'block';
            }
        });
    });
    
    // Auto expand first sections
    const firstCollapsible = document.querySelector('#intro .collapsible');
    if (firstCollapsible) {
        firstCollapsible.click();
        const firstSubcollapsible = document.querySelector('#intro-mission .collapsible');
        if (firstSubcollapsible) {
            firstSubcollapsible.click();
        }
    }
    
    // TOC highlight and scrolling
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveLink() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                });
                
                // Expand section if collapsed
                const collapsible = targetElement.querySelector('.collapsible');
                if (collapsible) {
                    const content = collapsible.nextElementSibling;
                    if (content.style.display !== 'block') {
                        collapsible.click();
                    }
                }
            }
        });
    });
    
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();
    
    // Resource access map interactivity
    const mapLevels = document.querySelectorAll('.map-level');
    
    mapLevels.forEach(level => {
        level.addEventListener('mouseenter', function() {
            const levelNum = this.getAttribute('data-level');
            const pathElement = document.querySelector(`.level-${levelNum}-path`);
            
            if (pathElement) {
                pathElement.style.display = 'block';
                pathElement.style.left = (this.offsetLeft + this.offsetWidth + 20) + 'px';
                pathElement.style.top = (this.offsetTop + (this.offsetHeight / 2) - 50) + 'px';
            }
        });
        
        level.addEventListener('mouseleave', function() {
            const levelNum = this.getAttribute('data-level');
            const pathElement = document.querySelector(`.level-${levelNum}-path`);
            
            if (pathElement) {
                pathElement.style.display = 'none';
            }
        });
    });
    
    // Search functionality in TOC
    const tocSearch = document.getElementById('toc-search');
    
    tocSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        tocLinks.forEach(link => {
            const text = link.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        });
    });
});
