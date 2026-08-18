/* ============================================
   MUTED AERO ONE — Script
   Core Animations & Interactions
   ============================================ */

// ===== CONFIG =====
const COMPANY_NAME = "MUTED";
const COMPANY_LOGO = "images/logo.png";

// ===== MOBILE MENU =====
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    if (mobileMenu.classList.contains("open")) {
      menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
    } else {
      menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    }
  });
}

function closeMobile() {
  if (mobileMenu) mobileMenu.classList.remove("open");
  if (menuToggle) menuToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

// ===== NAVBAR SCROLL EFFECT =====
function updateNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const hero = document.getElementById("hero");
  const heroBottom = hero ? hero.offsetHeight - 120 : 220;
  const scrollProgress = Math.min(1, Math.max(0, (window.scrollY - 40) / Math.max(1, heroBottom - 40)));
  const shouldSolid = window.scrollY > heroBottom;

  navbar.classList.toggle("scrolled", shouldSolid);

  const alpha = 0.08 + scrollProgress * 0.86;
  const blur = 0 + scrollProgress * 20;
  navbar.style.background = `rgba(8, 8, 8, ${alpha})`;
  navbar.style.backdropFilter = `blur(${blur}px)`;
  navbar.style.webkitBackdropFilter = `blur(${blur}px)`;
}

// ===== SCROLL REVEAL =====
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", () => {
  revealOnScroll();
  updateNavbar();
}, { passive: true });

window.addEventListener("load", () => {
  revealOnScroll();
  updateNavbar();
  setTimeout(animateProgressBars, 600);
});

// ===== PROGRESS BARS =====
function animateProgressBars() {
  document.querySelectorAll(".progress-fill").forEach((bar) => {
    const targetWidth = bar.getAttribute("data-width");
    bar.style.width = targetWidth + "%";
  });
}

// ===== LIFE IN INDIA SECTION DATA =====
const lifeIndiaContent = {
  home: {
    title: 'Home Living',
    description: 'Combat everyday indoor pollution from cooking, pets, and dust. Muted Aero One quietly purifies your living space, keeping your family breathing clean air at home.',
    image: 'images/home.jpeg'
  },
  kitchen: {
    title: 'Kitchen Cooking',
    description: 'Kitchen smoke and cooking odors are no match for our Electro Settling Technology. Enjoy fresh air while cooking your favorite meals.',
    image: 'images/kitchen.jpeg'
  },
  traffic: {
    title: 'Traffic Pollution',
    description: 'Living near busy roads? Muted Aero One filters out harmful vehicle emissions and particulate matter from outside air.',
    image: 'images/traffic.jpeg'
  },
  office: {
    title: 'Office Work',
    description: 'Breathe better at work. Improved air quality boosts productivity and concentration in your office or workspace.',
    image: 'images/office.jpeg'
  },
  school: {
    title: 'Schools & Kids',
    description: 'Create a safer environment for children. Muted Aero One protects young lungs from pollution and allergens.',
    image: 'images/school.jpeg'
  },
  winter: {
    title: 'Winter Smog',
    description: 'Winter brings heavy smog and pollution. Stay protected with advanced air purification through the cold months.',
    image: 'images/winter-smog.jpeg'
  }
};

// ===== LIFE IN INDIA SECTION =====
let autoRotateInterval;
let currentLocationIndex = 0;
const locations = Object.keys(lifeIndiaContent);

function switchShowcase(location) {
  const data = lifeIndiaContent[location] || lifeIndiaContent['home'];
  
  document.getElementById('showcaseImg').src = data.image;
  document.getElementById('showcaseTitle').textContent = data.title;
  document.getElementById('showcaseDesc').textContent = data.description;
  
  document.querySelectorAll('.life-india-dot').forEach(dot => {
    dot.classList.toggle('active', dot.getAttribute('data-location') === location);
  });
  
  // Update current index
  currentLocationIndex = locations.indexOf(location);
  
  // Reset auto-rotation
  clearInterval(autoRotateInterval);
  startAutoRotate();
}

function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    currentLocationIndex = (currentLocationIndex + 1) % locations.length;
    switchShowcase(locations[currentLocationIndex]);
  }, 4000);
}

