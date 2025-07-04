// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Family Home",
    price: 750000,
    location: "Beverly Hills, CA",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    image: "./images/Modern Family Home.jpeg",
    description:
      "Beautiful modern family home with spacious rooms, updated kitchen, and large backyard perfect for entertaining.",
    features: ["Swimming Pool", "Garage", "Garden", "Modern Kitchen"],
    status: "sale",
    featured: true,
    dateAdded: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Downtown Luxury Apartment",
    price: 450000,
    location: "Manhattan, NY",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    image: "./images/Modern Family Home.jpeg",
    description: "Stunning luxury apartment in the heart of Manhattan with city views and premium amenities.",
    features: ["City View", "Gym", "Concierge", "Balcony"],
    status: "sale",
    featured: true,
    dateAdded: new Date("2024-01-20"),
  },
  {
    id: 3,
    title: "Cozy Suburban Condo",
    price: 320000,
    location: "Austin, TX",
    type: "condo",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    image: "./images/Modern Family Home.jpeg",
    description: "Perfect starter home in a quiet suburban neighborhood with great schools and community amenities.",
    features: ["Community Pool", "Playground", "Security", "Parking"],
    status: "sale",
    featured: false,
    dateAdded: new Date("2024-01-10"),
  },
  {
    id: 4,
    title: "Luxury Villa with Ocean View",
    price: 1250000,
    location: "Malibu, CA",
    type: "villa",
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    image: "./images/Modern Family Home.jpeg",
    description:
      "Breathtaking luxury villa with panoramic ocean views, private beach access, and world-class amenities.",
    features: ["Ocean View", "Private Beach", "Wine Cellar", "Home Theater"],
    status: "sale",
    featured: true,
    dateAdded: new Date("2024-01-25"),
  },
  {
    id: 5,
    title: "Urban Loft Space",
    price: 380000,
    location: "Chicago, IL",
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    image: "./images/Modern Family Home.jpeg",
    description: "Trendy urban loft in converted warehouse with exposed brick, high ceilings, and modern fixtures.",
    features: ["Exposed Brick", "High Ceilings", "Hardwood Floors", "Rooftop Access"],
    status: "rent",
    featured: false,
    dateAdded: new Date("2024-01-12"),
  },
  {
    id: 6,
    title: "Family Ranch House",
    price: 580000,
    location: "Phoenix, AZ",
    type: "house",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    image: "./images/Modern Family Home.jpeg",
    description:
      "Spacious ranch-style home with open floor plan, updated kitchen, and large lot with mature landscaping.",
    features: ["Open Floor Plan", "Updated Kitchen", "Large Lot", "2-Car Garage"],
    status: "sale",
    featured: false,
    dateAdded: new Date("2024-01-08"),
  },
]

// Global variables
let filteredProperties = [...properties]
let currentPage = 1
const propertiesPerPage = 6

// DOM elements
const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")
const searchForm = document.getElementById("search-form")
const featuredGrid = document.getElementById("featured-grid")
const propertiesGrid = document.getElementById("properties-grid")
const loadMoreBtn = document.getElementById("load-more")
const modal = document.getElementById("property-modal")
const modalBody = document.getElementById("modal-body")
const closeModal = document.querySelector(".close-modal")

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  displayFeaturedProperties()
  displayProperties()
  setupScrollAnimations()
}

function setupEventListeners() {
  // Mobile menu toggle
  mobileMenu.addEventListener("click", toggleMobileMenu)

  // Navigation links
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", handleNavClick)
  })

  // Search form
  searchForm.addEventListener("submit", handleSearch)

  // Filters
  document.getElementById("sort-filter").addEventListener("change", handleSort)
  document.getElementById("bedroom-filter").addEventListener("change", handleFilter)
  document.getElementById("type-filter").addEventListener("change", handleFilter)

  // Load more button
  loadMoreBtn.addEventListener("click", loadMoreProperties)

  // Modal
  closeModal.addEventListener("click", closePropertyModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closePropertyModal()
    }
  })

  // Contact form
  document.getElementById("contact-form").addEventListener("submit", handleContactForm)

  // Navbar scroll effect
  window.addEventListener("scroll", handleNavbarScroll)

  // Active navigation highlighting
  window.addEventListener("scroll", highlightActiveNav)
}

