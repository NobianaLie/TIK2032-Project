// Navigation mobile toggle
document.addEventListener('DOMContentLoaded', function() {
    // Tambahkan tombol hamburger untuk tampilan mobile
    const header = document.querySelector('header .container');
    const nav = document.querySelector('header nav');
    const mobileToggle = document.createElement('div');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '☰';
    mobileToggle.style.display = 'none';
    
    // Sisipkan tombol sebelum navigasi
    header.insertBefore(mobileToggle, nav);
    
    // Toggle navigasi saat tombol diklik
    mobileToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // Fungsi untuk menyesuaikan tampilan berdasarkan ukuran layar
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileToggle.style.display = 'block';
            nav.classList.remove('active');
        } else {
            mobileToggle.style.display = 'none';
            nav.classList.remove('active');
        }
    }
    
    // Periksa ukuran layar saat halaman dimuat dan saat diubah ukurannya
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    // Animasi scroll smooth untuk menu navigasi
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Hanya untuk link internal pada halaman yang sama
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Tutup menu mobile setelah klik
                    nav.classList.remove('active');
                }
            }
        });
    });
    
    // Animasi scroll untuk semua elemen dengan class 'animate-on-scroll'
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Periksa elemen saat halaman dimuat dan saat di-scroll
    window.addEventListener('scroll', checkIfInView);
    checkIfInView();
    
    // Efek parallax untuk hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const offset = window.pageYOffset;
            heroSection.style.backgroundPositionY = offset * 0.5 + 'px';
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Nama tidak boleh kosong');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Masukkan alamat email yang valid');
                isValid = false;
            }
            
            // Validate subject
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subjek tidak boleh kosong');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Pesan tidak boleh kosong');
                isValid = false;
            }
            
            // If valid, show success message
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        function showError(inputElement, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            inputElement.parentNode.appendChild(errorMessage);
            inputElement.style.borderColor = 'red';
            
            // Reset border color when user types
            inputElement.addEventListener('input', function() {
                this.style.borderColor = '';
                const errorEl = this.parentNode.querySelector('.error-message');
                if (errorEl) {
                    errorEl.remove();
                }
            });
        }
    }
});

// Animasi untuk gallery
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        item.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });
});

// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    // Buat tombol toggle dark mode
    const footer = document.querySelector('footer .container');
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'Toggle Dark Mode';
    
    // Tambahkan style untuk tombol
    darkModeToggle.style.background = 'none';
    darkModeToggle.style.border = 'none';
    darkModeToggle.style.fontSize = '1.5rem';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.marginTop = '10px';
    
    // Tambahkan tombol ke footer
    footer.appendChild(darkModeToggle);
    
    // Periksa preferensi dark mode dari localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Atur mode awal
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    // Toggle dark mode saat tombol diklik
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // Update icon berdasarkan mode
        darkModeToggle.innerHTML = isDark ? '☀️' : '🌙';
        
        // Simpan preferensi ke localStorage
        localStorage.setItem('darkMode', isDark);
    });
});

// Typing effect untuk hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroText = document.querySelector('.hero p');
    
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(function() {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);
    }
});

