document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("product-list");
  if (!container) return;

  getProducts((products) => {
    const bestSellerProducts = products.filter((p) => ["ya", "yes", "true", "1"].includes(String(p.best_seller).trim().toLowerCase()));

    renderHomeProducts(bestSellerProducts.slice(0, 3));
  });
});

function renderHomeProducts(items) {
  const container = document.getElementById("product-list");

  container.innerHTML = items
    .map(
      (p) => `
    <div class="bg-white rounded-xl shadow p-4 text-left relative">

      ${
        p.best_seller
          ? `
        <span class="absolute top-3 left-3 bg-yellow-400 text-xs px-2 py-1 rounded-full">
          ⭐ Best Seller
        </span>
      `
          : ""
      }

      <div class="w-full h-48 bg-amber-400/10 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
        <img 
          src="assets/images/${p.gambar}"
          alt="${p.nama}"
          onclick="openImageModal(this.src, this.alt)"
          class="w-full h-full object-contain"
        >
      </div>


      <h3 class="font-semibold text-lg">${p.nama}</h3>
      <p class="text-sm text-gray-600">${p.deskripsi}</p>
    </div>
  `,
    )
    .join("");
}
