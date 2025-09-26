// TrimGhar Application JavaScript

// Application Data
const appData = {
  "barbers": [
    {
      "id": 1,
      "name": "Rajesh Shrestha",
      "specialty": "Traditional & Modern Cuts",
      "rating": 4.8,
      "reviews": 127,
      "price_range": "NPR 800-1500",
      "location": "Thamel, Kathmandu",
      "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
      "experience": "8 years"
    },
    {
      "id": 2,
      "name": "Amrit Gurung",
      "specialty": "Beard Styling & Fade",
      "rating": 4.9,
      "reviews": 89,
      "price_range": "NPR 600-1200",
      "location": "Patan, Lalitpur",
      "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
      "experience": "6 years"
    },
    {
      "id": 3,
      "name": "Suman Thapa",
      "specialty": "Premium Grooming",
      "rating": 4.7,
      "reviews": 156,
      "price_range": "NPR 1000-2000",
      "location": "New Road, Kathmandu",
      "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
      "experience": "10 years"
    },
    {
      "id": 4,
      "name": "Dipesh Tamang",
      "specialty": "Hair Design & Color",
      "rating": 4.6,
      "reviews": 94,
      "price_range": "NPR 900-1800",
      "location": "Durbarmarg, Kathmandu",
      "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=face",
      "experience": "7 years"
    }
  ],
  "services": [
    {
      "name": "Classic Haircut",
      "duration": "45 min",
      "price": "NPR 600-800",
      "description": "Traditional scissor cut with styling"
    },
    {
      "name": "Modern Fade",
      "duration": "60 min", 
      "price": "NPR 800-1200",
      "description": "Contemporary fade with precision detailing"
    },
    {
      "name": "Beard Trim & Style",
      "duration": "30 min",
      "price": "NPR 400-600",
      "description": "Professional beard shaping and styling"
    },
    {
      "name": "Hot Towel Shave",
      "duration": "45 min",
      "price": "NPR 700-900",
      "description": "Traditional wet shave with hot towel treatment"
    },
    {
      "name": "Hair Wash & Treatment",
      "duration": "30 min",
      "price": "NPR 300-500",
      "description": "Deep cleansing and conditioning treatment"
    },
    {
      "name": "Complete Grooming Package",
      "duration": "90 min",
      "price": "NPR 1500-2500",
      "description": "Full service including cut, shave, and styling"
    }
  ],
  "reviews": [
    {
      "name": "Bikram Rai",
      "rating": 5,
      "text": "Excellent service! Rajesh gave me the best fade I've ever had. Highly recommend TrimGhar!",
      "location": "Kathmandu"
    },
    {
      "name": "Rohit Sharma",
      "rating": 5,
      "text": "Professional atmosphere and skilled barbers. The booking system is so convenient.",
      "location": "Lalitpur"
    },
    {
      "name": "Nischal Pradhan",
      "rating": 4,
      "text": "Great experience! Clean salon and reasonable prices. Will definitely come back.",
      "location": "Bhaktapur"
    }
  ]
};

// Utility Functions
function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars += '★';
  }
  
  // Half star
  if (hasHalfStar) {
    stars += '☆';
  }
  
  // Empty stars
  const remainingStars = 5 - Math.ceil(rating);
  for (let i = 0; i < remainingStars; i++) {
    stars += '☆';
  }
  
  return stars;
}

function showLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('active');
  }
}

function hideLoading() {
  const loadingOverlay = document.getElementById('loadingOverlay');
  if (loadingOverlay) {
    setTimeout(() => {
      loadingOverlay.classList.remove('active');
    }, 1000);
  }
}

