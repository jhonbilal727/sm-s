document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Create a click audio sound effect using a built-in browser audio generator
    const playClickSound = () => {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(120, audioCtx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.04);
            
            gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.04);
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.start();
            oscillator.stop(audioCtx.currentTime + 0.04);
        } catch (e) {
            // Audio context not allowed until interaction or unsupported
        }
    };

    // Check saved preference on load
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Toggle dark mode on change
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            playClickSound();
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});

/* ==========================
   LOADING SCREEN
========================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.classList.add("loader-hide");

    }, 1500);

});

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach((element) => {

        const revealTop = element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ==========================
   XP BAR ANIMATION
========================== */

const playerCard = document.querySelector(".player-card");
const xpFill = document.querySelector(".xp-fill");

const xpObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            xpFill.style.width = "85%";

            xpObserver.unobserve(entry.target);

        }

    });

},{
    threshold:0.5
});

if(playerCard && xpFill){

    xpObserver.observe(playerCard);

}

/* ==========================
   HERO PARALLAX
========================== */

const heroRight = document.querySelector(".hero-right");
const floatingCards = document.querySelectorAll(".floating-card");

heroRight.addEventListener("mousemove", (e) => {

    const rect = heroRight.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    floatingCards.forEach((card, index) => {

        const speed = (index + 1) * 2;

        const moveX = (mouseX - centerX) / (40 + speed);
        const moveY = (mouseY - centerY) / (40 + speed);

        card.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

});

heroRight.addEventListener("mouseleave", () => {

    floatingCards.forEach(card => {

        card.style.transform = "translate(0,0)";

    });

});

/* ==========================
   SCROLL PROGRESS BAR
========================== */

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    progressBar.style.width = progress + "%";

});

/* ==========================
   ACTIVE NAVIGATION
========================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});

document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('music-toggle-btn');
    const nextBtn = document.getElementById('next-song-btn');
    const songNameSpan = document.getElementById('current-song-name');

    // Playlist of 4-5 tracks (You can replace these URLs with your own music files or MP3 links)
    const playlist = [
        { title: "Fairytale", src: "assets/songs/song-1.mp3" },
        { title: "Retro Arcade 🕹️", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
        { title: "Cyberpunk Beat ⚡", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
        { title: "Game Over 🎮", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
        { title: "Victory Theme 🏆", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" }
    ];

    let currentTrackIndex = 0;
    let audioElement = new Audio(playlist[currentTrackIndex].src);
    audioElement.loop = true;
    let isPlaying = false;

    // Update button text
    const updatePlayerUI = () => {
        songNameSpan.textContent = playlist[currentTrackIndex].title;
        musicBtn.innerHTML = isPlaying ? `⏸️ <span id="current-song-name">${playlist[currentTrackIndex].title}</span>` : `🎵 <span id="current-song-name">${playlist[currentTrackIndex].title}</span>`;
    };

    // Play/Pause toggle
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        } else {
            audioElement.play().catch(e => console.log("Audio play blocked", e));
            isPlaying = true;
        }
        updatePlayerUI();
    });

    // Next song button
    nextBtn.addEventListener('click', () => {
        audioElement.pause();
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        audioElement = new Audio(playlist[currentTrackIndex].src);
        audioElement.loop = true;
        
        if (isPlaying) {
            audioElement.play().catch(e => console.log("Audio play blocked", e));
        }
        updatePlayerUI();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('game-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalTitle = document.getElementById('modal-title');
    const gameIframe = document.getElementById('game-iframe');
    const closeBtn = document.getElementById('modal-close-btn');
    const fullscreenBtn = document.getElementById('modal-fullscreen-btn');

    // Function to open any game/app in the modal
    // Call this function from your project buttons: openGameModal('Game Name', 'games/my-game/index.html')
    window.openGameModal = (title, url) => {
        modalTitle.textContent = title;
        gameIframe.src = url;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Close modal function
    const closeModal = () => {
        modal.style.display = 'none';
        gameIframe.src = ''; // Stop game execution/audio when closed
        modalContent.classList.remove('fullscreen-mode');
        document.body.style.overflow = 'auto';
    };

    closeBtn.addEventListener('click', closeModal);

    // Close when clicking outside the modal box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fullscreen toggle
    fullscreenBtn.addEventListener('click', () => {
        modalContent.classList.toggle('fullscreen-mode');
    });

    // Close on pressing the ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});

