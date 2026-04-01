/* CozyNest Home Decor - Interaction & Data */
/* script.js */

// Product Data Array
const products = [
    // Living Room
    { id: 1, name: "Minimalist Floor Lamp", price: "Rs. 15,000", category: "Living Room", image: "assets/images/lamp.png" },
    { id: 7, name: "Velvet Armchair", price: "Rs. 45,000", category: "Living Room", image: "assets/images/armchair.jpg" },
    { id: 8, name: "Marble Coffee Table", price: "Rs. 28,000", category: "Living Room", image: "assets/images/coffee_table.jpg" },
    { id: 3, name: "Monstera Indoor Plant", price: "Rs. 3,500", category: "Living Room", image: "assets/images/plant.png" },
    
    // Bedroom
    { id: 2, name: "Abstract Wall Art", price: "Rs. 8,500", category: "Bedroom", image: "assets/images/wall_art.jpg" },
    { id: 4, name: "Textured Linen Cushion", price: "Rs. 2,800", category: "Bedroom", image: "assets/images/cushion.jpg" },
    { id: 9, name: "Solid Oak Bedside Table", price: "Rs. 12,000", category: "Bedroom", image: "assets/images/bedside_table.jpg" },
    { id: 10, name: "Scented Candle Set", price: "Rs. 3,500", category: "Bedroom", image: "assets/images/candle_set.jpg" },
    
    // Kitchen
    { id: 5, name: "Ceramic Vase Set", price: "Rs. 5,500", category: "Kitchen", image: "assets/images/vase_set.jpg" },
    { id: 6, name: "Wooden Serving Tray", price: "Rs. 4,200", category: "Kitchen", image: "assets/images/tray.jpg" },
    { id: 11, name: "Bamboo Spice Rack", price: "Rs. 2,500", category: "Kitchen", image: "assets/images/spice_rack.jpg" },
    { id: 12, name: "Minimalist Dinner Set", price: "Rs. 18,000", category: "Kitchen", image: "assets/images/dinner_set.jpg" },
    
    // Washroom
    { id: 13, name: "Plush Cotton Towels", price: "Rs. 4,500", category: "Washroom", image: "assets/images/towels.jpg" },
    { id: 14, name: "Minimalist Soap Set", price: "Rs. 1,800", category: "Washroom", image: "assets/images/soap_set.jpg" },
    { id: 15, name: "Bamboo Bath Mat", price: "Rs. 3,200", category: "Washroom", image: "assets/images/bath_mat.jpg" },
    
    // Balcony
    { id: 16, name: "Rattan Outdoor Chair", price: "Rs. 25,000", category: "Balcony", image: "assets/images/outdoor_chair.jpg" },
    { id: 17, name: "String Fairy Lights", price: "Rs. 1,500", category: "Balcony", image: "assets/images/fairy_lights.jpg" },
    { id: 18, name: "Hanging Planter Set", price: "Rs. 3,800", category: "Balcony", image: "assets/images/planter_set.jpg" }
];

let currentCategory = 'all';

// Function to render products dynamically
function renderProducts(items) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;
    grid.innerHTML = '';
    
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-cart-btn" onclick="addToCart('${product.name}')">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search and Filter functionality
function filterProducts() {
    const queryInput = document.getElementById('productSearch');
    const query = queryInput ? queryInput.value.toLowerCase() : '';
    
    const filtered = products.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(query);
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        return matchesSearch && matchesCategory;
    });
    renderProducts(filtered);
}

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText === cat || (cat === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });
    filterProducts();
}

// Shopping Cart Logic
function addToCart(name) {
    alert(name + " added to your cart!");
}

// Auth Logic (Login/Signup Modals)
function openModal(type) {
    document.getElementById('authModal').style.display = 'flex';
    toggleAuth(type);
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
}

function toggleAuth(type) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (type === 'login') {
        loginForm.style.display = 'block';
        signupForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function handleAuth(e, type) {
    e.preventDefault();
    alert(type + " Successful! Welcome to CozyNest Decor.");
    closeModal();
}

// Form Handlers
function handleContactSubmit(e) {
    e.preventDefault();
    alert("Thank you for your message! Our team will get back to you soon.");
    e.target.reset();
}

function handleNewsletter(e) {
    e.preventDefault();
    alert("Thank you for subscribing! Check your email for decor tips.");
    e.target.reset();
}

// Scroll Animations (Fade-in effect)
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initial Product Render
    renderProducts(products);
});

// Navigation scroll styling
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        nav.style.backgroundColor = 'rgba(250, 249, 246, 0.98)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
        nav.style.backgroundColor = 'rgba(250, 249, 246, 0.95)';
    }
});