// Image modal untuk gallery
document.addEventListener('DOMContentLoaded', function() {
    // Buat modal container
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Enlarged Image" class="modal-image">
            <div class="modal-caption"></div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Style untuk modal
    const modalStyles = `
        .image-modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            overflow: auto;
        }
        
        .modal-content {
            margin: 5% auto;
            width: 80%;
            max-width: 800px;
            position: relative;
        }
        
        .close-modal {
            color: #fff;
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .modal-image {
            width: 100%;
            display: block;
        }
        
        .modal-caption {
            padding: 10px;
            color: #fff;
            text-align: center;
            font-size: 1.2rem;
        }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.textContent = modalStyles;
    document.head.appendChild(styleEl);
    
    // Buat event listener untuk setiap gambar di gallery
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const modalImg = document.querySelector('.modal-image');
    const modalCaption = document.querySelector('.modal-caption');
    
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            
            // Ambil caption dari div.caption
            const caption = this.nextElementSibling.textContent;
            modalCaption.textContent = caption;
        });
    });
    
    // Tutup modal dengan klik tombol close atau di luar modal
    const closeBtn = document.querySelector('.close-modal');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Lazy loading untuk gambar
document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua gambar
    const images = document.querySelectorAll('img');
    
    // Observer options
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // image at least 10% visible
    };
    
    // Fungsi callback untuk observer
    const lazyLoad = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Jika gambar memiliki data-src, ganti src dengan data-src
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                observer.unobserve(img);
            }
        });
    };
    
    // Buat observer
    const observer = new IntersectionObserver(lazyLoad, options);
    
    // Observasi setiap gambar
    images.forEach(img => {
        observer.observe(img);
    });
});

// Skills progress bars untuk halaman About
document.addEventListener('DOMContentLoaded', function() {
    // Buat data keterampilan
    const skills = [
        { name: 'HTML5 & CSS3', percentage: 85 },
        { name: 'Version Control (Git & GitHub)', percentage: 70 },
        { name: 'UI/UX Design', percentage: 75 }
    ];
    
    // Cari container untuk skills
    const projectCards = document.querySelectorAll('.project-card');
    
    // Tambahkan progress bar ke masing-masing project card
    if (projectCards.length > 0) {
        projectCards.forEach((card, index) => {
            if (index < skills.length) {
                const skill = skills[index];
                
                // Buat progress bar
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress';
        progressBar.innerHTML = `
                    </div>
                `;
                
                // Tambahkan style untuk progress bar
                const progressStyle = `
                    .skill-progress {
                        margin-top: 10px;
                    }
                    
                    .progress-container {
                        background-color: #e0e0e0;
                        height: 8px;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    
                    .progress-bar {
                        background-color: #3498db;
                        height: 100%;
                        border-radius: 4px;
                        transition: width 1s ease-in-out;
                    }
                    
                    .progress-text {
                        display: block;
                        font-size: 0.8rem;
                        text-align: right;
                        margin-top: 5px;
                    }
                `;
                
                // Tambahkan style jika belum ada
                if (!document.querySelector('style#progress-style')) {
                    const styleEl = document.createElement('style');
                    styleEl.id = 'progress-style';
                    styleEl.textContent = progressStyle;
                    document.head.appendChild(styleEl);
                }
                
                // Tambahkan progress bar ke card
                card.appendChild(progressBar);
                
                // Animasi progress bar
                setTimeout(() => {
                    const bars = card.querySelectorAll('.progress-bar');
                    bars.forEach(bar => {
                        bar.style.width = bar.style.width;
                    });
                }, 300);
            }
        });
    }
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
    // Buat tombol back to top
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    document.body.appendChild(backToTopBtn);
    
    // Style untuk tombol
    const btnStyle = `
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            display: none;
            z-index: 99;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s;
        }
        
        .back-to-top:hover {
            background-color: #2980b9;
        }
    `;
    
    // Tambahkan style untuk tombol
    const styleEl = document.createElement('style');
    styleEl.textContent = btnStyle;
    document.head.appendChild(styleEl);
    
    // Tampilkan tombol saat scroll down
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    // Scroll ke atas saat tombol diklik
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // Animasi untuk blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    
    // Tambahkan class untuk animasi
    blogPosts.forEach((post, index) => {
        post.classList.add('animate-on-scroll');
        post.style.transitionDelay = `${index * 0.2}s`;
    });
    
    // Fungsi untuk memeriksa elemen dalam viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Fungsi untuk animasi saat scroll
    function checkElements() {
        blogPosts.forEach(post => {
            if (isInViewport(post)) {
                post.classList.add('visible');
            }
        });
    }
    
    // Periksa saat load halaman dan saat scroll
    checkElements();
    window.addEventListener('scroll', checkElements);
    
    // Tambahkan fitur "Read More" / "Read Less"
    blogPosts.forEach(post => {
        const content = post.querySelector('.post-content');
        const paragraphs = content.querySelectorAll('p');
        
        // Hanya untuk post dengan konten panjang (lebih dari 2 paragraf)
        if (paragraphs.length > 2) {
            // Simpan konten lengkap
            const fullContent = content.innerHTML;
            
            // Buat konten pendek dengan hanya 2 paragraf pertama
            let shortContent = '';
            for (let i = 0; i < 2; i++) {
                if (paragraphs[i]) {
                    shortContent += paragraphs[i].outerHTML;
                }
            }
            
            // Tambahkan tombol "Read More"
            const readMoreBtn = document.createElement('button');
            readMoreBtn.className = 'read-more-btn';
            readMoreBtn.textContent = 'Baca Selengkapnya...';
            readMoreBtn.style.background = 'none';
            readMoreBtn.style.border = 'none';
            readMoreBtn.style.color = '#3498db';
            readMoreBtn.style.fontWeight = 'bold';
            readMoreBtn.style.cursor = 'pointer';
            readMoreBtn.style.padding = '10px 0';
            
            // Tampilkan konten pendek dan tombol
            content.innerHTML = shortContent;
            content.appendChild(readMoreBtn);
            
            // Toggle konten saat tombol diklik
            let isExpanded = false;
            readMoreBtn.addEventListener('click', function() {
                if (isExpanded) {
                    // Tampilkan konten pendek
                    content.innerHTML = shortContent;
                    content.appendChild(readMoreBtn);
                    readMoreBtn.textContent = 'Baca Selengkapnya...';
                } else {
                    // Tampilkan konten lengkap
                    content.innerHTML = fullContent;
                    content.appendChild(readMoreBtn);
                    readMoreBtn.textContent = 'Baca Lebih Sedikit';
                }
                isExpanded = !isExpanded;
            });
        }
    });
    
    // Tambahkan fitur pencarian blog
    const blogSection = document.querySelector('.blog .container');
    if (blogSection) {
        // Buat form pencarian
        const searchForm = document.createElement('div');
        searchForm.className = 'blog-search';
        searchForm.innerHTML = `
            <input type="text" id="blog-search" placeholder="Cari artikel...">
            <button id="search-btn">Cari</button>
        `;
        
        // Style untuk form pencarian
        searchForm.style.marginBottom = '30px';
        searchForm.style.display = 'flex';
        searchForm.style.gap = '10px';
        
        // Style untuk input
        const searchInput = searchForm.querySelector('#blog-search');
        searchInput.style.flex = '1';
        searchInput.style.padding = '10px';
        searchInput.style.border = '1px solid #ddd';
        searchInput.style.borderRadius = '5px';
        searchInput.style.fontSize = '1rem';
        
        // Style untuk button
        const searchBtn = searchForm.querySelector('#search-btn');
        searchBtn.style.padding = '10px 20px';
        searchBtn.style.backgroundColor = '#3498db';
        searchBtn.style.color = '#fff';
        searchBtn.style.border = 'none';
        searchBtn.style.borderRadius = '5px';
        searchBtn.style.cursor = 'pointer';
        
        // Tambahkan form pencarian ke awal blog section
        blogSection.insertBefore(searchForm, blogSection.firstChild);
        
        // Fungsi pencarian
        function searchBlog() {
            const searchTerm = searchInput.value.toLowerCase();
            let foundAny = false;
            
            blogPosts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const content = post.querySelector('.post-content').textContent.toLowerCase();
                const category = post.querySelector('.post-meta').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                    post.style.display = 'block';
                    post.classList.add('visible');
                    foundAny = true;
                } else {
                    post.style.display = 'none';
                    post.classList.remove('visible');
                }
            });
            
            // Tampilkan pesan jika tidak ada hasil
            const noResultsMsg = document.querySelector('.no-results');
            
            if (!foundAny) {
                if (!noResultsMsg) {
                    const message = document.createElement('div');
                    message.className = 'no-results';
                    message.textContent = 'Tidak ada artikel yang sesuai dengan pencarian Anda.';
                    message.style.textAlign = 'center';
                    message.style.padding = '20px';
                    message.style.color = '#777';
                    blogSection.appendChild(message);
                }
            } else if (noResultsMsg) {
                noResultsMsg.remove();
            }
        }
        
        // Event listener untuk tombol search
        searchBtn.addEventListener('click', searchBlog);
        
        // Event listener untuk enter key
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                searchBlog();
            }
        });
    }
    

    
    // Tambahkan tag cloud
    const blogContainer = document.querySelector('.blog .container');
    if (blogContainer && blogPosts.length > 0) {
        // Kumpulkan semua kategori
        const categories = [];
        blogPosts.forEach(post => {
            const categoryText = post.querySelector('.post-meta').textContent;
            const categoryMatch = categoryText.match(/Kategori: ([^|]+)/);
            
            if (categoryMatch && categoryMatch[1]) {
                const category = categoryMatch[1].trim();
                if (!categories.includes(category)) {
                    categories.push(category);
                }
            }
        });
        
        // Buat tag cloud jika ada kategori
        if (categories.length > 0) {
            const tagCloud = document.createElement('div');
            tagCloud.className = 'tag-cloud';
            tagCloud.innerHTML = '<h4>Kategori</h4>';
            
            // Container untuk tags
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'tags';
            tagsContainer.style.display = 'flex';
            tagsContainer.style.flexWrap = 'wrap';
            tagsContainer.style.gap = '10px';
            tagsContainer.style.marginTop = '15px';
            
            // Tambahkan tag untuk semua kategori
            categories.forEach(category => {
                const tag = document.createElement('a');
                tag.href = '#';
                tag.className = 'tag';
                tag.textContent = category;
                
                // Style untuk tag
                tag.style.padding = '5px 10px';
                tag.style.backgroundColor = '#e0e0e0';
                tag.style.color = '#333';
                tag.style.borderRadius = '3px';
                tag.style.textDecoration = 'none';
                tag.style.fontSize = '0.9rem';
                
                // Event listener untuk filter berdasarkan tag
                tag.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all tags
                    document.querySelectorAll('.tag').forEach(t => {
                        t.style.backgroundColor = '#e0e0e0';
                        t.style.color = '#333';
                    });
                    
                    // Add active class to clicked tag
                    this.style.backgroundColor = '#3498db';
                    this.style.color = '#fff';
                    
                    // Filter blog posts
                    const clickedCategory = this.textContent;
                    blogPosts.forEach(post => {
                        const postCategory = post.querySelector('.post-meta').textContent;
                        
                        if (postCategory.includes(clickedCategory)) {
                            post.style.display = 'block';
                        } else {
                            post.style.display = 'none';
                        }
                    });
                });
                
                tagsContainer.appendChild(tag);
            });
            
            // Tambahkan tag "Semua"
            const allTag = document.createElement('a');
            allTag.href = '#';
            allTag.className = 'tag active';
            allTag.textContent = 'Semua';
            allTag.style.padding = '5px 10px';
            allTag.style.backgroundColor = '#3498db';
            allTag.style.color = '#fff';
            allTag.style.borderRadius = '3px';
            allTag.style.textDecoration = 'none';
            allTag.style.fontSize = '0.9rem';
            
            allTag.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Reset all tags
                document.querySelectorAll('.tag').forEach(t => {
                    t.style.backgroundColor = '#e0e0e0';
                    t.style.color = '#333';
                });
                
                // Set this tag as active
                this.style.backgroundColor = '#3498db';
                this.style.color = '#fff';
                
                // Show all posts
                blogPosts.forEach(post => {
                    post.style.display = 'block';
                });
            });
            
            // Tambahkan ke awal list
            tagsContainer.insertBefore(allTag, tagsContainer.firstChild);
            
            tagCloud.appendChild(tagsContainer);
            
            // Tambahkan tag cloud setelah form pencarian
            const searchForm = document.querySelector('.blog-search');
            if (searchForm) {
                blogContainer.insertBefore(tagCloud, searchForm.nextSibling);
            } else {
                blogContainer.insertBefore(tagCloud, blogContainer.firstChild);
            }
            
            // Style untuk tag cloud
            tagCloud.style.marginBottom = '30px';
            tagCloud.style.padding = '15px';
            tagCloud.style.backgroundColor = '#f5f5f5';
            tagCloud.style.borderRadius = '5px';
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Filter dan animasi untuk gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Buat filter category
    const categories = ['Semua', 'Aplikasi', 'Website', 'Organisasi', 'Multimedia'];
    
    // Buat element untuk filter
    const filterContainer = document.createElement('div');
    filterContainer.className = 'gallery-filter';
    filterContainer.style.textAlign = 'center';
    filterContainer.style.marginBottom = '30px';
    
    // Buat tombol untuk setiap kategori
    categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'filter-btn';
        button.textContent = category;
        button.style.margin = '5px';
        button.style.padding = '8px 15px';
        button.style.border = 'none';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = category === 'Semua' ? '#3498db' : '#e0e0e0';
        button.style.color = category === 'Semua' ? '#fff' : '#333';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s';
        
        // Event listener untuk filter
        button.addEventListener('click', function() {
            // Ubah style tombol aktif
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.style.backgroundColor = '#e0e0e0';
                btn.style.color = '#333';
            });
            this.style.backgroundColor = '#3498db';
            this.style.color = '#fff';
            
            // Filter gallery items
            filterGallery(category);
        });
        
        filterContainer.appendChild(button);
    });
    
    // Tambahkan filter ke gallery section sebelum gallery-grid
    const gallerySection = document.querySelector('.gallery .container');
    if (gallerySection) {
        gallerySection.insertBefore(filterContainer, document.querySelector('.gallery-grid'));
    }
    
    // Fungsi untuk filter gallery
    function filterGallery(category) {
        galleryItems.forEach(item => {
            const caption = item.querySelector('.caption').textContent.toLowerCase();
            
            if (category === 'Semua') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                // Check if caption contains the category (case insensitive)
                const matchesCategory = caption.includes(category.toLowerCase());
                
                if (matchesCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    }
    
    // Image lightbox
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.caption').textContent;
        
        img.addEventListener('click', function() {
            // Buat lightbox jika belum ada
            if (!document.querySelector('.gallery-lightbox')) {
                createLightbox();
            }
            
            // Tampilkan lightbox dengan gambar yang diklik
            const lightbox = document.querySelector('.gallery-lightbox');
            const lightboxImg = document.querySelector('.lightbox-img');
            const lightboxCaption = document.querySelector('.lightbox-caption');
            
            lightboxImg.src = this.src;
            lightboxCaption.textContent = caption;
            lightbox.style.display = 'flex';
            
            // Add animation
            setTimeout(() => {
                lightbox.style.opacity = '1';
                lightboxImg.style.transform = 'scale(1)';
            }, 10);
        });
    });
    
    // Buat lightbox
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'gallery-lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img class="lightbox-img" src="" alt="Gallery Image">
                <div class="lightbox-caption"></div>
                <button class="lightbox-close">&times;</button>
            </div>
        `;
        
        // Style untuk lightbox
        lightbox.style.position = 'fixed';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        lightbox.style.display = 'none';
        lightbox.style.justifyContent = 'center';
        lightbox.style.alignItems = 'center';
        lightbox.style.zIndex = '1000';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        // Style untuk lightbox content
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.style.position = 'relative';
        lightboxContent.style.maxWidth = '80%';
        lightboxContent.style.maxHeight = '80%';
        
        // Style untuk lightbox image
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        lightboxImg.style.maxWidth = '100%';
        lightboxImg.style.maxHeight = '80vh';
        lightboxImg.style.transform = 'scale(0.9)';
        lightboxImg.style.transition = 'transform 0.3s ease';
        
        // Style untuk caption
        const lightboxCaption = lightbox.querySelector('.lightbox-caption');
        lightboxCaption.style.color = '#fff';
        lightboxCaption.style.textAlign = 'center';
        lightboxCaption.style.padding = '15px';
        lightboxCaption.style.fontSize = '1.2rem';
        
        // Style untuk tombol close
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '-40px';
        closeBtn.style.right = '0';
        closeBtn.style.fontSize = '40px';
        closeBtn.style.color = '#fff';
        closeBtn.style.background = 'none';
        closeBtn.style.border = 'none';
        closeBtn.style.cursor = 'pointer';
        
        // Event listener untuk tombol close
        closeBtn.addEventListener('click', function() {
            lightbox.style.opacity = '0';
            lightbox.querySelector('.lightbox-img').style.transform = 'scale(0.9)';
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
        });
        
        // Event listener untuk menutup dengan klik di luar gambar
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                lightbox.querySelector('.lightbox-img').style.transform = 'scale(0.9)';
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
        
        // Tambahkan lightbox ke body
        document.body.appendChild(lightbox);
    }
    
    // Image lazy loading dengan intersection observer
    const lazyImages = document.querySelectorAll('.gallery-item img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const dataSrc = img.getAttribute('data-src');
                    
                    if (dataSrc) {
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback untuk browser yang tidak support Intersection Observer
        lazyImages.forEach(img => {
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
                img.src = dataSrc;
            }
        });
    }
    
    // Hover effects for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const caption = this.querySelector('.caption');
            caption.style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            const caption = this.querySelector('.caption');
            caption.style.opacity = '0';
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengirim email menggunakan emailjs (pseudo code)
    function sendEmail(formData) {
        // Simulasi pengiriman email
        console.log("Mengirim email dengan data:", formData);
        
        // Tampilkan pesan sedang mengirim
        const sendingMessage = document.createElement('div');
        sendingMessage.className = 'sending-message';
        sendingMessage.innerHTML = 'Sedang mengirim pesan...';
        sendingMessage.style.color = '#3498db';
        sendingMessage.style.textAlign = 'center';
        sendingMessage.style.padding = '10px';
        document.querySelector('.contact-form form').appendChild(sendingMessage);
        
        // Simulasi delay pengiriman (3 detik)
        setTimeout(() => {
            sendingMessage.remove();
            
            // Tampilkan pesan sukses
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = 'Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
            successMessage.style.color = 'green';
            successMessage.style.textAlign = 'center';
            successMessage.style.padding = '10px';
            document.querySelector('.contact-form form').appendChild(successMessage);
            
            // Hapus pesan sukses setelah 5 detik
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
            // Reset form
            document.querySelector('.contact-form form').reset();
        }, 3000);
    }
    
    // Tangkap form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validasi form
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Nama tidak boleh kosong');
                isValid = false;
            }
            
            // Validate email dengan regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                showError(emailInput, 'Masukkan alamat email yang valid');
                isValid = false;
            }
            
            // Validate subject
            if (subjectInput.value.trim() === '') {
                showError(subjectInput, 'Subjek tidak boleh kosong');
                isValid = false;
            }
            
            // Validate message
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Pesan tidak boleh kosong');
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                showError(messageInput, 'Pesan terlalu pendek (minimal 10 karakter)');
                isValid = false;
            }
            
            // Jika valid, kirim email
            if (isValid) {
                // Kumpulkan data form
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    subject: subjectInput.value.trim(),
                    message: messageInput.value.trim()
                };
                
                // Kirim email
                sendEmail(formData);
            }
        });
        
        // Fungsi untuk menampilkan error
        function showError(inputElement, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.innerHTML = message;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '5px';
            
            // Tambahkan pesan error setelah input
            inputElement.parentNode.appendChild(errorMessage);
            
            // Ubah border input menjadi merah
            inputElement.style.borderColor = 'red';
            
            // Reset border dan hapus pesan error saat user mengetik
            inputElement.addEventListener('input', function() {
                this.style.borderColor = '';
                const errorEl = this.parentNode.querySelector('.error-message');
                if (errorEl) {
                    errorEl.remove();
                }
            });
        }
        
        // Tambahkan efek spesial pada input
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            // Tambahkan class active saat focus
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('input-active');
            });
            
            // Hapus class active saat blur
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.parentNode.classList.remove('input-active');
                }
            });
            
            // Tambahkan class has-content jika sudah ada value
            if (input.value.trim() !== '') {
                input.parentNode.classList.add('input-active');
            }
        });
    }
});

