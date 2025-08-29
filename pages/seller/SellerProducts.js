import View from "../../components/core/view.js";
import { localStore } from "../../scripts/utils/storage.js";

export default class SellerProducts extends View {
  template() {
    return `
      <!-- Main Content -->
  <div class="container-fluid mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-10 p-4 bg-white shadow rounded">
        <div class="d-flex gap-3 mb-3">
          <a href="AddProduct.html" class="btn btn-success">
            <i class="fas fa-plus"></i> New Product
          </a>
          <input type="text" id="searchInput" class="form-control w-50 w-lg-25" placeholder="Search...">
          <button id="searchBtn" class="btn btn-success">
            <i class="fa fa-search"></i>
          </button>
        </div>

        <div class="table-responsive">
          <table class="table table-bordered table-striped text-center align-middle">
            <thead class="table-dark">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Category</th>
                <th>SubCategory</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="productTableBody"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Product View Modal -->
  <div class="modal fade" id="productViewModal" tabindex="-1" aria-labelledby="productViewLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productViewLabel">Product Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="productViewBody"></div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Edit Product Modal -->
  <div class="modal fade" id="productEditModal" tabindex="-1" aria-labelledby="productEditModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productEditModalLabel">Edit Product</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="productEditBody"></div>
      </div>
    </div>
  </div>
    `;
  }

  script() {
           function loadProducts() {
  let products = localStore.read("products") || [];
  let tableBody = document.getElementById("productTableBody");
  tableBody.innerHTML = "";

  products.forEach((product, index) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.category}</td>
      <td>${product.subcategory || "-"}</td>
      <td>$${product.price}</td>
      <td><span class="badge ${product.status === "pending" ? "bg-success" : "bg-secondary"}">${product.status}</span></td>
      <td>
        <button class="btn btn-sm btn-info text-white btn-view"><i class="fas fa-eye"></i></button>
        <button class="btn btn-sm btn-warning btn-edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger btn-remove"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(row);

    row.querySelector(".btn-remove").addEventListener("click", function () {
      if (confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        loadProducts();
      }
    });

    row.querySelector(".btn-view").addEventListener("click", function () {
      let modalBody = `
        <form class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input type="text" class="form-control" value="${product.name}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Category</label>
            <input type="text" class="form-control" value="${product.category}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">SubCategory</label>
            <input type="text" class="form-control" value="${product.subcategory || "-"}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Price</label>
            <input type="text" class="form-control" value="$${product.price}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Material</label>
            <input type="text" class="form-control" value="${product.material || "-"}" readonly>
          </div>
          <div class="col-md-6">
            <label class="form-label">Brand</label>
            <input type="text" class="form-control" value="${product.brand || "-"}" readonly>
          </div>
          <div class="col-12">
            <label class="form-label">Description</label>
            <textarea class="form-control" rows="3" readonly>${product.description || "-"}</textarea>
          </div>
          <div class="col-12 mt-3">
            <h5>Stock</h5>
            ${generateStockHTML(product.stock)}
          </div>
        </form>
      `;

      document.getElementById("productViewBody").innerHTML = modalBody;
      const modal = new bootstrap.Modal(document.getElementById("productViewModal"));
      modal.show();
    });

    row.querySelector(".btn-edit").addEventListener("click", function () {
      let modalBody = `
        <form class="needs-validation row g-3" id="editProductForm" novalidate>
          <div class="col-md-6">
            <label for="name" class="form-label fw-bold">Product Name</label>
            <input type="text" name="name" class="form-control shadow-sm" value="${product.name}" required>
            <div class="invalid-feedback">Please enter a valid product name (letters only, max 100 characters).</div>
          </div>
          <div class="col-md-6">
            <label for="price" class="form-label fw-bold">Price</label>
            <div class="input-group shadow-sm">
              <input type="number" step="0.1" name="price" class="form-control" value="${product.price}" required>
              <span class="input-group-text bg-success text-white fw-bold">$</span>
            </div>
            <div class="invalid-feedback">Please enter a valid price.</div>
          </div>
          <div class="col-md-6">
            <label for="category" class="form-label fw-bold">Category</label>
            <select name="category" class="form-select shadow-sm" required>
              <option value="">Choose...</option>
              <option value="Women" ${product.category === "Women" ? "selected" : ""}>Women</option>
              <option value="Men" ${product.category === "Men" ? "selected" : ""}>Men</option>
              <option value="unisex" ${product.category === "unisex" ? "selected" : ""}>Unisex</option>
            </select>
            <div class="invalid-feedback">Please select a category.</div>
          </div>
          <div class="col-md-6">
            <label for="subcategory" class="form-label fw-bold">Subcategory</label>
            <input type="text" name="subcategory" class="form-control shadow-sm" placeholder="e.g. Bags" value="${product.subcategory || ""}" required>
            <div class="invalid-feedback">Please enter a subcategory.</div>
          </div>
          <div class="col-md-6">
            <label for="material" class="form-label fw-bold">Material</label>
            <input type="text" name="material" class="form-control shadow-sm" placeholder="e.g. PU Leather" value="${product.material || ""}" required>
            <div class="invalid-feedback">Please enter a valid material (letters only, max 100 characters).</div>
          </div>
          <div class="col-md-6">
            <label for="brand" class="form-label fw-bold">Brand</label>
            <input type="text" name="brand" class="form-control shadow-sm" placeholder="e.g. Shein" value="${product.brand || ""}" required>
            <div class="invalid-feedback">Please enter a valid brand (letters only, max 100 characters).</div>
          </div>
          <div class="col-12">
            <label for="description" class="form-label fw-bold">Description</label>
            <textarea name="description" class="form-control shadow-sm" rows="3" required>${product.description || ""}</textarea>
            <div class="invalid-feedback">Description is required (at least 200 characters, letters only).</div>
          </div>
          <div class="col-12">
            <h4 class="mt-4 fw-bold">Stock</h4>
            <div class="mb-3">
              <button type="button" class="btn btn-success shadow-sm" id="addStockBtn">
                <i class="fas fa-plus"></i> Add New Stock
              </button>
            </div>
            <div id="editStockSection">
              ${generateEditableStockHTML(product.stock, index)}
            </div>
          </div>
          <div class="card-footer d-flex gap-3 justify-content-end">
            <button type="submit" class="btn btn-success shadow-lg mt-2">
              <i class="fas fa-save"></i> Save Changes
            </button>
            <button type="button" class="btn btn-danger shadow-lg mt-2" data-bs-dismiss="modal">
              <i class="fas fa-times"></i> Cancel
            </button>
          </div>
        </form>
      `;

      document.getElementById("productEditBody").innerHTML = modalBody;
      const modal = new bootstrap.Modal(document.getElementById("productEditModal"));
      modal.show();

      initializeEditForm(index, product);
    });
  });
}

