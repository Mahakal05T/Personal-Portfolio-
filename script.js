document.addEventListener('DOMContentLoaded', function() {
  
  const menuBtn = document.getElementById('menu-btn');
  const menu = document.getElementById('menu');

  if (menuBtn && menu) {
    
    // Toggle menu on button click
    menuBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      menu.classList.toggle('hidden');
      menu.classList.toggle('flex');
      
      // Toggle icon
      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking on links
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        
        const icon = menuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      }
    });
    
  }
  
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