// Booking Modal Functions
function createBookingModal() {
  const modalHTML = `
    <div id="bookingModal" class="modal hidden">
      <div class="modal-backdrop"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Book Appointment</h3>
          <button class="modal-close" onclick="closeBookingModal()">&times;</button>
        </div>
        <div class="modal-body">
          <div class="booking-barber-info" id="bookingBarberInfo">
            <!-- Barber info will be populated here -->
          </div>
          <form class="booking-form" id="bookingForm">
            <div class="form-group">
              <label class="form-label">Service</label>
              <select class="form-control" id="serviceSelect" required>
                <option value="">Select a service</option>
                ${appData.services.map(service => 
                  `<option value="${service.name}">${service.name} - ${service.price}</option>`
                ).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Date</label>
              <input type="date" class="form-control" id="appointmentDate" required min="${new Date().toISOString().split('T')[0]}">
            </div>
            <div class="form-group">
              <label class="form-label">Time</label>
              <select class="form-control" id="appointmentTime" required>
                <option value="">Select time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" id="customerName" placeholder="Your full name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="tel" class="form-control" id="customerPhone" placeholder="+977-98XXXXXXXX" required>
            </div>
            <div class="form-group">
              <label class="form-label">Special Notes (Optional)</label>
              <textarea class="form-control" id="specialNotes" rows="3" placeholder="Any special requirements or notes..."></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" onclick="closeBookingModal()">Cancel</button>
          <button type="submit" form="bookingForm" class="btn btn-primary">Confirm Booking</button>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add form submit handler
  document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
}

function openBookingModal(barberId) {
  const barber = appData.barbers.find(b => b.id === barberId);
  if (!barber) return;
  
  const modal = document.getElementById('bookingModal');
  const barberInfo = document.getElementById('bookingBarberInfo');
  
  barberInfo.innerHTML = `
    <div class="booking-barber-card">
      <img src="${barber.image}" alt="${barber.name}" class="booking-barber-image">
      <div class="booking-barber-details">
        <h4>${barber.name}</h4>
        <p class="booking-barber-specialty">${barber.specialty}</p>
        <div class="booking-barber-rating">
          <span class="stars">${generateStars(barber.rating)}</span>
          <span class="rating-text">${barber.rating} (${barber.reviews} reviews)</span>
        </div>
        <p class="booking-barber-location">📍 ${barber.location}</p>
        <p class="booking-barber-price">${barber.price_range}</p>
      </div>
    </div>
  `;
  
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  
  // Reset form
  document.getElementById('bookingForm').reset();
}

function handleBookingSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const bookingData = {
    service: document.getElementById('serviceSelect').value,
    date: document.getElementById('appointmentDate').value,
    time: document.getElementById('appointmentTime').value,
    name: document.getElementById('customerName').value,
    phone: document.getElementById('customerPhone').value,
    notes: document.getElementById('specialNotes').value
  };
  
  showLoading();
  
  setTimeout(() => {
    hideLoading();
    closeBookingModal();
    
    // Show success message
    showSuccessMessage(bookingData);
  }, 2000);
}

function showSuccessMessage(bookingData) {
  const successHTML = `
    <div id="successMessage" class="success-modal">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h3>Booking Confirmed!</h3>
        <p>Your appointment has been successfully booked.</p>
        <div class="success-details">
          <p><strong>Service:</strong> ${bookingData.service}</p>
          <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${bookingData.time}</p>
          <p><strong>Name:</strong> ${bookingData.name}</p>
        </div>
        <p class="success-note">We'll send you a confirmation SMS shortly. Thank you for choosing TrimGhar!</p>
        <button class="btn btn-primary" onclick="closeSuccessMessage()">Done</button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', successHTML);
  document.body.style.overflow = 'hidden';
}

function closeSuccessMessage() {
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.remove();
    document.body.style.overflow = 'auto';
  }
}

function handleBookingClick(barberId) {
  openBookingModal(barberId);
}

// Render Functions
function renderBarbers() {
  const barbersGrid = document.getElementById('barbersGrid');
  if (!barbersGrid) return;
  
  const barbersHTML = appData.barbers.map(barber => `
    <div class="barber-card">
      <img src="${barber.image}" alt="${barber.name}" class="barber-image" loading="lazy">
      <h3 class="barber-name">${barber.name}</h3>
      <p class="barber-specialty">${barber.specialty}</p>
      <div class="barber-rating">
        <span class="stars">${generateStars(barber.rating)}</span>
        <span class="rating-text">${barber.rating} (${barber.reviews} reviews)</span>
      </div>
      <div class="barber-details">
        <div class="barber-location">📍 ${barber.location}</div>
        <div class="barber-experience">🕐 ${barber.experience}</div>
      </div>
      <div class="barber-price">${barber.price_range}</div>
      <button class="btn btn-secondary" onclick="handleBookingClick(${barber.id})">Book Now</button>
    </div>
  `).join('');
  
  barbersGrid.innerHTML = barbersHTML;
}