function initLifeIndiaSection() {
  startAutoRotate();
}

// ===== PRODUCT LAUNCH SECTION =====
const productLaunchContent = {
  specs: {
    title: 'Advanced Specifications',
    description: 'Built with precision engineering and premium materials. Every detail designed for performance and longevity.'
  },
  warranty: {
    title: '5-Year Warranty',
    description: 'We stand behind our product. Enjoy complete peace of mind with our comprehensive 5-year warranty coverage.'
  },
  delivery: {
    title: 'Fast Delivery',
    description: 'Order today, receive tomorrow in select cities. Secure packaging ensures your Muted Aero One arrives in perfect condition.'
  }
};

function initProductLaunch() {
  const tabs = document.querySelectorAll('.product-launch-tab');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const id = tab.getAttribute('data-tab');
      const content = productLaunchContent[id];
      if (!content) return;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const contentWrapper = document.querySelector('.product-launch-content');
      if (contentWrapper) {
        contentWrapper.innerHTML = `
          <h3>${content.title}</h3>
          <p>${content.description}</p>
        `;
      }
    });
  });
}

// ===== ISSUE TAGS =====
const issueContent = {
  delhi_aqi: { title: 'Delhi AQI Crisis', description: 'Fighting severe air quality issues in India\'s capital' },
  bangalore_growth: { title: 'Bangalore Growth Pains', description: 'Urban expansion leading to increased pollution levels' },
  coastal_salt: { title: 'Coastal Salt Air', description: 'Managing salt and humidity in coastal regions' }
};

function initIssueTags() {
  const issueTags = document.querySelectorAll('.issue-tag');
  if (!issueTags.length) return;

  issueTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const id = tag.getAttribute('data-issue');
      const content = issueContent[id];
      if (!content) return;

      issueTags.forEach(t => t.classList.toggle('active', t.getAttribute('data-issue') === id));

      const contentArea = document.querySelector('.issue-content');
      if (!contentArea) return;

      const issueImage = contentArea.querySelector('.issue-image img');
      const issueCard = contentArea.querySelector('.issue-card');

      if (issueImage) {
        const imageMap = {
          delhi_aqi: 'images/traffic.jpeg',
          bangalore_growth: 'images/office.jpeg',
          coastal_salt: 'images/kitchen.jpeg'
        };
        issueImage.src = imageMap[id] || 'images/traffic.jpeg';
        issueImage.alt = content.title;
      }

      if (issueCard) {
        issueCard.innerHTML = `
          <h3>${content.title}</h3>
          <p>${content.description}</p>
        `;
      }
    });
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const apiUrl = window.location.protocol === 'file:'
        ? 'http://localhost:3000/api/contact'
        : '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const responseText = await response.text();
      let data = {};

      try {
        data = responseText ? JSON.parse(responseText) : {};
      } catch (jsonError) {
        console.error('Non-JSON response received:', responseText);
        data = { error: responseText || 'Server returned an invalid response.' };
      }

      if (response.ok && data.success) {
        // Show success message inline
        const successDiv = document.getElementById('contactSuccessMessage');
        const errorDiv = document.getElementById('contactErrorMessage');
        if (successDiv) {
          successDiv.style.display = 'block';
        }
        if (errorDiv) {
          errorDiv.style.display = 'none';
        }
        contactForm.style.display = 'none';
      } else {
        // Show error message inline instead of alert
        const errorDiv = document.getElementById('contactErrorMessage');
        const errorText = document.getElementById('contactErrorText');
        if (errorDiv && errorText) {
          errorText.textContent = data.error || 'Failed to send message. Please try again.';
          errorDiv.style.display = 'block';
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      // Show error message inline instead of alert
      const errorDiv = document.getElementById('contactErrorMessage');
      const errorText = document.getElementById('contactErrorText');
      if (errorDiv && errorText) {
        errorText.textContent = 'Connection error: ' + error.message;
        errorDiv.style.display = 'block';
      }
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// ===== INITIALIZE APP =====
function initApp() {
  initProductLaunch();
  initIssueTags();
  initLifeIndiaSection();
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initApp();
} else {
  window.addEventListener('DOMContentLoaded', initApp);
}