// Mobile menu functionality
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
}

function handleNavClick(e) {
  // Close mobile menu
  mobileMenu.classList.remove("active")
  navMenu.classList.remove("active")

  // Smooth scroll to section
  e.preventDefault()
  const targetId = e.target.getAttribute("href")
  const targetSection = document.querySelector(targetId)
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: "smooth" })
  }
}

// Search functionality
function handleSearch(e) {
  e.preventDefault()

  const location = document.getElementById("location-input").value.toLowerCase()
  const propertyType = document.getElementById("property-type").value
  const priceRange = document.getElementById("price-range").value

  filteredProperties = properties.filter((property) => {
    const matchesLocation = !location || property.location.toLowerCase().includes(location)
    const matchesType = !propertyType || property.type === propertyType
    const matchesPrice = !priceRange || checkPriceRange(property.price, priceRange)

    return matchesLocation && matchesType && matchesPrice
  })

  currentPage = 1
  displayProperties()

  // Scroll to properties section
  document.getElementById("properties").scrollIntoView({ behavior: "smooth" })
}

function checkPriceRange(price, range) {
  switch (range) {
    case "0-200000":
      return price <= 200000
    case "200000-500000":
      return price > 200000 && price <= 500000
    case "500000-1000000":
      return price > 500000 && price <= 1000000
    case "1000000+":
      return price > 1000000
    default:
      return true
  }
}

// Sorting and filtering
function handleSort(e) {
  const sortBy = e.target.value

  switch (sortBy) {
    case "price-low":
      filteredProperties.sort((a, b) => a.price - b.price)
      break
    case "price-high":
      filteredProperties.sort((a, b) => b.price - a.price)
      break
    case "newest":
      filteredProperties.sort((a, b) => b.dateAdded - a.dateAdded)
      break
    case "oldest":
      filteredProperties.sort((a, b) => a.dateAdded - b.dateAdded)
      break
  }

  currentPage = 1
  displayProperties()
}

function handleFilter() {
  const bedroomFilter = document.getElementById("bedroom-filter").value
  const typeFilter = document.getElementById("type-filter").value

  filteredProperties = properties.filter((property) => {
    const matchesBedrooms = !bedroomFilter || property.bedrooms >= Number.parseInt(bedroomFilter)
    const matchesType = !typeFilter || property.type === typeFilter

    return matchesBedrooms && matchesType
  })

  currentPage = 1
  displayProperties()
}

// Display properties
function displayFeaturedProperties() {
  const featuredProperties = properties.filter((property) => property.featured)
  featuredGrid.innerHTML = ""

  featuredProperties.forEach((property) => {
    const propertyCard = createPropertyCard(property)
    featuredGrid.appendChild(propertyCard)
  })
}

function displayProperties() {
  const startIndex = 0
  const endIndex = currentPage * propertiesPerPage
  const propertiesToShow = filteredProperties.slice(startIndex, endIndex)

  if (currentPage === 1) {
    propertiesGrid.innerHTML = ""
  }

  propertiesToShow.slice((currentPage - 1) * propertiesPerPage).forEach((property) => {
    const propertyCard = createPropertyCard(property)
    propertiesGrid.appendChild(propertyCard)
  })

  // Show/hide load more button
  if (endIndex >= filteredProperties.length) {
    loadMoreBtn.style.display = "none"
  } else {
    loadMoreBtn.style.display = "block"
  }
}

