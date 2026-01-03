// ===============================
// CONFIG
// ===============================
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSwFxPJKh_PJtrtjHR-c53wAF1Z9hFUB5ryuj4i3TDKE1FXnsPx9h4q7cumOZpNW_zSRzShj1SQfmOo/pub?output=csv";

// ===============================
// CSV PARSER (SIMPLE & AMAN)
// ===============================
function parseCSV(text) {
  const rows = [];
  let row = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"' && insideQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      row.push(current);
      current = "";
    } else if (char === "\n" && !insideQuotes) {
      row.push(current);
      rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current) {
    row.push(current);
    rows.push(row);
  }

  const headers = rows.shift().map(h => h.trim());

  return rows.map(cols => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (cols[i] || "").trim();
    });
    return obj;
  });
}


// ===============================
// NORMALIZER (SAMA DENGAN JSON)
// ===============================
function normalizeProduct(row) {
  return {
    id: row.id,
    nama: row.nama,
    kategori: row.kategori,
    deskripsi: row.deskripsi,
    gambar: row.gambar,
    lebar: row.lebar,
    min_order: row.min_order,
    best_seller: row.best_seller === "Ya",
    published: row.published === "Ya"
  };
}

// ===============================
// GLOBAL DATA SERVICE
// ===============================
function getProducts(callback) {
  fetch(SHEET_CSV_URL)
    .then(res => res.text())
    .then(text => {
      const rows = parseCSV(text);

      const products = rows
        .map(normalizeProduct)
        .filter(p => p.published);

      callback(products);
    })
    .catch(err => {
      console.error("Gagal load data dari Sheets:", err);
      callback([]);
    });
}