function generateStockCard(productIndex, stockIndex, stock = {}) {
  const card = document.createElement("div");
  card.className = "card mb-4 shadow-lg border-0 rounded-3";
  card.innerHTML = `
    <div class="card-body">
      <div class="row g-3">
        <div class="col-md-4">
          <label class="form-label fw-bold">Color</label>
          <input type="text" name="stock[${productIndex}][${stockIndex}][color]" class="form-control shadow-sm" placeholder="e.g. Brown" value="${stock.color || ''}" required>
          <div class="invalid-feedback">Please enter a color.</div>
        </div>
        <div class="col-md-8">
          <label class="form-label fw-bold">Images</label>
          <div class="input-group mb-2">
            <input type="file" name="stock[${productIndex}][${stockIndex}][images][]" class="form-control shadow-sm" accept="image/*" multiple>
            <input type="hidden" name="stock[${productIndex}][${stockIndex}][existingImages]" value="${stock.images && stock.images.length > 0 ? stock.images.join(", ") : ""}">
          </div>
          <div class="invalid-feedback">Please upload at least one image.</div>
          <div class="image-preview mt-2" style="display: block; overflow: hidden;">
            ${stock.images && Array.isArray(stock.images) && stock.images.length > 0
              ? stock.images.map((img, imgIndex) => `
                  <div class="d-inline-block position-relative me-2">
                    <p class="text-break">${typeof img === "string" && img.startsWith("data:") ? "Base64 Image" : img || "Unknown Image"}</p>
                    <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-image-btn" data-img-index="${imgIndex}">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                `).join("")
              : "<p>No images available</p>"
            }
          </div>
        </div>
      </div>
      <div class="sizes-section mt-3">
        <h6 class="fw-bold text-secondary">Sizes & Qty</h6>
        <div class="size-rows">
          ${(stock.sizes && stock.sizes.length > 0
            ? stock.sizes.map((sz, sizeIndex) => `
                <div class="row g-3 size-item align-items-center mt-2">
                  <div class="col-md-5">
                    <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][size]" class="form-control shadow-sm" placeholder="e.g. M" value="${sz.size || ''}" required>
                    <div class="invalid-feedback">Please enter a size name.</div>
                  </div>
                  <div class="col-md-5">
                    <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" value="${sz.qty || ''}" required>
                    <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
                  </div>
                  <div class="col-md-2 d-flex">
                    <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                      <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              `).join("")
            : `
                <div class="row g-3 size-item align-items-center mt-2">
                  <div class="col-md-5">
                    <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][0][size]" class="form-control shadow-sm" placeholder="e.g. M" required>
                    <div class="invalid-feedback">Please enter a size name.</div>
                  </div>
                  <div class="col-md-5">
                    <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][0][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" required>
                    <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
                  </div>
                  <div class="col-md-2 d-flex">
                    <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
                      <i class="fas fa-plus"></i>
                    </button>
                    <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              `
          )}
        </div>
      </div>
    </div>
  `;
  // تعديل المعاينة عشان تعكس أسماء الملفات الجديدة
  const inputFile = card.querySelector("input[type='file']");
  const hiddenInput = card.querySelector("input[type='hidden']");
  const preview = card.querySelector(".image-preview");
  inputFile.addEventListener("change", function () {
    preview.innerHTML = ""; // مسح أي محتوى قديم
    if (inputFile.files && inputFile.files.length > 0) {
      const newImages = Array.from(inputFile.files).map(file => file.name);
      hiddenInput.value = [...(stock.images || []), ...newImages].join(", ");
      Array.from(inputFile.files).forEach(file => {
        const p = document.createElement("p");
        p.textContent = file.name;
        p.className = "text-break";
        preview.appendChild(p);
      });
    } else if (hiddenInput.value) {
      preview.innerHTML = hiddenInput.value.split(", ").map(img => `
        <div class="d-inline-block position-relative me-2">
          <p class="text-break">${img}</p>
        </div>
      `).join("");
    } else {
      preview.innerHTML = "<p>No images available</p>";
    }
  });

  // إزالة صورة عند الضغط على زر الحذف
  const removeButtons = card.querySelectorAll(".remove-image-btn");
  removeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const imgIndex = parseInt(this.getAttribute("data-img-index"));
      const images = hiddenInput.value.split(", ").filter((_, index) => index !== imgIndex);
      hiddenInput.value = images.join(", ");
      preview.innerHTML = images.map((img, index) => `
        <div class="d-inline-block position-relative me-2">
          <p class="text-break">${img}</p>
          <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-image-btn" data-img-index="${index}">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join("") || "<p>No images available</p>";
    });
  });

  return card;
}

