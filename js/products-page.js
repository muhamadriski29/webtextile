const PRODUCT_URL = "data/products.json";
const ITEMS_PER_PAGE = 6;

let activeCategory = "Semua";
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  if (!container) return;

  getProducts(products => {
    allProducts = products;
    filteredProducts = products;
    renderFilters();
    renderPage();
  })
    .catch(err => console.error("Gagal load produk:", err));
});

// ===== FILTER =====
function renderFilters() {
  const filterContainer = document.getElementById("filter-container");
  if (!filterContainer) return;

  const categories = ["Semua", ...new Set(allProducts.map(p => p.kategori))];

  filterContainer.innerHTML = categories.map(cat => `
    <button
      class="px-4 py-2 rounded-full border text-sm transition
        ${
          cat === activeCategory
            ? "bg-purple-600 text-white border-purple-600"
            : "bg-white text-gray-700 hover:bg-purple-100"
        }"
      onclick="applyFilter('${cat}')">
      ${cat}
    </button>
  `).join("");
}

function applyFilter(category) {
  activeCategory = category;   // 🔥 INI KUNCI UTAMANYA
  currentPage = 1;

  filteredProducts =
    category === "Semua"
      ? allProducts
      : allProducts.filter(p => p.kategori === category);

  renderFilters(); // render ulang tombol dengan state baru
  renderPage();
}

// ===== RENDER PRODUK =====
function renderPage() {
  const container = document.getElementById("product-list");
  if (!container) return;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const items = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  container.innerHTML = items.map((product, index) => `
    <div class="relative bg-[#FFFBF4] rounded-2xl shadow-md
                border border-[#EADDBB] p-5
                hover:shadow-xl transition flex flex-col
                product-enter"
         style="transition-delay:${index * 80}ms">

      ${
        product.best_seller
          ? `<span class="absolute top-3 left-3
                   bg-red-600 text-white text-xs font-semibold
                   px-3 py-1 rounded-full shadow">
               Best Seller
             </span>`
          : ""
      }

      <img src="assets/images/${product.gambar}"
           alt="${product.nama}"
           class="rounded-lg mb-4 w-full h-48 object-cover">

      <h3 class="font-semibold mb-2">${product.nama}</h3>

      <p class="text-sm text-gray-600 mb-3 line-clamp-3">
        ${product.deskripsi}
      </p>

      <p class="text-sm">Lebar: ${product.lebar}</p>
      <p class="text-sm mb-4">Min Order: ${product.min_order}</p>

      <a target="_blank"
         href="${createWhatsAppLink(product)}"
         class="mt-auto block text-center
                bg-green-600 text-white py-2 rounded-lg
                hover:bg-green-700 transition">
        Order via WhatsApp
      </a>
    </div>
  `).join("");

  // trigger animasi
  requestAnimationFrame(() => {
    document.querySelectorAll(".product-enter").forEach(el => {
      el.classList.add("show");
    });
  });

  renderPagination();
}

// ===== PAGINATION =====
function renderPagination() {
  const pag = document.getElementById("pagination");
  if (!pag) return;

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  pag.innerHTML = `
    <button
      onclick="changePage(${currentPage - 1})"
      class="px-3 py-1 rounded border transition
             ${currentPage === 1 ? "opacity-40" : "hover:bg-purple-100"}"
      ${currentPage === 1 ? "disabled" : ""}>
      Prev
    </button>

    ${Array.from({ length: totalPages }, (_, i) => `
      <button
        onclick="changePage(${i + 1})"
        class="px-3 py-1 rounded border transition
          ${
            currentPage === i + 1
              ? "bg-purple-600 text-white border-purple-600"
              : "hover:bg-purple-100"
          }">
        ${i + 1}
      </button>
    `).join("")}

    <button
      onclick="changePage(${currentPage + 1})"
      class="px-3 py-1 rounded border transition
             ${currentPage === totalPages ? "opacity-40" : "hover:bg-purple-100"}"
      ${currentPage === totalPages ? "disabled" : ""}>
      Next
    </button>
  `;
}


function changePage(page) {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderPage();
}

// ===== WHATSAPP =====
function createWhatsAppLink(product) {
  const message = `
Halo Admin,
Saya tertarik dengan produk:

Nama: ${product.nama}
Kategori: ${product.kategori}
Lebar: ${product.lebar}
Min Order: ${product.min_order}

Mohon info lebih lanjut 🙏
  `;
  return `https://wa.me/6289507245269?text=${encodeURIComponent(message)}`;
}
