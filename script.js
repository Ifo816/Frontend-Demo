// =======================
// DATA
// =======================
const products = [
  { id: 1, title: "Wireless Headphones", category: "Audio", price: 99 },
  { id: 2, title: "Mechanical Keyboard", category: "Accessories", price: 129 },
  { id: 3, title: "Smart Watch", category: "Wearables", price: 199 },
  { id: 4, title: "Bluetooth Speaker", category: "Audio", price: 79 },
  { id: 5, title: "Mobile Phone", category: "Electronics", price: 160 },
  { id: 6, title: "Laptop", category: "Electronics", price: 600 },
  { id: 7, title: "Mouse", category: "Accessories", price: 30 },
];

// =======================
// DOM ELEMENTS
// =======================
const productsContainer = document.querySelector(".products");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const sortSelect = document.getElementById("sort");

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
      <h2>${product.title}</h2>
      <p>Category: ${product.category}</p>
      <p>Price: €${product.price}</p>
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
// LOAD PRODUCTS
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

// =======================
// EVENT LISTENERS
// =======================
searchInput.addEventListener("input", updateProducts);
categorySelect.addEventListener("change", updateProducts);
sortSelect.addEventListener("change", updateProducts);

// =======================
// INIT
// =======================
loadProducts();
