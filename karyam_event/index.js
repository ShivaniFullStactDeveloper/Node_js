 // Header mobile menu
        const toggleBtn = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');
        toggleBtn.addEventListener('click', () => navbar.classList.toggle('active'));

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('active'));
            });
        });

        document.querySelectorAll('.drop-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const dropdown = btn.parentElement;
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) d.classList.remove('active');
                });
                dropdown.classList.toggle('active');
                e.preventDefault();
            });
        });

        // Carousel logic
        const slides = document.getElementById('carousel');
        const slideCount = slides.children.length;
        const realSlideCount = slideCount - 2;
        let currentIndex = 1;
        const slideItems = slides.querySelectorAll('img');
        let intervalId;

        function applyZoomAnimation(index) {
            slideItems.forEach(img => {
                img.style.animation = 'none';
                void img.offsetWidth;
            });
            if (slideItems[index]) {
                slideItems[index].style.animation = 'zoomIn 3s ease-in-out forwards';
            }
        }

        function showSlide(index, animate = true) {
            slides.style.transition = animate ? "transform 0.5s ease-in-out" : "none";
            slides.style.transform = `translateX(-${index * 100}%)`;
            applyZoomAnimation(index);
        }

        function nextSlide() {
            currentIndex++;
            showSlide(currentIndex);
            if (currentIndex === slideCount - 1) {
                setTimeout(() => {
                    currentIndex = 1;
                    showSlide(currentIndex, false);
                }, 500);
            }
        }

        function prevSlide() {
            currentIndex--;
            showSlide(currentIndex);
            if (currentIndex === 0) {
                setTimeout(() => {
                    currentIndex = realSlideCount;
                    showSlide(currentIndex, false);
                }, 500);
            }
        }

        showSlide(currentIndex);
        intervalId = setInterval(nextSlide, 3000);

        // Header scroll color change
        const header = document.querySelector('.header');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { // Adjust this value as needed
                header.classList.add('scrolled-header');
            } else {
                header.classList.remove('scrolled-header');
            }
        });