function createPropertyCard(property) {
  const card = document.createElement("div")
  card.className = "property-card"
  card.addEventListener("click", () => openPropertyModal(property))

  card.innerHTML = `
    <div class="property-image">
      <img src="${property.image}" alt="${property.title}">
      <div class="property-badge ${property.featured ? "featured" : property.status}">
        ${property.featured ? "Featured" : property.status.charAt(0).toUpperCase() + property.status.slice(1)}
      </div>
    </div>
    <div class="property-content">
      <div class="property-price">$${property.price.toLocaleString()}</div>
      <h3 class="property-title">${property.title}</h3>
      <div class="property-location">
        <i class="fas fa-map-marker-alt"></i>
        ${property.location}
      </div>
      <div class="property-features">
        <div class="feature">
          <i class="fas fa-bed"></i>
          ${property.bedrooms} Beds
        </div>
        <div class="feature">
          <i class="fas fa-bath"></i>
          ${property.bathrooms} Baths
        </div>
        <div class="feature">
          <i class="fas fa-ruler-combined"></i>
          ${property.area} sqft
        </div>
      </div>
      <p class="property-description">${property.description}</p>
      <div class="property-actions">
        <button class="btn btn-primary" onclick="event.stopPropagation(); contactAgent(${property.id})">
          <i class="fas fa-phone"></i> Contact Agent
        </button>
        <button class="btn btn-outline" onclick="event.stopPropagation(); scheduleViewing(${property.id})">
          <i class="fas fa-calendar"></i> Schedule Viewing
        </button>
      </div>
    </div>
  `

  return card
}

function loadMoreProperties() {
  currentPage++
  displayProperties()
}

// Modal functionality
function openPropertyModal(property) {
  modalBody.innerHTML = `
    <img src="${property.image}" alt="${property.title}" class="modal-image">
    <div class="modal-header">
      <div>
        <h2 class="modal-title">${property.title}</h2>
        <div class="modal-location">
          <i class="fas fa-map-marker-alt"></i>
          ${property.location}
        </div>
      </div>
      <div class="modal-price">$${property.price.toLocaleString()}</div>
    </div>
    <div class="modal-features">
      <div class="modal-feature">
        <i class="fas fa-bed"></i>
        <span>${property.bedrooms} Bedrooms</span>
      </div>
      <div class="modal-feature">
        <i class="fas fa-bath"></i>
        <span>${property.bathrooms} Bathrooms</span>
      </div>
      <div class="modal-feature">
        <i class="fas fa-ruler-combined"></i>
        <span>${property.area} sqft</span>
      </div>
      <div class="modal-feature">
        <i class="fas fa-home"></i>
        <span>${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</span>
      </div>
    </div>
    <p class="modal-description">${property.description}</p>
    <div class="modal-features">
      ${property.features
        .map(
          (feature) => `
        <div class="modal-feature">
          <i class="fas fa-check"></i>
          <span>${feature}</span>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="modal-actions">
      <button class="btn btn-primary" onclick="contactAgent(${property.id})">
        <i class="fas fa-phone"></i> Contact Agent
      </button>
      <button class="btn btn-outline" onclick="scheduleViewing(${property.id})">
        <i class="fas fa-calendar"></i> Schedule Viewing
      </button>
      <button class="btn btn-outline" onclick="saveProperty(${property.id})">
        <i class="fas fa-heart"></i> Save Property
      </button>
    </div>
  `

  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closePropertyModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Property actions
function contactAgent(propertyId) {
  const property = properties.find((p) => p.id === propertyId)
  alert(`Thank you for your interest in "${property.title}". An agent will contact you shortly!`)
}

function scheduleViewing(propertyId) {
  const property = properties.find((p) => p.id === propertyId)
  alert(`Viewing scheduled for "${property.title}". You will receive a confirmation email shortly.`)
}

function saveProperty(propertyId) {
  const property = properties.find((p) => p.id === propertyId)
  alert(`"${property.title}" has been saved to your favorites!`)
}

// Contact form
function handleContactForm(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  // Simulate form submission
  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you within 24 hours.")
    e.target.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
}

// Navigation effects
function handleNavbarScroll() {
  const navbar = document.getElementById("navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  }
}

function highlightActiveNav() {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in animation to elements
  const fadeElements = document.querySelectorAll(
    ".section-title, .service-card, .property-card, .about-text, .contact-item",
  )

  fadeElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Utility functions
function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Add some sample interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    let i = 0

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 100)
      }
    }

    setTimeout(typeWriter, 1000)
  }
})
