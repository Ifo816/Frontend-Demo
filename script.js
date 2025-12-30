/*
This version is fully responsive, visually appealing, and interactive. You can now:

Add real images for your products.

Push this to GitHub and link it to your portfolio.

Later, you can add contact forms, project sections, or even a cart functionality.

*/






// =======================
// DATA
// =======================
const products = [
  { id: 1, title: "Wireless Headphones", category: "Audio", price: 99, image: "https://via.placeholder.com/300x150?text=Headphones" },
  { id: 2, title: "Mechanical Keyboard", category: "Accessories", price: 129, image: "https://via.placeholder.com/300x150?text=Keyboard" },
  { id: 3, title: "Smart Watch", category: "Wearables", price: 199, image: "https://via.placeholder.com/300x150?text=Smart+Watch" },
  { id: 4, title: "Bluetooth Speaker", category: "Audio", price: 79, image: "https://via.placeholder.com/300x150?text=Speaker" },
  { id: 5, title: "Mobile Phone", category: "Electronics", price: 160, image: "https://via.placeholder.com/300x150?text=Phone" },
  { id: 6, title: "Laptop", category: "Electronics", price: 600, image: "https://via.placeholder.com/300x150?text=Laptop" },
  { id: 7, title: "Mouse", category: "Accessories", price: 30, image: "https://via.placeholder.com/300x150?text=Mouse" },
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
