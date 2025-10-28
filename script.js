document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');
  const icon = menuBtn.querySelector('i');
  let open = false;

  // Toggle menu
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    open = !open;

    if (open) {
      menu.classList.remove('hidden');
      setTimeout(() => menu.classList.add('scale-y-100'), 10);
      icon.classList.replace('fa-bars', 'fa-times');
    } else {
      menu.classList.remove('scale-y-100');
      setTimeout(() => menu.classList.add('hidden'), 300);
      icon.classList.replace('fa-times', 'fa-bars');
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (open && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
      menu.classList.remove('scale-y-100');
      setTimeout(() => menu.classList.add('hidden'), 300);
      icon.classList.replace('fa-times', 'fa-bars');
      open = false;
    }
  });

  // Close menu when link clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (open) {
        menu.classList.remove('scale-y-100');
        setTimeout(() => menu.classList.add('hidden'), 300);
        icon.classList.replace('fa-times', 'fa-bars');
        open = false;
      }
    });
  });
});




// Navigation Active Section
const navLinks = document.querySelectorAll("nav ul li a");

function highlightActiveLink() {
  let currentSection = "";

  // Check which section is visible
  document.querySelectorAll("section[id]").forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  // Special case: treat "skills" as part of "About"
  if (currentSection === "skills") {
    currentSection = "About";
  }

  // Update active class with smooth transition
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + currentSection) {
      link.classList.add("active");
    }
  });

  // If no section is active, highlight Home by default
  if (window.scrollY < 200 || currentSection === "") {
    navLinks.forEach(link => link.classList.remove("active"));
    document.querySelector('nav ul li a[href="#"]').classList.add("active");
  }
}

// Call once when page loads
highlightActiveLink();

// Call on scroll with throttle for better performance
let scrollTimeout;
window.addEventListener("scroll", () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      highlightActiveLink();
      scrollTimeout = null;
    }, 100);
  }
});

// Animate progress bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.progress-bar');
      progressBars.forEach(bar => {
      bar.style.animationPlayState = 'running';
      });
    }
  });
}, observerOptions);

// Observe all skill cards
document.querySelectorAll('.skill-card').forEach(card => {
  observer.observe(card);
});


// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => {
      b.classList.remove('filter-active');
      b.classList.add('filter-inactive');
    });
    btn.classList.remove('filter-inactive');
    btn.classList.add('filter-active');
    
    // Filter projects
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

  // Expand image modal functionality
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("expandedImg");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".expand-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const imgSrc = btn.closest(".project-card").querySelector(".project-img").src;
      modal.style.display = "block";
      modalImg.src = imgSrc;
    });
  });

  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