function renderServices() {
  const servicesGrid = document.getElementById('servicesGrid');
  if (!servicesGrid) return;
  
  const servicesHTML = appData.services.map(service => `
    <div class="service-card">
      <div class="service-header">
        <h3 class="service-name">${service.name}</h3>
        <div class="service-price">${service.price}</div>
      </div>
      <div class="service-duration">⏱️ ${service.duration}</div>
      <p class="service-description">${service.description}</p>
      <a href="#barbers" class="service-link">Book Service →</a>
    </div>
  `).join('');
  
  servicesGrid.innerHTML = servicesHTML;
}

function renderReviews() {
  const reviewsContainer = document.getElementById('reviewsContainer');
  if (!reviewsContainer) return;
  
  const reviewsHTML = appData.reviews.map(review => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-name">${review.name}</div>
        <div class="review-stars">${generateStars(review.rating)}</div>
      </div>
      <p class="review-text">"${review.text}"</p>
      <div class="review-location">📍 ${review.location}</div>
    </div>
  `).join('');
  
  reviewsContainer.innerHTML = reviewsHTML;
}

// Navigation Functions
function initializeNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const heroCTA = document.querySelector('.hero-cta');
  
  // Handle navigation link clicks
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all links
      navLinks.forEach(l => l.classList.remove('active'));
      
      // Add active class to clicked link
      link.classList.add('active');
      
      // Get target section
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Smooth scroll to section
        const navbarHeight = 72;
        const targetPosition = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Handle hero CTA click
  if (heroCTA) {
    heroCTA.addEventListener('click', () => {
      const barbersSection = document.querySelector('#barbers');
      if (barbersSection) {
        const navbarHeight = 72;
        const targetPosition = barbersSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // Handle scroll-based active navigation
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Animation Functions
function initializeAnimations() {
  // Intersection Observer for scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe cards for animation
  setTimeout(() => {
    const cards = document.querySelectorAll('.barber-card, .service-card, .review-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(card);
    });
  }, 500);
}

// Service Link Handlers
function initializeServiceLinks() {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('service-link')) {
      e.preventDefault();
      const barbersSection = document.querySelector('#barbers');
      if (barbersSection) {
        const navbarHeight = 72;
        const targetPosition = barbersSection.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
}

// Image Loading Error Handler
function initializeImageErrorHandling() {
  document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('barber-image')) {
      // Fallback to a default image or placeholder
      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjVGNUY1Ii8+CjxjaXJjbGUgY3g9IjYwIiBjeT0iNDUiIHI9IjE1IiBmaWxsPSIjOTRBM0I4Ii8+CjxwYXRoIGQ9Ik0zMCA5MEM0MCA4MCA4MCA4MCA5MCA5MEwzMCA5MFoiIGZpbGw9IiM5NEEzQjgiLz4KPC9zdmc+';
      e.target.alt = 'Barber Profile';
    }
  }, true);
}

// Initialize Application
function initializeApp() {
  // Create booking modal
  createBookingModal();
  
  // Show initial loading
  setTimeout(() => {
    // Render all content
    renderBarbers();
    renderServices();
    renderReviews();
    
    // Initialize interactions
    initializeNavigation();
    initializeServiceLinks();
    initializeImageErrorHandling();
    
    // Initialize animations
    initializeAnimations();
    
    // Hide loading after content is rendered
    hideLoading();
  }, 800);
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

// Window Load Event for final touches
window.addEventListener('load', () => {
  // Additional initialization if needed
  console.log('TrimGhar application loaded successfully!');
});

// Export functions for potential external use
window.TrimGharApp = {
  showLoading,
  hideLoading,
  handleBookingClick,
  openBookingModal,
  closeBookingModal,
  appData
};