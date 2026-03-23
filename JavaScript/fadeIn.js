const sections = document.querySelectorAll('.projectSection');
document.documentElement.classList.add('js');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.2 // triggers when 20% is visible
});

sections.forEach(section => {
    observer.observe(section);
});