function generateEditableStockHTML(stock, productIndex) {
  let html = '<div id="editStockSection">';
  if (!stock || stock.length === 0) {
    html += generateStockCard(productIndex, 0, { images: [], sizes: [] }).outerHTML;
  } else {
    stock.forEach((s, stockIndex) => {
      html += generateStockCard(productIndex, stockIndex, s || { images: [], sizes: [] }).outerHTML;
    });
  }
  html += '</div>';
  return html;
}

function initializeEditForm(productIndex, product) {
  const form = document.getElementById("editProductForm");
  const stockSection = document.getElementById("editStockSection");
  const addStockBtn = document.getElementById("addStockBtn");

  console.log("Product Data:", product); // لفحص البيانات الكاملة

  const nameRegex = /^[^0-9]+$/;

  function setInvalid(input, message) {
    input.classList.add("is-invalid");
    let feedback = input.parentElement.querySelector(".invalid-feedback");
    if (!feedback) {
      feedback = document.createElement("div");
      feedback.className = "invalid-feedback";
      input.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function clearInvalid(input) {
    input.classList.remove("is-invalid");
    const feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = "";
  }

  form.addEventListener("input", function (e) {
    if (e.target.classList.contains("is-invalid")) {
      clearInvalid(e.target);
    }
  }, true);

  function validateSingleStockCard(card, showErrors = true) {
    let valid = true;

    const color = card.querySelector("input[name*='[color]']");
    const images = card.querySelector("input[name*='[images][]']");
    const imagePreview = card.querySelector(".image-preview");
    const hiddenInput = card.querySelector("input[name*='[existingImages]']");
    const hasImages = (imagePreview.querySelectorAll("p").length > 0 && hiddenInput.value) || (images.files && images.files.length > 0);

    if (color.value.trim() === "") {
      if (showErrors) setInvalid(color, "Please enter a color.");
      valid = false;
    } else if (showErrors) clearInvalid(color);

    if (!hasImages) {
      if (showErrors) setInvalid(images, "Please upload at least one image.");
      valid = false;
    } else if (showErrors) clearInvalid(images);

    const sizeRows = card.querySelectorAll(".size-item");
    let hasAtLeastOneCompleteSize = false;

    sizeRows.forEach(row => {
      const sizeName = row.querySelector("input[name*='[size]']");
      const qty = row.querySelector("input[name*='[qty]']");
      const sizeNameVal = sizeName.value.trim();
      const qtyVal = qty.value.trim();

      if (sizeNameVal === "" || qtyVal === "" || isNaN(parseInt(qtyVal)) || parseInt(qtyVal) < 0) {
        if (showErrors) {
          if (sizeNameVal === "") setInvalid(sizeName, "Please enter a size name.");
          else clearInvalid(sizeName);
          if (qtyVal === "" || isNaN(parseInt(qtyVal)) || parseInt(qtyVal) < 0) {
            setInvalid(qty, "Please enter a valid quantity (0 or more).");
          } else {
            clearInvalid(qty);
          }
        }
      } else {
        hasAtLeastOneCompleteSize = true;
        if (showErrors) {
          clearInvalid(sizeName);
          clearInvalid(qty);
        }
      }
    });

    if (!hasAtLeastOneCompleteSize) valid = false;

    return valid;
  }

  addStockBtn.addEventListener("click", function () {
    const lastCard = stockSection.querySelector(".card:last-of-type");
    if (lastCard) {
      const isValid = validateSingleStockCard(lastCard, true);
      if (!isValid) {
        return; 
      }
    }
    stockSection.appendChild(generateStockCard(productIndex, stockSection.children.length));
  });

  stockSection.addEventListener("click", function (e) {
    if (e.target.closest(".addSizeAndQty")) {
      const sizeSection = e.target.closest(".sizes-section");
      const lastRow = sizeSection.querySelector(".size-item:last-of-type");
      const size = lastRow.querySelector("input[name*='[size]']");
      const qty = lastRow.querySelector("input[name*='[qty]']");

      let allow = true;
      if (size.value.trim() === "") {
        setInvalid(size, "Please enter a size name.");
        allow = false;
      } else {
        clearInvalid(size);
      }
      if (qty.value.trim() === "" || isNaN(parseInt(qty.value)) || parseInt(qty.value) < 0) {
        setInvalid(qty, "Please enter a valid quantity (0 or more).");
        allow = false;
      } else {
        clearInvalid(qty);
      }

      if (allow) {
        const sizeIndex = sizeSection.querySelectorAll(".size-item").length;
        const stockIndex = parseInt(lastRow.querySelector("input[name*='[size]']").name.match(/\[(\d+)\]/)[1]);
        const row = document.createElement("div");
        row.className = "row g-3 size-item align-items-center mt-2";
        row.innerHTML = `
          <div class="col-md-5">
            <input type="text" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][size]" class="form-control shadow-sm" placeholder="e.g. M" required>
            <div class="invalid-feedback">Please enter a size name.</div>
          </div>
          <div class="col-md-5">
            <input type="number" name="stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][qty]" class="form-control shadow-sm" placeholder="Qty" min="0" required>
            <div class="invalid-feedback">Please enter a valid quantity (0 or more).</div>
          </div>
          <div class="col-md-2 d-flex">
            <button type="button" class="addSizeAndQty btn btn-success btn-sm rounded-circle shadow-sm ms-2">
              <i class="fas fa-plus"></i>
            </button>
            <button type="button" class="removeSizeAndQty btn btn-danger btn-sm rounded-circle shadow-sm ms-2">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        sizeSection.querySelector(".size-rows").appendChild(row);
      }
    }

    if (e.target.closest(".removeSizeAndQty")) {
      const currentRow = e.target.closest(".size-item");
      const parent = currentRow.parentElement;
      if (parent.querySelectorAll(".size-item").length > 1) {
        currentRow.remove();
      }
    }

    if (e.target.closest(".remove-image-btn")) {
      const card = e.target.closest(".card");
      const imageContainer = e.target.closest(".d-inline-block");
      const hiddenInput = card.querySelector("input[name*='[existingImages]']");
      const imgIndex = parseInt(e.target.getAttribute("data-img-index"));
      const images = hiddenInput.value.split(", ").filter((_, index) => index !== imgIndex);
      hiddenInput.value = images.join(", ");
      const preview = card.querySelector(".image-preview");
      preview.innerHTML = images.map((img, index) => `
        <div class="d-inline-block position-relative me-2">
          <p class="text-break">${img}</p>
          <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 remove-image-btn" data-img-index="${index}">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `).join("") || "<p>No images available</p>";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    let isValid = true;

    const name = form.querySelector("input[name='name']");
    if (name.value.trim() === "") {
      setInvalid(name, "Product name is required.");
      isValid = false;
    } else if (!nameRegex.test(name.value)) {
      setInvalid(name, "Product name must contain only letters (no numbers).");
      isValid = false;
    } else if (name.value.trim().length > 100) {
      setInvalid(name, "Product Name must not exceed 100 characters.");
      isValid = false;
    } else {
      clearInvalid(name);
    }

    const brand = form.querySelector("input[name='brand']");
    if (brand.value.trim() === "") {
      setInvalid(brand, "Brand is required.");
      isValid = false;
    } else if (!nameRegex.test(brand.value)) {
      setInvalid(brand, "Brand must contain only letters (no numbers).");
      isValid = false;
    } else if (brand.value.trim().length > 100) {
      setInvalid(brand, "Brand must not exceed 100 characters.");
      isValid = false;
    } else {
      clearInvalid(brand);
    }

    const material = form.querySelector("input[name='material']");
    if (material.value.trim() === "") {
      setInvalid(material, "Material is required.");
      isValid = false;
    } else if (!nameRegex.test(material.value)) {
      setInvalid(material, "Material must contain only letters (no numbers).");
      isValid = false;
    } else if (material.value.trim().length > 100) {
      setInvalid(material, "Material must not exceed 100 characters.");
      isValid = false;
    } else {
      clearInvalid(material);
    }

    const price = form.querySelector("input[name='price']");
    if (price.value.trim() === "" || parseFloat(price.value) <= 0) {
      setInvalid(price, "Please enter a valid price.");
      isValid = false;
    } else {
      clearInvalid(price);
    }

    const category = form.querySelector("select[name='category']");
    if (category.value.trim() === "") {
      setInvalid(category, "Please select a category.");
      isValid = false;
    } else {
      clearInvalid(category);
    }

    const subCategory = form.querySelector("input[name='subcategory']");
    if (subCategory.value.trim() === "") {
      setInvalid(subCategory, "Please enter a subcategory.");
      isValid = false;
    } else {
      clearInvalid(subCategory);
    }

    const description = form.querySelector("textarea[name='description']");
    if (description.value.trim() === "") {
      setInvalid(description, "Description is required.");
      isValid = false;
    } else if (!nameRegex.test(description.value)) {
      setInvalid(description, "Description must contain only letters (no numbers).");
      isValid = false;
    } else if (description.value.trim().length < 200) {
      setInvalid(description, "Description must be at least 200 characters.");
      isValid = false;
    } else {
      clearInvalid(description);
    }

    const stockCards = stockSection.querySelectorAll(".card");
    if (stockCards.length === 0) {
      stockSection.appendChild(generateStockCard(productIndex, 0));
      isValid = false;
    } else {
      stockCards.forEach(card => {
        if (!validateSingleStockCard(card, true)) isValid = false;
      });
    }

    if (isValid) {
      const formData = new FormData(form);
      const updatedProduct = {
        id: product.id,
        name: formData.get("name"),
        category: formData.get("category"),
        subcategory: formData.get("subcategory") || null,
        price: parseFloat(formData.get("price")),
        material: formData.get("material") || null,
        brand: formData.get("brand") || null,
        description: formData.get("description") || null,
        sellerId: product.sellerId,
        status: product.status,
        stock: [],
        images: []
      };

      const stockCards = stockSection.querySelectorAll(".card");
      stockCards.forEach((card, stockIndex) => {
        const color = card.querySelector(`input[name='stock[${productIndex}][${stockIndex}][color]']`).value;
        const images = card.querySelector(`input[name='stock[${productIndex}][${stockIndex}][images][]']`).files;
        const existingImagesInput = card.querySelector(`input[name='stock[${productIndex}][${stockIndex}][existingImages]']`);
        const existingImages = existingImagesInput ? existingImagesInput.value.split(", ").filter(img => img) : [];
        const sizes = [];

        card.querySelectorAll(".size-item").forEach((row, sizeIndex) => {
          const sizeInput = row.querySelector(`input[name='stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][size]']`);
          const qtyInput = row.querySelector(`input[name='stock[${productIndex}][${stockIndex}][sizes][${sizeIndex}][qty]']`);
          const size = sizeInput ? sizeInput.value : "";
          const qty = qtyInput ? qtyInput.value : "";

          if (size && qty) {
            sizes.push({ size, qty: parseInt(qty) });
          }
        });

        const stockItem = { color, sizes, images: existingImages };
        updatedProduct.stock.push(stockItem);

        if (images) {
          Array.from(images).forEach(img => {
            stockItem.images.push(img.name);
          });
        }
      });

      console.log("Updated Product:", updatedProduct); // لفحص البيانات قبل التخزين
      let products = JSON.parse(localStorage.getItem("products")) || [];
      products[productIndex] = updatedProduct;
      localStorage.setItem("products", JSON.stringify(products));
      loadProducts();

      const modal = bootstrap.Modal.getInstance(document.getElementById("productEditModal"));
      if (modal) modal.hide();

      const toastElement = document.createElement("div");
      toastElement.className = "toast-container position-fixed top-0 end-0 p-3";
      toastElement.innerHTML = `
        <div class="toast align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              ✔ Product updated successfully!
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
      document.body.appendChild(toastElement);
      const toast = new bootstrap.Toast(toastElement.querySelector(".toast"));
      toast.show();
      setTimeout(() => toastElement.remove(), 3000);
    }
  });
}

function generateStockHTML(stock) {
  if (!stock || stock.length === 0) return "<p>No stock available</p>";

  let html = "";
  stock.forEach(s => {
    let sizesTable = "<p>-</p>";
    if (s.sizes && s.sizes.length > 0) {
      sizesTable = `
        <table class="table table-sm table-bordered mb-2">
          <thead class="table-light">
            <tr>
              <th>Size</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            ${s.sizes.map(sz => `<tr><td>${sz.size}</td><td>${sz.qty}</td></tr>`).join("")}
          </tbody>
        </table>
      `;
    }

    html += `
      <div class="card mb-2 shadow-lg border-0 rounded-3">
        <div class="card-body">
          <p><strong>Color:</strong> ${s.color || "-"}</p>
          <p><strong>Sizes & Qty:</strong></p>
          ${sizesTable}
          <p><strong>Images:</strong></p>
          <div class="image-preview">
            ${
              s.images && s.images.length > 0
                ? s.images.map(img => `<p>${typeof img === "string" && img.startsWith("data:") ? "Base64 Image" : img}</p>`).join("")
                : "<p>No images available</p>"
            }
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

document.getElementById("searchBtn").addEventListener("click", search);

function search() {
  const input = document.getElementById("searchInput").value.trim().toLowerCase();
  const table = document.getElementById("productTableBody");
  const rows = table.getElementsByTagName("tr");

  const searchClean = input.replace("$", "");

  for (let row of rows) {
    const rowText = row.textContent.toLowerCase();
    const prices = rowText.match(/[$]?\d+(\.\d+)?/g) || [];
    const numericClean = prices.map(p => p.replace("$", "")).join(" ");

    if (rowText.includes(input) || numericClean.includes(searchClean)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  }
  document.getElementById("searchInput").value = "";
}
loadProducts();
  }
}