// Show Bootstrap spinner overlay
export function showLoader() {
  let loader = document.getElementById("app-loader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "app-loader";
    loader.innerHTML = `
      <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    `;
    loader.style.cssText = `
      position: fixed; inset: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(255, 255, 255, 0.8); z-index: 9999;
    `;
    document.body.appendChild(loader);
  }
  loader.style.display = "flex";
}

// Hide loader
export function hideLoader() {
  const loader = document.getElementById("app-loader");
  window.setTimeout(() => {
    if (loader) loader.style.display = "none";
  },400)
}