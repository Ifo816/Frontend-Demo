/*
 You can now:
Later, you can add contact forms, project sections, or even a cart functionality.

*/






// =======================
// DATA
// =======================
const products = [
  { id: 1, title: "Wireless Headphones", category: "Audio", price: 99, image: "images/headphones.jpg" },
  { id: 2, title: "Mechanical Keyboard", category: "Accessories", price: 129, image: "images/mechanical-keyboard.jpg" },
  { id: 3, title: "Smart Watch", category: "Wearables", price: 199, image: "images/smart-watch.jpg" },
  { id: 4, title: "Bluetooth Speaker", category: "Audio", price: 79, image: "images/bluetooth-speaker.jpg" },
  { id: 5, title: "Mobile Phone", category: "Electronics", price: 160, image: "images/mobile-phone.jpg" },
  { id: 6, title: "Laptop", category: "Electronics", price: 600, image: "images/laptop.jpg" },
  { id: 7, title: "Mouse", category: "Accessories", price: 30, image: "images/computer-mouse.jpg" },
];

// =======================
// DOM ELEMENTS
// =======================
const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

// =======================
// TOGGLE MOBILE MENU
// =======================
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// =======================
// UI HELPERS
// =======================
function showLoading() {
  productsContainer.innerHTML = "<p>Loading products...</p>";
}

function showError(message) {
  productsContainer.innerHTML = `<p>${message}</p>`;
}

// =======================
// RENDER PRODUCTS
// =======================
function renderProducts(productList) {
  productsContainer.innerHTML = "";

  if (productList.length === 0) {
    productsContainer.innerHTML = "<p>No products found.</p>";
    return;
  }

  productList.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h2>${product.title}</h2>
      <p>Category: ${product.category}</p>
      <p>Price: €${product.price}</p>
      <button>Add to Cart</button>
    `;

    productsContainer.appendChild(card);
  });
}

// =======================
// FILTER + SORT LOGIC
// =======================
function updateProducts() {
  let filtered = [...products];

  // SEARCH
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  // CATEGORY
  const selectedCategory = categorySelect.value;
  if (selectedCategory !== "All") {
    filtered = filtered.filter(product =>
      product.category === selectedCategory
    );
  }

  // SORT
  const sortValue = sortSelect.value;
  if (sortValue === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

// =======================
// INIT
// =======================
function loadProducts() {
  showLoading();
  setTimeout(() => {
    try {
      renderProducts(products);
    } catch (error) {
      showError("Failed to load products.");
    }
  }, 800);
}

searchInput.addEventListener("input", updateProducts);
categorySelect.addEventListener("change", updateProducts);
sortSelect.addEventListener("change", updateProducts);

loadProducts();


/*Form update event listener

const contactForm = document.querySelector(".contact form");

contactForm.addEventListener("submit", function(e){
  //Optional: prevent default only if you want a custom thank-you message
  //e.preventDefault();

  //Reset the form fields
  contactForm.reset();

 
})*/