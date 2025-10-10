// Parallax scrolling effect
document.addEventListener('DOMContentLoaded', () => {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (parallaxBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
    
    // Floating shapes animation
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Randomize initial positions and animations slightly
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        const randomDelay = Math.random() * 2;
        const randomDuration = 6 + Math.random() * 4;
        
        shape.style.setProperty('--random-x', `${randomX}px`);
        shape.style.setProperty('--random-y', `${randomY}px`);
        shape.style.animationDelay = `${randomDelay}s`;
        shape.style.animationDuration = `${randomDuration}s`;
    });
});